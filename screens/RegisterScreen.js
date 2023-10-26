import { StyleSheet, Text, View, Button, Pressable, Keyboard, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useState } from 'react'
import InputForm from '../components/InputForm'
import { useNavigation } from "@react-navigation/native"
import axios from 'axios'

const RegisterScreen = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigation = useNavigation()

  const handleRegister = async () => {
    try {
      const body = {
        username,
        email,
        password
      }

      const options = {
        method: 'POST',
        url: process.env.API_URL + '/register',
        data: body,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }

      const response = await axios.request(options)

      const user = {
        username: response.data.username,
        password: response.data.password
      }

      const optionsLogin = {
        method: 'POST',
        url: process.env.API_URL + '/login',
        data: user,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }

      const responseLogin = await axios.request(optionsLogin)

      const token = responseLogin.data.token

      AsyncStorage.setItem('authToken', token)

      setUsername("")
      setEmail("")
      setPassword("") 
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message)

        Alert.alert(
          "Error",
          error.response.data.message,
          [
            { text: "OK", onPress: () => navigation.navigate("Login") }
          ]
        )
      } else {
        console.log("Unexpected error:", error.message)
      }
    }
  }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.registerContainer}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} >

          <Text style={styles.registerTitle}>Register</Text>

          <InputForm
            placeholderInput={'Username...'}
            valueInput={username}
            isSecure={false}
            handleChangeInput={(text) => setUsername(text)}
          />

          <InputForm
            placeholderInput={'Email...'}
            valueInput={email}
            isSecure={false}
            handleChangeInput={(text) => setEmail(text)}
          />

          <InputForm
            placeholderInput={'Password...'}
            valueInput={password}
            isSecure={true}
            handleChangeInput={(text) => setPassword(text)}
          />

          <Button
            title="Register"
            color="#007AFF"
            onPress={handleRegister}
          />

          <Pressable
            onPress={() => navigation.navigate("Home")}
            style={{ marginTop: 20 }}
          >
            <Text style={styles.loginText}>
              Already have an account? Login
            </Text>
          </Pressable>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback >
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
    fontWeight: 600
  },
  registerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputLogin: {
    width: 200,
    backgroundColor: "#4A55A2",
    padding: 15,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 6,
  },
  loginText: {
    textAlign: "center",
    color: "gray",
    fontSize: 14,
  },
})