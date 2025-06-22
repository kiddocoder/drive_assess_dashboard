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
  Eye,
  FileQuestion,
  ImageIcon,
  Video,
  CheckCircle,
  MoreVertical,
} from "lucide-react"

interface Question {
  id: string
  question: string
  type: "multiple-choice" | "true-false" | "image-based"
  category: string
  difficulty: "easy" | "medium" | "hard"
  options: string[]
  correctAnswer: number
  explanation: string
  hasImage: boolean
  hasVideo: boolean
  usageCount: number
  createdAt: string
}

const Questions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "What does a red octagonal sign mean?",
      type: "multiple-choice",
      category: "Road Signs",
      difficulty: "easy",
      options: ["Yield", "Stop", "Caution", "No Entry"],
      correctAnswer: 1,
      explanation: "A red octagonal sign always means STOP. You must come to a complete stop.",
      hasImage: true,
      hasVideo: false,
      usageCount: 1234,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      question: "When merging onto a highway, you should:",
      type: "multiple-choice",
      category: "Traffic Rules",
      difficulty: "medium",
      options: [
        "Stop and wait for a gap",
        "Match the speed of traffic",
        "Drive slowly until you find a gap",
        "Force your way into traffic",
      ],
      correctAnswer: 1,
      explanation: "When merging, you should match the speed of highway traffic to merge safely.",
      hasImage: false,
      hasVideo: true,
      usageCount: 892,
      createdAt: "2024-01-12",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)

  const categories = ["all", "Road Signs", "Traffic Rules", "Safety", "Parking", "Emergency"]
  const types = ["all", "multiple-choice", "true-false", "image-based"]

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "multiple-choice":
        return FileQuestion
      case "true-false":
        return CheckCircle
      case "image-based":
        return ImageIcon
      default:
        return FileQuestion
    }
  }

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || question.category === selectedCategory
    const matchesType = selectedType === "all" || question.type === selectedType
    return matchesSearch && matchesCategory && matchesType
  })

  const CreateQuestionModal = () => (
    <AnimatePresence>
      {showCreateModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[95vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-charcoal mb-6">Create New Question</h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  <label className="block text-sm font-medium text-charcoal mb-2">Question Type</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent">
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="true-false">True/False</option>
                    <option value="image-based">Image Based</option>
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
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Question Text</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                  placeholder="Enter your question here..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Answer Options</label>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="flex items-center space-x-3">
                      <input type="radio" name="correct-answer" className="w-4 h-4 text-coolBlue" />
                      <input
                        type="text"
                        placeholder={`Option ${num}`}
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Explanation</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                  placeholder="Explain why this is the correct answer..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Question Image (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <ImageIcon className="w-8 h-8 text-grayText mx-auto mb-2" />
                    <p className="text-sm text-grayText">Click to upload image</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Explanation Video (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Video className="w-8 h-8 text-grayText mx-auto mb-2" />
                    <p className="text-sm text-grayText">Click to upload video</p>
                  </div>
                </div>
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
                  Create Question
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
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent appearance-none"
          >
            {types.map((type) => (
              <option key={type} value={type}>
                {type === "all"
                  ? "All Types"
                  : type
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredQuestions.map((question, index) => {
            const TypeIcon = getTypeIcon(question.type)

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
                      <div className="p-2 bg-coolBlue/10 rounded-lg">
                        <TypeIcon className="w-5 h-5 text-coolBlue" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}
                        >
                          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-charcoal rounded-full text-xs font-medium">
                          {question.category}
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
                      {question.options.map((option, idx) => (
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
                    <button className="p-2 text-coolBlue hover:bg-coolBlue/10 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-successGreen hover:bg-successGreen/10 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-canadianRed hover:bg-canadianRed/10 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-grayText hover:bg-gray-100 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      <CreateQuestionModal />
    </div>
  )
}

export default Questions
