"use client"

import { HiOutlineExclamationCircle } from "react-icons/hi"
import Button from "@/components/ui/Button"

interface ErrorProps {
  error: Error
  reset: () => void
}

export default function TeacherError({ error, reset }: ErrorProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-md">
        <HiOutlineExclamationCircle className="w-16 h-16 mx-auto text-error" />
        <h2 className="text-xl font-bold text-text">ط­ط¯ط« ط®ط·ط£ ط؛ظٹط± ظ…طھظˆظ‚ط¹</h2>
        <p className="text-text-secondary text-sm">{error.message || "ظٹط±ط¬ظ‰ ط§ظ„ظ…ط­ط§ظˆظ„ط© ظ…ط±ط© ط£ط®ط±ظ‰"}</p>
        <Button onClick={reset} variant="primary" size="lg">
          ط¥ط¹ط§ط¯ط© ط§ظ„ظ…ط­ط§ظˆظ„ط©
        </Button>
      </div>
    </div>
  )
}
