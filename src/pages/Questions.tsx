"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ImageIcon,
  Video,
} from "lucide-react"
import QuestionForm from "../components/forms/QuestionModal"
import { useFetchQuestions } from "../hooks/apiFeatures/useQuestions"
import { useFetchCategories } from "../hooks/apiFeatures/useCategories"

// interface Question {
//   id: string
//   question: string
//   type: "multiple-choice" | "true-false" | "image-based"
//   category: string
//   difficulty: "easy" | "medium" | "hard"
//   options: string[]
//   correctAnswer: number
//   explanation: string
//   hasImage: boolean
//   hasVideo: boolean
//   usageCount: number
//   createdAt: string
// }

const Questions: React.FC = () => {
  const { data: questions = {} } = useFetchQuestions()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const { data: categories = [] } = useFetchCategories();

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


  const filteredQuestions = questions?.data?.filter((question: any) => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "" || question.category._id === selectedCategory
    return matchesSearch && matchesCategory
  }) || []


  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Question Bank</h1>
          <p className="text-grayText mt-1">Manage your test questions and answers</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateModal(true)}
          className="mt-4 lg:mt-0 bg-canadianRed text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-canadianRed/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Question</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grayText w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
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
              <option key="all" value="">
                All Categories
              </option>
              {categories?.data?.map((category: { _id: string, name: string }) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredQuestions.map((question: any, index: any) => {

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}
                        >
                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-charcoal rounded-full text-xs font-medium">
                          {question.category.name}
                        </span>
                        {question.hasImage && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center space-x-1">
                            <ImageIcon className="w-3 h-3" />
                            <span>Image</span>
                          </span>
                        )}
                        {question.hasVideo && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center space-x-1">
                            <Video className="w-3 h-3" />
                            <span>Video</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-semibold text-charcoal text-lg mb-3">{question.question}</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                      {question.options.map((option: any, idx: any) => (
                        <div
                          key={idx}
                          className={`p-2 rounded-lg border ${idx === question.correctAnswer
                            ? "border-successGreen bg-successGreen/10 text-successGreen"
                            : "border-gray-200 text-grayText"
                            }`}
                        >
                          <span className="text-sm font-medium">{String.fromCharCode(65 + idx)}.</span> {option}
                        </div>
                      ))}
                    </div>

                    <p className="text-sm text-grayText mb-3">{question.explanation}</p>

                    <div className="flex items-center text-sm text-grayText">
                      <span>Used in {question.usageCount} tests</span>
                      <span className="mx-2">•</span>
                      <span>Created {question.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button className="p-2 text-successGreen hover:bg-successGreen/10 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-canadianRed hover:bg-canadianRed/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <QuestionForm
        isOpened={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        question={null}
      />

    </div>
  )
}

export default Questions
