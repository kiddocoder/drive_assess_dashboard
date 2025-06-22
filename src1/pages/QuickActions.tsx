import type React from "react"
import { Plus, FileQuestion, Users, BarChart3 } from "lucide-react"

const QuickActions: React.FC = () => {
  const actions = [
    {
      title: "Add New Quiz",
      description: "Create a new driving test quiz",
      icon: Plus,
      color: "bg-success-green",
      action: "add-quiz",
    },
    {
      title: "Manage Questions",
      description: "Edit existing quiz questions",
      icon: FileQuestion,
      color: "bg-cool-blue",
      action: "manage-questions",
    },
    {
      title: "View Users",
      description: "Manage user accounts",
      icon: Users,
      color: "bg-canadian-red",
      action: "view-users",
    },
    {
      title: "Analytics",
      description: "View detailed reports",
      icon: BarChart3,
      color: "bg-charcoal",
      action: "analytics",
    },
  ]

  return (
    <div className="bg-white rounded-xl p-6">
      <h3 className="text-xl font-bold text-charcoal mb-6">Quick Actions</h3>

      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon

          return (
            <button
              key={action.action}
              className="w-full flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                <Icon className="w-5 h-5 text-white" />
              </div>

              <div className="flex-1 text-left">
                <h4 className="font-semibold text-charcoal">{action.title}</h4>
                <p className="text-sm text-gray-text">{action.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default QuickActions
