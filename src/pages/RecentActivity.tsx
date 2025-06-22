"use client"

import type React from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface Activity {
  id: number
  type: string
  message: string
  timestamp: string
  icon: LucideIcon
}

interface RecentActivityProps {
  activities: Activity[]
}

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  const getActivityColor = (type: string) => {
    switch (type) {
      case "user_signup":
        return "bg-cool-blue"
      case "quiz_completed":
        return "bg-success-green"
      case "payment":
        return "bg-canadian-red"
      case "system":
        return "bg-charcoal"
      default:
        return "bg-gray-400"
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-charcoal mb-6">Recent Activity</h3>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-full ${getActivityColor(activity.type)} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className="w-5 h-5 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-charcoal">{activity.message}</p>
                <p className="text-xs text-gray-text mt-1">{activity.timestamp}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full mt-4 py-2 text-sm text-cool-blue hover:text-cool-blue/80 font-medium transition-colors"
      >
        View All Activity
      </motion.button>
    </div>
  )
}

export default RecentActivity
