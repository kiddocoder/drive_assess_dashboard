"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { SettingsIcon, Bell, Shield, Palette, Database, Mail, Save, RefreshCw } from "lucide-react"

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("general")
  const [settings, setSettings] = useState({
    general: {
      siteName: "Driving Assessment for Canada",
      siteDescription: "Practice like it's your real driving test - 100% Canadian style!",
      timezone: "America/Toronto",
      language: "en",
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      weeklyReports: true,
      userSignups: true,
      quizCompletions: false,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
      loginAttempts: 5,
    },
    appearance: {
      theme: "light",
      primaryColor: "#D32F2F",
      secondaryColor: "#1976D2",
      font: "Onest",
    },
  })

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "database", label: "Database", icon: Database },
    { id: "email", label: "Email", icon: Mail },
  ]

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved:", settings)
  }

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Site Name</label>
        <input
          type="text"
          value={settings.general.siteName}
          onChange={(e) =>
            setSettings({
              ...settings,
              general: { ...settings.general, siteName: e.target.value },
            })
          }
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Site Description</label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) =>
            setSettings({
              ...settings,
              general: { ...settings.general, siteDescription: e.target.value },
            })
          }
          rows={3}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) =>
              setSettings({
                ...settings,
                general: { ...settings.general, timezone: e.target.value },
              })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
          >
            <option value="America/Toronto">Eastern Time (Toronto)</option>
            <option value="America/Vancouver">Pacific Time (Vancouver)</option>
            <option value="America/Edmonton">Mountain Time (Edmonton)</option>
            <option value="America/Winnipeg">Central Time (Winnipeg)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Default Language</label>
          <select
            value={settings.general.language}
            onChange={(e) =>
              setSettings({
                ...settings,
                general: { ...settings.general, language: e.target.value },
              })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      {Object.entries(settings.notifications).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div>
            <h4 className="font-medium text-charcoal capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</h4>
            <p className="text-sm text-gray-text">
              {key === "emailNotifications" && "Receive email notifications for important events"}
              {key === "pushNotifications" && "Receive push notifications in your browser"}
              {key === "weeklyReports" && "Get weekly analytics reports via email"}
              {key === "userSignups" && "Notify when new users sign up"}
              {key === "quizCompletions" && "Notify when users complete quizzes"}
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, [key]: e.target.checked },
                })
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cool-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cool-blue"></div>
          </label>
        </div>
      ))}
    </div>
  )

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
        <div>
          <h4 className="font-medium text-charcoal">Two-Factor Authentication</h4>
          <p className="text-sm text-gray-text">Add an extra layer of security to your account</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.security.twoFactorAuth}
            onChange={(e) =>
              setSettings({
                ...settings,
                security: { ...settings.security, twoFactorAuth: e.target.checked },
              })
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cool-blue/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cool-blue"></div>
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Session Timeout (minutes)</label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) =>
              setSettings({
                ...settings,
                security: { ...settings.security, sessionTimeout: Number.parseInt(e.target.value) },
              })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Password Expiry (days)</label>
          <input
            type="number"
            value={settings.security.passwordExpiry}
            onChange={(e) =>
              setSettings({
                ...settings,
                security: { ...settings.security, passwordExpiry: Number.parseInt(e.target.value) },
              })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-charcoal mb-2">Theme</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() =>
              setSettings({
                ...settings,
                appearance: { ...settings.appearance, theme: "light" },
              })
            }
            className={`p-4 border-2 rounded-lg transition-colors ${
              settings.appearance.theme === "light"
                ? "border-cool-blue bg-cool-blue/10"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="w-full h-20 bg-white rounded border mb-2"></div>
            <span className="text-sm font-medium">Light</span>
          </button>
          <button
            onClick={() =>
              setSettings({
                ...settings,
                appearance: { ...settings.appearance, theme: "dark" },
              })
            }
            className={`p-4 border-2 rounded-lg transition-colors ${
              settings.appearance.theme === "dark"
                ? "border-cool-blue bg-cool-blue/10"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="w-full h-20 bg-charcoal rounded border mb-2"></div>
            <span className="text-sm font-medium">Dark</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Primary Color</label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={settings.appearance.primaryColor}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  appearance: { ...settings.appearance, primaryColor: e.target.value },
                })
              }
              className="w-12 h-12 border border-gray-200 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              value={settings.appearance.primaryColor}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  appearance: { ...settings.appearance, primaryColor: e.target.value },
                })
              }
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal mb-2">Font Family</label>
          <select
            value={settings.appearance.font}
            onChange={(e) =>
              setSettings({
                ...settings,
                appearance: { ...settings.appearance, font: e.target.value },
              })
            }
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-cool-blue focus:border-transparent"
          >
            <option value="Onest">Onest</option>
            <option value="Nunito">Nunito</option>
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
          </select>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings()
      case "notifications":
        return renderNotificationSettings()
      case "security":
        return renderSecuritySettings()
      case "appearance":
        return renderAppearanceSettings()
      case "database":
        return (
          <div className="text-center py-12">
            <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-charcoal mb-2">Database Settings</h3>
            <p className="text-gray-text">Database configuration and backup options</p>
          </div>
        )
      case "email":
        return (
          <div className="text-center py-12">
            <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-charcoal mb-2">Email Settings</h3>
            <p className="text-gray-text">SMTP configuration and email templates</p>
          </div>
        )
      default:
        return renderGeneralSettings()
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-charcoal font-onest">Settings</h1>
          <p className="text-gray-text mt-1">Manage your application settings and preferences</p>
        </div>

        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-200 text-charcoal px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-gray-300 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="bg-canadian-red text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-canadian-red/90 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </motion.button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ x: 5 }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all ${
                      activeTab === tab.id ? "bg-canadian-red text-white shadow-lg" : "text-charcoal hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </motion.button>
                )
              })}
            </nav>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-charcoal mb-6">
              {tabs.find((tab) => tab.id === activeTab)?.label} Settings
            </h2>
            {renderContent()}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Settings
