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
          <h1 className="text-3xl font-bold text-text">ط؛ظٹط± ظ…طµط±ط­ ط¨ط§ظ„ظˆطµظˆظ„</h1>
          <p className="text-text-secondary">ظ„ظٹط³ ظ„ط¯ظٹظƒ ط§ظ„طµظ„ط§ط­ظٹط© ظ„ظ„ظˆطµظˆظ„ ط¥ظ„ظ‰ ظ‡ط°ظ‡ ط§ظ„طµظپط­ط©. ظٹط±ط¬ظ‰ ط§ظ„طھظˆط§طµظ„ ظ…ط¹ ظ…ط¯ظٹط± ط§ظ„ظ†ط¸ط§ظ….</p>
        </div>
        <div className="flex justify-center gap-3">
          <Link href="/">
            <button type="button" variant="primary" leftIcon={<HiArrowRight className="w-4 h-4" />}>
              ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ط±ط¦ظٹط³ظٹط©
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary">طھط³ط¬ظٹظ„ ط§ظ„ط¯ط®ظˆظ„</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
