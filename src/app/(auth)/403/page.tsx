"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { HiShieldExclamation, HiArrowRight } from "react-icons/hi"
import Button from "@/components/ui/Button"

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-secondary p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="max-w-md w-full text-center space-y-6"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-error/10">
          <HiShieldExclamation className="w-10 h-10 text-error" />
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-text">ط·ط›ط¸ظ¹ط·آ± ط¸â€¦ط·آµط·آ±ط·آ­ ط·آ¨ط·آ§ط¸â€‍ط¸ث†ط·آµط¸ث†ط¸â€‍</h1>
          <p className="text-text-secondary">ط¸â€‍ط¸ظ¹ط·آ³ ط¸â€‍ط·آ¯ط¸ظ¹ط¸ئ’ ط·آ§ط¸â€‍ط·آµط¸â€‍ط·آ§ط·آ­ط¸ظ¹ط·آ© ط¸â€‍ط¸â€‍ط¸ث†ط·آµط¸ث†ط¸â€‍ ط·آ¥ط¸â€‍ط¸â€° ط¸â€،ط·آ°ط¸â€، ط·آ§ط¸â€‍ط·آµط¸ظ¾ط·آ­ط·آ©. ط¸ظ¹ط·آ±ط·آ¬ط¸â€° ط·آ§ط¸â€‍ط·ع¾ط¸ث†ط·آ§ط·آµط¸â€‍ ط¸â€¦ط·آ¹ ط¸â€¦ط·آ¯ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط¸â€ ط·آ¸ط·آ§ط¸â€¦.</p>
        </div>
        <div className="flex justify-center gap-3">
          <Link href="/">
            <Button variant="primary" leftIcon={<HiArrowRight className="w-4 h-4" />}>
              ط·آ§ط¸â€‍ط·آ¹ط¸ث†ط·آ¯ط·آ© ط¸â€‍ط¸â€‍ط·آ±ط·آ¦ط¸ظ¹ط·آ³ط¸ظ¹ط·آ©
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary">ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·آ¯ط·آ®ط¸ث†ط¸â€‍</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
