"use client"

import React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Search, Filter, Edit, Eye, BookOpen, Clock, Users, Award, X, CheckCircle, LoaderCircle, Printer } from "lucide-react"
import { useFetchAllTests, useAddQuestionsToTest } from "../hooks/apiFeatures/useTests"
import { useFetchQuestions } from "../hooks/apiFeatures/useQuestions"
import { useFetchTestQuestions } from "../hooks/apiFeatures/useTests"

// interface Test {
//   id: string
//   title: string
//   category: string
//   difficulty: "easy" | "medium" | "hard"
//   questions: number
//   duration: number
//   attempts: number
//   passRate: number
//   status: "active" | "draft" | "archived"
//   createdAt: string
//   lastModified: string
// }

const Tests: React.FC = () => {

  const { data: tests = {} } = useFetchAllTests();

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [addQuestion, setAddQuestion] = useState(false)
  const [viewTest, setViewTest] = useState(false)
  const [selectedTest, setSelectedTest] = useState({});

  const categories = ["all", "Road Signs", "Traffic Rules", "Safety", "Practical Test", "Parking"]
  const statuses = ["all", "active", "draft", "archived"]


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

  const filteredTests = tests?.data?.filter((test: any) => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || test.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || test.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  }) || []

  const CreateTestModal = ({
    test
  }: any) => (
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
            <h3 className="text-2xl font-bold text-charcoal mb-6">{test ? "Edit Test" : "Create New Test"}</h3>

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
                  onClick={() => {
                    setShowCreateModal(false)
                  }}
                  className="px-6 py-3 border border-gray-300 text-charcoal rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-canadianRed text-white rounded-lg hover:bg-canadianRed/90 transition-colors"
                >
                  {test ? "Save changes" : "Create Test"}
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
          {filteredTests.map((test: any, index: number) => (
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(test.status)}`}>
                      {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <BookOpen className="w-4 h-4 text-coolBlue" />
                  </div>
                  <div className="text-lg font-bold text-charcoal">{test?.questions?.length || 0}</div>
                  <div className="text-xs text-grayText">Questions</div>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 text-successGreen" />
                  </div>
                  <div className="text-lg font-bold text-charcoal">{test.timeLimit} (min)</div>
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
                <button
                  onClick={() => {
                    setSelectedTest(test);
                    setViewTest(true)
                  }}
                  className="flex-1 bg-coolBlue text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-coolBlue/90 transition-colors flex items-center justify-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedTest(test);
                  }}
                  className="flex-1 bg-successGreen text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-successGreen/90 transition-colors flex items-center justify-center space-x-1">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedTest(test);
                    setAddQuestion(true)
                  }}
                  className="flex items-center gap-2 whitespace-nowrap bg-gray-200 text-charcoal py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors">
                  <BookOpen className="w-4 h-4" />
                  <span>Add Question</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <CreateTestModal test={selectedTest} />
      <AddQuestionToTest
        isOpened={addQuestion}
        onClose={() => setAddQuestion(false)}
        test={selectedTest}
      />

      <ViewTestDetails
        isOpened={viewTest}
        onClose={() => setViewTest(false)}
        test={selectedTest}
      />

    </div>
  )
}

export default Tests


function AddQuestionToTest({
  isOpened,
  onClose,
  test
}: {
  isOpened: boolean,
  onClose: () => void,
  test: any
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  const { data: initialQuestions = {} } = useFetchQuestions();
  const addQuestionsToTestMutation = useAddQuestionsToTest()

  useEffect(() => {
    // Initialize selected questions with test's existing questions when modal opens
    if (isOpened) {
      setSelectedQuestions(test.questions?.map((question: any) => question._id) || []);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isOpened, test.questions]);

  const handleClear = () => {
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSelectQuestion = (question: any) => {
    setSelectedQuestions(prev => {
      if (prev.includes(question._id)) {
        return prev.filter(id => id !== question._id);
      } else {
        return [...prev, question._id];
      }
    });
  };

  const isQuestionSelected = (question: any) => selectedQuestions.includes(question._id);

  const filteredQuestions = initialQuestions?.data?.filter((question: any) =>
    question.question.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleSave = async () => {

    await addQuestionsToTestMutation.mutateAsync({
      questionIds: selectedQuestions,
      testId: test._id
    }, {
      onSuccess: () => onClose()
    })

  };

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4">
              <h3 className="text-2xl font-bold text-charcoal mb-6">Add Questions to Test</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-200 cursor-pointer text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative flex items-center mb-4">
              <Search className="absolute left-3 text-gray-400" size={20} />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search question title ..."
                className="w-full pl-10 pr-10 py-3 border-1 focus:ring-1 outline-none border-gray-200 focus:ring-blue-500 rounded-lg"
              />
              {searchQuery && (
                <button
                  onClick={handleClear}
                  className="absolute right-3 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="flex flex-col gap-4 mb-6">
              {filteredQuestions.map((question: any) => (
                <div
                  key={question._id}
                  onClick={() => handleSelectQuestion(question)}
                  className={`rounded-xl border ${isQuestionSelected(question)
                    ? "bg-canadianRed/10 border-canadianRed"
                    : "bg-white border-gray-200"
                    } cursor-pointer p-6 transition-all duration-300`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-gray-100 text-charcoal rounded-full text-xs font-medium">
                            {question.category?.name || 'Uncategorized'}
                          </span>
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

                      {question.explanation && (
                        <p className="text-sm text-grayText mb-3">{question.explanation}</p>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        className={`p-2 ${isQuestionSelected(question)
                          ? "text-canadianRed"
                          : "text-coolBlue"
                          } hover:bg-successGreen/10 rounded-lg transition-colors`}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-canadianRed text-white rounded-lg hover:bg-canadianRed/90"
              >
                Save Changes
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


function ViewTestDetails({
  isOpened,
  onClose,
  test
}: {
  isOpened: boolean,
  onClose: () => void,
  test: any
}) {


  const { data: questions = [], isLoading } = useFetchTestQuestions(test._id);

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-start justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-4">
              <h3 className="text-2xl font-bold text-charcoal mb-6">{test.title}</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-gray-200 cursor-pointer text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {isLoading ? (
              <div className="flex flex-col justify-center items-center h-[80%] max-h-[90%]">
                <LoaderCircle size={24} className="animate-spin text-coolBlue" />
              </div>
            )
              : <div className="flex flex-col gap-4 mb-6">
                {questions.map((question: any) => (
                  <div
                    key={question._id}
                    className={`rounded-xl border bg-white border-gray-200
                     p-6 transition-all duration-300`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-gray-100 text-charcoal rounded-full text-xs font-medium">
                              {question.category?.name || 'Uncategorized'}
                            </span>
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

                        {question.explanation && (
                          <p className="text-sm text-grayText mb-3">{question.explanation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            }


            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              {questions.length > 0 && <button
                onClick={() => { }}
                className="px-4 cursor-pointer py-2 flex bg-canadianRed text-white rounded-lg hover:bg-canadianRed/90"
              >
                <Printer className="mr-2" />Print PDF
              </button>}
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}