import type React from "react"
import { Loader2 } from "lucide-react"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  text?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "md", text }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-coolBlue`} />
      {text && <p className="mt-2 text-grayText text-sm">{text}</p>}
    </div>
  )
}

export default LoadingSpinner
