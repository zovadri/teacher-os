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
  { key: "facebook", label: "ط¸ظ¾ط¸ظ¹ط·آ³ط·آ¨ط¸ث†ط¸ئ’", placeholder: "https://facebook.com/..." },
  { key: "twitter", label: "ط·ع¾ط¸ث†ط¸ظ¹ط·ع¾ط·آ±", placeholder: "https://twitter.com/..." },
  { key: "youtube", label: "ط¸ظ¹ط¸ث†ط·ع¾ط¸ظ¹ط¸ث†ط·آ¨", placeholder: "https://youtube.com/..." },
  { key: "whatsapp", label: "ط¸ث†ط·آ§ط·ع¾ط·آ³ط·آ§ط·آ¨", placeholder: "https://wa.me/..." },
  { key: "telegram", label: "ط·ع¾ط¸ظ¹ط¸â€‍ط¸ظ¹ط·آ¬ط·آ±ط·آ§ط¸â€¦", placeholder: "https://t.me/..." },
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
    toast.success("طھظ… ط­ظپط¸ ط§ظ„ط¹ظ„ط§ظ…ط© ط§ظ„طھط¬ط§ط±ظٹط© ط¨ظ†ط¬ط§ط­")
  }

  const handleReset = () => {
    setBranding(mockCmsPages.branding)
    setLogoPreview(null)
    setFaviconPreview(null)
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط·آ­ط·ع¾ط¸ث†ط¸â€°", href: "/teacher/cms" }, { label: "ط·آ§ط¸â€‍ط·آ¹ط¸â€‍ط·آ§ط¸â€¦ط·آ© ط·آ§ط¸â€‍ط·ع¾ط·آ¬ط·آ§ط·آ±ط¸ظ¹ط·آ©" }]} />
      <DashboardHeader title="ط·آ§ط¸â€‍ط·آ¹ط¸â€‍ط·آ§ط¸â€¦ط·آ© ط·آ§ط¸â€‍ط·ع¾ط·آ¬ط·آ§ط·آ±ط¸ظ¹ط·آ©" subtitle="ط·آ¥ط·آ¯ط·آ§ط·آ±ط·آ© ط·آ§ط¸â€‍ط·آ´ط·آ¹ط·آ§ط·آ± ط¸ث†ط·آ§ط¸â€‍ط·آ§ط·آ³ط¸â€¦ ط¸ث†ط·آ§ط¸â€‍ط·آ±ط¸ث†ط·آ§ط·آ¨ط·آ· ط·آ§ط¸â€‍ط·آ§ط·آ¬ط·ع¾ط¸â€¦ط·آ§ط·آ¹ط¸ظ¹ط·آ©" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlinePhotograph className="w-5 h-5 text-primary" />
                <CardTitle>ط·آ§ط¸â€‍ط·آ´ط·آ¹ط·آ§ط·آ± ط¸ث†ط·آ§ط¸â€‍ط¸ظ¾ط·آ§ط¸ظ¾ط¸ظ¹ط¸ئ’ط¸ث†ط¸â€ </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm font-medium text-text mb-2">ط·آ´ط·آ¹ط·آ§ط·آ± ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط¸â€ڑط·آ¹ (Logo)</p>
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
                      <p className="text-sm text-text-tertiary">ط·آ§ط¸â€ ط¸â€ڑط·آ± ط¸â€‍ط·آ±ط¸ظ¾ط·آ¹ ط·آ§ط¸â€‍ط·آ´ط·آ¹ط·آ§ط·آ±</p>
                      <Badge variant="neutral" size="sm">PNG, SVG, JPG</Badge>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-text mb-2">ط·آ£ط¸ظ¹ط¸â€ڑط¸ث†ط¸â€ ط·آ© ط·آ§ط¸â€‍ط¸â€¦ط¸ث†ط¸â€ڑط·آ¹ (Favicon)</p>
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
                      <p className="text-xs text-text-tertiary">ط·آ±ط¸ظ¾ط·آ¹ ط·آ§ط¸â€‍ط¸ظ¾ط·آ§ط¸ظ¾ط¸ظ¹ط¸ئ’ط¸ث†ط¸â€ </p>
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
                <CardTitle>ط¸â€¦ط·آ¹ط¸â€‍ط¸ث†ط¸â€¦ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ¹ط¸â€‍ط·آ§ط¸â€¦ط·آ© ط·آ§ط¸â€‍ط·ع¾ط·آ¬ط·آ§ط·آ±ط¸ظ¹ط·آ©</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="ط·آ§ط·آ³ط¸â€¦ ط·آ§ط¸â€‍ط·آ¹ط¸â€‍ط·آ§ط¸â€¦ط·آ© ط·آ§ط¸â€‍ط·ع¾ط·آ¬ط·آ§ط·آ±ط¸ظ¹ط·آ©"
                value={branding.brandName}
                onChange={(e) => setBranding({ ...branding, brandName: e.target.value })}
                leftIcon={<HiOutlineGlobe className="w-4 h-4" />}
              />
              <Input
                label="ط·آ§ط¸â€‍ط·آ´ط·آ¹ط·آ§ط·آ± (Slogan)"
                value={branding.brandSlogan}
                onChange={(e) => setBranding({ ...branding, brandSlogan: e.target.value })}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <HiOutlineLink className="w-5 h-5 text-primary" />
                <CardTitle>ط·آ±ط¸ث†ط·آ§ط·آ¨ط·آ· ط·آ§ط¸â€‍ط·ع¾ط¸ث†ط·آ§ط·آµط¸â€‍ ط·آ§ط¸â€‍ط·آ§ط·آ¬ط·ع¾ط¸â€¦ط·آ§ط·آ¹ط¸ظ¹</CardTitle>
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
                <CardTitle>ط¸â€¦ط·آ¹ط¸â€‍ط¸ث†ط¸â€¦ط·آ§ط·ع¾ ط·آ§ط¸â€‍ط·آ§ط·ع¾ط·آµط·آ§ط¸â€‍</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="ط·آ§ط¸â€‍ط·آ¨ط·آ±ط¸ظ¹ط·آ¯ ط·آ§ط¸â€‍ط·آ¥ط¸â€‍ط¸ئ’ط·ع¾ط·آ±ط¸ث†ط¸â€ ط¸ظ¹"
                value={branding.contactEmail}
                onChange={(e) => setBranding({ ...branding, contactEmail: e.target.value })}
                leftIcon={<HiOutlineMail className="w-4 h-4" />}
                dir="ltr"
              />
              <Input
                label="ط·آ±ط¸â€ڑط¸â€¦ ط·آ§ط¸â€‍ط¸â€،ط·آ§ط·ع¾ط¸ظ¾"
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
              <CardTitle>ط¸â€¦ط·آ¹ط·آ§ط¸ظ¹ط¸â€ ط·آ© ط·آ§ط¸â€‍ط·آ¹ط¸â€‍ط·آ§ط¸â€¦ط·آ© ط·آ§ط¸â€‍ط·ع¾ط·آ¬ط·آ§ط·آ±ط¸ظ¹ط·آ©</CardTitle>
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
                <p className="text-xs text-text-tertiary mb-2">ط·آ§ط¸â€‍ط·آ¨ط·آ±ط¸ظ¹ط·آ¯</p>
                <p className="text-sm text-text font-medium" dir="ltr">{branding.contactEmail}</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-2">ط·آ§ط¸â€‍ط¸â€،ط·آ§ط·ع¾ط¸ظ¾</p>
                <p className="text-sm text-text font-medium" dir="ltr">{branding.contactPhone}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {Object.entries(branding.socialLinks).filter(([, v]) => v && v !== "#").map(([key]) => (
                  <Badge key={key} variant="info" size="sm">{key}</Badge>
                ))}
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
