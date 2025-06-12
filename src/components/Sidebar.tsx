"use client"

import type React from "react"
import { motion } from "framer-motion"
import { LayoutDashboard, FileQuestion, BarChart3, Globe, Users, Settings, Menu, X, Car } from "lucide-react"

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "quizzes", label: "Quiz Manager", icon: FileQuestion },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "worldmap", label: "World Map", icon: Globe },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />
      )}

      <motion.div
        initial={false}
        animate={{
          width: isOpen ? 256 : 64,
          x: 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed left-0 top-0 h-full bg-charcoal text-ice-white z-50 shadow-xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <motion.div
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center space-x-3"
          >
            <div className="w-8 h-8 bg-canadian-red rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            {isOpen && (
              <div>
                <h1 className="font-bold text-lg">Driving Assessment</h1>
                <p className="text-xs text-gray-400">Admin Dashboard</p>
              </div>
            )}
          </motion.div>

          <button onClick={() => setIsOpen(!isOpen)} className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg mb-2 transition-all duration-200 ${isActive ? "bg-canadian-red text-white shadow-lg" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <motion.span
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className={`font-medium ${!isOpen && "hidden"}`}
                >
                  {item.label}
                </motion.span>
              </motion.button>
            )
          })}
        </nav>

        {/* Footer */}
        <motion.div
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-4 left-4 right-4"
        >
          {isOpen && (
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-400 mb-1">Version 2.1.0</p>
              <p className="text-xs text-success-green">System Online</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  )
}

export default Sidebar
