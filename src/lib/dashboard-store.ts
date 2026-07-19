"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface DashboardWidget {
  id: string
  type: string
  title: string
  visible: boolean
  order: number
  size: "full" | "half" | "third"
}

interface DashboardState {
  widgets: DashboardWidget[]
  setWidgets: (widgets: DashboardWidget[]) => void
  toggleWidget: (id: string) => void
  updateWidgetSize: (id: string, size: "full" | "half" | "third") => void
  reorderWidgets: (sourceIndex: number, destIndex: number) => void
  resetLayout: () => void
}

const defaultWidgets: DashboardWidget[] = [
  { id: "stats", type: "stats", title: "إحصائيات سريعة", visible: true, order: 0, size: "full" },
  { id: "revenue", type: "chart", title: "الإيرادات", visible: true, order: 1, size: "half" },
  { id: "student-growth", type: "chart", title: "نمو الطلاب", visible: true, order: 2, size: "half" },
  { id: "calendar", type: "calendar", title: "التقويم", visible: true, order: 3, size: "half" },
  { id: "recent-activity", type: "activity", title: "آخر النشاطات", visible: true, order: 4, size: "full" },
  { id: "course-performance", type: "table", title: "أداء الكورسات", visible: true, order: 5, size: "full" },
  { id: "notifications", type: "notifications", title: "الإشعارات", visible: true, order: 6, size: "half" },
  { id: "quick-actions", type: "actions", title: "إجراءات سريعة", visible: true, order: 7, size: "half" },
  { id: "homework-pending", type: "pending", title: "واجبات بانتظار التصحيح", visible: true, order: 8, size: "half" },
  { id: "low-performance", type: "risk", title: "طلاب ضعيفو الأداء", visible: true, order: 9, size: "half" },
  { id: "upcoming-exams", type: "exams", title: "الامتحانات القادمة", visible: true, order: 10, size: "half" },
  { id: "system-health", type: "system", title: "حالة النظام", visible: true, order: 11, size: "third" },
  { id: "recent-enrollments", type: "enrollments", title: "آخر التسجيلات", visible: true, order: 12, size: "half" },
  { id: "weather", type: "weather", title: "الطقس", visible: false, order: 13, size: "third" },
  { id: "clock", type: "clock", title: "الساعة", visible: false, order: 14, size: "third" },
]

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set) => ({
      widgets: defaultWidgets,
      setWidgets: (widgets) => set({ widgets }),
      toggleWidget: (id) => set((state) => ({
        widgets: state.widgets.map((w) => w.id === id ? { ...w, visible: !w.visible } : w),
      })),
      updateWidgetSize: (id, size) => set((state) => ({
        widgets: state.widgets.map((w) => w.id === id ? { ...w, size } : w),
      })),
      reorderWidgets: (sourceIndex, destIndex) => set((state) => {
        const visible = state.widgets.filter((w) => w.visible).sort((a, b) => a.order - b.order)
        const hidden = state.widgets.filter((w) => !w.visible)
        if (sourceIndex < 0 || sourceIndex >= visible.length || destIndex < 0 || destIndex >= visible.length) return state
        const [moved] = visible.splice(sourceIndex, 1)
        visible.splice(destIndex, 0, moved)
        const reordered = visible.map((w, i) => ({ ...w, order: i }))
        const allWidgets = reordered.concat(hidden.map((w, i) => ({ ...w, order: reordered.length + i })))
        return { widgets: allWidgets }
      }),
      resetLayout: () => set({ widgets: defaultWidgets }),
    }),
    { name: "dashboard-layout" }
  )
)
