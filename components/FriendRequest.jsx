import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { formatDistanceToNow } from 'date-fns'
import React, { useContext, useState } from 'react'
import { UserType } from '../UserContext'
import { ActivityIndicator } from 'react-native'

const FriendRequest = ({
  friendRequest,
  friendRequests,
  setFriendRequests,
}) => {
  const { authToken, setAuthToken } = useContext(UserType)
  const [isLoading, setIsLoading] = useState(false)

  const acceptRequest = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/friend-requests/accept/${friendRequest._id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )

      if (!response.ok) {
        throw new Error('Error in accepting friend request')
      }

      const updatedFriendRequests = friendRequests.filter(
        request => request._id !== friendRequest._id
      )
      setFriendRequests(updatedFriendRequests)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <ActivityIndicator style={styles.loading} size='large' color='#000000' />
    )
  }

  return (
    <Pressable style={styles.container}>
      <Image
        style={styles.profilePicture}
        source={{
          uri: friendRequest?.from?.profile_picture
            ? friendRequest?.from?.profile_picture
            : 'https://robohash.org/mail@ashallendesign.co.uk',
        }}
      />

      <View style={styles.userInfos}>
        <Text>
          <Text style={styles.username}>{friendRequest?.from?.username}</Text>{' '}
          <Text style={styles.friendRequestMessage}>
            sent you a friend request
          </Text>{' '}
          <Text style={styles.date}>
            {formatDistanceToNow(new Date(friendRequest?.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </Text>
      </View>

      <Pressable
        onPress={() => acceptRequest(friendRequest?._id)}
        disabled={friendRequest?.status === 'accepted'}
        style={
          friendRequest?.status === 'accepted'
            ? styles.actionButtonAccepted
            : styles.actionButton
        }
      >
        <Text style={styles.actionButtonText}>
          {friendRequest?.status === 'accepted' ? 'Accepted' : 'Accept'}
        </Text>
      </Pressable>
    </Pressable>
  )
}

export default FriendRequest

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
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
    maxWidth: 200,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  friendRequestMessage: {
    fontWeight: 'normal',
    fontSize: 14,
  },
  actionButton: {
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
  },
  actionButtonAccepted: {
    backgroundColor: '#4d4d4d',
    padding: 10,
    borderRadius: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  data: {
    fontSize: 12,
    color: '#4d4d4d',
  },
})
