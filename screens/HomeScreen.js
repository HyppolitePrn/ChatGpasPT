import { StyleSheet, Text, View, Button } from 'react-native'
import React, { useLayoutEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from "@react-navigation/native"

const HomeScreen = () => {
  const navigation = useNavigation()

  const removeAuthToken = async () => {
    try {
      console.log("removeAuthToken")
      await AsyncStorage.removeItem('authToken')

      navigation.replace("Login")

    } catch (error) {
      console.log(error)
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={styles.headerLeft}>WhatsappRocky</Text>
      ),
    })

  }, []);

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
    fontWeight: "bold"
  }
})