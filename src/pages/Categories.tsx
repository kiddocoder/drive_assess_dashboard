"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Edit, Trash2, Eye, Briefcase, BookOpen, Users, Award, MoreVertical } from "lucide-react"
import { useFetchCategories } from "../hooks/apiFeatures/useCategories"
interface Category {
  id: string
  name: string
  description: string
  icon: string
  color: string
  testsCount: number
  questionsCount: number
  studentsEnrolled: number
  averageScore: number
  status: "active" | "inactive"
  createdAt: string
}

const Categories: React.FC = () => {

  const { data: categories = {}, isLoading } = useFetchCategories()

  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  const filteredCategories = categories?.data?.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  ) || []

  const CreateCategoryModal = () => (
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
            <h3 className="text-2xl font-bold text-charcoal mb-6">Create New Category</h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Category Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                    placeholder="Enter category name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Icon Emoji</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                    placeholder="🚗"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Color Theme</label>
                  <input
                    type="color"
                    className="w-full px-4 h-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Status</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                  placeholder="Enter category description"
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
                  Create Category
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
          <h1 className="text-3xl font-bold text-charcoal">Test Categories</h1>
          <p className="text-grayText mt-1">Organize your tests into meaningful categories</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateModal(true)}
          className="mt-4 lg:mt-0 bg-canadianRed text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-canadianRed/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Category</span>
        </motion.button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grayText w-5 h-5" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}>
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal text-lg">{category.name}</h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${category.isActive ? "bg-successGreen text-white" : "bg-gray-400 text-white"
                        }`}
                    >
                      {category.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4 text-grayText" />
                </button>
              </div>

              <p className="text-grayText text-sm mb-4">{category.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <BookOpen className="w-4 h-4 text-coolBlue" />
                  </div>
                  <div className="text-lg font-bold text-charcoal">{category.testsCount || 0}</div>
                  <div className="text-xs text-grayText">Tests</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Briefcase className="w-4 h-4 text-successGreen" />
                  </div>
                  <div className="text-lg font-bold text-charcoal">{category.questionsCount || 0}</div>
                  <div className="text-xs text-grayText">Questions</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-4 h-4 text-canadianRed" />
                  </div>
                  <div className="text-lg font-bold text-charcoal">{category.studentsEnrolled || 0}</div>
                  <div className="text-xs text-grayText">Students</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Award className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="text-lg font-bold text-charcoal">{category.averageScore || 0}%</div>
                  <div className="text-xs text-grayText">Avg Score</div>
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
                <button className="bg-canadianRed text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-canadianRed/90 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <CreateCategoryModal />
    </div>
  )
}

export default Categories
