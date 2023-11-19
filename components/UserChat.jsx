import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const UserChat = ({user}) => {
  return (
    <Pressable style={styles.container}>
      <View>
        <Image
          style={styles.profilePicture}
          source={{
            uri: user?.profile_picture
              ? user.profile_picture
              : 'https://robohash.org/mail@ashallendesign.co.uk',
          }}
        />
      </View>
      <View style={styles.userInfos}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.lastMessage}>last message !!!</Text>
      </View>
    </Pressable>
  )
}

export default UserChat

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderBottomWidth: 0.5,
        padding: 10
    },
    profilePicture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        resizeMode: 'cover',
    },
    username: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    lastMessage: {
        fontSize: 14,
        color: 'gray',
        marginTop: 5
    }
})