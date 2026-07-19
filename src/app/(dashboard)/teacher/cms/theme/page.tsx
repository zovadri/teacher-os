"use client"

import { useState, useMemo } from "react"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import {
  HiOutlineColorSwatch,
  HiOutlinePencil,
  HiOutlineTemplate,
  HiOutlinePhotograph,
  HiOutlineRefresh,
  HiOutlineSave,
  HiOutlineSun,
  HiOutlineMoon,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Button from "@/components/ui/Button"
import { mockCmsPages } from "@/lib/mock/data"
import { cn } from "@/lib/utils"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

const fontOptions = [
  { value: "Cairo", label: "Cairo" },
  { value: "Noto Sans Arabic", label: "Noto Sans Arabic" },
  { value: "Tajawal", label: "Tajawal" },
  { value: "Almarai", label: "Almarai" },
  { value: "Readex Pro", label: "Readex Pro" },
]

const radiusOptions = [
  { value: "rounded-none", label: "ط¨ط¯ظˆظ† طھط¯ظˆظٹط±" },
  { value: "rounded-sm", label: "طµط؛ظٹط±" },
  { value: "rounded-md", label: "ظ…طھظˆط³ط·" },
  { value: "rounded-lg", label: "ظƒط¨ظٹط±" },
  { value: "rounded-xl", label: "ظƒط¨ظٹط± ط¬ط¯ط§ظ‹" },
  { value: "rounded-2xl", label: "ط¶ط®ظ…" },
  { value: "rounded-full", label: "ط¯ط§ط¦ط±ظٹ ط¨ط§ظ„ظƒط§ظ…ظ„" },
]

const animationOptions = [
  { value: "none", label: "ط¨ط¯ظˆظ† ط­ط±ظƒط©" },
  { value: "subtle", label: "ط®ظپظٹظپ" },
  { value: "smooth", label: "ظ†ط§ط¹ظ…" },
  { value: "dynamic", label: "ط¯ظٹظ†ط§ظ…ظٹظƒظٹ" },
  { value: "playful", label: "ظ…ط±ط­" },
]

const layoutOptions = [
  { value: "boxed", label: "ظ…ط±ط¨ط¹ (Boxed)" },
  { value: "fullwidth", label: "ط¹ط±ط¶ ظƒط§ظ…ظ„" },
]

const headerOptions = [
  { value: "default", label: "ط§ظپطھط±ط§ط¶ظٹ" },
  { value: "glass", label: "ط²ط¬ط§ط¬ظٹ (Glass)" },
  { value: "solid", label: "طµظ„ط¨" },
  { value: "transparent", label: "ط´ظپط§ظپ" },
]

const footerOptions = [
  { value: "light", label: "ظپط§طھط­" },
  { value: "dark", label: "ط¯ط§ظƒظ†" },
  { value: "colored", label: "ظ…ظ„ظˆظ†" },
]

export default function ThemePage() {
  const [theme, setTheme] = useState(mockCmsPages.theme)
  const [saved, setSaved] = useState(false)

  const previewStyle = useMemo(() => ({
    fontFamily: theme.fontFamily,
    borderRadius: theme.borderRadius === "rounded-none" ? "0" : theme.borderRadius === "rounded-sm" ? "2px" : theme.borderRadius === "rounded-md" ? "6px" : theme.borderRadius === "rounded-lg" ? "8px" : theme.borderRadius === "rounded-xl" ? "12px" : theme.borderRadius === "rounded-2xl" ? "16px" : "9999px",
  }), [theme])

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    toast.success("تم حفظ المظهر بنجاح")
  }

  const handleReset = () => {
    setTheme(mockCmsPages.theme)
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "ط¥ط¯ط§ط±ط© ط§ظ„ظ…ط­طھظˆظ‰", href: "/teacher/cms" }, { label: "ط§ظ„ظ…ط¸ظ‡ط±" }]} />
      <DashboardHeader title="ط¥ط¹ط¯ط§ط¯ط§طھ ط§ظ„ظ…ط¸ظ‡ط±" subtitle="طھط®طµظٹطµ ط£ظ„ظˆط§ظ† ط§ظ„ظ…ظ†طµط© ظˆط§ظ„ط®ط·ظˆط· ظˆط§ظ„ط£ظ†ظ…ط§ط·" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlineColorSwatch className="w-5 h-5 text-primary" />
                <CardTitle>ط§ظ„ط£ظ„ظˆط§ظ†</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text mb-2">ط§ظ„ظ„ظˆظ† ط§ظ„ط£ط³ط§ط³ظٹ</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.primaryColor}
                    onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                    className="w-12 h-12 rounded-xl border border-border cursor-pointer bg-transparent"
                  />
                  <Input value={theme.primaryColor} onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })} className="flex-1" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-2">ط§ظ„ظ„ظˆظ† ط§ظ„ط«ط§ظ†ظˆظٹ</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={theme.secondaryColor}
                    onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
                    className="w-12 h-12 rounded-xl border border-border cursor-pointer bg-transparent"
                  />
                  <Input value={theme.secondaryColor} onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })} className="flex-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlinePencil className="w-5 h-5 text-primary" />
                <CardTitle>ط§ظ„ط®ط·ظˆط· ظˆط§ظ„ط£ظ†ظ…ط§ط·</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select label="ظ†ظˆط¹ ط§ظ„ط®ط·" options={fontOptions} value={theme.fontFamily} onChange={(e) => setTheme({ ...theme, fontFamily: e.target.value })} />
              <Select label="طھط¯ظˆظٹط± ط§ظ„ط²ظˆط§ظٹط§" options={radiusOptions} value={theme.borderRadius} onChange={(e) => setTheme({ ...theme, borderRadius: e.target.value })} />
              <Select label="ظ†ظ…ط· ط§ظ„ط­ط±ظƒط©" options={animationOptions} value={theme.animationStyle} onChange={(e) => setTheme({ ...theme, animationStyle: e.target.value })} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlineTemplate className="w-5 h-5 text-primary" />
                <CardTitle>ط§ظ„طھط®ط·ظٹط·</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select label="ط¹ط±ط¶ ط§ظ„طھط®ط·ظٹط·" options={layoutOptions} value={theme.layoutWidth} onChange={(e) => setTheme({ ...theme, layoutWidth: e.target.value })} />
              <Select label="ظ†ظ…ط· ط§ظ„ط±ط£ط³" options={headerOptions} value={theme.headerStyle} onChange={(e) => setTheme({ ...theme, headerStyle: e.target.value })} />
              <Select label="ظ†ظ…ط· ط§ظ„طھط°ظٹظٹظ„" options={footerOptions} value={theme.footerStyle} onChange={(e) => setTheme({ ...theme, footerStyle: e.target.value })} />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlinePhotograph className="w-5 h-5 text-primary" />
                <CardTitle>ظ…ط¹ط§ظٹظ†ط© ط­ظٹط©</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className="rounded-xl border-2 border-border overflow-hidden transition-all"
                style={{ fontFamily: previewStyle.fontFamily }}
              >
                <div className={`p-4 ${theme.headerStyle === "glass" ? "bg-white/80 backdrop-blur-sm" : theme.headerStyle === "solid" ? "bg-white" : theme.headerStyle === "transparent" ? "bg-transparent" : "bg-gray-100"} border-b border-border`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: theme.primaryColor }}>T</div>
                      <span className="font-bold text-sm">TeacherOS</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-text-tertiary" />
                      <div className="w-2 h-2 rounded-full bg-text-tertiary" />
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4 bg-white">
                  <div className="flex gap-3">
                    {["ط§ظ„ط±ط¦ظٹط³ظٹط©", "ط§ظ„ظƒظˆط±ط³ط§طھ", "ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ"].map((t) => (
                      <span key={t} className="text-xs text-text-secondary hover:text-text cursor-pointer transition-colors">{t}</span>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-3/4 rounded-full bg-gray-200" style={{ borderRadius: previewStyle.borderRadius }} />
                    <div className="h-3 w-1/2 rounded-full bg-gray-100" style={{ borderRadius: previewStyle.borderRadius }} />
                    <div className="flex gap-2">
                      <button type="button" className="px-4 py-2 text-white text-xs rounded-lg" style={{ backgroundColor: theme.primaryColor, borderRadius: previewStyle.borderRadius }}>ط§ط¨ط¯ط£ ط§ظ„ط¢ظ†</button>
                      <button type="button" className="px-4 py-2 text-xs rounded-lg border border-gray-200" style={{ borderRadius: previewStyle.borderRadius }}>ط§ط¹ط±ظپ ط§ظ„ظ…ط²ظٹط¯</button>
                    </div>
                  </div>
                </div>
                <div className={`p-3 text-center text-xs ${theme.footerStyle === "dark" ? "bg-gray-900 text-white" : theme.footerStyle === "colored" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                  آ© 2025 TeacherOS. ط¬ظ…ظٹط¹ ط§ظ„ط­ظ‚ظˆظ‚ ظ…ط­ظپظˆط¸ط©.
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-3">
              <button type="button" variant="primary" className="flex-1" leftIcon={<HiOutlineSave className="w-4 h-4" />} onClick={handleSave}>
                {saved ? "طھظ… ط§ظ„ط­ظپط¸!" : "ط­ظپط¸ ط§ظ„طھط؛ظٹظٹط±ط§طھ"}
              </Button>
              <button type="button" variant="secondary" leftIcon={<HiOutlineRefresh className="w-4 h-4" />} onClick={handleReset}>
                ط¥ط¹ط§ط¯ط© طھط¹ظٹظٹظ†
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
