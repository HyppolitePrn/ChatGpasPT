import { createContext, useState } from 'react'

const UserType = createContext()

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null)

  return (
    <UserType.Provider value={[user, setUser]}>{children}</UserType.Provider>
  )
}

export { UserType, UserContext }
