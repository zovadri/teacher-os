"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HiOutlineShieldCheck, HiOutlineDeviceTablet, HiOutlineBan, HiOutlineCheckCircle } from "react-icons/hi"
import toast from "react-hot-toast"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

interface Device { id: string; name: string; type: string; ip: string; lastActive: string; blocked: boolean }
interface StudentDevice { id: string; name: string; avatar: string; devices: Device[]; maxDevices: number }

const studentsData: StudentDevice[] = [
  { id: "s1", name: "أحمد محمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vp1", maxDevices: 2, devices: [{ id: "d1", name: "iPhone 15", type: "هاتف", ip: "192.168.1.101", lastActive: "منذ 5 دقائق", blocked: false }, { id: "d2", name: "MacBook Pro", type: "لابتوب", ip: "192.168.1.102", lastActive: "منذ ساعة", blocked: false }] },
  { id: "s2", name: "مريم أحمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vp2", maxDevices: 2, devices: [{ id: "d3", name: "Samsung Galaxy", type: "هاتف", ip: "192.168.1.103", lastActive: "منذ 3 ساعات", blocked: false }, { id: "d4", name: "iPad Air", type: "جهاز لوحي", ip: "192.168.1.104", lastActive: "منذ يوم", blocked: true }] },
  { id: "s3", name: "يوسف علي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vp3", maxDevices: 1, devices: [{ id: "d5", name: "Huawei P60", type: "هاتف", ip: "192.168.1.105", lastActive: "منذ 30 دقيقة", blocked: false }] },
  { id: "s4", name: "سارة خالد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vp4", maxDevices: 3, devices: [{ id: "d6", name: "iPhone 14", type: "هاتف", ip: "192.168.1.106", lastActive: "الآن", blocked: false }, { id: "d7", name: "Dell XPS", type: "لابتوب", ip: "192.168.1.107", lastActive: "منذ ساعتين", blocked: false }] },
]

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

export default function AdvancedVideoProtectionPage() {
  const [data, setData] = useState(studentsData)
  const toggleBlock = (studentId: string, deviceId: string) => {
    setData((prev) => prev.map((s) => s.id === studentId ? { ...s, devices: s.devices.map((d) => d.id === deviceId ? { ...d, blocked: !d.blocked } : d) } : s))
    toast.success("تم تحديث حالة الجهاز")
  }
  const totalDevices = data.reduce((s, st) => s + st.devices.length, 0)
  const blockedDevices = data.reduce((s, st) => s + st.devices.filter((d) => d.blocked).length, 0)
  const activeStudents = data.filter((st) => st.devices.some((d) => !d.blocked)).length

  return (
    <div className="min-h-screen">
      <Breadcrumb items={[{ label: "الفيديوهات", href: "/teacher/videos" }, { label: "حماية الفيديو", href: "/teacher/videos/protection" }, { label: "حماية متقدمة" }]} />
      <PageHeader title="حماية الفيديو المتقدمة" description="إدارة الأجهزة والعلامات المائية والحظر" />
      <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <StatsCard title="الأجهزة المسجلة" value={totalDevices} icon={HiOutlineDeviceTablet} color="primary" />
            <StatsCard title="محظورة" value={blockedDevices} icon={HiOutlineBan} color="error" />
            <StatsCard title="نشطة" value={totalDevices - blockedDevices} icon={HiOutlineCheckCircle} color="success" />
            <StatsCard title="طلاب نشطين" value={activeStudents} icon={HiOutlineShieldCheck} color="info" />
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle>إعدادات العلامة المائية</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                  <span className="text-sm text-text">اسم الطالب</span>
                  <Badge variant="success" size="sm">مفعل</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                  <span className="text-sm text-text">رقم الهاتف</span>
                  <Badge variant="success" size="sm">مفعل</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                  <span className="text-sm text-text">الوقت والتاريخ</span>
                  <Badge variant="success" size="sm">مفعل</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary border border-border">
                  <span className="text-sm text-text">منع أكثر من جهاز في وقت واحد</span>
                  <Badge variant="primary" size="sm">مفعل</Badge>
                </div>
                <div className="p-3 rounded-xl bg-warning/5 border border-warning/20 text-xs text-warning">
                  <HiOutlineShieldCheck className="w-4 h-4 inline ml-1" />العلامة المائية تضاف تلقائياً على جميع فيديوهات الكورس
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>سجل الأجهزة للطلاب</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {data.map((st) => (
                  <div key={st.id} className="p-3 rounded-xl bg-surface-secondary border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2"><img src={st.avatar} alt="" className="w-6 h-6 rounded-full bg-surface-secondary" /><span className="text-sm font-medium text-text">{st.name}</span></div>
                      <span className="text-xs text-text-tertiary">الحد الأقصى: {st.maxDevices} أجهزة</span>
                    </div>
                    {st.devices.map((d) => (
                      <div key={d.id} className="flex items-center justify-between p-2 rounded-lg bg-surface mb-1 text-xs">
                        <div className="flex items-center gap-2"><span className={d.blocked ? "text-error line-through" : "text-text"}>{d.name}</span><span className="text-text-tertiary">{d.type}</span></div>
                        <div className="flex items-center gap-2"><span className="text-text-tertiary">{d.ip}</span><span className="text-text-tertiary">{d.lastActive}</span>
                          <button type="button" onClick={() => toggleBlock(st.id, d.id)} className={`px-2 py-0.5 rounded text-[10px] font-medium transition-all ${d.blocked ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>{d.blocked ? "رفع الحظر" : "حظر"}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
