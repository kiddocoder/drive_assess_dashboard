"use client"

import type React from "react"
import { useState } from "react"
import { Bell, Car, Menu, Search, LogOut, User } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import SearchPopup from "../components/forms/SearchPopup"

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [isSearchPopup, setIsSearchPopup] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useAuth()

  const handleSearchPopup = () => {
    setIsSearchPopup(true)
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  return (
    <>
      <header className="bg-white shadow-sm z-10 border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3 md:px-6">
          {/* Left side - Mobile menu button and title */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg text-grayText hover:bg-gray-100 lg:hidden transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center">
              <div className="w-8 h-8 bg-canadianRed rounded-lg flex items-center justify-center mr-2">
                <Car className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-charcoal hidden sm:block">DriveReady</h1>
            </div>
          </div>

          {/* Right side - Search and user controls */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-grayText" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                onFocus={handleSearchPopup}
                className="block cursor-pointer w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-1 focus:ring-coolBlue focus:border-coolBlue sm:text-sm transition-all"
              />
            </div>

            <button
              onClick={handleSearchPopup}
              className="p-2 lg:hidden rounded-full hover:bg-gray-100 relative transition-colors"
            >
              <Search className="w-5 h-5 text-grayText" />
            </button>

            <button className="p-2 rounded-full hover:bg-gray-100 relative transition-colors">
              <Bell className="w-5 h-5 text-grayText" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-canadianRed rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-coolBlue rounded-full flex items-center justify-center text-white font-medium">
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "AD"}
                </div>
                <span className="hidden md:inline text-sm font-medium text-charcoal">{user?.name || "Admin User"}</span>
              </button>

              {/* User Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-charcoal">{user?.name}</p>
                    <p className="text-xs text-grayText">{user?.email}</p>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-charcoal hover:bg-gray-100 transition-colors flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-canadianRed hover:bg-gray-100 transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <SearchPopup isOpened={isSearchPopup} onClose={() => setIsSearchPopup(false)} />
    </>
  )
}

export default Header
