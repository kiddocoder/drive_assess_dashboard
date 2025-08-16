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
  Users,
  Star,
  MoreVertical,
} from "lucide-react"

interface Instructor {
  id: string
  name: string
  email: string
  phone: string
  location: string
  specialization: string[]
  experience: number
  rating: number
  studentsCount: number
  testsCreated: number
  joinDate: string
  status: "active" | "inactive" | "on-leave"
  certifications: string[]
  bio: string
}

const Instructors: React.FC = () => {
  const [instructors] = useState<Instructor[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@driveready.ca",
      phone: "+1 (416) 555-0123",
      location: "Toronto, ON",
      specialization: ["G1 Knowledge", "Road Signs", "Traffic Rules"],
      experience: 8,
      rating: 4.9,
      studentsCount: 1245,
      testsCreated: 23,
      joinDate: "2020-03-15",
      status: "active",
      certifications: ["Certified Driving Instructor", "Traffic Safety Specialist"],
      bio: "Experienced driving instructor with expertise in G1 knowledge tests and road safety education.",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike.chen@driveready.ca",
      phone: "+1 (604) 555-0456",
      location: "Vancouver, BC",
      specialization: ["G2 Road Test", "Defensive Driving", "Motorcycle"],
      experience: 12,
      rating: 4.8,
      studentsCount: 2156,
      testsCreated: 31,
      joinDate: "2018-07-22",
      status: "active",
      certifications: ["Advanced Driving Instructor", "Motorcycle Safety Instructor"],
      bio: "Senior instructor specializing in practical road tests and advanced driving techniques.",
    },
    {
      id: "3",
      name: "Emma Wilson",
      email: "emma.wilson@driveready.ca",
      phone: "+1 (403) 555-0789",
      location: "Calgary, AB",
      specialization: ["Defensive Driving", "Winter Driving", "Safety"],
      experience: 6,
      rating: 4.7,
      studentsCount: 892,
      testsCreated: 18,
      joinDate: "2021-11-08",
      status: "on-leave",
      certifications: ["Defensive Driving Specialist", "Winter Driving Expert"],
      bio: "Specialist in defensive driving and winter driving conditions specific to Canadian weather.",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddModal, setShowAddModal] = useState(false)
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-successGreen text-white"
      case "inactive":
        return "bg-gray-400 text-white"
      case "on-leave":
        return "bg-yellow-500 text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch =
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || instructor.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const InstructorDetailModal = () => (
    <AnimatePresence>
      {selectedInstructor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedInstructor(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-charcoal">Instructor Profile</h3>
              <button
                onClick={() => setSelectedInstructor(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-coolBlue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {selectedInstructor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h4 className="text-xl font-bold text-charcoal">{selectedInstructor.name}</h4>
                  <p className="text-grayText">{selectedInstructor.email}</p>
                  <div className="flex items-center justify-center mt-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="ml-1 font-medium">{selectedInstructor.rating}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-grayText" />
                    <span className="text-sm">{selectedInstructor.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-grayText" />
                    <span className="text-sm">{selectedInstructor.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-grayText" />
                    <span className="text-sm">Joined {selectedInstructor.joinDate}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedInstructor.status)}`}
                  >
                    {selectedInstructor.status.charAt(0).toUpperCase() + selectedInstructor.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-coolBlue/10 rounded-lg p-4 text-center">
                    <Users className="w-6 h-6 text-coolBlue mx-auto mb-2" />
                    <div className="text-2xl font-bold text-charcoal">{selectedInstructor.studentsCount}</div>
                    <div className="text-sm text-grayText">Students</div>
                  </div>
                  <div className="bg-successGreen/10 rounded-lg p-4 text-center">
                    <BookOpen className="w-6 h-6 text-successGreen mx-auto mb-2" />
                    <div className="text-2xl font-bold text-charcoal">{selectedInstructor.testsCreated}</div>
                    <div className="text-sm text-grayText">Tests Created</div>
                  </div>
                  <div className="bg-canadianRed/10 rounded-lg p-4 text-center">
                    <Award className="w-6 h-6 text-canadianRed mx-auto mb-2" />
                    <div className="text-2xl font-bold text-charcoal">{selectedInstructor.experience}</div>
                    <div className="text-sm text-grayText">Years Exp.</div>
                  </div>
                  <div className="bg-yellow-500/10 rounded-lg p-4 text-center">
                    <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-charcoal">{selectedInstructor.rating}</div>
                    <div className="text-sm text-grayText">Rating</div>
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-bold text-charcoal mb-3">Specializations</h5>
                  <div className="flex flex-wrap gap-2">
                    {selectedInstructor.specialization.map((spec, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-coolBlue/10 text-coolBlue rounded-full text-sm font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-bold text-charcoal mb-3">Certifications</h5>
                  <div className="space-y-2">
                    {selectedInstructor.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-successGreen" />
                        <span className="text-sm">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-lg font-bold text-charcoal mb-3">Bio</h5>
                  <p className="text-grayText">{selectedInstructor.bio}</p>
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
          <h1 className="text-3xl font-bold text-charcoal">Instructors</h1>
          <p className="text-grayText mt-1">Manage your driving instructors and their profiles</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddModal(() => !showAddModal)}
          className="mt-4 lg:mt-0 bg-canadianRed text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-canadianRed/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Instructor</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grayText w-5 h-5" />
            <input
              type="text"
              placeholder="Search instructors..."
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
              <option value="on-leave">On Leave</option>
            </select>
          </div>
        </div>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredInstructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-coolBlue rounded-full flex items-center justify-center text-white font-bold">
                    {instructor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-bold text-charcoal">{instructor.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{instructor.rating}</span>
                    </div>
                  </div>
                </div>

                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-4 h-4 text-grayText" />
                </button>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-sm text-grayText">
                  <Mail className="w-4 h-4" />
                  <span>{instructor.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-grayText">
                  <MapPin className="w-4 h-4" />
                  <span>{instructor.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(instructor.status)}`}>
                    {instructor.status.charAt(0).toUpperCase() + instructor.status.slice(1)}
                  </span>
                  <span className="text-xs text-grayText">{instructor.experience} years exp.</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {instructor.specialization.slice(0, 2).map((spec, index) => (
                    <span key={index} className="px-2 py-1 bg-coolBlue/10 text-coolBlue rounded text-xs font-medium">
                      {spec}
                    </span>
                  ))}
                  {instructor.specialization.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-grayText rounded text-xs">
                      +{instructor.specialization.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-charcoal">{instructor.studentsCount}</div>
                  <div className="text-xs text-grayText">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-charcoal">{instructor.testsCreated}</div>
                  <div className="text-xs text-grayText">Tests</div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedInstructor(instructor)}
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

      <InstructorDetailModal />
    </div>
  )
}

export default Instructors
