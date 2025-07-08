import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { useAddUser } from "../../hooks/apiFeatures/useUsers"
import { useFetchRoles } from "../../hooks/apiFeatures/useRoles"

function UserForm({
    isOpen,
    user,
    action,
    onClose
}: {
    isOpen: boolean,
    user: any,
    action: string,
    onClose: () => void
}) {

    const [formData, setFormData] = useState(
        user ? {
            name: user.name,
            location: user.location,
            email: user.email,
            role: user.role,
            phone: user.phone
        } : {
            name: "",
            location: "",
            email: "",
            phone: "",
            role: ""
        })
    const addUserMutation = useAddUser();

    const { data: roles = [] } = useFetchRoles();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()


        addUserMutation.mutateAsync(formData, {
            onSuccess: () => onClose()
        })

    }



    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-white rounded-xl p-6 w-full max-w-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-bold text-charcoal mb-6">Add New {action}</h3>

                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-charcoal mb-2">Role</label>
                                <select
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                                >
                                    <option key={"Default-role"} selected disabled
                                    > -- Select role -- </option>
                                    {
                                        roles.map((role: { _id: string, name: string }) => (
                                            <option key={role._id} value={role._id}> {role.name} </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                                        placeholder="Enter full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                                        placeholder="Enter email address"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                                        placeholder="Enter phone number"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-charcoal mb-2">Location</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent"
                                        placeholder="City, Province"
                                    />
                                </div>

                            </div>

                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-3 border border-gray-300 text-charcoal rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="px-6 py-3 bg-canadianRed text-white rounded-lg hover:bg-canadianRed/90 transition-colors"
                                >
                                    Add {action}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )

}

export default UserForm;
