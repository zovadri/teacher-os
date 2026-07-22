"use client"

import Link from "next/link"
import { HiBell, HiMoon, HiSun, HiSearch } from "react-icons/hi"
import { Avatar } from "@/components/ui/Avatar"
import { useThemeStore } from "@/lib/store/useThemeStore"
import { useSearchStore } from "@/lib/store/useSearchStore"
import { mockTeacher } from "@/lib/mock/data"

export default function DashboardHeader({ title, subtitle }: { title?: string; subtitle?: string }) {
  const { theme, toggleTheme } = useThemeStore()
  const toggleSearch = useSearchStore((s) => s.toggleSearch)

  return (
    <header className="sticky top-0 z-20 bg-[#0B1120]/80 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          {title && <h1 className="text-xl font-semibold text-[#F8FAFC]">{title}</h1>}
          {subtitle && <p className="text-sm text-[#94A3B8] mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-1">
          <button type="button"
	onClick={toggleSearch}
            className="p-2.5 rounded-xl hover:bg-white/[0.03] text-[#64748B] transition-colors"
          >
            <HiSearch className="w-5 h-5" />
          </button>
          <button type="button"
	onClick={toggleTheme}
            className="p-2.5 rounded-xl hover:bg-white/[0.03] text-[#64748B] transition-colors"
          >
            {theme === "dark" ? <HiSun className="w-5 h-5" /> : <HiMoon className="w-5 h-5" />}
          </button>
          <Link href="/teacher/notifications" className="relative p-2.5 rounded-xl hover:bg-white/[0.03] text-[#64748B] transition-colors">
            <HiBell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
          </Link>
          <Link href="/teacher/settings" className="mr-3">
            <Avatar src={mockTeacher.avatar} name={mockTeacher.name} size="sm" />
          </Link>
        </div>
      </div>
    </header>
  )
}
