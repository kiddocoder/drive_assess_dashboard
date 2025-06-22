"use client"

import type React from "react"
import { motion } from "framer-motion"
import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative"
  icon: LucideIcon
  color: string
  index: number
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, changeType, icon: Icon, color, index }) => {
  const colorClasses = {
    "cool-blue": "bg-cool-blue",
    "success-green": "bg-success-green",
    "canadian-red": "bg-canadian-red",
    charcoal: "bg-charcoal",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-text uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold text-charcoal mt-2 font-nunito">{value}</p>

          <div className="flex items-center mt-3">
            {changeType === "positive" ? (
              <TrendingUp className="w-4 h-4 text-success-green mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-canadian-red mr-1" />
            )}
            <span
              className={`text-sm font-medium ${
                changeType === "positive" ? "text-success-green" : "text-canadian-red"
              }`}
            >
              {change}
            </span>
            <span className="text-sm text-gray-text ml-1">vs last month</span>
          </div>
        </div>

        <div
          className={`w-12 h-12 rounded-lg ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  )
}

export default StatsCard
