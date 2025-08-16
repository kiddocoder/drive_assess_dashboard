"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  Download,
  Eye,
  Award,
  Clock,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  BarChart3,
} from "lucide-react"

interface TestResult {
  id: string
  studentName: string
  studentEmail: string
  testTitle: string
  testType: string
  score: number
  totalQuestions: number
  correctAnswers: number
  duration: number
  completedAt: string
  status: "passed" | "failed"
  attempts: number
  location: string
}

const Results: React.FC = () => {
  const [results] = useState<TestResult[]>([
    {
      id: "1",
      studentName: "Ahmed Hassan",
      studentEmail: "ahmed@example.com",
      testTitle: "G1 Knowledge Test - Road Signs",
      testType: "G1 Knowledge",
      score: 94.5,
      totalQuestions: 25,
      correctAnswers: 23,
      duration: 28,
      completedAt: "2024-01-20T14:30:00Z",
      status: "passed",
      attempts: 1,
      location: "Toronto, ON",
    },
    {
      id: "2",
      studentName: "Maria Rodriguez",
      studentEmail: "maria@example.com",
      testTitle: "G2 Road Test Preparation",
      testType: "G2 Road Test",
      score: 68.0,
      totalQuestions: 40,
      correctAnswers: 27,
      duration: 45,
      completedAt: "2024-01-20T10:15:00Z",
      status: "failed",
      attempts: 2,
      location: "Vancouver, BC",
    },
    {
      id: "3",
      studentName: "Preet Singh",
      studentEmail: "preet@example.com",
      testTitle: "Defensive Driving Techniques",
      testType: "Defensive Driving",
      score: 92.1,
      totalQuestions: 30,
      correctAnswers: 28,
      duration: 32,
      completedAt: "2024-01-19T16:45:00Z",
      status: "passed",
      attempts: 1,
      location: "Ottawa, ON",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [testTypeFilter, setTestTypeFilter] = useState("all")
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null)

  const filteredResults = results.filter((result) => {
    const matchesSearch =
      result.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.testTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || result.status === statusFilter
    const matchesTestType = testTypeFilter === "all" || result.testType === testTypeFilter
    return matchesSearch && matchesStatus && matchesTestType
  })

  const ResultDetailModal = () => (
    <AnimatePresence>
      {selectedResult && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedResult(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-charcoal">Test Result Details</h3>
              <button
                onClick={() => setSelectedResult(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-charcoal mb-3">Student Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-grayText">Name:</span>
                      <span className="font-medium">{selectedResult.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-grayText">Email:</span>
                      <span className="font-medium">{selectedResult.studentEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-grayText">Location:</span>
                      <span className="font-medium">{selectedResult.location}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-charcoal mb-3">Test Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-grayText">Test:</span>
                      <span className="font-medium">{selectedResult.testTitle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-grayText">Type:</span>
                      <span className="font-medium">{selectedResult.testType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-grayText">Completed:</span>
                      <span className="font-medium">{new Date(selectedResult.completedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-center">
                  <div
                    className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${selectedResult.status === "passed" ? "bg-successGreen" : "bg-canadianRed"
                      }`}
                  >
                    {selectedResult.status === "passed" ? (
                      <CheckCircle className="w-12 h-12 text-white" />
                    ) : (
                      <XCircle className="w-12 h-12 text-white" />
                    )}
                  </div>
                  <h4 className="text-3xl font-bold text-charcoal">{selectedResult.score}%</h4>
                  <p
                    className={`text-lg font-medium ${selectedResult.status === "passed" ? "text-successGreen" : "text-canadianRed"
                      }`}
                  >
                    {selectedResult.status === "passed" ? "PASSED" : "FAILED"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-charcoal">{selectedResult.correctAnswers}</div>
                    <div className="text-sm text-grayText">Correct</div>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-charcoal">
                      {selectedResult.totalQuestions - selectedResult.correctAnswers}
                    </div>
                    <div className="text-sm text-grayText">Incorrect</div>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-charcoal">{selectedResult.duration}m</div>
                    <div className="text-sm text-grayText">Duration</div>
                  </div>
                  <div className="text-center bg-gray-50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-charcoal">{selectedResult.attempts}</div>
                    <div className="text-sm text-grayText">Attempts</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button className="px-4 py-2 bg-coolBlue text-white rounded-lg hover:bg-coolBlue/90 transition-colors">
                Download Certificate
              </button>
              <button className="px-4 py-2 bg-successGreen text-white rounded-lg hover:bg-successGreen/90 transition-colors">
                Send to Student
              </button>
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
          <h1 className="text-3xl font-bold text-charcoal">Test Results</h1>
          <p className="text-grayText mt-1">View and analyze student test performance</p>
        </div>

        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="bg-coolBlue text-white px-4 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-coolBlue/90 transition-colors">
            <BarChart3 className="w-4 h-4" />
            <span>Analytics</span>
          </button>
          <button className="bg-successGreen text-white px-4 py-3 rounded-lg font-medium flex items-center space-x-2 hover:bg-successGreen/90 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grayText w-5 h-5" />
            <input
              type="text"
              placeholder="Search results..."
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
              <option value="all">All Results</option>
              <option value="passed">Passed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <select
            value={testTypeFilter}
            onChange={(e) => setTestTypeFilter(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent appearance-none"
          >
            <option value="all">All Test Types</option>
            <option value="G1 Knowledge">G1 Knowledge</option>
            <option value="G2 Road Test">G2 Road Test</option>
            <option value="Defensive Driving">Defensive Driving</option>
          </select>
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredResults.map((result, index) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${result.status === "passed" ? "bg-successGreen" : "bg-canadianRed"
                      }`}
                  >
                    {result.status === "passed" ? (
                      <CheckCircle className="w-8 h-8 text-white" />
                    ) : (
                      <XCircle className="w-8 h-8 text-white" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-charcoal text-lg">{result.studentName}</h3>
                    <p className="text-grayText">{result.testTitle}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-grayText">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{result.studentEmail}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(result.completedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{result.duration}m</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-charcoal">{result.score}%</div>
                  <div className="text-sm text-grayText">
                    {result.correctAnswers}/{result.totalQuestions} correct
                  </div>
                  <div
                    className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${result.status === "passed" ? "bg-successGreen text-white" : "bg-canadianRed text-white"
                      }`}
                  >
                    {result.status.toUpperCase()}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setSelectedResult(result)}
                    className="p-2 text-coolBlue hover:bg-coolBlue/10 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-successGreen hover:bg-successGreen/10 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-canadianRed hover:bg-canadianRed/10 rounded-lg transition-colors">
                    <Award className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ResultDetailModal />
    </div>
  )
}

export default Results
