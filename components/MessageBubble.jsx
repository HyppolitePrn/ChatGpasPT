import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Message = ({ text, isUser }) => {
  const styles = StyleSheet.create({
    messageContainer: {
      alignSelf: isUser ? 'flex-end' : 'flex-start',
      backgroundColor: isUser ? '#007AFF' : '#DDDDDD',
      borderRadius: 8,
      padding: 8,
      marginVertical: 4,
      maxWidth: '70%',
    },
    messageText: {
      color: isUser ? '#ffffff' : '#000000',
    },
  })

  return (
    <View style={styles.messageContainer}>
      <Text style={styles.messageText}>{text}</Text>
    </View>
  )
}

export default Message
