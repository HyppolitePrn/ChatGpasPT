import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserType } from '../UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../config.env.json'

const UserCard = ({ user }) => {
    const { userId, setUserId } = useContext(UserType)
    const [requestSent, setRequestSent] = useState(false)
    const { authToken, setAuthToken } = useContext(UserType)

    const sendFriendRequest = async (from, to) => {
        try {
            const response = await fetch(
                `${config.REACT_APP_API_URL}/friend-requests`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: JSON.stringify({ from, to }),
                }
            )

            if (response.ok) {
                setRequestSent(true)
            }

            return response.json()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Pressable style={styles.container}>
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
                <Text style={styles.email}>{user.email}</Text>
            </View>

            <Pressable
                onPress={() => sendFriendRequest(userId, user._id)}
                style={styles.followButton}
            >
                <Text style={styles.followButtonText}>Follow</Text>
            </Pressable>
        </Pressable>
    )
}

export default UserCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
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
        justifyContent: 'center',
        marginLeft: 10,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    email: {
        fontSize: 14,
    },
    followButton: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 10,
        minWidth: 100,
        alignItems: 'center',
    },
    followButtonText: {
        color: '#ffffff',
    },
})
