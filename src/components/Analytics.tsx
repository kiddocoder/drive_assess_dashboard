"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { TrendingUp, Users, FileQuestion, DollarSign, Download } from "lucide-react"

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState("7d")

  const analyticsData = {
    overview: {
      totalRevenue: 45892,
      totalUsers: 50247,
      quizCompletions: 12456,
      averageScore: 87.3,
    },
    chartData: [
      { date: "2024-01-01", users: 120, revenue: 1560, quizzes: 89 },
      { date: "2024-01-02", users: 145, revenue: 1890, quizzes: 102 },
      { date: "2024-01-03", users: 132, revenue: 1720, quizzes: 95 },
      { date: "2024-01-04", users: 167, revenue: 2170, quizzes: 118 },
      { date: "2024-01-05", users: 189, revenue: 2460, quizzes: 134 },
      { date: "2024-01-06", users: 156, revenue: 2030, quizzes: 112 },
      { date: "2024-01-07", users: 178, revenue: 2320, quizzes: 126 },
    ],
    topQuizzes: [
      { name: "Road Signs Basic", completions: 2456, passRate: 94.5 },
      { name: "Traffic Rules Advanced", completions: 1890, passRate: 87.2 },
      { name: "Parking & Positioning", completions: 1567, passRate: 91.8 },
      { name: "Emergency Procedures", completions: 1234, passRate: 96.1 },
    ],
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-charcoal font-onest">Analytics Dashboard</h1>
          <p className="text-gray-text mt-1">Track performance and user engagement metrics</p>
        </div>

        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cool-blue text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-cool-blue/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-text">Total Revenue</p>
              <p className="text-2xl font-bold text-charcoal mt-1">
                ${analyticsData.overview.totalRevenue.toLocaleString()}
              </p>
              <p className="text-sm text-success-green mt-1">+15.3% from last month</p>
            </div>
            <div className="w-12 h-12 bg-canadian-red rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-text">Total Users</p>
              <p className="text-2xl font-bold text-charcoal mt-1">
                {analyticsData.overview.totalUsers.toLocaleString()}
              </p>
              <p className="text-sm text-success-green mt-1">+12.5% from last month</p>
            </div>
            <div className="w-12 h-12 bg-cool-blue rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-text">Quiz Completions</p>
              <p className="text-2xl font-bold text-charcoal mt-1">
                {analyticsData.overview.quizCompletions.toLocaleString()}
              </p>
              <p className="text-sm text-success-green mt-1">+8.7% from last month</p>
            </div>
            <div className="w-12 h-12 bg-success-green rounded-lg flex items-center justify-center">
              <FileQuestion className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-text">Average Score</p>
              <p className="text-2xl font-bold text-charcoal mt-1">{analyticsData.overview.averageScore}%</p>
              <p className="text-sm text-success-green mt-1">+2.1% from last month</p>
            </div>
            <div className="w-12 h-12 bg-charcoal rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-charcoal mb-6">Revenue Trend</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.chartData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.revenue / 2500) * 100}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="w-full bg-canadian-red rounded-t-lg min-h-[20px]"
                />
                <span className="text-xs text-gray-text mt-2">{new Date(data.date).getDate()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-charcoal mb-6">User Growth</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.chartData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.users / 200) * 100}%` }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  className="w-full bg-cool-blue rounded-t-lg min-h-[20px]"
                />
                <span className="text-xs text-gray-text mt-2">{new Date(data.date).getDate()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Performing Quizzes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-charcoal mb-6">Top Performing Quizzes</h3>
        <div className="space-y-4">
          {analyticsData.topQuizzes.map((quiz, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-charcoal">{quiz.name}</h4>
                <p className="text-sm text-gray-text">{quiz.completions} completions</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-charcoal">{quiz.passRate}%</div>
                <div className="text-sm text-gray-text">Pass Rate</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Analytics
