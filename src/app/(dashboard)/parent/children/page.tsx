"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HiOutlineUserGroup, HiOutlineAcademicCap, HiOutlineChartBar, HiOutlineCurrencyDollar, HiOutlineChevronLeft } from "react-icons/hi"

const children = Array.from({ length: 6 }, (_, i) => ({
  id: `child-${i + 1}`,
  name: ["أحمد علي", "فاطمة علي", "محمد علي", "سارة علي", "يوسف علي", "مريم علي"][i],
  grade: ["ثالثة ثانوي", "أولى ثانوي", "ثانية ثانوي", "ثالثة ثانوي", "أولى ثانوي", "ثانية ثانوي"][i],
  school: ["مدرسة النصر الثانوية", "مدرسة الفتح الثانوية", "مدرسة الأندلس", "مدرسة النصر الثانوية", "مدرسة الفتح الثانوية", "مدرسة الأندلس"][i],
  averageGrade: [87, 92, 76, 88, 81, 95][i],
  coursesCount: [4, 3, 3, 4, 2, 3][i],
  examsPassed: [8, 6, 5, 9, 4, 7][i],
  totalExams: [10, 7, 7, 10, 5, 8][i],
  subscriptionStatus: ["active", "active", "pending", "active", "expired", "active"][i],
  subscriptionEnd: ["2026-09-15", "2026-12-01", "2026-07-01", "2026-10-20", "2026-06-15", "2026-11-30"][i],
  streak: [12, 20, 5, 15, 0, 25][i],
}))

const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "نشط", color: "bg-success/10 text-success" },
  pending: { label: "معلق", color: "bg-warning/10 text-warning" },
  expired: { label: "منتهي", color: "bg-error/10 text-error" },
}

export default function ParentChildrenPage() {
  const [mounted, setMounted] = useState(false)
  const [filter, setFilter] = useState<"all" | "active" | "pending" | "expired">("all")
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const filtered = filter === "all" ? children : children.filter((c) => c.subscriptionStatus === filter)

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold">الأبناء</h1>
          <p className="text-text-secondary text-sm">متابعة أداء جميع أبنائك</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-surface border border-border w-fit">
          {(["all", "active", "pending", "expired"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === f ? "bg-primary text-white shadow-md" : "text-text-secondary hover:text-text"
              }`}
            >
              {f === "all" ? "الكل" : f === "active" ? "نشط" : f === "pending" ? "معلق" : "منتهي"}
            </button>
          ))}
        </div>

        {/* Children Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map((child, i) => (
            <motion.div
              key={child.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                href={`/parent/children/${child.id}`}
                className="block p-5 rounded-xl bg-surface border border-border hover:shadow-lg hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl font-bold group-hover:bg-primary/20 transition-colors">
                      {child.name[0]}
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{child.name}</h3>
                      <p className="text-xs text-text-tertiary">{child.grade}</p>
                      <p className="text-xs text-text-tertiary">{child.school}</p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${statusConfig[child.subscriptionStatus].color}`}>
                    {statusConfig[child.subscriptionStatus].label}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="text-center p-2 rounded-lg bg-surface-secondary">
                    <p className="text-base font-bold text-primary">{child.averageGrade}٪</p>
                    <p className="text-[10px] text-text-tertiary">المتوسط</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-surface-secondary">
                    <p className="text-base font-bold">{child.coursesCount}</p>
                    <p className="text-[10px] text-text-tertiary">كورسات</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-surface-secondary">
                    <p className="text-base font-bold text-success">{child.examsPassed}</p>
                    <p className="text-[10px] text-text-tertiary">ناجح</p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-surface-secondary">
                    <p className="text-base font-bold text-warning">{child.streak}</p>
                    <p className="text-[10px] text-text-tertiary">أيام</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-tertiary">
                    الاشتراك: {new Date(child.subscriptionEnd).toLocaleDateString("ar-EG")}
                  </span>
                  <span className="flex items-center gap-1 text-primary">
                    التفاصيل <HiOutlineChevronLeft size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
