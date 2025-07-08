import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Plus, Edit, Trash2, Eye, Mail, Phone, MapPin, Award } from "lucide-react"
import { useFetchAllAdmins, useFetchAllUsers } from "../hooks/apiFeatures/useUsers"

interface User {
    id: number
    name: string
    email: string
    phone: string
    location: string
    joinDate: string
    isActive: boolean
    subscription: "free" | "3-day" | "4-day" | "premium"
    quizzesCompleted: number
    averageScore: number
    lastActive: string
}

const AdminManager: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [subscriptionFilter, setSubscriptionFilter] = useState("all")
    const [showAddModal, setShowAddModal] = useState(false)

    const { data: admins = {}, isLoading, refetch } = useFetchAllAdmins()

    console.log("Admins:", admins)


    // const admins: User[] = [
    //     {
    //         id: 1,
    //         name: "Ahmed Hassan",
    //         email: "ahmed.hassan@email.com",
    //         phone: "+1 (416) 555-0123",
    //         location: "Toronto, ON",
    //         joinDate: "2024-01-15",
    //         status: "active",
    //         subscription: "premium",
    //         quizzesCompleted: 15,
    //         averageScore: 94.5,
    //         lastActive: "2 hours ago",
    //     },
    //     {
    //         id: 2,
    //         name: "Maria Rodriguez",
    //         email: "maria.rodriguez@email.com",
    //         phone: "+1 (604) 555-0456",
    //         location: "Vancouver, BC",
    //         joinDate: "2024-01-12",
    //         status: "active",
    //         subscription: "4-day",
    //         quizzesCompleted: 8,
    //         averageScore: 87.2,
    //         lastActive: "1 day ago",
    //     },
    //     {
    //         id: 3,
    //         name: "Preet Singh",
    //         email: "preet.singh@email.com",
    //         phone: "+1 (613) 555-0789",
    //         location: "Ottawa, ON",
    //         joinDate: "2024-01-10",
    //         status: "active",
    //         subscription: "3-day",
    //         quizzesCompleted: 12,
    //         averageScore: 91.8,
    //         lastActive: "3 hours ago",
    //     },
    //     {
    //         id: 4,
    //         name: "Jean Dubois",
    //         email: "jean.dubois@email.com",
    //         phone: "+1 (514) 555-0321",
    //         location: "Montreal, QC",
    //         joinDate: "2024-01-08",
    //         status: "inactive",
    //         subscription: "free",
    //         quizzesCompleted: 3,
    //         averageScore: 78.5,
    //         lastActive: "1 week ago",
    //     },
    //     {
    //         id: 5,
    //         name: "Sarah Johnson",
    //         email: "sarah.johnson@email.com",
    //         phone: "+1 (403) 555-0654",
    //         location: "Calgary, AB",
    //         joinDate: "2024-01-05",
    //         status: "suspended",
    //         subscription: "free",
    //         quizzesCompleted: 1,
    //         averageScore: 65.0,
    //         lastActive: "2 weeks ago",
    //     },
    // ]

    // const getStatusColor = (status: string) => {
    //     switch (status) {
    //         case "active":
    //             return "bg-success-green text-white"
    //         case "inactive":
    //             return "bg-yellow-500 text-white"
    //         case "suspended":
    //             return "bg-canadian-red text-white"
    //         default:
    //             return "bg-gray-400 text-white"
    //     }
    // }

    // const getSubscriptionColor = (subscription: string) => {
    //     switch (subscription) {
    //         case "premium":
    //             return "bg-canadian-red text-white"
    //         case "4-day":
    //             return "bg-cool-blue text-white"
    //         case "3-day":
    //             return "bg-success-green text-white"
    //         case "free":
    //             return "bg-gray-400 text-white"
    //         default:
    //             return "bg-gray-400 text-white"
    //     }
    // }

    const filteredadmins = admins?.data?.filter((user: User) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || user.isActive === true
        const matchesSubscription = subscriptionFilter === "all" || user.subscription === subscriptionFilter
        return matchesSearch && matchesStatus && matchesSubscription
    }) || []

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
            >
                <div>
                    <h1 className="text-3xl font-bold text-charcoal font-onest">Admins Management</h1>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddModal(true)}
                    className="mt-4 lg:mt-0 bg-canadianRed text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-canadianRed/90 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New Admin</span>
                </motion.button>
            </motion.div>

            {/* Filters */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl  border border-gray-200 p-6"
            >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search admins..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent appearance-none"
                        >
                            <option value="all">All Status</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>

                        </select>
                    </div>
                </div>
            </motion.div>

            {/* admins Table */}
            <div
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-text uppercase tracking-wider">
                                    Admin
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-text uppercase tracking-wider">
                                    Contact
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-text uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-text uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            <AnimatePresence>
                                {filteredadmins.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-coolBlue rounded-full flex items-center justify-center text-white font-semibold">
                                                    {user.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-charcoal">{user.name}</div>
                                                    <div className="text-sm text-gray-text flex items-center">
                                                        <MapPin className="w-3 h-3 mr-1" />
                                                        {user.location}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center text-sm text-charcoal">
                                                    <Mail className="w-3 h-3 mr-2 text-gray-400" />
                                                    {user.email}
                                                </div>
                                                <div className="flex items-center text-sm text-charcoal">
                                                    <Phone className="w-3 h-3 mr-2 text-gray-400" />
                                                    {user.phone}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="space-y-2">
                                                <div className="text-xs text-gray-text">Last active: {user.lastLogin}</div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-2 text-cool-blue hover:bg-cool-blue/10 rounded-lg transition-colors"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-2 text-success-green hover:bg-success-green/10 rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="p-2 text-canadian-red hover:bg-canadian-red/10 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </motion.button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add User Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={() => setShowAddModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-xl p-6 w-full max-w-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-xl font-bold text-charcoal mb-4">Add New User</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
                                    />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
                                />
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
                                />
                                <input
                                    type="text"
                                    placeholder="Location (City, Province)"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
                                />
                                <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent">
                                    <option>Select Subscription</option>
                                    <option value="free">Free</option>
                                    <option value="3-day">3-Day Access</option>
                                    <option value="4-day">4-Day Access</option>
                                    <option value="premium">Premium Guide</option>
                                </select>
                            </div>
                            <div className="flex space-x-3 mt-6">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 py-3 border border-gray-200 rounded-lg font-medium text-gray-text hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button className="flex-1 py-3 bg-canadianRed text-white rounded-lg font-medium hover:bg-canadianRed/90 transition-colors">
                                    Add User
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default AdminManager
