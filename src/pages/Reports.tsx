"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, Download, FileText, Plus, Eye } from "lucide-react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface Report {
  id: string
  name: string
  type: "performance" | "usage" | "financial" | "custom"
  description: string
  lastGenerated: string
  frequency: "daily" | "weekly" | "monthly" | "custom"
  status: "active" | "inactive"
  recipients: string[]
}

const Reports: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([
    {
      id: "1",
      name: "Weekly Performance Summary",
      type: "performance",
      description: "Student performance metrics and test completion rates",
      lastGenerated: "2024-01-20",
      frequency: "weekly",
      status: "active",
      recipients: ["admin@driveready.ca", "manager@driveready.ca"],
    },
    {
      id: "2",
      name: "Monthly Revenue Report",
      type: "financial",
      description: "Revenue breakdown by subscription type and region",
      lastGenerated: "2024-01-15",
      frequency: "monthly",
      status: "active",
      recipients: ["finance@driveready.ca"],
    },
    {
      id: "3",
      name: "User Engagement Analytics",
      type: "usage",
      description: "Platform usage statistics and user behavior analysis",
      lastGenerated: "2024-01-18",
      frequency: "weekly",
      status: "active",
      recipients: ["analytics@driveready.ca"],
    },
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedDateRange, setSelectedDateRange] = useState("7d")

  // Sample data for charts
  const performanceData = [
    { name: "Mon", tests: 45, passed: 38, failed: 7 },
    { name: "Tue", tests: 52, passed: 44, failed: 8 },
    { name: "Wed", tests: 48, passed: 41, failed: 7 },
    { name: "Thu", tests: 61, passed: 52, failed: 9 },
    { name: "Fri", tests: 59, passed: 48, failed: 11 },
    { name: "Sat", tests: 72, passed: 61, failed: 11 },
    { name: "Sun", tests: 65, passed: 55, failed: 10 },
  ]

  const testTypeData = [
    { name: "G1 Knowledge", value: 45, color: "#D32F2F" },
    { name: "G2 Road Test", value: 30, color: "#1976D2" },
    { name: "Defensive Driving", value: 15, color: "#43A047" },
    { name: "Motorcycle", value: 10, color: "#FF9800" },
  ]

  const revenueData = [
    { month: "Oct", revenue: 12500, subscriptions: 245 },
    { month: "Nov", revenue: 15200, subscriptions: 298 },
    { month: "Dec", revenue: 18900, subscriptions: 356 },
    { month: "Jan", revenue: 22100, subscriptions: 412 },
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case "performance":
        return "bg-coolBlue text-white"
      case "usage":
        return "bg-successGreen text-white"
      case "financial":
        return "bg-canadianRed text-white"
      case "custom":
        return "bg-yellow-500 text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  const CreateReportModal = () => (
    <AnimatePresence>
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-charcoal mb-6">Create Custom Report</h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Report Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                    placeholder="Enter report name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Report Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent">
                    <option value="performance">Performance</option>
                    <option value="usage">Usage Analytics</option>
                    <option value="financial">Financial</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Frequency</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Format</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent">
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                  placeholder="Describe what this report includes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Email Recipients</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                  placeholder="email1@example.com, email2@example.com"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 border border-gray-300 text-charcoal rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-canadianRed text-white rounded-lg hover:bg-canadianRed/90 transition-colors"
                >
                  Create Report
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Custom Reports</h1>
          <p className="text-grayText mt-1">Generate and schedule automated reports</p>
        </div>

        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowCreateModal(true)}
            className="bg-canadianRed text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-canadianRed/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create Report</span>
          </motion.button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-charcoal mb-4">Test Performance Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="name" stroke="#616161" />
                <YAxis stroke="#616161" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderColor: "#1976D2",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="passed" fill="#43A047" name="Passed" />
                <Bar dataKey="failed" fill="#D32F2F" name="Failed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Test Type Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-xl font-bold text-charcoal mb-4">Test Type Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={testTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {testTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revenue Trends */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-charcoal mb-4">Revenue & Subscription Trends</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="month" stroke="#616161" />
              <YAxis yAxisId="left" stroke="#616161" />
              <YAxis yAxisId="right" orientation="right" stroke="#616161" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderColor: "#1976D2",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#D32F2F"
                strokeWidth={3}
                name="Revenue ($)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="subscriptions"
                stroke="#1976D2"
                strokeWidth={3}
                name="Subscriptions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-charcoal mb-6">Scheduled Reports</h3>

        <div className="space-y-4">
          {reports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-coolBlue/10 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-coolBlue" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-charcoal">{report.name}</h4>
                    <p className="text-sm text-grayText">{report.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-grayText">
                      <span className={`px-2 py-1 rounded-full ${getTypeColor(report.type)}`}>
                        {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                      </span>
                      <span>Last generated: {report.lastGenerated}</span>
                      <span>Frequency: {report.frequency}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-coolBlue hover:bg-coolBlue/10 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-successGreen hover:bg-successGreen/10 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-canadianRed hover:bg-canadianRed/10 rounded-lg transition-colors">
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <CreateReportModal />
    </div>
  )
}

export default Reports
