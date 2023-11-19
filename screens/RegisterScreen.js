import {
  StyleSheet,
  Text,
  View,
  Button,
  Pressable,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
import React, { useState } from 'react'
import InputForm from '../components/InputForm'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import config from '../config.env.json'

const RegisterScreen = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const navigation = useNavigation()

  const handleRegister = async () => {
    try {
      const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      if (!emailRegex.test(email)) {
        setEmailError('Veuillez entrer un email valide')
        return
      } else {
        setEmailError('')
      }

      const body = {
        username,
        email,
        password,
      }

      const options = {
        method: 'POST',
        url: config.REACT_APP_API_URL + '/register',
        data: body,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }

      const response = await axios.request(options)

      const token = response.data.token

      AsyncStorage.setItem('authToken', token)

      setUsername('')
      setEmail('')
      setPassword('')

      navigation.replace('Home')
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message)

        Alert.alert('Error', error.response.data.message, [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ])
      } else {
        console.log('Unexpected error:', error.message)
      }
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.registerContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : null}
        >
          <Text style={styles.registerTitle}>Register</Text>

          <InputForm
            placeholderInput={'Username...'}
            valueInput={username}
            isSecure={false}
            handleChangeInput={text => setUsername(text)}
          />

          <InputForm
            placeholderInput={'Email...'}
            valueInput={email}
            isSecure={false}
            handleChangeInput={text => setEmail(text)}
          />
          {emailError ? (
            <Text style={{ color: 'red' }}>{emailError}</Text>
          ) : null}

          <InputForm
            placeholderInput={'Password...'}
            valueInput={password}
            isSecure={true}
            handleChangeInput={text => setPassword(text)}
          />

          <Button title='Register' color='#007AFF' onPress={handleRegister} />

          <Pressable
            onPress={() => navigation.navigate('Home')}
            style={{ marginTop: 20 }}
          >
            <Text style={styles.loginText}>Already have an account? Login</Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  registerTitle: {
    fontSize: 30,
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 2,
    marginBottom: 30,
    color: '#000000',
    fontWeight: 'bold',
  },
  registerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLogin: {
    width: 200,
    backgroundColor: '#4A55A2',
    padding: 15,
    marginTop: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 6,
  },
  loginText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
  },
})
