"use client"

import { useThemeStore } from "../../lib/store/useThemeStore"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface RevenueChartProps {
  data: { month: string; revenue: number }[]
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const { theme } = useThemeStore()
  const isDark = theme === "dark"

  const textColor = isDark ? "#CBD5E1" : "#475569"
  const gridColor = isDark ? "#334155" : "#E2E8F0"
  const primaryColor = "#6366F1"

  return (
    <div className="bg-surface rounded-xl border border-border p-5">
      <h3 className="text-base font-semibold text-text mb-4">الإيرادات الشهرية</h3>
      <div dir="ltr" className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: textColor, fontSize: 12 }} axisLine={{ stroke: gridColor }} tickLine={false} />
            <YAxis tick={{ fill: textColor, fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: isDark ? "#1E293B" : "#FFFFFF",
                border: `1px solid ${gridColor}`,
                borderRadius: "8px",
                color: isDark ? "#F8FAFC" : "#0F172A",
                fontSize: "13px",
              }}
            />
            <Line type="monotone" dataKey="revenue" stroke={primaryColor} strokeWidth={2.5} dot={{ fill: primaryColor, r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
