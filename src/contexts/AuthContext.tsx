"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { API } from "../config/axios"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "instructor" | "student"
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (identifier: any, password: string) => Promise<boolean>
  formError: string | null,
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])


  const login = async (identifier: any, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await API.post('/auth/login', { identifier, password });
      setUser(response.data.user);
      localStorage.setItem('user', JSON.stringify(response.data.user))
      localStorage.setItem('accessToken', JSON.stringify(response.data.token))
      return true;
    } catch (error: any) {
      setFormError(error?.response?.data?.message || error?.response?.data?.errors[0]?.message);
    } finally {
      setIsLoading(false);
    }
    setFormError(null);
    return false;
  };

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    localStorage.removeItem('accessToken')
  }

  return <AuthContext.Provider value={{ user, login, formError, logout, isLoading }}>{children}</AuthContext.Provider>
}
