"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"
import SocketService from "../services/socket"

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const socket = useMemo(() => SocketService.getInstance(), [])
  useEffect(() => {
    const prevConnected = socket.isConnected()
    socket.connect(localStorage.getItem("jwt_token") || "kiddo")
    return () => {
      if (!prevConnected && socket.isConnected()) {
        socket.disconnect()
      }
    }
  }, [socket])

  return (
    <div className="flex h-screen bg-iceWhite overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-2 md:p-4">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout

