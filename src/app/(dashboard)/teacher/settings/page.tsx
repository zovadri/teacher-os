"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Settings2, Bell, CreditCard, Shield, Link2, Save, Eye, EyeOff,
  ChevronLeft, ChevronRight, LogOut, Smartphone, Globe, Monitor,
} from "lucide-react"
import { FaTwitter, FaYoutube, FaLinkedin, FaInstagram, FaFacebook, FaTiktok, FaWhatsapp, FaTelegram } from "react-icons/fa6"
import toast from "react-hot-toast"
import { PageHeader } from "@/components/ui/PageHeader"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card"
import Input from "@/components/ui/Input"
import Textarea from "@/components/ui/Textarea"
import Select from "@/components/ui/Select"
import Button from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"
import { Table } from "@/components/ui/Table"
import { mockSettings } from "@/lib/mock/data"
import { cn } from "@/lib/utils"

const tabsConfig = [
  { id: "general", label: "الإعدادات العامة", icon: <Settings2 size={18} /> },
  { id: "notifications", label: "إعدادات الإشعارات", icon: <Bell size={18} /> },
  { id: "payment", label: "إعدادات الدفع", icon: <CreditCard size={18} /> },
  { id: "security", label: "إعدادات الأمان", icon: <Shield size={18} /> },
  { id: "social", label: "روابط التواصل", icon: <Link2 size={18} /> },
]

const timezoneOptions = [
  { value: "Africa/Cairo", label: "القاهرة (UTC+2)" },
  { value: "Asia/Riyadh", label: "الرياض (UTC+3)" },
  { value: "Asia/Dubai", label: "دبي (UTC+4)" },
  { value: "America/New_York", label: "نيويورك (UTC-5)" },
  { value: "Europe/London", label: "لندن (UTC+0)" },
  { value: "Europe/Berlin", label: "برلين (UTC+1)" },
]

const languageOptions = [
  { value: "ar", label: "العربية" },
  { value: "en", label: "English" },
]

const currencyOptions = [
  { value: "EGP", label: "جنيه مصري" },
  { value: "USD", label: "دولار أمريكي" },
  { value: "SAR", label: "ريال سعودي" },
]

const renewalOptions = [
  { value: "monthly", label: "شهري" },
  { value: "quarterly", label: "ربع سنوي" },
  { value: "semiannual", label: "نصف سنوي" },
  { value: "annual", label: "سنوي" },
]

const sessionTimeoutOptions = [
  { value: "1", label: "1 ساعة" },
  { value: "2", label: "2 ساعات" },
  { value: "4", label: "4 ساعات" },
  { value: "8", label: "8 ساعات" },
  { value: "24", label: "24 ساعة" },
]

const socialPlatforms = [
  { key: "facebook", label: "فيسبوك", icon: FaFacebook, color: "text-[#1877F2]", placeholder: "https://facebook.com/..." },
  { key: "twitter", label: "تويتر / إكس", icon: FaTwitter, color: "text-[#1DA1F2]", placeholder: "https://twitter.com/..." },
  { key: "youtube", label: "يوتيوب", icon: FaYoutube, color: "text-[#FF0000]", placeholder: "https://youtube.com/..." },
  { key: "tiktok", label: "تيك توك", icon: FaTiktok, color: "text-[#000000]", placeholder: "https://tiktok.com/..." },
  { key: "whatsapp", label: "واتساب", icon: FaWhatsapp, color: "text-[#25D366]", placeholder: "https://wa.me/..." },
  { key: "telegram", label: "تلغرام", icon: FaTelegram, color: "text-[#0088CC]", placeholder: "https://t.me/..." },
  { key: "linkedin", label: "لينكد إن", icon: FaLinkedin, color: "text-[#0A66C2]", placeholder: "https://linkedin.com/..." },
  { key: "instagram", label: "انستغرام", icon: FaInstagram, color: "text-[#E4405F]", placeholder: "https://instagram.com/..." },
]

function Toggle({ enabled, onChange, label, description }: { enabled: boolean; onChange: (v: boolean) => void; label: string; description?: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-[16px] bg-card/40 backdrop-blur border border-border">
      <div>
        <p className="text-sm font-medium text-text">{label}</p>
        {description && <p className="text-xs text-text-tertiary mt-0.5">{description}</p>}
      </div>
      <button type="button" onClick={() => onChange(!enabled)}
        className={cn(
          "relative w-11 h-6 rounded-full transition-all duration-250 shrink-0",
          enabled ? "bg-primary shadow-[0_0_12px_rgba(79,70,229,0.3)]" : "bg-card border border-border",
        )}
      >
        <span className={cn(
          "absolute top-0.5 w-5 h-5 rounded-full transition-all duration-250 shadow-md",
          enabled ? "translate-x-[22px] bg-white" : "translate-x-0.5 bg-text-tertiary",
        )} />
      </button>
    </div>
  )
}

function PasswordInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [show, setShow] = useState(false)
  return (
    <Input
      label={label}
      type={show ? "text" : "password"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      leftIcon={
        <button type="button" onClick={() => setShow(!show)} className="text-text-tertiary hover:text-text transition-colors">
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      }
    />
  )
}

const ITEMS_PER_PAGE = 3

export default function SettingsPage() {
  const [general, setGeneral] = useState(mockSettings.general)
  const [notifications, setNotifications] = useState(mockSettings.notifications)
  const [payment, setPayment] = useState(mockSettings.payment)
  const [security, setSecurity] = useState(mockSettings.security)
  const [social, setSocial] = useState(mockSettings.social)

  const [passwords, setPasswords] = useState({ current: "", newPass: "", confirm: "" })
  const [showEndSessionConfirm, setShowEndSessionConfirm] = useState(false)
  const [historyPage, setHistoryPage] = useState(1)
  const [saving, setSaving] = useState<string | null>(null)

  const totalPages = Math.ceil(security.loginHistory.length / ITEMS_PER_PAGE)
  const paginatedHistory = security.loginHistory.slice(
    (historyPage - 1) * ITEMS_PER_PAGE,
    historyPage * ITEMS_PER_PAGE,
  )

  const handleSave = async (section: string) => {
    setSaving(section)
    await new Promise((r) => setTimeout(r, 1200))
    setSaving(null)
    toast.success("تم حفظ التغييرات بنجاح")
  }

  const handleChangePassword = async () => {
    if (!passwords.current || !passwords.newPass || !passwords.confirm) {
      toast.error("يرجى ملء جميع الحقول")
      return
    }
    if (passwords.newPass !== passwords.confirm) {
      toast.error("كلمة المرور الجديدة غير متطابقة")
      return
    }
    setSaving("password")
    await new Promise((r) => setTimeout(r, 1200))
    setSaving(null)
    setPasswords({ current: "", newPass: "", confirm: "" })
    toast.success("تم تغيير كلمة المرور بنجاح")
  }

  return (
    <div className="space-y-6">
      <PageHeader title="الإعدادات" description="إدارة إعدادات المنصة والمركز" />

      <Tabs tabs={tabsConfig} defaultTab="general">
        {(activeTab) => (
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <TabPanel id="general" activeTab={activeTab}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات المركز</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input label="اسم المركز *" value={general.centerName} onChange={(e) => setGeneral((p) => ({ ...p, centerName: e.target.value }))} />
                    <Textarea label="وصف المركز" value={general.centerDescription} onChange={(e) => setGeneral((p) => ({ ...p, centerDescription: e.target.value }))} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="البريد الإلكتروني *" type="email" value={general.email} onChange={(e) => setGeneral((p) => ({ ...p, email: e.target.value }))} />
                      <Input label="رقم الهاتف *" type="tel" value={general.phone} onChange={(e) => setGeneral((p) => ({ ...p, phone: e.target.value }))} />
                    </div>
                    <Textarea label="عنوان المركز" value={general.address} onChange={(e) => setGeneral((p) => ({ ...p, address: e.target.value }))} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select label="المنطقة الزمنية" value={general.timezone} onChange={(e) => setGeneral((p) => ({ ...p, timezone: e.target.value }))} options={timezoneOptions} />
                      <Select label="اللغة الافتراضية" value={general.defaultLanguage} onChange={(e) => setGeneral((p) => ({ ...p, defaultLanguage: e.target.value }))} options={languageOptions} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="عدد أيام التجربة المجانية" type="number" value={String(general.trialDays)} onChange={(e) => setGeneral((p) => ({ ...p, trialDays: Number(e.target.value) }))} />
                      <Input label="الحد الأقصى للطلاب في الكورس" type="number" value={String(general.maxStudentsPerCourse)} onChange={(e) => setGeneral((p) => ({ ...p, maxStudentsPerCourse: Number(e.target.value) }))} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="primary" leftIcon={<Save size={16} />} isLoading={saving === "general"} onClick={() => handleSave("general")}>
                      حفظ الإعدادات العامة
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabPanel>

            <TabPanel id="notifications" activeTab={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات الإشعارات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Toggle label="إشعارات تسجيل طالب جديد" enabled={notifications.newStudent} onChange={(v) => setNotifications((p) => ({ ...p, newStudent: v }))} />
                  <Toggle label="إشعارات دفع جديد" enabled={notifications.newPayment} onChange={(v) => setNotifications((p) => ({ ...p, newPayment: v }))} />
                  <Toggle label="إشعارات نتائج الامتحانات" enabled={notifications.examResults} onChange={(v) => setNotifications((p) => ({ ...p, examResults: v }))} />
                  <Toggle label="إشعارات الحضور والغياب" enabled={notifications.attendance} onChange={(v) => setNotifications((p) => ({ ...p, attendance: v }))} />
                  <Toggle label="إشعارات انتهاء الاشتراك" enabled={notifications.subscriptionExpiry} onChange={(v) => setNotifications((p) => ({ ...p, subscriptionExpiry: v }))} />
                  <Toggle label="إشعارات الرسائل الجديدة" enabled={notifications.newMessages} onChange={(v) => setNotifications((p) => ({ ...p, newMessages: v }))} />
                  <Toggle label="تقرير أسبوعي عبر البريد الإلكتروني" enabled={notifications.weeklyReport} onChange={(v) => setNotifications((p) => ({ ...p, weeklyReport: v }))} />
                </CardContent>
                <CardFooter>
                  <Button variant="primary" leftIcon={<Save size={16} />} isLoading={saving === "notifications"} onClick={() => handleSave("notifications")}>
                    حفظ إعدادات الإشعارات
                  </Button>
                </CardFooter>
              </Card>
            </TabPanel>

            <TabPanel id="payment" activeTab={activeTab}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>بوابات الدفع</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Toggle label="تفعيل الدفع عبر فوري" enabled={payment.fawryEnabled} onChange={(v) => setPayment((p) => ({ ...p, fawryEnabled: v }))} />
                    <Toggle label="تفعيل الدفع عبر بطاقة ائتمان" enabled={payment.creditCardEnabled} onChange={(v) => setPayment((p) => ({ ...p, creditCardEnabled: v }))} />
                    <Toggle label="تفعيل المحفظة الإلكترونية" enabled={payment.walletEnabled} onChange={(v) => setPayment((p) => ({ ...p, walletEnabled: v }))} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات العملة والضرائب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Select label="العملة الافتراضية" value={payment.currency} onChange={(e) => setPayment((p) => ({ ...p, currency: e.target.value }))} options={currencyOptions} />
                      <Select label="فترة تجديد الاشتراك" value={payment.renewalPeriod} onChange={(e) => setPayment((p) => ({ ...p, renewalPeriod: e.target.value }))} options={renewalOptions} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="ضريبة القيمة المضافة (%)" type="number" value={String(payment.vatPercent)} onChange={(e) => setPayment((p) => ({ ...p, vatPercent: Number(e.target.value) }))} />
                      <Input label="نسبة الخصم القصوى المسموحة (%)" type="number" value={String(payment.maxDiscountPercent)} onChange={(e) => setPayment((p) => ({ ...p, maxDiscountPercent: Number(e.target.value) }))} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>معلومات الحساب البنكي</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input label="اسم البنك" value={payment.bankAccount.bankName} onChange={(e) => setPayment((p) => ({ ...p, bankAccount: { ...p.bankAccount, bankName: e.target.value } }))} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="رقم الحساب" value={payment.bankAccount.accountNumber} onChange={(e) => setPayment((p) => ({ ...p, bankAccount: { ...p.bankAccount, accountNumber: e.target.value } }))} />
                      <Input label="الآيبان (IBAN)" value={payment.bankAccount.iban} onChange={(e) => setPayment((p) => ({ ...p, bankAccount: { ...p.bankAccount, iban: e.target.value } }))} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="primary" leftIcon={<Save size={16} />} isLoading={saving === "payment"} onClick={() => handleSave("payment")}>
                      حفظ إعدادات الدفع
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabPanel>

            <TabPanel id="security" activeTab={activeTab}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>تغيير كلمة المرور</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <PasswordInput label="كلمة المرور الحالية" value={passwords.current} onChange={(v) => setPasswords((p) => ({ ...p, current: v }))} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PasswordInput label="كلمة المرور الجديدة" value={passwords.newPass} onChange={(v) => setPasswords((p) => ({ ...p, newPass: v }))} />
                      <PasswordInput label="تأكيد كلمة المرور" value={passwords.confirm} onChange={(v) => setPasswords((p) => ({ ...p, confirm: v }))} />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="primary" leftIcon={<Save size={16} />} isLoading={saving === "password"} onClick={handleChangePassword}>
                      تغيير كلمة المرور
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>المصادقة الثنائية</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Toggle label="تفعيل المصادقة الثنائية" description="سيتم إرسال رمز تحقق إلى هاتفك عند تسجيل الدخول" enabled={security.twoFactorEnabled} onChange={(v) => setSecurity((p) => ({ ...p, twoFactorEnabled: v }))} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>صلاحية جلسة العمل</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={String(security.sessionTimeout)} onChange={(e) => setSecurity((p) => ({ ...p, sessionTimeout: Number(e.target.value) }))} options={sessionTimeoutOptions} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>جلسات تسجيل الدخول النشطة</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table
                      columns={[
                        { key: "device", header: "الجهاز", render: (s: any) => (
                          <div className="flex items-center gap-2">
                            <Monitor size={16} className="text-text-tertiary" />
                            <span>{s.device}</span>
                          </div>
                        )},
                        { key: "browser", header: "المتصفح" },
                        { key: "ip", header: "IP" },
                        { key: "lastActive", header: "آخر نشاط" },
                        { key: "status", header: "الحالة", render: (s: any) => s.isCurrent ? (
                          <Badge variant="success" size="sm">الجلسة الحالية</Badge>
                        ) : (
                          <Badge variant="default" size="sm">نشطة</Badge>
                        )},
                      ]}
                      data={security.activeSessions}
                    />
                  </CardContent>
                  <CardFooter>
                    <Button variant="danger" leftIcon={<LogOut size={16} />} onClick={() => setShowEndSessionConfirm(true)}>
                      إنهاء جميع الجلسات
                    </Button>
                  </CardFooter>
                </Card>

                {showEndSessionConfirm && (
                  <Card className="border-error/30 !bg-error/5">
                    <CardContent>
                      <p className="text-sm text-text mb-4">هل أنت متأكد من إنهاء جميع الجلسات؟ سيتم تسجيل خروجك من جميع الأجهزة الأخرى.</p>
                      <div className="flex gap-3">
                        <Button variant="danger" onClick={() => { setShowEndSessionConfirm(false); toast.success("تم إنهاء جميع الجلسات الأخرى") }}>
                          تأكيد إنهاء الجلسات
                        </Button>
                        <Button variant="secondary" onClick={() => setShowEndSessionConfirm(false)}>إلغاء</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card>
                  <CardHeader>
                    <CardTitle>سجل تسجيل الدخول</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table
                      columns={[
                        { key: "date", header: "التاريخ" },
                        { key: "time", header: "الوقت" },
                        { key: "ip", header: "IP" },
                        { key: "device", header: "الجهاز" },
                        { key: "browser", header: "المتصفح" },
                        { key: "location", header: "الموقع" },
                        { key: "status", header: "الحالة", render: (h: any) => (
                          <Badge variant={h.status === "success" ? "success" : "error"} size="sm">
                            {h.status === "success" ? "ناجح" : "فاشل"}
                          </Badge>
                        )},
                      ]}
                      data={paginatedHistory}
                    />
                  </CardContent>
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                      <span className="text-sm text-text-tertiary">الصفحة {historyPage} من {totalPages}</span>
                      <div className="flex gap-1">
                        <button type="button" onClick={() => setHistoryPage((p) => Math.max(1, p - 1))} disabled={historyPage === 1}
                          className="p-1.5 rounded-[10px] hover:bg-card/60 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary transition-all"
                        >
                          <ChevronRight size={16} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                          <button type="button" key={p} onClick={() => setHistoryPage(p)}
                            className={cn(
                              "w-8 h-8 rounded-[10px] text-sm font-medium transition-all",
                              historyPage === p
                                ? "bg-primary/20 text-primary border border-primary/30"
                                : "text-text-secondary hover:bg-card/40",
                            )}
                          >
                            {p}
                          </button>
                        ))}
                        <button type="button" onClick={() => setHistoryPage((p) => Math.min(totalPages, p + 1))} disabled={historyPage === totalPages}
                          className="p-1.5 rounded-[10px] hover:bg-card/60 disabled:opacity-30 disabled:cursor-not-allowed text-text-secondary transition-all"
                        >
                          <ChevronLeft size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                  <CardFooter>
                    <Button variant="primary" leftIcon={<Save size={16} />} isLoading={saving === "security"} onClick={() => handleSave("security")}>
                      حفظ إعدادات الأمان
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabPanel>

            <TabPanel id="social" activeTab={activeTab}>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>روابط التواصل الاجتماعي</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {socialPlatforms.map((platform) => (
                      <Input
                        key={platform.key}
                        label={platform.label}
                        value={(social as Record<string, string>)[platform.key] || ""}
                        onChange={(e) => setSocial((p) => ({ ...p, [platform.key]: e.target.value }))}
                        placeholder={platform.placeholder}
                        leftIcon={<platform.icon size={18} className={platform.color} />}
                      />
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="primary" leftIcon={<Save size={16} />} isLoading={saving === "social"} onClick={() => handleSave("social")}>
                      حفظ روابط التواصل
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>معاينة الروابط</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3">
                      {socialPlatforms.map((platform) => {
                        const url = (social as Record<string, string>)[platform.key]
                        if (!url) return null
                        const Icon = platform.icon
                        return (
                          <a key={platform.key} href={url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 rounded-[14px] bg-card/60 backdrop-blur border border-border hover:border-primary/30 hover:bg-primary/5 transition-all"
                          >
                            <Icon size={18} className={platform.color} />
                            <span className="text-sm text-text">{platform.label}</span>
                          </a>
                        )
                      })}
                      {socialPlatforms.every((p) => !(social as Record<string, string>)[p.key]) && (
                        <p className="text-sm text-text-tertiary">لم يتم إضافة أي روابط بعد</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabPanel>
          </motion.div>
        )}
      </Tabs>
    </div>
  )
}
