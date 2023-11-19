import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Contact = () => {
    const isConnect = true
    const username = 'Alexandre'
    const ppUser = username[0]

    return (
        <View style={styles.contactContainer}>
            <Text style={styles.back}>{'<'}</Text>
            <Text style={styles.ppUser}>{ppUser}</Text>
            <View>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.userState}>
                    {isConnect ? '✅Online' : '⛔Offline'}
                </Text>
            </View>
        </View>
    )
}

export default Contact

const styles = StyleSheet.create({
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        padding: 16,
        backgroundColor: '#fff',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 0 5px rgba(0,0,0,0.2)',
    },
    back: {
        fontSize: '25px',
        color: '#007AFF',
        cursor: 'pointer',
        marginRight: '10px',
    },
    ppUser: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: '#007AFF',
        color: '#efeefe',
        fontSize: '22px',
        cursor: 'pointer',
    },
    username: {
        fontWeight: 'bold',
    },
    userState: {
        fontSize: '10px',
        color: '#bbb',
    },
})
