"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Download, Eye, Award, Calendar, Mail, FileText, Plus } from "lucide-react"

interface Certificate {
  id: string
  studentName: string
  studentEmail: string
  testTitle: string
  testType: string
  score: number
  issuedDate: string
  certificateNumber: string
  validUntil: string
  status: "active" | "expired" | "revoked"
  downloadCount: number
}

const Certificates: React.FC = () => {
  const [certificates] = useState<Certificate[]>([
    {
      id: "1",
      studentName: "Ahmed Hassan",
      studentEmail: "ahmed@example.com",
      testTitle: "G1 Knowledge Test - Road Signs",
      testType: "G1 Knowledge",
      score: 94.5,
      issuedDate: "2024-01-20",
      certificateNumber: "DRC-2024-001234",
      validUntil: "2026-01-20",
      status: "active",
      downloadCount: 3,
    },
    {
      id: "2",
      studentName: "Preet Singh",
      studentEmail: "preet@example.com",
      testTitle: "Defensive Driving Techniques",
      testType: "Defensive Driving",
      score: 92.1,
      issuedDate: "2024-01-19",
      certificateNumber: "DRC-2024-001235",
      validUntil: "2025-01-19",
      status: "active",
      downloadCount: 1,
    },
    {
      id: "3",
      studentName: "Sarah Johnson",
      studentEmail: "sarah@example.com",
      testTitle: "G2 Road Test Preparation",
      testType: "G2 Road Test",
      score: 88.7,
      issuedDate: "2023-12-15",
      certificateNumber: "DRC-2023-009876",
      validUntil: "2024-12-15",
      status: "expired",
      downloadCount: 5,
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-successGreen text-white"
      case "expired":
        return "bg-yellow-500 text-white"
      case "revoked":
        return "bg-canadianRed text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || cert.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const CertificatePreviewModal = () => (
    <AnimatePresence>
      {selectedCertificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Certificate Preview */}
            <div className="border-4 border-canadianRed rounded-lg p-8 bg-gradient-to-br from-white to-gray-50">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-canadianRed rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-charcoal mb-2">CERTIFICATE OF COMPLETION</h1>
                <p className="text-grayText">DriveReady - Canadian Driving Assessment</p>
              </div>

              <div className="text-center mb-8">
                <p className="text-lg text-grayText mb-4">This is to certify that</p>
                <h2 className="text-4xl font-bold text-charcoal mb-4">{selectedCertificate.studentName}</h2>
                <p className="text-lg text-grayText mb-2">has successfully completed</p>
                <h3 className="text-2xl font-semibold text-coolBlue mb-4">{selectedCertificate.testTitle}</h3>
                <p className="text-lg text-grayText">
                  with a score of <span className="font-bold text-successGreen">{selectedCertificate.score}%</span>
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <p className="text-sm text-grayText">Certificate Number</p>
                  <p className="font-bold text-charcoal">{selectedCertificate.certificateNumber}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-grayText">Date Issued</p>
                  <p className="font-bold text-charcoal">{selectedCertificate.issuedDate}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-grayText">Valid Until</p>
                  <p className="font-bold text-charcoal">{selectedCertificate.validUntil}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 text-center">
                <p className="text-sm text-grayText">
                  This certificate is issued by DriveReady and is valid for official purposes.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setSelectedCertificate(null)}
                className="px-4 py-2 border border-gray-300 text-charcoal rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-coolBlue text-white rounded-lg hover:bg-coolBlue/90 transition-colors">
                Download PDF
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

  const CreateCertificateModal = () => (
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
            <h3 className="text-2xl font-bold text-charcoal mb-6">Issue New Certificate</h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Student</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent">
                    <option value="">Select Student</option>
                    <option value="ahmed">Ahmed Hassan</option>
                    <option value="maria">Maria Rodriguez</option>
                    <option value="preet">Preet Singh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Test Result</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent">
                    <option value="">Select Test Result</option>
                    <option value="test1">G1 Knowledge Test - 94.5%</option>
                    <option value="test2">Defensive Driving - 92.1%</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Issue Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                    defaultValue={new Date().toISOString().split("T")[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Valid Until</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Additional Notes</label>
                <textarea
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                  placeholder="Optional notes for the certificate"
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
                  Issue Certificate
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
          <h1 className="text-3xl font-bold text-charcoal">Certificates</h1>
          <p className="text-grayText mt-1">Manage and issue completion certificates</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCreateModal(true)}
          className="mt-4 lg:mt-0 bg-canadianRed text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-canadianRed/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Issue Certificate</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grayText w-5 h-5" />
            <input
              type="text"
              placeholder="Search certificates..."
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
              <option value="expired">Expired</option>
              <option value="revoked">Revoked</option>
            </select>
          </div>
        </div>
      </div>

      {/* Certificates List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredCertificates.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-canadianRed rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <h3 className="font-bold text-charcoal text-lg">{certificate.studentName}</h3>
                    <p className="text-grayText">{certificate.testTitle}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-grayText">
                      <div className="flex items-center space-x-1">
                        <FileText className="w-4 h-4" />
                        <span>{certificate.certificateNumber}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{certificate.issuedDate}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Download className="w-4 h-4" />
                        <span>{certificate.downloadCount} downloads</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-charcoal">{certificate.score}%</div>
                  <div className="text-sm text-grayText mb-2">Score</div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(certificate.status)}`}>
                    {certificate.status.charAt(0).toUpperCase() + certificate.status.slice(1)}
                  </span>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => setSelectedCertificate(certificate)}
                    className="p-2 text-coolBlue hover:bg-coolBlue/10 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-successGreen hover:bg-successGreen/10 rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-canadianRed hover:bg-canadianRed/10 rounded-lg transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <CertificatePreviewModal />
      <CreateCertificateModal />
    </div>
  )
}

export default Certificates
