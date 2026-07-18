"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineUser,
  HiOutlineLockClosed,
  HiOutlineBell,
  HiOutlineCamera,
  HiOutlineSave,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineGlobe,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import Textarea from "@/components/ui/Textarea"
import Select from "@/components/ui/Select"
import Button from "@/components/ui/Button"
import { Avatar } from "@/components/ui/Avatar"
import { mockTeacher } from "@/lib/mock/data"
import { cn } from "@/lib/utils"

const tabsConfig = [
  { id: "profile", label: "الملف الشخصي", icon: <HiOutlineUser size={18} /> },
  { id: "account", label: "الحساب", icon: <HiOutlineLockClosed size={18} /> },
  { id: "notifications", label: "الإشعارات", icon: <HiOutlineBell size={18} /> },
]

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    name: mockTeacher.name,
    email: mockTeacher.email,
    phone: mockTeacher.phone,
    bio: mockTeacher.bio,
    experience: String(mockTeacher.experience),
  })

  const [account, setAccount] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    language: "ar",
    theme: "system" as "light" | "dark" | "system",
  })

  const [notifSettings, setNotifSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    examReminders: true,
    homeworkReminders: true,
    marketingEmails: false,
    newStudentAlerts: true,
    paymentAlerts: true,
  })

  const [saving, setSaving] = useState<string | null>(null)

  const handleSave = async (section: string) => {
    setSaving(section)
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(null)
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="الإعدادات" />

      <Tabs tabs={tabsConfig} defaultTab="profile">
        {(activeTab) => (
          <>
            <TabPanel id="profile" activeTab={activeTab}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>الصورة الشخصية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <Avatar src={mockTeacher.avatar} name={mockTeacher.name} size="xl" />
                        <button className="absolute -bottom-1 -left-1 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary-dark transition-colors">
                          <HiOutlineCamera size={16} />
                        </button>
                      </div>
                      <div>
                        <p className="font-medium text-text">{mockTeacher.name}</p>
                        <p className="text-sm text-text-secondary">{mockTeacher.email}</p>
                        <p className="text-xs text-text-tertiary mt-1">JPG, PNG أو WEBP. حجم أقصى 2MB</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>المعلومات الشخصية</CardTitle>
                    <CardDescription>قم بتحديث معلوماتك الشخصية</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="الاسم الكامل" value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} />
                      <Input label="البريد الإلكتروني" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} leftIcon={<HiOutlineMail />} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="رقم الهاتف" value={profile.phone} onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))} leftIcon={<HiOutlinePhone />} />
                      <Input label="سنوات الخبرة" type="number" value={profile.experience} onChange={(e) => setProfile((p) => ({ ...p, experience: e.target.value }))} />
                    </div>
                    <Textarea label="نبذة عني" value={profile.bio} onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))} />
                  </CardContent>
                  <CardFooter>
                    <Button variant="primary" leftIcon={saving === "profile" ? undefined : <HiOutlineSave size={18} />} isLoading={saving === "profile"} onClick={() => handleSave("profile")}>
                      حفظ التغييرات
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabPanel>

            <TabPanel id="account" activeTab={activeTab}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>تغيير كلمة المرور</CardTitle>
                    <CardDescription>استخدم كلمة مرور قوية مكونة من 8 أحرف على الأقل</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input label="كلمة المرور الحالية" type="password" value={account.currentPassword} onChange={(e) => setAccount((a) => ({ ...a, currentPassword: e.target.value }))} />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="كلمة المرور الجديدة" type="password" value={account.newPassword} onChange={(e) => setAccount((a) => ({ ...a, newPassword: e.target.value }))} />
                      <Input label="تأكيد كلمة المرور" type="password" value={account.confirmPassword} onChange={(e) => setAccount((a) => ({ ...a, confirmPassword: e.target.value }))} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="primary" leftIcon={<HiOutlineSave size={18} />} isLoading={saving === "password"} onClick={() => handleSave("password")}>
                      تغيير كلمة المرور
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات الحساب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Select label="اللغة" value={account.language} onChange={(e) => setAccount((a) => ({ ...a, language: e.target.value }))} options={[{ value: "ar", label: "العربية" }, { value: "en", label: "English" }]} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-text mb-3">الوضع الليلي</p>
                      <div className="flex items-center gap-3">
                        {(["light", "dark", "system"] as const).map((t) => (
                          <button key={t} onClick={() => setAccount((a) => ({ ...a, theme: t }))}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                              account.theme === t ? "bg-primary/10 border-primary text-primary" : "border-border text-text-secondary hover:border-primary/30"
                            }`}>
                            {t === "light" ? <HiOutlineSun size={16} /> : t === "dark" ? <HiOutlineMoon size={16} /> : <HiOutlineGlobe size={16} />}
                            {t === "light" ? "فاتح" : t === "dark" ? "داكن" : "النظام"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="primary" leftIcon={<HiOutlineSave size={18} />} isLoading={saving === "account"} onClick={() => handleSave("account")}>
                      حفظ الإعدادات
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabPanel>

            <TabPanel id="notifications" activeTab={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الإشعارات</CardTitle>
                  <CardDescription>تحكم في الإشعارات التي ترغب في تلقيها</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-text mb-3">وسائل الإشعار</h4>
                    <div className="space-y-3">
                      {[
                        { key: "emailNotifications", label: "الإشعارات عبر البريد الإلكتروني", desc: "تلقي الإشعارات على بريدك الإلكتروني" },
                        { key: "pushNotifications", label: "إشعارات المتصفح", desc: "تلقي إشعارات فورية من المتصفح" },
                        { key: "smsNotifications", label: "إشعارات SMS", desc: "تلقي رسائل نصية على هاتفك" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-surface-secondary border border-border">
                          <div>
                            <p className="text-sm font-medium text-text">{item.label}</p>
                            <p className="text-xs text-text-tertiary">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => setNotifSettings((p) => ({ ...p, [item.key]: !(p as any)[item.key] }))}
                            className={`relative w-11 h-6 rounded-full transition-colors ${(notifSettings as any)[item.key] ? "bg-primary" : "bg-surface-tertiary"}`}
                          >
                            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${(notifSettings as any)[item.key] ? "translate-x-0.5" : "translate-x-[22px]"}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-text mb-3">أنواع الإشعارات</h4>
                    <div className="space-y-3">
                      {[
                        { key: "examReminders", label: "تذكير الامتحانات", desc: "إشعارات قبل موعد الامتحان" },
                        { key: "homeworkReminders", label: "تذكير الواجبات", desc: "إشعارات عند اقتراب موعد تسليم الواجب" },
                        { key: "newStudentAlerts", label: "طلاب جدد", desc: "إشعارات عند تسجيل طلاب جدد" },
                        { key: "paymentAlerts", label: "إشعارات الدفع", desc: "إشعارات عند إتمام عملية دفع" },
                        { key: "marketingEmails", label: "العروض الترويجية", desc: "تلقي عروض وخصومات خاصة" },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-surface-secondary border border-border">
                          <div>
                            <p className="text-sm font-medium text-text">{item.label}</p>
                            <p className="text-xs text-text-tertiary">{item.desc}</p>
                          </div>
                          <button
                            onClick={() => setNotifSettings((p) => ({ ...p, [item.key]: !(p as any)[item.key] }))}
                            className={`relative w-11 h-6 rounded-full transition-colors ${(notifSettings as any)[item.key] ? "bg-primary" : "bg-surface-tertiary"}`}
                          >
                            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${(notifSettings as any)[item.key] ? "translate-x-0.5" : "translate-x-[22px]"}`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="primary" leftIcon={<HiOutlineSave size={18} />} isLoading={saving === "notifications"} onClick={() => handleSave("notifications")}>
                    حفظ إعدادات الإشعارات
                  </Button>
                </CardFooter>
              </Card>
            </TabPanel>
          </>
        )}
      </Tabs>
    </div>
  )
}
