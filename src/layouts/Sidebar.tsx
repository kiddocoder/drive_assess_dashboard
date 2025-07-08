"use client"

import type React from "react"
import { useState } from "react"
import {
  LayoutDashboard,
  FileQuestion,
  // BarChart3,
  // Globe,
  Users,
  // Settings,
  // Menu,
  X,
  Car,
  BookOpen,
  Award,
  // Clock,
  FileText,
  Shield,
  UserCheck,
  CreditCard,
  Bell,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  // AlertTriangle,
  CheckCircle2,
  Calendar,
  // Database,
  // Upload,
  Briefcase,
  Clock,
} from "lucide-react"
import { Link, useLocation } from "react-router-dom"

interface SidebarProps {
  isOpen: boolean
  expand: () => void
  onClose: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, expand, onClose }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(["main", "assessments", "users", "settings", "results", "financial"])
  const location = useLocation()

  const checkActive = (path: string) => location.pathname === path

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((key) => key !== sectionId) : [...prev, sectionId],
    )
  }

  const menuSections = [
    {
      key: "main",
      label: "Main",
      items: [{ key: "dashboard", path: "/", label: "Dashboard", icon: LayoutDashboard, badge: null }],
    },
    {
      key: "assessments",
      label: "Assessment Management",
      items: [
        { key: "tests", path: "/tests", label: "Test Library", icon: BookOpen, badge: "47" },
        { key: "questions", path: "/questions", label: "Question Bank", icon: FileQuestion, badge: "1.2k" },
        { key: "categories", path: "/categories", label: "Test Categories", icon: Briefcase, badge: null },
        // {key: "schedules", path: "/schedules", label: "Test Scheduling", icon: Calendar, badge: "12" },
      ],
    },
    {
      key: "results",
      label: "Results & Reporting",
      items: [
        { key: "results", path: "/results", label: "Test Results", icon: Award, badge: null },
        { key: "certificates", path: "/certificates", label: "Certificates", icon: CheckCircle2, badge: "89" },
        // {key: "reports", path: "/reports", label: "Custom Reports", icon: FileText, badge: null },
      ],
    },
    {
      key: "users",
      label: "User Management",
      items: [
        { key: "students", path: "/students", label: "Students", icon: Users, badge: "8.2k" },
        { key: "instructors", path: "/instructors", label: "Instructors", icon: UserCheck, badge: "156" },
        { key: "admins", path: "/admins", label: "Administrators", icon: Shield, badge: "8" },
        // {key: "roles", path: "/roles", label: "Roles & Permissions", icon: Settings, badge: null },
      ],
    },
    {
      key: "monitoring",
      label: "System Monitoring",
      items: [
        { key: "live-sessions", path: "/live-sessions", label: "Live Sessions", icon: Clock, badge: "24" },
        // {key: "system-alerts", path: "/system-alerts", label: "System Alerts", icon: AlertTriangle, badge: "3" },
        // {key: "audit-logs", path: "/audit-logs", label: "Audit Logs", icon: Database, badge: null },
        // {key: "performance", path: "/performance", label: "Performance", icon: BarChart3, badge: null },
      ],
    },
    {
      key: "financial",
      label: "Financial",
      items: [
        { key: "payments", path: "/payments", label: "Payments", icon: CreditCard, badge: "New" },
        { key: "subscriptions", path: "/subscriptions", label: "Subscriptions", icon: Calendar, badge: null },
        { key: "invoices", path: "/invoices", label: "Invoices", icon: FileText, badge: "45" },
      ],
    },
    // {
    //  key: "content",
    //   label: "Content Management",
    //   items: [
    //     {key: "materials", path: "/materials", label: "Study Materials", icon: BookOpen, badge: null },
    //     {key: "media", path: "/media", label: "Media Library", icon: Upload, badge: null },
    //     {key: "localization", path: "/localization", label: "Localization", icon: Globe, badge: "5" },
    //   ],
    // },
  ]

  const bottomMenuItems = [
    { key: "notifications", path: "/notifications", label: "Notifications", icon: Bell, badge: "7" },
    { key: "help", path: "/help", label: "Help & Support", icon: HelpCircle, badge: null },
    // { key: "settings", path: "/settings", label: "Settings", icon: Settings, badge: null },
  ]

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={`fixed left-0 top-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out border-r border-gray-200
          ${isOpen ? "w-64" : "w-18"} 
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-canadianRed rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <h1 className="font-bold text-lg text-charcoal">DriveAccess</h1>
            </div>
          )}

          <button
            onClick={!isOpen ? expand : onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 hidden lg:block"
          >
            <X className="w-5 h-5 text-grayText" />
          </button>
        </div>

        {/* Navigation - Scrollable */}
        <div className="flex-1 overflow-y-auto h-[calc(100vh-120px)]">
          <nav className="p-2 space-y-1">
            {menuSections.map((section) => {
              const isExpanded = expandedSections.includes(section.key)

              return (
                <div key={section.key} className="mb-2">
                  {/* Section Header */}
                  {isOpen && (
                    <button
                      onClick={() => toggleSection(section.key)}
                      className="w-full flex items-center justify-between px-3 py-2 text-grayText hover:text-charcoal transition-colors duration-200 group"
                    >
                      <span className="text-sm font-bold uppercase tracking-wider whitespace-nowrap">- {section.label}</span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </div>
                    </button>
                  )}

                  {/* Section Items */}
                  <div className={`space-y-1 ${isOpen && !isExpanded ? "hidden" : ""}`}>
                    {section.items.map((item) => {
                      const Icon = item.icon
                      const isActive = checkActive(item.path)

                      return (
                        <Link
                          key={item.key}
                          to={item.path}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group ${isActive
                            ? "bg-coolBlue/10 text-coolBlue border-l-4 border-coolBlue"
                            : "text-grayText hover:bg-gray-100 hover:text-charcoal"
                            }`}
                          title={!isOpen ? item.label : undefined}
                        >
                          <div className="flex items-center space-x-3">
                            <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-coolBlue" : "text-grayText"}`} />
                            {isOpen && (
                              <span className="font-medium transition-opacity duration-200">{item.label}</span>
                            )}
                          </div>

                          {isOpen && item.badge && (
                            <span
                              className={`px-2 py-0.5 text-xs font-semibold rounded-full ${item.badge === "New"
                                ? "bg-successGreen text-white"
                                : isActive
                                  ? "bg-coolBlue text-white"
                                  : "bg-gray-200 text-grayText"
                                }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </nav>
        </div>

        {/* Bottom Menu */}
        <div className="border-t border-gray-200 p-2 space-y-1 absolute bottom-0 w-full bg-white">
          {bottomMenuItems.map((item) => {
            const Icon = item.icon
            const isActive = checkActive(item.path)

            return (
              <Link
                key={item.key}
                to={item.path}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${isActive ? "bg-coolBlue/10 text-coolBlue" : "text-grayText hover:bg-gray-100 hover:text-charcoal"
                  }`}
                title={!isOpen ? item.label : undefined}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {isOpen && <span className="font-medium">{item.label}</span>}
                </div>

                {isOpen && item.badge && (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-canadianRed text-white rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      </aside>

      {/* Desktop spacer */}
      <div className={`hidden lg:block transition-all duration-300 ${isOpen ? "w-64" : "w-16"}`} />
    </>
  )
}

export default Sidebar
