"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Calendar, Clock, Users, MapPin, Edit, Trash2, Eye, Filter } from "lucide-react"

interface Schedule {
  id: string
  title: string
  testType: string
  date: string
  time: string
  duration: number
  location: string
  instructor: string
  maxStudents: number
  enrolledStudents: number
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  description: string
}

const Schedules: React.FC = () => {
  const [schedules] = useState<Schedule[]>([
    {
      id: "1",
      title: "G1 Knowledge Test Session",
      testType: "G1 Knowledge",
      date: "2024-01-25",
      time: "09:00",
      duration: 60,
      location: "Toronto Testing Center",
      instructor: "Sarah Johnson",
      maxStudents: 30,
      enrolledStudents: 25,
      status: "scheduled",
      description: "Morning session for G1 knowledge test preparation",
    },
    {
      id: "2",
      title: "G2 Road Test Practice",
      testType: "G2 Road Test",
      date: "2024-01-25",
      time: "14:00",
      duration: 90,
      location: "Vancouver Driving School",
      instructor: "Mike Chen",
      maxStudents: 15,
      enrolledStudents: 12,
      status: "scheduled",
      description: "Afternoon practical driving test session",
    },
    {
      id: "3",
      title: "Defensive Driving Workshop",
      testType: "Defensive Driving",
      date: "2024-01-24",
      time: "10:00",
      duration: 120,
      location: "Calgary Training Center",
      instructor: "Emma Wilson",
      maxStudents: 20,
      enrolledStudents: 18,
      status: "in-progress",
      description: "Advanced defensive driving techniques workshop",
    },
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-coolBlue text-white"
      case "in-progress":
        return "bg-yellow-500 text-white"
      case "completed":
        return "bg-successGreen text-white"
      case "cancelled":
        return "bg-canadianRed text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  const filteredSchedules = schedules.filter(
    (schedule) => selectedStatus === "all" || schedule.status === selectedStatus,
  )

  const CreateScheduleModal = () => (
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
            className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-charcoal mb-6">Schedule New Test Session</h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Session Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                    placeholder="Enter session title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Test Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent">
                    <option value="G1 Knowledge">G1 Knowledge Test</option>
                    <option value="G2 Road Test">G2 Road Test</option>
                    <option value="Defensive Driving">Defensive Driving</option>
                    <option value="Motorcycle Test">Motorcycle Test</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Time</label>
                  <input
                    type="time"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                    placeholder="60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Max Students</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                    placeholder="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                    placeholder="Enter location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Instructor</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent">
                    <option value="">Select Instructor</option>
                    <option value="Sarah Johnson">Sarah Johnson</option>
                    <option value="Mike Chen">Mike Chen</option>
                    <option value="Emma Wilson">Emma Wilson</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Description</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                  placeholder="Enter session description"
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
                  Schedule Session
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
          <h1 className="text-3xl font-bold text-charcoal">Test Scheduling</h1>
          <p className="text-grayText mt-1">Schedule and manage test sessions</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateModal(true)}
          className="mt-4 lg:mt-0 bg-canadianRed text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-canadianRed/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Schedule Session</span>
        </motion.button>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-grayText" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Schedules List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredSchedules.map((schedule, index) => (
            <motion.div
              key={schedule.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-bold text-charcoal">{schedule.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(schedule.status)}`}>
                      {schedule.status.charAt(0).toUpperCase() + schedule.status.slice(1)}
                    </span>
                  </div>

                  <p className="text-grayText mb-4">{schedule.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-coolBlue" />
                      <span className="text-sm text-charcoal">{schedule.date}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-successGreen" />
                      <span className="text-sm text-charcoal">
                        {schedule.time} ({schedule.duration}m)
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-canadianRed" />
                      <span className="text-sm text-charcoal">{schedule.location}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-charcoal">
                        {schedule.enrolledStudents}/{schedule.maxStudents} students
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-grayText">
                      <span className="font-medium">Instructor:</span> {schedule.instructor}
                    </div>

                    <div className="w-48 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-coolBlue h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${(schedule.enrolledStudents / schedule.maxStudents) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-coolBlue hover:bg-coolBlue/10 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-successGreen hover:bg-successGreen/10 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-canadianRed hover:bg-canadianRed/10 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <CreateScheduleModal />
    </div>
  )
}

export default Schedules
