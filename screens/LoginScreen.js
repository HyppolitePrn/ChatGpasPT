import { StyleSheet, Text, View, Pressable, Button, Keyboard, Platform, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import InputForm from '../components/InputForm'
import { useNavigation } from "@react-navigation/native"

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigation = useNavigation()

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
                        title="Login"
                        style={styles.inputLogin}
                        onPress={() => { }}
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