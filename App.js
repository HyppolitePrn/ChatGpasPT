import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import ChatScreen from './screens/ChatScreen'
import StackNavigator from './StackNavigator'

export default function App() {
  return (
    <>
      <StackNavigator />
    </>
  )
}


