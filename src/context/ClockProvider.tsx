import { User } from "@/types/user.type"
import React, { Dispatch, SetStateAction, createContext, useEffect, useState } from "react"

type ClockInAndClockOutProviderProps = {
    children: React.ReactNode
}

    
type ClockContextType = {
  user: User | null
  setUser: Dispatch<SetStateAction<User>> | null
}


export const ClockContext = createContext<ClockContextType>({user: null, setUser: null});

const ClockProvider = ({children}: ClockInAndClockOutProviderProps) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : {})
  }, [])
  
  return (
    <ClockContext.Provider value={{user, setUser}}>
        {children}
    </ClockContext.Provider>
  )
}

export default ClockProvider