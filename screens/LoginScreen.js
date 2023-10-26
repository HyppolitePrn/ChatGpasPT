import { StyleSheet, Text, View, Pressable, Button, Keyboard, Platform, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import InputForm from '../components/InputForm'
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from '@react-native-async-storage/async-storage'

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation()

    const handleLogin = async () => {
        try {

            const body = {
                email,
                password
            }

            const options = {
                method: 'POST',
                url: process.env.API_URL + '/login',
                data: body,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }

            const response = await axios.request(options)

            const token = response.data.token

            AsyncStorage.setItem('authToken', token)

            navigation.replace("Home")

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

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {

                const token = await AsyncStorage.getItem('authToken')

                if (token) {
                    navigation.replace("Home")
                }

            } catch (error) {

                console.log("Unexpected error:", error.message)
            }
        }

        checkLoggedIn()
    }, []);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.loginContainer}>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} >
                    <Text style={styles.loginTitle}>Login</Text>

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
                        onPress={handleLogin}
                        title="Login"
                        style={styles.inputLogin}
                    />

                    <Pressable
                        onPress={() => navigation.navigate("Register")}
                        style={{ marginTop: 20 }}
                    >
                        <Text style={styles.signupText}>
                            Dont't have an account? Sign Up
                        </Text>
                    </Pressable>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    loginTitle: {
        fontSize: 30,
        textTransform: 'uppercase',
        textAlign: 'center',
        letterSpacing: 2,
        marginBottom: 30,
        color: '#000000',
        fontWeight: 600
    },
    loginContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputLogin: {
        width: "20%",
        height: 40,
        backgroundColor: "#007AFF",
        borderRadius: 22,
        justifyContent: "center",
        alignItems: "center",
        margin: 16,
    },
    signupText: {
        textAlign: "center",
        color: "gray",
        fontSize: 14,
    },
})