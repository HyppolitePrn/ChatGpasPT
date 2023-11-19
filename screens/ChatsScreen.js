import { ActivityIndicator, StyleSheet, Text, View, ScrollView, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UserType } from '../UserContext'
import UserChat from '../components/UserChat'
import config from '../config.env.json'

const ChatsScreen = () => {
  const [friends, setFriends] = useState([])
  const { userId, setUserId, authToken, setAuthToken } = useContext(UserType)
  const [isLoading, setIsLoading] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        setIsLoading(true)

        const response = await fetch(
          `${config.REACT_APP_API_URL}/users/${userId}/friends`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )

        const data = await response.json()

        console.log(data)

        if (response.ok) {
          setFriends(data)
        }
      } catch (error) {

        console.error('Error:', error)

      } finally {
        setIsLoading(false)
      }
    }

    acceptedFriendsList()
  }, [])

  if (isLoading) {
    return (
      <ActivityIndicator style={styles.loading} size='large' color='#000000' />
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {friends?.map((friend) => (
          <UserChat user={friend} key={friend?._id} />
        ))}
      </Pressable>
    </ScrollView>
  )
}

export default ChatsScreen

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
