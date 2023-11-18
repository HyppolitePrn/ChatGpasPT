import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useContext, useLayoutEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { UserType } from '../UserContext'

const HomeScreen = () => {
  const navigation = useNavigation()
  const [userId, setUserId] = useContext(UserType)

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
      headerLeft: () => <Text style={styles.headerLeft}>WhatsappRocky</Text>,
      headerRight: () => (
        <View style={styles.headerRight}>
          <Ionicons name='heart-outline' size={24} color='black' />
          <Ionicons
            name='chatbubble-ellipses-outline'
            size={24}
            color='black'
          />
        </View>
      ),
    })
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
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})
