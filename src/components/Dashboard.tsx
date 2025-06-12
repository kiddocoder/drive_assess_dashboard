"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Users, FileQuestion, DollarSign, Globe, Clock, Award, AlertCircle } from "lucide-react"
import StatsCard from "./StatsCard"
import RecentActivity from "./RecentActivity"
import QuickActions from "./QuickActions"

const Dashboard: React.FC = () => {
  const stats = [
    {
      title: "Total Users",
      value: "50,247",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: Users,
      color: "cool-blue",
    },
    {
      title: "Active Quizzes",
      value: "1,234",
      change: "+8.2%",
      changeType: "positive" as const,
      icon: FileQuestion,
      color: "success-green",
    },
    {
      title: "Revenue (CAD)",
      value: "$45,892",
      change: "+15.3%",
      changeType: "positive" as const,
      icon: DollarSign,
      color: "canadian-red",
    },
    {
      title: "Pass Rate",
      value: "98.2%",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: Award,
      color: "success-green",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "user_signup",
      message: "New user registered from Toronto, ON",
      timestamp: "2 minutes ago",
      icon: Users,
    },
    {
      id: 2,
      type: "quiz_completed",
      message: 'Quiz "Road Signs Advanced" completed by Maria R.',
      timestamp: "5 minutes ago",
      icon: FileQuestion,
    },
    {
      id: 3,
      type: "payment",
      message: "Premium Guide purchased - $45 CAD",
      timestamp: "12 minutes ago",
      icon: DollarSign,
    },
    {
      id: 4,
      type: "system",
      message: "System backup completed successfully",
      timestamp: "1 hour ago",
      icon: AlertCircle,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-charcoal font-onest">Dashboard Overview</h1>
          <p className="text-gray-text mt-1">Welcome back! Here's what's happening with your platform.</p>
        </div>

        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <div className="flex items-center space-x-2 text-sm text-gray-text">
            <Clock className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-success-green">
            <div className="w-2 h-2 bg-success-green rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} index={index} />
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <RecentActivity activities={recentActivities} />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <QuickActions />
        </motion.div>
      </div>

      {/* World Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-charcoal">Global Activity</h3>
          <Globe className="w-6 h-6 text-cool-blue" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-charcoal">🇨🇦</div>
            <div className="text-lg font-semibold text-charcoal mt-2">45,123</div>
            <div className="text-sm text-gray-text">Canadian Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-charcoal">🌍</div>
            <div className="text-lg font-semibold text-charcoal mt-2">5,124</div>
            <div className="text-sm text-gray-text">International Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-charcoal">📱</div>
            <div className="text-lg font-semibold text-charcoal mt-2">78%</div>
            <div className="text-sm text-gray-text">Mobile Usage</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
