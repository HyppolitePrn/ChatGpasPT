import { decode as atob } from 'base-64'
global.atob = atob

import { StyleSheet, Text, View, Button } from 'react-native'
import React, {
    useContext,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { UserType } from '../UserContext'
import { jwtDecode } from 'jwt-decode'
import useFetch from '../hooks/useFetch'

const HomeScreen = () => {
    const navigation = useNavigation()
    const [users, setUsers] = useState([])
    const [token, setToken] = useState(null)
    const { userId, setUserId, authToken, setAuthToken } = useContext(UserType)

    const removeAuthToken = async () => {
        try {
            console.log('removeAuthToken')
            await AsyncStorage.removeItem('authToken')

            navigation.replace('Login')
        } catch (error) {
            console.log(error)
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: '',
            headerLeft: () => (
                <Text style={styles.headerLeft}>WhatsappRocky</Text>
            ),
            headerRight: () => (
                <View style={styles.headerRight}>
                    <Ionicons
                        name='heart-outline'
                        size={24}
                        color='black'
                        onPress={() => navigation.navigate('Notifications')}
                    />
                    <Ionicons
                        name='chatbubble-ellipses-outline'
                        size={24}
                        color='black'
                        onPress={() => navigation.navigate('Chats')}
                    />
                </View>
            ),
        })
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken')
                setAuthToken(token)
                const decodedToken = jwtDecode(token)
                const userId = decodedToken.userId
                setUserId(userId)
            } catch (error) {
                console.log(error)
            }
        }

        fetchUser()
    }, [])

    return (
        <View style={styles.homeContainer}>
            <Text>HomeScreen</Text>
            <Button title='test' onPress={removeAuthToken} />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerLeft: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginRight: 8,
    },
})
