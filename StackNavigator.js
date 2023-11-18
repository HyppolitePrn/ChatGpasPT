import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import HomeScreen from './screens/HomeScreen'
import SearchScreen from './screens/SearchScreen'
import NotificationsScreen from './screens/NotificationsScreen'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName

          if (route.name === 'Feed') {
            iconName = focused ? 'home' : 'home-outline'
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline'
          }

          return <Ionicons name={iconName} size={size} color='black' />
        },
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen name='Feed' component={HomeScreen} />
      <Tab.Screen
        name='Search'
        component={SearchScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  )
}

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle='dark-content' />
      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='Notifications' component={NotificationsScreen} />
        <Stack.Screen
          name='Home'
          component={HomeTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator
