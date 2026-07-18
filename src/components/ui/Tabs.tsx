"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface Tab {
  id: string
  label: string
  icon?: React.ReactNode
  count?: number
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  onChange?: (tabId: string) => void
  children: (activeTab: string) => React.ReactNode
  className?: string
}

export function Tabs({ tabs, defaultTab, onChange, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || "")

  return (
    <div className={cn(className)}>
      <div className="flex gap-1 border-b border-border mb-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); onChange?.(tab.id) }}
            className={cn(
              "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-all duration-200",
              activeTab === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-text-tertiary hover:text-text-secondary hover:border-border"
            )}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className={cn(
                "text-xs px-2 py-0.5 rounded-full",
                activeTab === tab.id ? "bg-primary-100 text-primary-700" : "bg-surface-tertiary text-text-tertiary"
              )}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
      {children(activeTab)}
    </div>
  )
}

export function TabPanel({ id, activeTab, children }: { id: string; activeTab: string; children: React.ReactNode }) {
  return activeTab === id ? <div>{children}</div> : null
}
