import Dashboard from "./pages/Dashboard"
import QuizManager from "./pages/QuizManager"
import UserManager from "./pages/UserManager"
import Settings from "./pages/Settings"
import "./index.css"
import AppLayout from "./layouts/AppLayout"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

function App() {

  const router = createBrowserRouter([
    {
      element: <AppLayout />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "usermanager", element: <UserManager /> },
        { path: "quizmanager", element: <QuizManager /> },
        { path: "settings", element: <Settings /> },
      ],
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;