"use client"

import type React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import LoginForm from "./components/auth/LoginForm"
import LoadingSpinner from "./components/common/LoadingSpinner"
import AppLayout from "./layouts/AppLayout"
import Dashboard from "./pages/Dashboard"
import Tests from "./pages/Tests"
import Questions from "./pages/Questions"
import Categories from "./pages/Categories"
import Schedules from "./pages/Schedules"
import Results from "./pages/Results"
import Certificates from "./pages/Certificates"
import Reports from "./pages/Reports"
import Students from "./pages/Students"
import Instructors from "./pages/Instructors"
import Payments from "./pages/Payments"
import Settings from "./pages/Settings"
import "./index.css"

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  return <>{children}</>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "tests", element: <Tests /> },
      { path: "questions", element: <Questions /> },
      { path: "categories", element: <Categories /> },
      { path: "schedules", element: <Schedules /> },
      { path: "results", element: <Results /> },
      { path: "certificates", element: <Certificates /> },
      { path: "reports", element: <Reports /> },
      { path: "students", element: <Students /> },
      { path: "instructors", element: <Instructors /> },
      { path: "payments", element: <Payments /> },
      { path: "settings", element: <Settings /> },
      // Placeholder pages for remaining routes
      {
        path: "admins",
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-charcoal">Administrators</h1>
            <p className="text-grayText mt-1">Coming soon...</p>
          </div>
        ),
      },
      {
        path: "roles",
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-charcoal">Roles & Permissions</h1>
            <p className="text-grayText mt-1">Coming soon...</p>
          </div>
        ),
      },
      {
        path: "live-sessions",
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-charcoal">Live Sessions</h1>
            <p className="text-grayText mt-1">Coming soon...</p>
          </div>
        ),
      },
      {
        path: "system-alerts",
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-charcoal">System Alerts</h1>
            <p className="text-grayText mt-1">Coming soon...</p>
          </div>
        ),
      },
      {
        path: "audit-logs",
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-charcoal">Audit Logs</h1>
            <p className="text-grayText mt-1">Coming soon...</p>
          </div>
        ),
      },
      {
        path: "performance",
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-charcoal">Performance</h1>
            <p className="text-grayText mt-1">Coming soon...</p>
          </div>
        ),
      },
      {
        path: "subscriptions",
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-charcoal">Subscriptions</h1>
            <p className="text-grayText mt-1">Coming soon...</p>
          </div>
        ),
      },
      {
        path: "invoices",
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-charcoal">Invoices</h1>
            <p className="text-grayText mt-1">Coming soon...</p>
          </div>
        ),
      },
      {
        path: "materials",
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-charcoal">Study Materials</h1>
            <p className="text-grayText mt-1">Coming soon...</p>
          </div>
        ),
      },
      {
        path: "media",
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-charcoal">Media Library</h1>
            <p className="text-grayText mt-1">Coming soon...</p>
          </div>
        ),
      },
      {
        path: "localization",
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-charcoal">Localization</h1>
            <p className="text-grayText mt-1">Coming soon...</p>
          </div>
        ),
      },
      {
        path: "notifications",
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-charcoal">Notifications</h1>
            <p className="text-grayText mt-1">Coming soon...</p>
          </div>
        ),
      },
      {
        path: "help",
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-charcoal">Help & Support</h1>
            <p className="text-grayText mt-1">Coming soon...</p>
          </div>
        ),
      },
      {
        path: "exports",
        element: (
          <div className="p-6">
            <h1 className="text-3xl font-bold text-charcoal">Data Export</h1>
            <p className="text-grayText mt-1">Coming soon...</p>
          </div>
        ),
      },
    ],
  },
])

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
