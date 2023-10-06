import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import ChatScreen from './pages/ChatScreen'

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <ChatScreen />
    </View>
  )
}


