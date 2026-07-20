"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineQrcode,
  HiOutlinePrinter,
  HiOutlineDownload,
  HiOutlinePhotograph,
  HiOutlineIdentification,
  HiOutlineFilter,
  HiOutlineAcademicCap,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineBadgeCheck,
} from "react-icons/hi"
import { Toaster, toast } from "react-hot-toast"
import { cn, formatDate } from "@/lib/utils"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import Select from "@/components/ui/Select"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { CardSkeleton, Skeleton } from "@/components/ui/Skeleton"
import { mockStudentIDCards } from "@/lib/mock/data"
import type { StudentIDCard } from "@/lib/types"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

export default function StudentIDCardsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [gradeFilter, setGradeFilter] = useState("all")
  const [groupFilter, setGroupFilter] = useState("all")

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  const grades = useMemo(() => {
    const set = new Set(mockStudentIDCards.map((c) => c.grade))
    return Array.from(set)
  }, [])

  const groups = useMemo(() => {
    const set = new Set(mockStudentIDCards.map((c) => c.group))
    return Array.from(set)
  }, [])

  const filtered = useMemo(() => {
    return mockStudentIDCards.filter((card) => {
      if (gradeFilter !== "all" && card.grade !== gradeFilter) return false
      if (groupFilter !== "all" && card.group !== groupFilter) return false
      return true
    })
  }, [gradeFilter, groupFilter])

  const handlePrint = () => {
    toast.success("ط·آ¬ط·آ§ط·آ±ط¸ع† ط·ع¾ط·آ­ط·آ¶ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط·آ¨ط·آ·ط·آ§ط¸â€ڑط·آ§ط·ع¾ ط¸â€‍ط¸â€‍ط·آ·ط·آ¨ط·آ§ط·آ¹ط·آ©", { position: "top-left" })
    setTimeout(() => window.print(), 500)
  }

  const handleDownloadPDF = () => {
    toast.success("ط·آ¬ط·آ§ط·آ±ط¸ع† ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط¸â€¦ط¸â€‍ط¸ظ¾ PDF", { position: "top-left" })
    setTimeout(() => toast.success("ط·ع¾ط¸â€¦ ط·آ¥ط¸â€ ط·آ´ط·آ§ط·طŒ ط¸â€¦ط¸â€‍ط¸ظ¾ PDF ط·آ¨ط¸â€ ط·آ¬ط·آ§ط·آ­", { position: "top-left" }), 2000)
  }

  if (hasError) {
    return (
      <div className="p-4 md:p-6">
        <ErrorState
          title="ط·آ­ط·آ¯ط·آ« ط·آ®ط·آ·ط·آ£ ط¸ظ¾ط¸ظ¹ ط·ع¾ط·آ­ط¸â€¦ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·آ¨ط·آ·ط·آ§ط¸â€ڑط·آ§ط·ع¾"
          message="ط¸ظ¹ط·آ±ط·آ¬ط¸â€° ط·آ§ط¸â€‍ط¸â€¦ط·آ­ط·آ§ط¸ث†ط¸â€‍ط·آ© ط¸â€¦ط·آ±ط·آ© ط·آ£ط·آ®ط·آ±ط¸â€°"
          onRetry={() => { setHasError(false); setIsLoading(true); setTimeout(() => setIsLoading(false), 1200) }}
        />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Toaster />
      <Breadcrumb items={[{ label: "ط§ظ„ط·ظ„ط§ط¨", href: "/teacher/students" }, { label: "ط¨ط·ط§ظ‚ط§طھ ط§ظ„ط·ظ„ط§ط¨" }]} />
      <PageHeader
        title="ط·آ¨ط·آ·ط·آ§ط¸â€ڑط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ·ط·آ§ط¸â€‍ط·آ¨ ط·آ§ط¸â€‍ط·ع¾ط·آ¹ط·آ±ط¸ظ¹ط¸ظ¾ط¸ظ¹ط·آ©"
        description="ط·آ¹ط·آ±ط·آ¶ ط¸ث†ط·آ·ط·آ¨ط·آ§ط·آ¹ط·آ© ط·آ¨ط·آ·ط·آ§ط¸â€ڑط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ·ط¸â€‍ط·آ§ط·آ¨ ط·آ§ط¸â€‍ط·ع¾ط·آ¹ط·آ±ط¸ظ¹ط¸ظ¾ط¸ظ¹ط·آ©"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" leftIcon={<HiOutlinePrinter className="w-4 h-4" />} onClick={handlePrint}>
              ط·آ·ط·آ¨ط·آ§ط·آ¹ط·آ©
            </Button>
            <Button variant="primary" size="sm" leftIcon={<HiOutlineDownload className="w-4 h-4" />} onClick={handleDownloadPDF}>
              PDF ط·ع¾ط·آ­ط¸â€¦ط¸ظ¹ط¸â€‍
            </Button>
          </div>
        }
      />

      <Card>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <div className="w-full sm:w-48">
              <Select
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                options={[
                  { value: "all", label: "ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط·آµط¸ظ¾ط¸ث†ط¸ظ¾" },
                  ...grades.map((g) => ({ value: g, label: g })),
                ]}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select
                value={groupFilter}
                onChange={(e) => setGroupFilter(e.target.value)}
                options={[
                  { value: "all", label: "ط·آ¬ط¸â€¦ط¸ظ¹ط·آ¹ ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ§ط·ع¾" },
                  ...groups.map((g) => ({ value: g, label: g })),
                ]}
              />
            </div>
            <div className="flex items-center text-sm text-text-tertiary">
              <HiOutlineIdentification className="w-4 h-4 ml-1" />
              {filtered.length} ط·آ¨ط·آ·ط·آ§ط¸â€ڑط·آ©
            </div>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-border overflow-hidden">
              <div className="p-6 space-y-4">
                <Skeleton variant="rectangular" className="w-20 h-20 mx-auto rounded-full" />
                <Skeleton className="h-4 w-2/3 mx-auto" />
                <Skeleton className="h-3 w-1/2 mx-auto" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={HiOutlineIdentification}
          title="ط¸â€‍ط·آ§ ط·ع¾ط¸ث†ط·آ¬ط·آ¯ ط·آ¨ط·آ·ط·آ§ط¸â€ڑط·آ§ط·ع¾"
          description="ط¸â€‍ط¸â€¦ ط¸ظ¹ط·ع¾ط¸â€¦ ط·آ§ط¸â€‍ط·آ¹ط·آ«ط¸ث†ط·آ± ط·آ¹ط¸â€‍ط¸â€° ط·آ¨ط·آ·ط·آ§ط¸â€ڑط·آ§ط·ع¾ ط·ع¾ط·آ·ط·آ§ط·آ¨ط¸â€ڑ ط¸â€¦ط·آ¹ط·آ§ط¸ظ¹ط¸ظ¹ط·آ± ط·آ§ط¸â€‍ط¸ظ¾ط¸â€‍ط·ع¾ط·آ±ط·آ©"
          action={
            <Button variant="secondary" onClick={() => { setGradeFilter("all"); setGroupFilter("all") }}>
              ط·آ¥ط·آ¹ط·آ§ط·آ¯ط·آ© ط·ع¾ط·آ¹ط¸ظ¹ط¸ظ¹ط¸â€  ط·آ§ط¸â€‍ط¸ظ¾ط¸â€‍ط·ع¾ط·آ±ط·آ©
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-200 group">
                <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 p-6 text-center border-b border-border">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-white shadow-md bg-surface-tertiary mb-3">
                    <img src={card.studentImage} alt="" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold text-text text-base">{card.studentName}</h3>
                  <p className="text-xs text-text-tertiary mt-0.5">{card.studentCode}</p>
                  <Badge
                    variant={card.enrollmentStatus === "active" ? "success" : "warning"}
                    size="sm"
                    className="mt-2"
                    dot
                  >
                    {card.enrollmentStatus === "active" ? "ط¸â€ ط·آ´ط·آ·" : "ط·ط›ط¸ظ¹ط·آ± ط¸â€ ط·آ´ط·آ·"}
                  </Badge>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-tertiary flex items-center gap-1">
                      <HiOutlineAcademicCap className="w-3.5 h-3.5" />
                      ط·آ§ط¸â€‍ط·آµط¸ظ¾
                    </span>
                    <span className="text-text font-medium">{card.grade}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-tertiary flex items-center gap-1">
                      <HiOutlineUserGroup className="w-3.5 h-3.5" />
                      ط·آ§ط¸â€‍ط¸â€¦ط·آ¬ط¸â€¦ط¸ث†ط·آ¹ط·آ©
                    </span>
                    <span className="text-text font-medium">{card.group}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-tertiary flex items-center gap-1">
                      <HiOutlineCalendar className="w-3.5 h-3.5" />
                      ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ® ط·آ§ط¸â€‍ط·آ¥ط·آµط·آ¯ط·آ§ط·آ±
                    </span>
                    <span className="text-text font-medium">{formatDate(card.issuedAt)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-text-tertiary flex items-center gap-1">
                      <HiOutlineBadgeCheck className="w-3.5 h-3.5" />
                      ط·ع¾ط·آ§ط·آ±ط¸ظ¹ط·آ® ط·آ§ط¸â€‍ط·آ§ط¸â€ ط·ع¾ط¸â€،ط·آ§ط·طŒ
                    </span>
                    <span className="text-text font-medium">{formatDate(card.expiresAt)}</span>
                  </div>
                  <div className="pt-2 flex justify-center">
                    <div className="w-16 h-16 bg-surface-tertiary rounded-lg flex items-center justify-center">
                      <HiOutlineQrcode className="w-8 h-8 text-text-tertiary" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
