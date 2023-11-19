import { createContext, useState } from 'react'

const UserType = createContext()

const UserContext = ({ children }) => {
    const [userId, setUserId] = useState(null)
    const [authToken, setAuthToken] = useState(null)

    return (
        <UserType.Provider
            value={{ userId, setUserId, authToken, setAuthToken }}
        >
            {children}
        </UserType.Provider>
    )
}

export { UserType, UserContext }
