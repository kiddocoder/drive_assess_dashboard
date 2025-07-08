"use client"

import type React from "react"
import { useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import Sidebar from "./Sidebar"

const AppLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-iceWhite overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} expand={() => setSidebarOpen(true)} />
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

