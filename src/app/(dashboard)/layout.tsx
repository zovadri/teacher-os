"use client"

import { useState, useCallback } from "react"
import DashboardSidebar from "@/components/layout/DashboardSidebar"
import DemoBanner from "@/components/layout/DemoBanner"
import CommandPalette from "@/components/layout/CommandPalette"
import GlobalSearch from "@/components/layout/GlobalSearch"
import { useKeyboardShortcuts } from "@/components/layout/KeyboardShortcuts"
import { useSearchStore } from "@/lib/store/useSearchStore"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  const openCommandPalette = useCallback(() => setCommandPaletteOpen(true), [])
  const closeCommandPalette = useCallback(() => setCommandPaletteOpen(false), [])
  const toggleSearch = useSearchStore((s) => s.toggleSearch)
  const searchOpen = useSearchStore((s) => s.searchOpen)
  const closeSearch = useSearchStore((s) => s.closeSearch)

  useKeyboardShortcuts([
    { key: "k", ctrl: true, handler: openCommandPalette, description: "فتح لوحة الأوامر" },
    { key: "/", ctrl: true, handler: toggleSearch, description: "فتح البحث العام" },
  ])

  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <div className="flex-1 min-w-0 p-6 lg:p-8">
          <DemoBanner />
          {children}
        </div>
      </div>
      <CommandPalette isOpen={commandPaletteOpen} onClose={closeCommandPalette} />
      <GlobalSearch isOpen={searchOpen} onClose={closeSearch} />
    </div>
  )
}
