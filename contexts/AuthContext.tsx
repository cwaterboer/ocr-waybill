"use client"

import type React from "react"
import { createContext, useContext } from "react"
import type { User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"

type AuthContextType = {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true })

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, loading] = useAuthState(auth)

  return <AuthContext.Provider value={{ user, loading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

