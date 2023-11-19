import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserType } from '../UserContext'

const ChatsScreen = () => {
  const [friends, setFriends] = useState([])
  const { userId, setUserId } = useContext(UserType)
  return (
    <View>
      <Text>ChatsScreen</Text>
    </View>
  )
}

export default ChatsScreen

const styles = StyleSheet.create({})
