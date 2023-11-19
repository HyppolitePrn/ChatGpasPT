import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Message = ({ text, isUser }) => {
    return (
        <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{text}</Text>
        </View>
    )
}

export default Message

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
        color: isUser ? 'white' : 'black',
    },
})
