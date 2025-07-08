"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Mail,
  Phone,
  MapPin,
  Award,
  Calendar,
  BookOpen,
  TrendingUp,
  MoreVertical,
  Download,
  Upload,
} from "lucide-react"
import { useFetchAllStudents } from "../hooks/apiFeatures/useUsers"
import UserForm from "../components/forms/UserForm"

interface Student {
  id: string
  name: string
  email: string
  phone: string
  location: string
  joinDate: string
  lastActive: string
  subscription: "free" | "3-day" | "4-day" | "premium"
  testsCompleted: number
  averageScore: number
  totalSpent: number
  status: "active" | "inactive" | "suspended"
  progress: {
    roadSigns: number
    trafficRules: number
    safety: number
    parking: number
  }
}

const Students: React.FC = () => {

  const { data: students = {} } = useFetchAllStudents()

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [subscriptionFilter, setSubscriptionFilter] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-successGreen text-white"
      case "inactive":
        return "bg-yellow-500 text-white"
      case "suspended":
        return "bg-canadianRed text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case "premium":
        return "bg-canadianRed text-white"
      case "4-day":
        return "bg-coolBlue text-white"
      case "3-day":
        return "bg-successGreen text-white"
      case "free":
        return "bg-gray-400 text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  const filteredStudents = students?.data?.filter((student: any) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || student.status === statusFilter
    const matchesSubscription = subscriptionFilter === "all" || student.subscription === subscriptionFilter
    return matchesSearch && matchesStatus && matchesSubscription
  }) || [];

  const StudentDetailModal = () => (
    <AnimatePresence>
      {selectedStudent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedStudent(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-charcoal">Student Details</h3>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Student Info */}
              <div className="lg:col-span-1 space-y-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-coolBlue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {selectedStudent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h4 className="text-xl font-bold text-charcoal">{selectedStudent.name}</h4>
                  <p className="text-grayText">{selectedStudent.email}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-grayText" />
                    <span className="text-sm">{selectedStudent.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-grayText" />
                    <span className="text-sm">{selectedStudent.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-grayText" />
                    <span className="text-sm">Joined {selectedStudent.joinDate}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-grayText">Status</span>
                    {/* <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedStudent.status)}`}
                    >
                      {selectedStudent.status.charAt(0).toUpperCase() + selectedStudent.status.slice(1)}
                    </span> */}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-grayText">Subscription</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionColor(selectedStudent.subscription)}`}
                    >
                      {selectedStudent.subscription === "free"
                        ? "Free"
                        : selectedStudent.subscription === "3-day"
                          ? "3-Day"
                          : selectedStudent.subscription === "4-day"
                            ? "4-Day"
                            : "Premium"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats & Progress */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-coolBlue/10 rounded-lg p-4 text-center">
                    <BookOpen className="w-6 h-6 text-coolBlue mx-auto mb-2" />
                    <div className="text-2xl font-bold text-charcoal">{selectedStudent.testsCompleted}</div>
                    <div className="text-sm text-grayText">Tests Completed</div>
                  </div>
                  <div className="bg-successGreen/10 rounded-lg p-4 text-center">
                    <Award className="w-6 h-6 text-successGreen mx-auto mb-2" />
                    <div className="text-2xl font-bold text-charcoal">{selectedStudent.averageScore}%</div>
                    <div className="text-sm text-grayText">Average Score</div>
                  </div>
                  <div className="bg-canadianRed/10 rounded-lg p-4 text-center">
                    <TrendingUp className="w-6 h-6 text-canadianRed mx-auto mb-2" />
                    <div className="text-2xl font-bold text-charcoal">${selectedStudent.totalSpent}</div>
                    <div className="text-sm text-grayText">Total Spent</div>
                  </div>
                  <div className="bg-yellow-500/10 rounded-lg p-4 text-center">
                    <Calendar className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <div className="text-sm font-bold text-charcoal">{selectedStudent.lastActive}</div>
                    <div className="text-sm text-grayText">Last Active</div>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-bold text-charcoal mb-4">Learning Progress</h5>
                  <div className="space-y-4">
                    {Object.entries(selectedStudent.progress).map(([category, progress]) => (
                      <div key={category}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-charcoal capitalize">
                            {category.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <span className="text-sm text-grayText">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-coolBlue h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
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
          <h1 className="text-3xl font-bold text-charcoal">Test Takers</h1>
          <p className="text-grayText mt-1">Manage student accounts and track their progress</p>
        </div>

        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="bg-gray-200 text-charcoal px-4 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-300 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button className="bg-gray-200 text-charcoal px-4 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-300 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowAddModal(true)}
            className="bg-canadianRed text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-canadianRed/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Student</span>
          </motion.button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grayText w-5 h-5" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grayText w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent appearance-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          <select
            value={subscriptionFilter}
            onChange={(e) => setSubscriptionFilter(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent appearance-none"
          >
            <option value="all">All Subscriptions</option>
            <option value="free">Free</option>
            <option value="3-day">3-Day Access</option>
            <option value="4-day">4-Day Access</option>
            <option value="premium">Premium Guide</option>
          </select>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredStudents.map((student: any, index: any) => (
            <motion.div
              key={student.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-coolBlue rounded-full flex items-center justify-center text-white font-bold">
                    {student.name
                      .split(" ")
                      .map((n: any) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal">{student.name}</h3>
                    <p className="text-sm text-grayText">{student.email}</p>
                  </div>
                </div>

                <div className="relative">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-grayText" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2 text-sm text-grayText">
                  <Phone className="w-4 h-4" />
                  <span>{student.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-grayText">
                  <MapPin className="w-4 h-4" />
                  <span>{student.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  {/* <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </span> */}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionColor(student.subscription)}`}
                  >
                    {student.subscription === "free"
                      ? "Free"
                      : student.subscription === "3-day"
                        ? "3-Day"
                        : student.subscription === "4-day"
                          ? "4-Day"
                          : "Premium"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-charcoal">{student.testsCompleted}</div>
                  <div className="text-xs text-grayText">Tests</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-charcoal">{student.averageScore}%</div>
                  <div className="text-xs text-grayText">Avg Score</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-charcoal">${student.totalSpent}</div>
                  <div className="text-xs text-grayText">Spent</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedStudent(student)}
                  className="flex-1 bg-coolBlue text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-coolBlue/90 transition-colors flex items-center justify-center space-x-1"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button className="flex-1 bg-successGreen text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-successGreen/90 transition-colors flex items-center justify-center space-x-1">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button className="bg-gray-200 text-charcoal py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <StudentDetailModal />
      <UserForm
        isOpen={showAddModal}
        action="Student"
        onClose={() => setShowAddModal(false)}
        user={null}
      />
    </div>
  )
}

export default Students
