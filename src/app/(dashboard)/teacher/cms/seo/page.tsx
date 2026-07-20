"use client"

import { useState, useMemo } from "react"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import {
  HiOutlineSearchCircle,
  HiOutlinePhotograph,
  HiOutlineGlobe,
  HiOutlineSave,
  HiOutlineRefresh,
  HiOutlineUpload,
  HiOutlineX,
  HiOutlineEye,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar } from "@/components/ui/Avatar"
import Input from "@/components/ui/Input"
import Textarea from "@/components/ui/Textarea"
import Button from "@/components/ui/Button"
import { mockCmsPages } from "@/lib/mock/data"
import { cn } from "@/lib/utils"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

export default function SeoPage() {
  const [seo, setSeo] = useState(mockCmsPages.seo)
  const [ogPreview, setOgPreview] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [newKeyword, setNewKeyword] = useState("")

  const keywords = useMemo(() => seo.keywords.split(",").map((k) => k.trim()).filter(Boolean), [seo.keywords])

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setSeo((prev) => ({ ...prev, keywords: [...keywords, newKeyword.trim()].join(", ") }))
      setNewKeyword("")
    }
  }

  const removeKeyword = (kw: string) => {
    setSeo((prev) => ({ ...prev, keywords: keywords.filter((k) => k !== kw).join(", ") }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    toast.success("طھظ… ط­ظپط¸ ط¥ط¹ط¯ط§ط¯ط§طھ SEO ط¨ظ†ط¬ط§ط­")
  }

  const handleReset = () => {
    setSeo(mockCmsPages.seo)
    setOgPreview(null)
  }

  const titleLength = seo.title.length
  const descLength = seo.description.length

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آ­ط·ع¾ط¸ث†ط¸â€°", href: "/teacher/cms" }, { label: "ط·ع¾ط·آ­ط·آ³ط¸ظ¹ط¸â€  ط¸â€¦ط·آ­ط·آ±ط¸ئ’ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ¨ط·آ­ط·آ«" }]} />
      <DashboardHeader title="ط·آ¥ط·آ¹ط·آ¯ط·آ§ط·آ¯ط·آ§ط·ع¾ SEO" subtitle="ط·ع¾ط·آ­ط·آ³ط¸ظ¹ط¸â€  ط¸â€¦ط·آ­ط·آ±ط¸ئ’ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ¨ط·آ­ط·آ« ط¸ث†ط·آ§ط¸â€‍ط·آ¨ط¸ظ¹ط·آ§ط¸â€ ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸ث†ط·آµط¸ظ¾ط¸ظ¹ط·آ© ط¸â€‍ط¸â€‍ط¸â€¦ط¸ث†ط¸â€ڑط·آ¹" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlineSearchCircle className="w-5 h-5 text-primary" />
                <CardTitle>ط·آ§ط¸â€‍ط·آ¨ط¸ظ¹ط·آ§ط¸â€ ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸ث†ط·آµط¸ظ¾ط¸ظ¹ط·آ©</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  label="ط·آ¹ط¸â€ ط¸ث†ط·آ§ط¸â€  ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط¸â€ڑط·آ¹ (Meta Title)"
                  value={seo.title}
                  onChange={(e) => setSeo({ ...seo, title: e.target.value })}
                />
                <div className="flex items-center justify-between mt-1">
                  <span className={cn("text-xs", titleLength > 60 ? "text-error" : "text-text-tertiary")}>
                    {titleLength}/60 ط·آ­ط·آ±ط¸ظ¾
                  </span>
                  <div className="w-32 h-1 bg-surface-tertiary rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all", titleLength > 60 ? "bg-error" : titleLength > 50 ? "bg-warning" : "bg-success")} style={{ width: `${Math.min((titleLength / 60) * 100, 100)}%` }} />
                  </div>
                </div>
              </div>

              <div>
                <Textarea
                  label="ط·آ§ط¸â€‍ط¸ث†ط·آµط¸ظ¾ (Meta Description)"
                  value={seo.description}
                  onChange={(e) => setSeo({ ...seo, description: e.target.value })}
                  rows={3}
                />
                <div className="flex items-center justify-between mt-1">
                  <span className={cn("text-xs", descLength > 160 ? "text-error" : "text-text-tertiary")}>
                    {descLength}/160 ط·آ­ط·آ±ط¸ظ¾
                  </span>
                  <div className="w-32 h-1 bg-surface-tertiary rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full transition-all", descLength > 160 ? "bg-error" : descLength > 140 ? "bg-warning" : "bg-success")} style={{ width: `${Math.min((descLength / 160) * 100, 100)}%` }} />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-2">ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍ط¸â€¦ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸â€¦ط¸ظ¾ط·ع¾ط·آ§ط·آ­ط¸ظ¹ط·آ©</label>
                <div className="flex items-center gap-2 mb-2">
                  <Input
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="ط·آ£ط·آ¯ط·آ®ط¸â€‍ ط¸ئ’ط¸â€‍ط¸â€¦ط·آ© ط¸â€¦ط¸ظ¾ط·ع¾ط·آ§ط·آ­ط¸ظ¹ط·آ©..."
                    onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                  />
                  <Button variant="primary" size="md" onClick={addKeyword}>ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط·آ©</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((kw) => (
                    <span key={kw} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 text-xs font-medium">
                      {kw}
                      <button type="button" onClick={() => removeKeyword(kw)} className="hover:text-error transition-colors">
                        <HiOutlineX className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlinePhotograph className="w-5 h-5 text-primary" />
                <CardTitle>ط·آµط¸ث†ط·آ±ط·آ© OG (Open Graph)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div
                onClick={() => document.getElementById("og-upload")?.click()}
                className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary-50/30 transition-all"
              >
                <input id="og-upload" type="file" accept="image/*" className="hidden" onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = (ev) => setOgPreview(ev.target?.result as string)
                    reader.readAsDataURL(file)
                  }
                }} />
                {ogPreview ? (
                  <img src={ogPreview} alt="OG Preview" className="max-h-32 mx-auto rounded-lg" />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <HiOutlineUpload className="w-8 h-8 text-text-tertiary" />
                    <p className="text-sm text-text-tertiary">ط·آ§ط¸â€ ط¸â€ڑط·آ± ط¸â€‍ط·آ±ط¸ظ¾ط·آ¹ ط·آµط¸ث†ط·آ±ط·آ© OG</p>
                    <Badge variant="neutral" size="sm">1200ط£â€”630 ط·آ¨ط¸ئ’ط·آ³ط¸â€‍</Badge>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlineGlobe className="w-5 h-5 text-primary" />
                <CardTitle>ط·آ¥ط·آ¹ط·آ¯ط·آ§ط·آ¯ط·آ§ط·ع¾ ط·آ¥ط·آ¶ط·آ§ط¸ظ¾ط¸ظ¹ط·آ©</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="ط·آ­ط·آ³ط·آ§ط·آ¨ Twitter/X"
                value={seo.twitterHandle}
                onChange={(e) => setSeo({ ...seo, twitterHandle: e.target.value })}
                placeholder="@username"
                dir="ltr"
              />
              <Input
                label="Google Analytics ID"
                value={seo.googleAnalyticsId}
                onChange={(e) => setSeo({ ...seo, googleAnalyticsId: e.target.value })}
                placeholder="UA-XXXXXXXXX-X"
                dir="ltr"
              />
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-text-secondary">ط·ع¾ط¸ظ¾ط·آ¹ط¸ظ¹ط¸â€‍ Sitemap</span>
                <button type="button"
                  onClick={() => setSeo({ ...seo, enableSitemap: !seo.enableSitemap })}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative",
                    seo.enableSitemap ? "bg-primary" : "bg-surface-tertiary"
                  )}
                >
                  <span className={cn(
                    "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",
                    seo.enableSitemap ? "translate-x-6" : "translate-x-0.5"
                  )} />
                </button>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-text-secondary">ط·ع¾ط¸ظ¾ط·آ¹ط¸ظ¹ط¸â€‍ Robots.txt</span>
                <button type="button"
                  onClick={() => setSeo({ ...seo, enableRobots: !seo.enableRobots })}
                  className={cn(
                    "w-12 h-6 rounded-full transition-colors relative",
                    seo.enableRobots ? "bg-primary" : "bg-surface-tertiary"
                  )}
                >
                  <span className={cn(
                    "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform",
                    seo.enableRobots ? "translate-x-6" : "translate-x-0.5"
                  )} />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlineEye className="w-5 h-5 text-primary" />
                <CardTitle>ط¸â€¦ط·آ¹ط·آ§ط¸ظ¹ط¸â€ ط·آ© ط·آ§ط¸â€‍ط·آ¨ط·آ­ط·آ«</CardTitle>
                <CardDescription>ط¸ئ’ط¸ظ¹ط¸ظ¾ ط·آ³ط¸ظ¹ط·آ¸ط¸â€،ط·آ± ط¸â€¦ط¸ث†ط¸â€ڑط·آ¹ط¸ئ’ ط¸ظ¾ط¸ظ¹ ط¸â€ ط·ع¾ط·آ§ط·آ¦ط·آ¬ ط·آ§ط¸â€‍ط·آ¨ط·آ­ط·آ«</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm">
                <p className="text-xs text-green-700 mb-1">{seo.title ? "teacher-os.com/" : ""}</p>
                <h3 className="text-sm font-semibold text-blue-700 hover:underline cursor-pointer line-clamp-1">
                  {seo.title || "ط·آ¹ط¸â€ ط¸ث†ط·آ§ط¸â€  ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط¸â€ڑط·آ¹"}
                </h3>
                <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                  {seo.description || "ط¸ث†ط·آµط¸ظ¾ ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط¸â€ڑط·آ¹"}
                </p>
                {keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {keywords.slice(0, 4).map((kw) => (
                      <span key={kw} className="text-xs text-text-tertiary">ط¢آ· {kw}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs font-medium text-text-secondary mb-2">ط¸â€¦ط¸â€‍ط·آ®ط·آµ SEO</p>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-text-tertiary">ط·آ§ط¸â€‍ط·آ¹ط¸â€ ط¸ث†ط·آ§ط¸â€ </span>
                    <span className={cn("font-medium", titleLength > 60 ? "text-error" : "text-success")}>{titleLength}/60</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-tertiary">ط·آ§ط¸â€‍ط¸ث†ط·آµط¸ظ¾</span>
                    <span className={cn("font-medium", descLength > 160 ? "text-error" : "text-success")}>{descLength}/160</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-tertiary">ط·آ§ط¸â€‍ط¸ئ’ط¸â€‍ط¸â€¦ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط¸â€¦ط¸ظ¾ط·ع¾ط·آ§ط·آ­ط¸ظ¹ط·آ©</span>
                    <span className="font-medium text-text">{keywords.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-tertiary">Sitemap</span>
                    <Badge variant={seo.enableSitemap ? "success" : "error"} size="sm">{seo.enableSitemap ? "ط¸â€¦ط¸ظ¾ط·آ¹ط¸â€‍" : "ط¸â€¦ط·آ¹ط·آ·ط¸â€‍"}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-tertiary">Robots.txt</span>
                    <Badge variant={seo.enableRobots ? "success" : "error"} size="sm">{seo.enableRobots ? "ط¸â€¦ط¸ظ¾ط·آ¹ط¸â€‍" : "ط¸â€¦ط·آ¹ط·آ·ط¸â€‍"}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-3">
              <Button variant="primary" className="flex-1" leftIcon={<HiOutlineSave className="w-4 h-4" />} onClick={handleSave}>
                {saved ? "ط·ع¾ط¸â€¦ ط·آ§ط¸â€‍ط·آ­ط¸ظ¾ط·آ¸!" : "ط·آ­ط¸ظ¾ط·آ¸"}
              </Button>
              <Button variant="secondary" leftIcon={<HiOutlineRefresh className="w-4 h-4" />} onClick={handleReset}>
                ط·آ¥ط·آ¹ط·آ§ط·آ¯ط·آ©
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
