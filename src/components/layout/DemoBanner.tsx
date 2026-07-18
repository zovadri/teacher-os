"use client"

import { useState } from "react"
import { useAuthStore } from "@/lib/auth"
import { HiX } from "react-icons/hi"

const roles = [
  { value: "teacher", label: "مدرس" },
  { value: "student", label: "طالب" },
  { value: "parent", label: "ولي أمر" },
  { value: "staff", label: "موظف" },
] as const

export default function DemoBanner() {
  const [visible, setVisible] = useState(true)
  const loginAs = useAuthStore((s) => s.loginAs)
  if (!visible) return null

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-400 text-amber-900">
      <div className="flex items-center justify-between px-4 py-2.5 text-sm">
        <div className="flex items-center gap-3">
          <span className="font-medium">🚀 هذه نسخة تجريبية للعرض فقط. البيانات المستخدمة هي بيانات وهمية.</span>
        </div>
        <div className="flex items-center gap-3">
          <select
            onChange={(e) => loginAs(e.target.value as any)}
            className="bg-white/30 backdrop-blur-sm border border-amber-300/50 rounded-lg px-3 py-1 text-xs font-medium text-amber-900 focus:outline-none cursor-pointer"
          >
            <option value="">تجربة الأدوار المختلفة</option>
            {roles.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          <button onClick={() => setVisible(false)} className="p-1 rounded-lg hover:bg-amber-500/30 transition-colors">
            <HiX className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
