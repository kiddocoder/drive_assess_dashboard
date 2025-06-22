"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Filter, Edit, Eye, BookOpen, Clock, Users, Award, MoreVertical, Copy } from "lucide-react"

interface Test {
  id: string
  title: string
  category: string
  difficulty: "easy" | "medium" | "hard"
  questions: number
  duration: number
  attempts: number
  passRate: number
  status: "active" | "draft" | "archived"
  createdAt: string
  lastModified: string
}

const Tests: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([
    {
      id: "1",
      title: "G1 Knowledge Test - Road Signs",
      category: "Road Signs",
      difficulty: "easy",
      questions: 25,
      duration: 30,
      attempts: 1234,
      passRate: 89.5,
      status: "active",
      createdAt: "2024-01-15",
      lastModified: "2024-01-20",
    },
    {
      id: "2",
      title: "G2 Road Test Preparation",
      category: "Practical Test",
      difficulty: "hard",
      questions: 40,
      duration: 45,
      attempts: 567,
      passRate: 76.8,
      status: "active",
      createdAt: "2024-01-10",
      lastModified: "2024-01-18",
    },
    {
      id: "3",
      title: "Defensive Driving Techniques",
      category: "Safety",
      difficulty: "medium",
      questions: 30,
      duration: 35,
      attempts: 890,
      passRate: 92.1,
      status: "draft",
      createdAt: "2024-01-08",
      lastModified: "2024-01-16",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const categories = ["all", "Road Signs", "Traffic Rules", "Safety", "Practical Test", "Parking"]
  const statuses = ["all", "active", "draft", "archived"]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-successGreen text-white"
      case "medium":
        return "bg-yellow-500 text-white"
      case "hard":
        return "bg-canadianRed text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-successGreen text-white"
      case "draft":
        return "bg-yellow-500 text-white"
      case "archived":
        return "bg-gray-400 text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  const filteredTests = tests.filter((test) => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || test.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || test.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const CreateTestModal = () => (
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
            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-charcoal mb-6">Create New Test</h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Test Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                    placeholder="Enter test title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Category</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent">
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Difficulty</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent">
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                    placeholder="30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                  placeholder="Enter test description"
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
                  Create Test
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
          <h1 className="text-3xl font-bold text-charcoal">Test Library</h1>
          <p className="text-grayText mt-1">Manage your driving assessment tests</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateModal(true)}
          className="mt-4 lg:mt-0 bg-canadianRed text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-canadianRed/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Create Test</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grayText w-5 h-5" />
            <input
              type="text"
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grayText w-5 h-5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent appearance-none"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent appearance-none"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredTests.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-charcoal text-lg mb-2">{test.title}</h3>
                  <p className="text-grayText text-sm mb-3">{test.category}</p>

                  <div className="flex items-center space-x-2 mb-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(test.difficulty)}`}
                    >
                      {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                      {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-grayText" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <BookOpen className="w-4 h-4 text-coolBlue" />
                  </div>
                  <div className="text-lg font-bold text-charcoal">{test.questions}</div>
                  <div className="text-xs text-grayText">Questions</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 text-successGreen" />
                  </div>
                  <div className="text-lg font-bold text-charcoal">{test.duration}m</div>
                  <div className="text-xs text-grayText">Duration</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-4 h-4 text-canadianRed" />
                  </div>
                  <div className="text-lg font-bold text-charcoal">{test.attempts}</div>
                  <div className="text-xs text-grayText">Attempts</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Award className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="text-lg font-bold text-charcoal">{test.passRate}%</div>
                  <div className="text-xs text-grayText">Pass Rate</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="flex-1 bg-coolBlue text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-coolBlue/90 transition-colors flex items-center justify-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button className="flex-1 bg-successGreen text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-successGreen/90 transition-colors flex items-center justify-center space-x-1">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button className="bg-gray-200 text-charcoal py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <CreateTestModal />
    </div>
  )
}

export default Tests
