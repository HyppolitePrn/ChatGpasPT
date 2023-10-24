import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import InputForm from '../components/InputForm';

const LoginScreen = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={styles.loginContainer}>
            <Text style={styles.loginTitle}>Login</Text>

            <InputForm 
                placeholderInput={'Username...'} 
                valueInput={username} 
                isSecure={false} 
                handleChangeInput={(text) => setUsername(text)}
            />

            <InputForm 
                placeholderInput={'Password...'} 
                valueInput={password} 
                isSecure={true} 
                handleChangeInput={(text) => setPassword(text)}
            />

            <Button 
                title="Login"
                color="#007AFF"
                onPress={() => {}}
            />
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    loginTitle:{
        fontSize: '30px',
        textTransform: 'uppercase',
        letterSpacing:'2px',
        color: '#black',
        fontWeight: 600
    },
    loginContainer:{
        flex: 1,
        paddingTop: 32,
        alignItems: 'center',
        gap: '20px',
        backgroundColor: "#F5F5F5",
    },
    inputLogin:{
        width: '70%',
        height: 'auto',
        borderWidth: 2,
        borderColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        color: '#DDDDD'
    }
})