"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { AlertTriangle, RefreshCw } from "lucide-react"
import Button from "./Button"
import { Alert } from "./Alert"

interface ErrorStateProps {
  title?: string
  message?: string
  error?: string
  onRetry?: () => void
  className?: string
  fullPage?: boolean
}

export function ErrorState({
  title = "ط­ط¯ط« ط®ط·ط£",
  message = "ط¹ط°ط±ط§ظ‹طŒ ط­ط¯ط« ط®ط·ط£ ط؛ظٹط± ظ…طھظˆظ‚ط¹. ظٹط±ط¬ظ‰ ط§ظ„ظ…ط­ط§ظˆظ„ط© ظ…ط±ط© ط£ط®ط±ظ‰.",
  error,
  onRetry,
  className,
  fullPage = false,
}: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        fullPage && "min-h-[60vh]",
        className,
      )}
    >
      <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
        <AlertTriangle className="w-8 h-8 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">{message}</p>
      {error && (
        <div className="mb-6 w-full max-w-md">
          <Alert variant="error">{error}</Alert>
        </div>
      )}
      {onRetry && (
        <button type="button" variant="primary" onClick={onRetry} leftIcon={<RefreshCw className="w-4 h-4" />}>
          ط¥ط¹ط§ط¯ط© ط§ظ„ظ…ط­ط§ظˆظ„ط©
        </Button>
      )}
    </motion.div>
  )
}
