import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const reponses = require('../responses.json')
import MessageBubble from '../components/MessageBubble'
import ContactBubble from '../components/ContactBubble'

const ChatApp = () => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')

  const getRandomResponse = () => {
    const responsesArray = reponses.reponses
    const randomIndex = Math.floor(Math.random() * responsesArray.length)
    return responsesArray[randomIndex]
  }

  const sendAutoResponse = () => {
    const autoMessage = { text: getRandomResponse(), isUser: false }
    setMessages([...messages, autoMessage])

    AsyncStorage.setItem(
      'chatMessages',
      JSON.stringify([...messages, autoMessage])
    ).catch(error => console.error(error))
  }

  const addMessage = () => {
    if (newMessage) {
      const userMessage = { text: newMessage, isUser: true }
      setMessages([...messages, userMessage])
      setNewMessage('')

      AsyncStorage.setItem(
        'chatMessages',
        JSON.stringify([...messages, userMessage])
      ).catch(error => console.error(error))
    }
  }

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage && lastMessage.isUser) {
      const timer = setTimeout(() => {
        sendAutoResponse()
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [messages])

  useEffect(() => {
    AsyncStorage.getItem('chatMessages')
      .then(storedMessages => {
        if (storedMessages) {
          setMessages(JSON.parse(storedMessages))
        }
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <>
      <View style={styles.container}>
        <ContactBubble />
        <View style={styles.messageContainer}>
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <MessageBubble text={item.text} isUser={item.isUser} />
            )}
          />
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              placeholder='Tapez un message...'
              value={newMessage}
              onChangeText={text => setNewMessage(text)}
            />
            <Button
              title='Envoyer'
              style={styles.sendButton}
              onPress={() => {
                addMessage()
                Keyboard.dismiss()
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  )
}

export default ChatApp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 32,
  },
  messageContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    maxWidth: '70%',
  },
  userMessageText: {
    color: '#ffffff',
  },
  autoMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#DDDDDD',
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    maxWidth: '70%',
  },
  autoMessageText: {
    color: '#000000',
  },
  inputContainer: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputField: {
    width: '70%',
    borderWidth: 1,
    borderColor: '#007AFF',
    justifyContent: 'center',
    borderRadius: 22,
    margin: 16,
    padding: 8,
  },
  sendButton: {
    width: '20%',
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
})
