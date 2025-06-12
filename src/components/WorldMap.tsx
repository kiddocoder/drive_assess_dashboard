"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Globe, Users, TrendingUp, MapPin, RefreshCw } from "lucide-react"

const WorldMap: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [viewMode, setViewMode] = useState("users")

  const worldData = {
    regions: [
      {
        name: "Canada",
        code: "CA",
        users: 45123,
        quizzes: 89456,
        revenue: 38920,
        growth: 12.5,
        flag: "🇨🇦",
        provinces: [
          { name: "Ontario", users: 18456, growth: 15.2 },
          { name: "Quebec", users: 12890, growth: 8.7 },
          { name: "British Columbia", users: 8934, growth: 18.3 },
          { name: "Alberta", users: 4843, growth: 11.2 },
        ],
      },
      {
        name: "United States",
        code: "US",
        users: 3245,
        quizzes: 5678,
        revenue: 4560,
        growth: 8.3,
        flag: "🇺🇸",
        provinces: [],
      },
      {
        name: "United Kingdom",
        code: "GB",
        users: 1567,
        quizzes: 2890,
        revenue: 2340,
        growth: 15.7,
        flag: "🇬🇧",
        provinces: [],
      },
      {
        name: "Australia",
        code: "AU",
        users: 892,
        quizzes: 1456,
        revenue: 1120,
        growth: 22.1,
        flag: "🇦🇺",
        provinces: [],
      },
      {
        name: "Germany",
        code: "DE",
        users: 567,
        quizzes: 890,
        revenue: 780,
        growth: 6.8,
        flag: "🇩🇪",
        provinces: [],
      },
    ],
    liveActivity: [
      { location: "Toronto, ON", action: "Quiz completed", time: "2 min ago", flag: "🇨🇦" },
      { location: "Vancouver, BC", action: "New user signup", time: "5 min ago", flag: "🇨🇦" },
      { location: "Montreal, QC", action: "Premium purchase", time: "8 min ago", flag: "🇨🇦" },
      { location: "London, UK", action: "Quiz completed", time: "12 min ago", flag: "🇬🇧" },
      { location: "Sydney, AU", action: "New user signup", time: "15 min ago", flag: "🇦🇺" },
    ],
  }

  const getMetricValue = (region: any, metric: string) => {
    switch (metric) {
      case "users":
        return region.users
      case "quizzes":
        return region.quizzes
      case "revenue":
        return `$${region.revenue}`
      case "growth":
        return `${region.growth}%`
      default:
        return region.users
    }
  }

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case "users":
        return "bg-cool-blue"
      case "quizzes":
        return "bg-success-green"
      case "revenue":
        return "bg-canadian-red"
      case "growth":
        return "bg-charcoal"
      default:
        return "bg-cool-blue"
    }
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
          <h1 className="text-3xl font-bold text-charcoal font-onest">Global Analytics</h1>
          <p className="text-gray-text mt-1">Monitor worldwide user activity and engagement</p>
        </div>

        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
          >
            <option value="users">Users</option>
            <option value="quizzes">Quiz Completions</option>
            <option value="revenue">Revenue</option>
            <option value="growth">Growth Rate</option>
          </select>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cool-blue text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-cool-blue/90 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Global Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-text">Total Countries</p>
              <p className="text-2xl font-bold text-charcoal mt-1">24</p>
            </div>
            <Globe className="w-8 h-8 text-cool-blue" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-text">Global Users</p>
              <p className="text-2xl font-bold text-charcoal mt-1">51,394</p>
            </div>
            <Users className="w-8 h-8 text-success-green" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-text">Active Sessions</p>
              <p className="text-2xl font-bold text-charcoal mt-1">1,247</p>
            </div>
            <TrendingUp className="w-8 h-8 text-canadian-red" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-text">Avg. Growth</p>
              <p className="text-2xl font-bold text-charcoal mt-1">13.2%</p>
            </div>
            <MapPin className="w-8 h-8 text-charcoal" />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Data */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-charcoal">Regional Performance</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-text">Viewing:</span>
              <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getMetricColor(viewMode)}`}>
                {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {worldData.regions.map((region, index) => (
              <motion.div
                key={region.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{region.flag}</div>
                  <div>
                    <h4 className="font-semibold text-charcoal">{region.name}</h4>
                    <p className="text-sm text-gray-text">{region.code}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-charcoal">{getMetricValue(region, viewMode)}</div>
                  <div className="text-sm text-success-green">+{region.growth}% growth</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Canadian Provinces Detail */}
          {selectedRegion === "CA" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <h4 className="font-semibold text-charcoal mb-4">Canadian Provinces</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {worldData.regions[0].provinces.map((province, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-charcoal">{province.name}</span>
                    <div className="text-right">
                      <div className="font-semibold text-charcoal">{province.users.toLocaleString()}</div>
                      <div className="text-sm text-success-green">+{province.growth}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Live Activity Feed */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-charcoal">Live Activity</h3>
            <div className="w-2 h-2 bg-success-green rounded-full animate-pulse"></div>
          </div>

          <div className="space-y-4">
            {worldData.liveActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg"
              >
                <div className="text-lg">{activity.flag}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-charcoal">{activity.action}</p>
                  <p className="text-xs text-gray-text">{activity.location}</p>
                  <p className="text-xs text-gray-text">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-4 py-2 text-sm text-cool-blue hover:text-cool-blue/80 font-medium transition-colors"
          >
            View All Activity
          </motion.button>
        </motion.div>
      </div>

      {/* World Map Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-charcoal mb-6">Interactive World Map</h3>
        <div className="h-96 bg-gradient-to-br from-cool-blue/10 to-success-green/10 rounded-lg flex items-center justify-center relative overflow-hidden">
          {/* Simplified world map representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-20">🗺️</div>
          </div>

          {/* Data points */}
          <div className="absolute top-1/4 left-1/3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-4 h-4 bg-canadian-red rounded-full shadow-lg cursor-pointer"
              title="Canada - 45,123 users"
            />
          </div>

          <div className="absolute top-1/3 left-1/4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
              className="w-3 h-3 bg-cool-blue rounded-full shadow-lg cursor-pointer"
              title="USA - 3,245 users"
            />
          </div>

          <div className="absolute top-1/4 right-1/3">
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              className="w-2 h-2 bg-success-green rounded-full shadow-lg cursor-pointer"
              title="UK - 1,567 users"
            />
          </div>

          <div className="absolute bottom-1/4 right-1/4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY }}
              className="w-2 h-2 bg-charcoal rounded-full shadow-lg cursor-pointer"
              title="Australia - 892 users"
            />
          </div>

          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
            <div className="text-xs text-gray-text mb-2">Legend</div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-canadian-red rounded-full"></div>
                <span>High Activity</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-cool-blue rounded-full"></div>
                <span>Medium Activity</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success-green rounded-full"></div>
                <span>Low Activity</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default WorldMap
