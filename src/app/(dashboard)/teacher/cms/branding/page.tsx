"use client"

import { useState, useRef } from "react"
import toast from "react-hot-toast"
import { motion } from "framer-motion"
import {
  HiOutlinePhotograph,
  HiOutlineGlobe,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineSave,
  HiOutlineRefresh,
  HiOutlineUpload,
  HiOutlineLink,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Avatar } from "@/components/ui/Avatar"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import Input from "@/components/ui/Input"
import Textarea from "@/components/ui/Textarea"
import Button from "@/components/ui/Button"
import { mockCmsPages } from "@/lib/mock/data"

const socialFields = [
  { key: "facebook", label: "ظپظٹط³ط¨ظˆظƒ", placeholder: "https://facebook.com/..." },
  { key: "twitter", label: "طھظˆظٹطھط±", placeholder: "https://twitter.com/..." },
  { key: "youtube", label: "ظٹظˆطھظٹظˆط¨", placeholder: "https://youtube.com/..." },
  { key: "whatsapp", label: "ظˆط§طھط³ط§ط¨", placeholder: "https://wa.me/..." },
  { key: "telegram", label: "طھظٹظ„ظٹط¬ط±ط§ظ…", placeholder: "https://t.me/..." },
]

export default function BrandingPage() {
  const [branding, setBranding] = useState(mockCmsPages.branding)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const logoInputRef = useRef<HTMLInputElement>(null)
  const faviconInputRef = useRef<HTMLInputElement>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setLogoPreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setFaviconPreview(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const updateSocial = (key: string, value: string) => {
    setBranding((prev) => ({ ...prev, socialLinks: { ...prev.socialLinks, [key]: value } }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    toast.success("تم حفظ العلامة التجارية بنجاح")
  }

  const handleReset = () => {
    setBranding(mockCmsPages.branding)
    setLogoPreview(null)
    setFaviconPreview(null)
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "ط¥ط¯ط§ط±ط© ط§ظ„ظ…ط­طھظˆظ‰", href: "/teacher/cms" }, { label: "ط§ظ„ط¹ظ„ط§ظ…ط© ط§ظ„طھط¬ط§ط±ظٹط©" }]} />
      <DashboardHeader title="ط§ظ„ط¹ظ„ط§ظ…ط© ط§ظ„طھط¬ط§ط±ظٹط©" subtitle="ط¥ط¯ط§ط±ط© ط§ظ„ط´ط¹ط§ط± ظˆط§ظ„ط§ط³ظ… ظˆط§ظ„ط±ظˆط§ط¨ط· ط§ظ„ط§ط¬طھظ…ط§ط¹ظٹط©" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlinePhotograph className="w-5 h-5 text-primary" />
                <CardTitle>ط§ظ„ط´ط¹ط§ط± ظˆط§ظ„ظپط§ظپظٹظƒظˆظ†</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm font-medium text-text mb-2">ط´ط¹ط§ط± ط§ظ„ظ…ظˆظ‚ط¹ (Logo)</p>
                <div
                  onClick={() => logoInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 hover:bg-primary-50/30 transition-all"
                >
                  <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                  {logoPreview ? (
                    <img src={logoPreview} alt="Logo" className="max-h-24 mx-auto rounded-lg" />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <HiOutlineUpload className="w-8 h-8 text-text-tertiary" />
                      <p className="text-sm text-text-tertiary">ط§ظ†ظ‚ط± ظ„ط±ظپط¹ ط§ظ„ط´ط¹ط§ط±</p>
                      <Badge variant="neutral" size="sm">PNG, SVG, JPG</Badge>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-text mb-2">ط£ظٹظ‚ظˆظ†ط© ط§ظ„ظ…ظˆظ‚ط¹ (Favicon)</p>
                <div
                  onClick={() => faviconInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary/50 hover:bg-primary-50/30 transition-all w-40"
                >
                  <input ref={faviconInputRef} type="file" accept="image/*" onChange={handleFaviconUpload} className="hidden" />
                  {faviconPreview ? (
                    <img src={faviconPreview} alt="Favicon" className="w-12 h-12 mx-auto rounded-lg" />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <HiOutlineUpload className="w-6 h-6 text-text-tertiary" />
                      <p className="text-xs text-text-tertiary">ط±ظپط¹ ط§ظ„ظپط§ظپظٹظƒظˆظ†</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlineGlobe className="w-5 h-5 text-primary" />
                <CardTitle>ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ط¹ظ„ط§ظ…ط© ط§ظ„طھط¬ط§ط±ظٹط©</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="ط§ط³ظ… ط§ظ„ط¹ظ„ط§ظ…ط© ط§ظ„طھط¬ط§ط±ظٹط©"
                value={branding.brandName}
                onChange={(e) => setBranding({ ...branding, brandName: e.target.value })}
                leftIcon={<HiOutlineGlobe className="w-4 h-4" />}
              />
              <Input
                label="ط§ظ„ط´ط¹ط§ط± (Slogan)"
                value={branding.brandSlogan}
                onChange={(e) => setBranding({ ...branding, brandSlogan: e.target.value })}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlineLink className="w-5 h-5 text-primary" />
                <CardTitle>ط±ظˆط§ط¨ط· ط§ظ„طھظˆط§طµظ„ ط§ظ„ط§ط¬طھظ…ط§ط¹ظٹ</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {socialFields.map((field) => (
                <Input
                  key={field.key}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={(branding.socialLinks as Record<string, string>)[field.key] || ""}
                  onChange={(e) => updateSocial(field.key, e.target.value)}
                  dir="ltr"
                />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlineMail className="w-5 h-5 text-primary" />
                <CardTitle>ظ…ط¹ظ„ظˆظ…ط§طھ ط§ظ„ط§طھطµط§ظ„</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="ط§ظ„ط¨ط±ظٹط¯ ط§ظ„ط¥ظ„ظƒطھط±ظˆظ†ظٹ"
                value={branding.contactEmail}
                onChange={(e) => setBranding({ ...branding, contactEmail: e.target.value })}
                leftIcon={<HiOutlineMail className="w-4 h-4" />}
                dir="ltr"
              />
              <Input
                label="ط±ظ‚ظ… ط§ظ„ظ‡ط§طھظپ"
                value={branding.contactPhone}
                onChange={(e) => setBranding({ ...branding, contactPhone: e.target.value })}
                leftIcon={<HiOutlinePhone className="w-4 h-4" />}
                dir="ltr"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>ظ…ط¹ط§ظٹظ†ط© ط§ظ„ط¹ظ„ط§ظ…ط© ط§ظ„طھط¬ط§ط±ظٹط©</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-secondary border border-border">
                <Avatar
                  src={logoPreview || undefined}
                  name={branding.brandName}
                  size="lg"
                />
                <div>
                  <h3 className="font-bold text-text">{branding.brandName}</h3>
                  <p className="text-xs text-text-secondary">{branding.brandSlogan}</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-2">ط§ظ„ط¨ط±ظٹط¯</p>
                <p className="text-sm text-text font-medium" dir="ltr">{branding.contactEmail}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-2">ط§ظ„ظ‡ط§طھظپ</p>
                <p className="text-sm text-text font-medium" dir="ltr">{branding.contactPhone}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {Object.entries(branding.socialLinks).filter(([, v]) => v && v !== "#").map(([key]) => (
                  <Badge key={key} variant="info" size="sm">{key}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex gap-3">
              <button type="button" variant="primary" className="flex-1" leftIcon={<HiOutlineSave className="w-4 h-4" />} onClick={handleSave}>
                {saved ? "طھظ… ط§ظ„ط­ظپط¸!" : "ط­ظپط¸"}
              </Button>
              <button type="button" variant="secondary" leftIcon={<HiOutlineRefresh className="w-4 h-4" />} onClick={handleReset}>
                ط¥ط¹ط§ط¯ط©
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
