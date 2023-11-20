import React from 'react'
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const UserChat = ({ user }) => {
    const navigation = useNavigation()

    return (
        <Pressable
            onPress={() => navigation.navigate('Messages', { to: user?._id })}
            style={styles.container}
        >
            <View>
                <Image
                    style={styles.profilePicture}
                    source={{
                        uri: user?.profile_picture
                            ? user.profile_picture
                            : 'https://robohash.org/mail@ashallendesign.co.uk',
                    }}
                />
            </View>
            <View style={styles.userInfos}>
                <Text style={styles.username}>{user.username}</Text>
                <Text style={styles.lastMessage}>last message !!!</Text>
            </View>
            <View>
                <Text style={styles.date}>3:00 pm</Text>
            </View>
        </Pressable>
    )
}

export default UserChat

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 0.7,
        padding: 10,
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'cover',
    },
    userInfos: {
        flex: 1,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    lastMessage: {
        fontSize: 14,
        color: 'gray',
        marginTop: 3,
        fontWeight: '500',
    },
    date: {
        fontSize: 11,
        fontWeight: '400',
        color: '#585858',
    },
})
