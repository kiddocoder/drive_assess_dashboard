
import React, { useState } from "react"

import {
  LayoutDashboard, FileQuestion, BarChart3, Globe, Users, Settings, Menu, X, Car,
  BookOpen, Award, Clock, FileText, Shield, UserCheck, CreditCard, Bell,
  HelpCircle, LogOut, ChevronDown, ChevronRight, AlertTriangle, CheckCircle2,
  Calendar, Database, Download, Upload, Briefcase
} from "lucide-react"
import { Link, useLocation } from "react-router-dom";


const Sidebar: React.FC<{ isOpen: boolean, onClose: () => void }> =
  ({ isOpen, onClose }) => {

    const [expandedSections, setExpandedSections] = useState<string[]>(['main']);
    const location = useLocation();

    const CheckActive = (path: string) => location.pathname === path;

    const toggleSection = (sectionId: string) => {
      setExpandedSections(prev =>
        prev.includes(sectionId)
          ? prev.filter(id => id !== sectionId)
          : [...prev, sectionId]
      );
    };

    const menuSections = [
      {
        id: 'main',
        title: 'Main',
        items: [
          { id: "dashboard", path: "/", label: "Dashboard", icon: LayoutDashboard, badge: null },
        ]
      },
      {
        id: 'assessments',
        title: 'Assessment Management',
        items: [
          { id: "tests", path: "/tests", label: "Test Library", icon: BookOpen, badge: "47" },
          { id: "questions", path: "/questions", label: "Question Bank", icon: FileQuestion, badge: "1.2k" },
          { id: "categories", path: "/categories", label: "Test Categories", icon: Briefcase, badge: null },
          { id: "schedules", path: "/schedules", label: "Test Scheduling", icon: Calendar, badge: "12" },
        ]
      },
      {
        id: 'results',
        title: 'Results & Reporting',
        items: [
          { id: "results", path: "/results", label: "Test Results", icon: Award, badge: null },
          { id: "certificates", path: "/certificates", label: "Certificates", icon: CheckCircle2, badge: "89" },
          { id: "reports", path: "/reports", label: "Custom Reports", icon: FileText, badge: null },
          { id: "exports", path: "/exports", label: "Data Export", icon: Download, badge: null },
        ]
      },
      {
        id: 'users',
        title: 'User Management',
        items: [
          { id: "students", path: "/students", label: "Test Takers", icon: Users, badge: "8.2k" },
          { id: "instructors", path: "/instructors", label: "Instructors", icon: UserCheck, badge: "156" },
          { id: "admins", path: "/admins", label: "Administrators", icon: Shield, badge: "8" },
          { id: "roles", path: "/roles", label: "Roles & Permissions", icon: Settings, badge: null },
        ]
      },
      {
        id: 'monitoring',
        title: 'System Monitoring',
        items: [
          { id: "live-sessions", path: "/live-sessions", label: "Live Sessions", icon: Clock, badge: "24" },
          { id: "system-alerts", path: "/system-alerts", label: "System Alerts", icon: AlertTriangle, badge: "3" },
          { id: "audit-logs", path: "/audit-logs", label: "Audit Logs", icon: Database, badge: null },
          { id: "performance", path: "/performance", label: "Performance", icon: BarChart3, badge: null },
        ]
      },
      {
        id: 'financial',
        title: 'Financial',
        items: [
          { id: "payments", path: "/payments", label: "Payments", icon: CreditCard, badge: "New" },
          { id: "subscriptions", path: "/subscriptions", label: "Subscriptions", icon: Calendar, badge: null },
          { id: "invoices", path: "/invoices", label: "Invoices", icon: FileText, badge: "45" },
        ]
      },
      {
        id: 'content',
        title: 'Content Management',
        items: [
          { id: "materials", path: "/materials", label: "Study Materials", icon: BookOpen, badge: null },
          { id: "media", path: "/media", label: "Media Library", icon: Upload, badge: null },
          { id: "localization", path: "/localization", label: "Localization", icon: Globe, badge: "5" },
        ]
      }
    ]


    const bottomMenuItems = [
      { id: "notifications", path: "/notifications", label: "Notifications", icon: Bell, badge: "7" },
      { id: "help", path: "/help", label: "Help & Support", icon: HelpCircle, badge: null },
      { id: "settings", path: "/settings", label: "Settings", icon: Settings, badge: null },
    ];

    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed left-0 top-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ease-in-out 
          ${isOpen ? 'w-64' : 'w-16'} 
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            {isOpen ? (
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-canadianRed rounded-lg flex items-center justify-center">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <h1 className="font-bold text-lg text-charcoal">DriveReady</h1>
              </div>
            ) : (
              <div className="w-8 h-8 bg-canadianRed rounded-lg flex items-center justify-center mx-auto">
                <Car className="w-5 h-5 text-white" />
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 hidden lg:block"
            >
              {isOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
            </button>
          </div>

          {/* Navigation - Scrollable */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent h-[calc(100vh-120px)]">
            <nav className="p-2 space-y-1">
              {menuSections.map((section) => {
                const isExpanded = expandedSections.includes(section.id);

                return (
                  <div key={section.id} className="mb-2">
                    {/* Section Header */}
                    {isOpen && (
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full flex items-center justify-between px-3 py-2 text-gray-600 hover:text-charcoal transition-colors duration-200 group"
                      >
                        <span className="text-xs font-semibold uppercase tracking-wider">
                          {section.title}
                        </span>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </div>
                      </button>
                    )}

                    {/* Section Items */}
                    <div className={`space-y-1 ${isOpen && !isExpanded ? 'hidden' : ''}`}>
                      {section.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = CheckActive(item.path)

                        return (
                          <Link
                            key={item.id}
                            to={item.path}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 group ${isActive
                              ? "bg-coolBlue/10 text-coolBlue border-l-4 border-coolBlue"
                              : "text-gray-600 hover:bg-gray-100 hover:text-charcoal"
                              }`}
                            title={!isOpen ? item.label : undefined}
                          >
                            <div className="flex items-center space-x-3">
                              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-coolBlue" : "text-gray-500"
                                }`} />
                              {isOpen && (
                                <span className="font-medium transition-opacity duration-200">
                                  {item.label}
                                </span>
                              )}
                            </div>

                            {isOpen && item.badge && (
                              <span
                                className={`px-2 py-0.5 text-xs font-semibold rounded-full ${item.badge === "New"
                                  ? "bg-successGreen text-white"
                                  : isActive
                                    ? "bg-coolBlue text-white"
                                    : "bg-gray-200 text-gray-700"
                                  }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Bottom Menu */}
          <div className="border-t border-gray-200 p-2 space-y-1 absolute bottom-0 w-full bg-white">
            {bottomMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = CheckActive(item.path)

              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all duration-200 ${isActive
                    ? "bg-coolBlue/10 text-coolBlue"
                    : "text-gray-600 hover:bg-gray-100 hover:text-charcoal"
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
              );
            })}

            {/* Logout Button */}
            <button
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-charcoal transition-all duration-200 mt-2"
              title={!isOpen ? "Logout" : undefined}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="font-medium">Logout</span>}
            </button>
          </div>
        </aside>

        {/* Desktop spacer */}
        <div className={`hidden lg:block transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'
          }`} />
      </>
    );
  };

export default Sidebar;