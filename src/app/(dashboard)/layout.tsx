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
    <div className="flex min-h-screen bg-surface-secondary">
      <DashboardSidebar />
      <div className="flex-1 lg:mr-[280px] min-w-0">
        <DemoBanner />
        {children}
      </div>
      <CommandPalette isOpen={commandPaletteOpen} onClose={closeCommandPalette} />
      <GlobalSearch isOpen={searchOpen} onClose={closeSearch} />
    </div>
  )
}
