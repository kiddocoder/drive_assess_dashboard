"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, Car, Loader2 } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

const LoginForm: React.FC = () => {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, formError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await login(identifier, password);
    if (success) {
      navigate("/")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-canadianRed/10 to-coolBlue/10 flex items-center justify-center p-4">
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-200"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-canadianRed rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-charcoal">DriveAccess Admin</h1>
          <p className="text-grayText mt-2">Sign in to your dashboard</p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-coolBlue/10 border border-coolBlue/20 rounded-lg p-3 mb-6">
          <p className="text-sm text-coolBlue font-medium mb-1">Demo Credentials:</p>
          <p className="text-xs text-coolBlue">Email: tresorkiddo@gmail.com</p>
          <p className="text-xs text-coolBlue">Password: admin123</p>
        </div>

        {formError && (
          <div className="bg-red-50 text-red-500 px-4 p-3 rounded-lg text-sm mb-6 animate-shake">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grayText w-5 h-5" />
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent transition-all"
                placeholder="Email or phone number"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-grayText w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coolBlue focus:border-transparent transition-all"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-grayText hover:text-charcoal"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-canadianRed text-white py-3 rounded-lg font-semibold hover:bg-canadianRed/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-grayText">© {new Date().getFullYear()} DriveAccess. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
