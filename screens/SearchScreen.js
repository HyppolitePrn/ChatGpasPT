import React, { useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import useFetch from '../hooks/useFetch'
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserCard from '../components/UserCard'

const SearchScreen = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  // const [token, setToken] = useState('')

  // const options = useMemo(
  //     () => ({
  //         headers: {
  //             Authorization: `Bearer ${token}`,
  //         },
  //     }),
  //     [token]
  // )

  // const { data, error, isLoading } = useFetch('/users', options)

  const searchUsers = term => {
    return users?.filter(user =>
      user.username.toLowerCase().includes(term.toLowerCase())
    )
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        const token = await AsyncStorage.getItem('authToken')

        const response = await fetch(`${process.env.API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        setUsers(data.users)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (isLoading) {
    return <ActivityIndicator size='large' color='#000000' />
  }

  return (
    <View style={styles.PageContainer}>
      <SearchBar
        platform={Platform.OS}
        placeholder='Type here...'
        onChangeText={setSearchTerm}
        value={searchTerm}
        containerStyle={{ backgroundColor: 'transparent' }}
      />
      <View>
        {searchUsers(searchTerm)?.map((user, index) => (
          <UserCard user={user} key={index} />
        ))}
      </View>
    </View>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  PageContainer: {
    flex: 1,
    marginTop: 48,
  },
})