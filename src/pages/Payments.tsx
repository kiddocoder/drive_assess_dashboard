"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Banknote,
  Download,
  Filter,
  Eye,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  Wallet,
} from "lucide-react"

interface Payment {
  id: string
  userId: string
  userName: string
  userEmail: string
  amount: number
  currency: string
  type: "subscription" | "one-time" | "refund"
  status: "completed" | "pending" | "failed" | "refunded"
  method: "credit-card" | "paypal" | "bank-transfer"
  description: string
  createdAt: string
  processedAt?: string
}

interface WithdrawalRequest {
  id: string
  amount: number
  currency: string
  bankAccount: string
  status: "pending" | "processing" | "completed" | "failed"
  requestedAt: string
  processedAt?: string
}

const Payments: React.FC = () => {
  const [payments] = useState<Payment[]>([
    {
      id: "1",
      userId: "u1",
      userName: "Ahmed Hassan",
      userEmail: "ahmed@example.com",
      amount: 29.99,
      currency: "CAD",
      type: "subscription",
      status: "completed",
      method: "credit-card",
      description: "Premium Guide - Monthly",
      createdAt: "2024-01-20T10:30:00Z",
      processedAt: "2024-01-20T10:30:15Z",
    },
    {
      id: "2",
      userId: "u2",
      userName: "Maria Rodriguez",
      userEmail: "maria@example.com",
      amount: 9.99,
      currency: "CAD",
      type: "one-time",
      status: "completed",
      method: "paypal",
      description: "4-Day Access",
      createdAt: "2024-01-19T15:45:00Z",
      processedAt: "2024-01-19T15:45:10Z",
    },
    {
      id: "3",
      userId: "u3",
      userName: "Preet Singh",
      userEmail: "preet@example.com",
      amount: 4.99,
      currency: "CAD",
      type: "one-time",
      status: "pending",
      method: "credit-card",
      description: "3-Day Access",
      createdAt: "2024-01-21T09:15:00Z",
    },
  ])

  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([
    {
      id: "1",
      amount: 1250.0,
      currency: "CAD",
      bankAccount: "****-****-****-5678",
      status: "completed",
      requestedAt: "2024-01-15T14:00:00Z",
      processedAt: "2024-01-16T10:00:00Z",
    },
    {
      id: "2",
      amount: 850.5,
      currency: "CAD",
      bankAccount: "****-****-****-5678",
      status: "processing",
      requestedAt: "2024-01-20T16:30:00Z",
    },
  ])

  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [selectedBank, setSelectedBank] = useState("")

  // Calculate totals
  const totalRevenue = payments
    .filter((p) => p.status === "completed" && p.type !== "refund")
    .reduce((sum, p) => sum + p.amount, 0)

  const monthlyRevenue = payments
    .filter((p) => {
      const paymentDate = new Date(p.createdAt)
      const currentMonth = new Date().getMonth()
      return p.status === "completed" && p.type !== "refund" && paymentDate.getMonth() === currentMonth
    })
    .reduce((sum, p) => sum + p.amount, 0)

  const pendingWithdrawals = withdrawals
    .filter((w) => w.status === "pending" || w.status === "processing")
    .reduce((sum, w) => sum + w.amount, 0)

  const availableBalance =
    totalRevenue -
    pendingWithdrawals -
    withdrawals.filter((w) => w.status === "completed").reduce((sum, w) => sum + w.amount, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-successGreen text-white"
      case "pending":
        return "bg-yellow-500 text-white"
      case "processing":
        return "bg-coolBlue text-white"
      case "failed":
        return "bg-canadianRed text-white"
      case "refunded":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case "subscription":
        return "bg-coolBlue text-white"
      case "one-time":
        return "bg-successGreen text-white"
      case "refund":
        return "bg-canadianRed text-white"
      default:
        return "bg-gray-400 text-white"
    }
  }

  const handleWithdraw = () => {
    const newWithdrawal: WithdrawalRequest = {
      id: Date.now().toString(),
      amount: Number.parseFloat(withdrawAmount),
      currency: "CAD",
      bankAccount: selectedBank,
      status: "pending",
      requestedAt: new Date().toISOString(),
    }

    setWithdrawals([newWithdrawal, ...withdrawals])
    setShowWithdrawModal(false)
    setWithdrawAmount("")
    setSelectedBank("")
  }

  const WithdrawModal = () => (
    <AnimatePresence>
      {showWithdrawModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowWithdrawModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-charcoal mb-6">Withdraw Funds</h3>

            <div className="space-y-4">
              <div className="bg-coolBlue/10 border border-coolBlue/20 rounded-lg p-4">
                <p className="text-sm text-coolBlue font-medium">Available Balance</p>
                <p className="text-2xl font-bold text-coolBlue">${availableBalance.toFixed(2)} CAD</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Withdrawal Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grayText w-5 h-5" />
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                    placeholder="0.00"
                    max={availableBalance}
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">Bank Account</label>
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                >
                  <option value="">Select Bank Account</option>
                  <option value="****-****-****-5678">TD Bank - ****5678</option>
                  <option value="****-****-****-1234">RBC - ****1234</option>
                  <option value="****-****-****-9876">BMO - ****9876</option>
                </select>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  <strong>Processing Time:</strong> 2-3 business days
                </p>
                <p className="text-sm text-yellow-800">
                  <strong>Fee:</strong> $2.50 CAD per withdrawal
                </p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="flex-1 py-3 border border-gray-300 text-charcoal rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleWithdraw}
                disabled={!withdrawAmount || !selectedBank || Number.parseFloat(withdrawAmount) > availableBalance}
                className="flex-1 py-3 bg-canadianRed text-white rounded-lg hover:bg-canadianRed/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Request Withdrawal
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
          <h1 className="text-3xl font-bold text-charcoal">Payments & Withdrawals</h1>
          <p className="text-grayText mt-1">Manage your revenue and withdrawal requests</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowWithdrawModal(true)}
          className="mt-4 lg:mt-0 bg-canadianRed text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-canadianRed/90 transition-colors"
        >
          <Wallet className="w-5 h-5" />
          <span>Withdraw Funds</span>
        </motion.button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-grayText">Total Revenue</p>
              <p className="text-2xl font-bold text-charcoal">${totalRevenue.toFixed(2)}</p>
              <p className="text-sm text-successGreen flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5% from last month
              </p>
            </div>
            <div className="p-3 bg-successGreen/10 rounded-lg">
              <DollarSign className="w-6 h-6 text-successGreen" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-grayText">This Month</p>
              <p className="text-2xl font-bold text-charcoal">${monthlyRevenue.toFixed(2)}</p>
              <p className="text-sm text-coolBlue flex items-center mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                {payments.filter((p) => p.status === "completed").length} transactions
              </p>
            </div>
            <div className="p-3 bg-coolBlue/10 rounded-lg">
              <CreditCard className="w-6 h-6 text-coolBlue" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-grayText">Available Balance</p>
              <p className="text-2xl font-bold text-charcoal">${availableBalance.toFixed(2)}</p>
              <p className="text-sm text-grayText mt-1">Ready to withdraw</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Wallet className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-grayText">Pending Withdrawals</p>
              <p className="text-2xl font-bold text-charcoal">${pendingWithdrawals.toFixed(2)}</p>
              <p className="text-sm text-yellow-600 mt-1">Processing...</p>
            </div>
            <div className="p-3 bg-canadianRed/10 rounded-lg">
              <Banknote className="w-6 h-6 text-canadianRed" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Withdrawal Requests */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-charcoal">Withdrawal Requests</h2>
          <button className="text-coolBlue hover:text-coolBlue/80 text-sm font-medium">View All</button>
        </div>

        <div className="space-y-4">
          {withdrawals.map((withdrawal, index) => (
            <motion.div
              key={withdrawal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-canadianRed/10 rounded-lg">
                  <ArrowDownLeft className="w-5 h-5 text-canadianRed" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal">
                    ${withdrawal.amount.toFixed(2)} {withdrawal.currency}
                  </p>
                  <p className="text-sm text-grayText">
                    To {withdrawal.bankAccount} • {new Date(withdrawal.requestedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(withdrawal.status)}`}>
                  {withdrawal.status.charAt(0).toUpperCase() + withdrawal.status.slice(1)}
                </span>
                <button className="p-2 text-grayText hover:text-charcoal rounded-lg hover:bg-gray-100 transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-charcoal">Recent Payments</h2>
          <div className="flex items-center space-x-3">
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4 text-grayText" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 text-grayText" />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {payments.map((payment, index) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-successGreen/10 rounded-lg">
                  <ArrowUpRight className="w-5 h-5 text-successGreen" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal">{payment.userName}</p>
                  <p className="text-sm text-grayText">{payment.userEmail}</p>
                  <p className="text-sm text-grayText">{payment.description}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-charcoal">
                  ${payment.amount.toFixed(2)} {payment.currency}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentTypeColor(payment.type)}`}>
                    {payment.type
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                  </span>
                </div>
                <p className="text-xs text-grayText mt-1">{new Date(payment.createdAt).toLocaleDateString()}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <WithdrawModal />
    </div>
  )
}

export default Payments
