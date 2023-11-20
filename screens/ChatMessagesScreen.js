import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    TextInput,
    Button,
    Pressable,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'
import { Entypo, Ionicons, Feather } from '@expo/vector-icons'
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { UserType } from '../UserContext'
import { useRoute, useNavigation } from '@react-navigation/native'
import config from '../config.env.json'
import EmojiSelector from 'react-native-emoji-selector'
import { Image } from 'react-native'
import { formatDistanceToNow } from 'date-fns'
import * as ImagePicker from 'expo-image-picker'

const ChatMessagesScreen = () => {
    const [showEmojiSelected, setShowEmojiSelected] = useState(false)
    const [selectedImage, setSelectedImage] = useState('')
    const [inputselected, setInputselected] = useState(false)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [recepientData, setRecepientData] = useState()
    const navigation = useNavigation()
    const { userId, setUserId, authToken, setAuthToken } = useContext(UserType)
    const route = useRoute()
    const { to } = route.params

    const handleEmojiPress = () => {
        setShowEmojiSelected(!showEmojiSelected)
    }

    const handleInputSelected = () => {
        setInputselected(!inputselected)
    }

    const fetchMessages = async () => {
        try {
            const response = await fetch(
                `${config.REACT_APP_API_URL}/messages?from=${userId}&to=${to}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            )

            const data = await response.json()

            console.log(data)

            if (response.ok) {
                setMessages(data)
            } else {
                console.log(
                    'error while fetching messages',
                    response.status.message
                )
            }
        } catch (error) {
            console.log('error while fetching messages:', error)
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    useEffect(() => {
        const fetchRecepientData = async () => {
            try {
                const response = await fetch(
                    `${config.REACT_APP_API_URL}/users/${to}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                )

                const data = await response.json()

                if (response.ok) {
                    setRecepientData(data)
                }
            } catch (error) {
                console.error('Error:', error)
            }
        }

        fetchRecepientData()
    }, [])

    const handleSend = async (messageType, imageUri) => {
        try {
            const formData = new FormData()

            formData.append('from', userId)
            formData.append('to', to)

            if (messageType === 'image') {
                formData.append('messageType', 'image')
                formData.append('imageFile', {
                    uri: imageUri,
                    type: 'image/jpeg',
                    name: 'image.jpg',
                })
            } else {
                formData.append('messageType', 'text')
                formData.append('messageText', message)
            }

            console.log(formData)

            const response = await fetch(
                `${config.REACT_APP_API_URL}/messages`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: formData,
                }
            )

            if (response.ok) {
                setMessage('')
                setSelectedImage('')

                fetchMessages()
            }
        } catch (error) {
            console.log('error in sending the message:', error)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerLeft: () => (
                <View style={styles.headerLeft}>
                    <Ionicons
                        name='ios-chevron-back-outline'
                        size={30}
                        color='#007AFF'
                        onPress={() => navigation.goBack()}
                    />

                    <View style={styles.headerLeftUserInfo}>
                        <Image
                            style={styles.profilePicture}
                            source={{
                                uri: recepientData?.profile_picture
                                    ? recepientData.profile_picture
                                    : 'https://robohash.org/mail@ashallendesign.co.uk',
                            }}
                        />

                        <Text style={styles.headerLeftUsername}>
                            {recepientData?.username}
                        </Text>
                    </View>
                </View>
            ),
            headerRight: () => <View style={styles.headerRight}></View>,
        })
    }, [recepientData])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        if (!result.canceled) {
            handleSend('image', result.uri)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView>
                {messages?.map((mess, index) => {
                    if (mess?.messageType === 'text') {
                        return (
                            <Pressable
                                style={[
                                    mess?.from?._id === userId
                                        ? styles.senderMessage
                                        : {},
                                ]}
                                key={mess?._id}
                            >
                                <Text style={{ color: 'white', fontSize: 13, textAlign: 'left' }}>
                                    {mess?.message}
                                </Text>
                                <Text style={styles.messageDate}>
                                    {formatDistanceToNow(
                                        new Date(mess?.timeStamp),
                                        {
                                            addSuffix: true,
                                        }
                                    )}
                                </Text>
                            </Pressable>
                        )
                    }

                    if (mess?.messageType === 'image') {
                        const baseUrl = "/home/nangaim/Bureau/hetic/whatsappRocky/api/files/"
                        const imageUrl = mess?.imageUrl
                        const fileName = imageUrl.split('/').pop()
                        const src = baseUrl + fileName
                        const source = { uri: baseUrl + fileName }

                        console.log('../api/' + imageUrl)

                        return (
                            <Pressable
                                style={[
                                    mess?.from?._id === userId
                                        ? styles.senderMessage
                                        : {},
                                ]}
                                key={mess?._id}
                            >
                                <View>
                                    <Image style={{ width: 200, height: 200, borderRadius: 7 }} source={{ uri: 'api/' + imageUrl }} />

                                    <Text style={styles.messageDate}>
                                        {formatDistanceToNow(
                                            new Date(mess?.timeStamp),
                                            {
                                                addSuffix: true,
                                            }
                                        )}
                                    </Text>

                                    <Text style={{ color: 'white' }}>{'api/' + imageUrl}</Text>
                                </View>

                            </Pressable>
                        )
                    }
                })}
            </ScrollView>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                    style={{
                        ...styles.inputContainer,
                        paddingBottom: showEmojiSelected ? 0 : 25,
                    }}
                >
                    <Entypo
                        onPress={handleEmojiPress}
                        style={styles.emojiIcon}
                        name='emoji-happy'
                        size={24}
                        color='black'
                    />
                    <TextInput
                        style={{ ...styles.textInput }}
                        onPressIn={handleInputSelected}
                        onPressOut={handleInputSelected}
                        value={message}
                        onChangeText={text => setMessage(text)}
                        placeholder='Type your message...'
                    />
                    <View style={styles.iconsContainer}>
                        <Ionicons
                            onPress={pickImage}
                            name='camera-outline'
                            size={28}
                            color='black'
                        />
                        <Feather name='mic' size={24} color='black' />
                    </View>

                    <Pressable
                        onPress={() => handleSend('text')}
                        style={styles.sendButton}
                    >
                        <Ionicons name='send' size={16} color='white' />
                    </Pressable>
                </View>
            </TouchableWithoutFeedback>

            {showEmojiSelected && (
                <EmojiSelector
                    onEmojiSelected={emoji => {
                        setMessage(prevMessage => prevMessage + emoji)
                    }}
                    style={styles.emojiSelector}
                />
            )}
        </KeyboardAvoidingView>
    )
}

export default ChatMessagesScreen

const styles = StyleSheet.create({
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    headerLeftUserInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerLeftUsername: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    profilePicture: {
        width: 30,
        height: 30,
        borderRadius: 15,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 24,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: 'gray',
    },
    emojiIcon: {
        marginRight: 5,
    },
    textInput: {
        flex: 1,
        height: 40,
        borderColor: 'black',
        borderRadius: 30,
        paddingHorizontal: 10,
        borderWidth: 1,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginHorizontal: 8,
    },
    sendButton: {
        minHeight: 40,
        minWidth: 40,
        backgroundColor: 'black',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emojiSelector: {
        height: 250,
    },
    senderMessage: {
        alignSelf: 'flex-end',
        backgroundColor: 'black',
        padding: 10,
        maxWidth: '60%',
        borderRadius: 8,
        margin: 10,
    },
    recepientMessage: {
        alignSelf: 'flex-start',
        backgroundColor: 'gray',
        padding: 8,
        margin: 10,
        maxWidth: '60%',
        borderRadius: 8,
    },
    messageDate: {
        color: 'gray',
        textAlign: 'right',
        fontSize: 8,
        marginTop: 6,
    },
})
