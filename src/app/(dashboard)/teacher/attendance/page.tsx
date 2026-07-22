"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineQrcode, HiOutlineKey, HiOutlineUserAdd, HiOutlineBriefcase,
  HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClock, HiOutlineSearch,
  HiOutlineCamera, HiOutlineLogin, HiOutlineLogout, HiOutlineCheck, HiOutlineX,
  HiOutlineUsers,
} from "react-icons/hi"
import toast from "react-hot-toast"
import { cn, det } from "@/lib/utils"
import { PageHeader } from "@/components/ui/PageHeader"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { StatsSkeleton } from "@/components/ui/Skeleton"
import Button from "@/components/ui/Button"
import { mockAttendance, mockStudents, mockEmployees } from "@/lib/mock/data"
import type { AttendanceStatus } from "@/lib/types"

const modes = [
  { id: "qr", label: "QR كود", icon: HiOutlineQrcode },
  { id: "code", label: "كود الطالب", icon: HiOutlineKey },
  { id: "manual", label: "يدوي", icon: HiOutlineUserAdd },
  { id: "employee", label: "موظف", icon: HiOutlineBriefcase },
] as const

const statusColors: Record<AttendanceStatus, { label: string; color: string }> = {
  present: { label: "حاضر", color: "bg-success/10 border-success/20 text-success" },
  absent: { label: "غائب", color: "bg-error/10 border-error/20 text-error" },
  late: { label: "متأخر", color: "bg-warning/10 border-warning/20 text-warning" },
  excused: { label: "معذر", color: "bg-info/10 border-info/20 text-info" },
}

export default function AttendanceHubPage() {
  const [activeMode, setActiveMode] = useState("qr")
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [recordedIds, setRecordedIds] = useState<Set<string>>(new Set())

  const [codeInput, setCodeInput] = useState("")
  const [codeResult, setCodeResult] = useState<typeof mockStudents[0] | null>(null)
  const [manualStudent, setManualStudent] = useState("")
  const [manualStatus, setManualStatus] = useState<AttendanceStatus>("present")
  const [employeeCheckIn, setEmployeeCheckIn] = useState<Record<string, boolean>>({})
  const [employeeCheckOut, setEmployeeCheckOut] = useState<Record<string, boolean>>({})
  const [scannedStudent, setScannedStudent] = useState<typeof mockStudents[0] | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(t)
  }, [])

  const todayStats = useMemo(() => {
    const today = mockAttendance.filter((a) => a.date.toDateString() === new Date().toDateString())
    return today.length === 0
      ? { total: 0, present: 0, absent: 0, late: 0, excused: 0, rate: 0 }
      : {
          total: today.length,
          present: today.filter((a) => a.status === "present").length,
          absent: today.filter((a) => a.status === "absent").length,
          late: today.filter((a) => a.status === "late").length,
          excused: today.filter((a) => a.status === "excused").length,
          rate: Math.round((today.filter((a) => a.status === "present").length / today.length) * 100),
        }
  }, [])

  const handleQrDetect = () => {
    const student = mockStudents[Math.floor(det() * mockStudents.length)]
    if (recordedIds.has(student.id)) { toast.error("هذا الطالب مسجل حضوره بالفعل"); return }
    setScannedStudent(student)
    toast.success("تم مسح QR بنجاح")
  }

  const handleQrConfirm = () => {
    if (!scannedStudent || recordedIds.has(scannedStudent.id)) return
    setRecordedIds((prev) => new Set(prev).add(scannedStudent.id))
    setScannedStudent(null)
    toast.success(`تم تسجيل حضور ${scannedStudent.name}`)
  }

  const handleCodeSearch = () => {
    if (!codeInput.trim()) { toast.error("يرجى إدخال كود الطالب"); return }
    const student = mockStudents.find((s) => s.id === codeInput.trim() || s.phone.includes(codeInput.trim()))
    if (!student) { toast.error("لم يتم العثور على طالب"); setCodeResult(null); return }
    if (recordedIds.has(student.id)) { toast.error("هذا الطالب مسجل حضوره بالفعل"); setCodeResult(null); return }
    setCodeResult(student)
    toast.success("تم العثور على الطالب")
  }

  const handleCodeConfirm = () => {
    if (!codeResult) return
    setRecordedIds((prev) => new Set(prev).add(codeResult.id))
    toast.success(`تم تسجيل حضور ${codeResult.name}`)
    setCodeInput(""); setCodeResult(null)
  }

  const handleManualRecord = () => {
    if (!manualStudent) { toast.error("يرجى اختيار طالب"); return }
    if (recordedIds.has(manualStudent)) { toast.error("هذا الطالب مسجل حضوره بالفعل"); return }
    setRecordedIds((prev) => new Set(prev).add(manualStudent))
    toast.success(`تم تسجيل الحضور`)
    setManualStudent("")
  }

  const handleEmployeeCheckIn = (empId: string) => {
    if (employeeCheckIn[empId]) { toast.error("تم تسجيل دخول هذا الموظف بالفعل"); return }
    setEmployeeCheckIn((prev) => ({ ...prev, [empId]: true }))
    toast.success("تم تسجيل الدخول")
  }

  const handleEmployeeCheckOut = (empId: string) => {
    if (!employeeCheckIn[empId]) { toast.error("لم يسجل هذا الموظف دخوله بعد"); return }
    if (employeeCheckOut[empId]) { toast.error("تم تسجيل خروج هذا الموظف بالفعل"); return }
    setEmployeeCheckOut((prev) => ({ ...prev, [empId]: true }))
    toast.success("تم تسجيل الخروج")
  }

  if (hasError) {
    return (
      <div className="p-4 md:p-6">
        <ErrorState title="حدث خطأ" description="حدث خطأ في تحميل صفحة الحضور" retryLabel="إعادة المحاولة" onRetry={() => { setHasError(false); setIsLoading(true); setTimeout(() => setIsLoading(false), 1000) }} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader title="نظام الحضور" description="تسجيل ومتابعة حضور الطلاب والموظفين" breadcrumbs={[{ label: "لوحة التحكم", href: "/teacher" }, { label: "الحضور" }]} />

      {isLoading ? (
        <StatsSkeleton />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatsCard title="نسبة الحضور" value={`${todayStats.rate}%`} icon={HiOutlineCheckCircle} color="primary" trend={todayStats.rate > 70 ? 5 : -3} />
          <StatsCard title="الحاضرون" value={todayStats.present} icon={HiOutlineUsers} color="success" />
          <StatsCard title="الغائبون" value={todayStats.absent} icon={HiOutlineXCircle} color="error" />
          <StatsCard title="المتأخرون" value={todayStats.late} icon={HiOutlineClock} color="warning" />
        </motion.div>
      )}

      <div className="flex gap-1 border-b border-border overflow-x-auto">
        {modes.map((mode) => {
          const Icon = mode.icon
          return (
            <button key={mode.id} onClick={() => setActiveMode(mode.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-all duration-200",
                activeMode === mode.id ? "border-primary text-primary" : "border-transparent text-text-tertiary hover:text-text-secondary hover:border-border"
              )}
            >
              <Icon className="w-4 h-4" />{mode.label}
            </button>
          )
        })}
      </div>

      {activeMode === "qr" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card/60 backdrop-blur-xl border border-border rounded-[24px] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text">مسح QR كود</h3>
            <Badge variant="primary" size="sm">كاميرا</Badge>
          </div>
          <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-[24px] bg-card/40 mb-4">
            <HiOutlineCamera className="w-16 h-16 text-text-tertiary mb-4" />
            <p className="text-text-secondary text-sm mb-4">وجه الكاميرا نحو QR كود الطالب</p>
            <Button onClick={handleQrDetect} leftIcon={<HiOutlineQrcode className="w-4 h-4" />}>محاكاة مسح QR</Button>
          </div>
          {scannedStudent ? (
            <div className="p-5 rounded-[20px] bg-card/40 border border-border backdrop-blur">
              <div className="flex items-center gap-3 mb-4">
                <img src={scannedStudent.avatar} alt="" className="w-12 h-12 rounded-full bg-card border border-border" />
                <div>
                  <p className="font-semibold text-text">{scannedStudent.name}</p>
                  <p className="text-sm text-text-secondary">{scannedStudent.grade} - {scannedStudent.group}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleQrConfirm} variant="success" size="sm" leftIcon={<HiOutlineCheck className="w-4 h-4" />}>تأكيد الحضور</Button>
                <Button onClick={() => setScannedStudent(null)} variant="secondary" size="sm" leftIcon={<HiOutlineX className="w-4 h-4" />}>إلغاء</Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-3 text-text-tertiary text-sm">اضغط على المحاكاة لمسح QR</div>
          )}
        </motion.div>
      )}

      {activeMode === "code" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card/60 backdrop-blur-xl border border-border rounded-[24px] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]">
          <h3 className="text-lg font-semibold text-text mb-4">بحث بكود الطالب</h3>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <HiOutlineSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
              <input placeholder="أدخل كود الطالب أو رقم الهاتف" value={codeInput} onChange={(e) => setCodeInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleCodeSearch()}
                className="w-full bg-card/60 backdrop-blur border border-border rounded-[16px] pr-10 pl-4 py-2.5 text-sm text-text placeholder-text-tertiary/50 shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)] focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all" />
            </div>
            <Button onClick={handleCodeSearch}>بحث</Button>
          </div>
          {codeResult ? (
            <div className="p-5 rounded-[20px] bg-card/40 border border-border backdrop-blur">
              <div className="flex items-center gap-3 mb-4">
                <img src={codeResult.avatar} alt="" className="w-12 h-12 rounded-full bg-card border border-border" />
                <div className="flex-1">
                  <p className="font-semibold text-text">{codeResult.name}</p>
                  <p className="text-sm text-text-secondary">{codeResult.grade} - {codeResult.group}</p>
                  <p className="text-xs text-text-tertiary mt-0.5">رقم: {codeResult.phone}</p>
                </div>
                <Badge variant="success" size="sm">تم العثور</Badge>
              </div>
              <div className="flex gap-3">
                <Button onClick={handleCodeConfirm} variant="success" size="sm" leftIcon={<HiOutlineCheck className="w-4 h-4" />}>تأكيد الحضور</Button>
                <Button onClick={() => { setCodeResult(null); setCodeInput("") }} variant="secondary" size="sm" leftIcon={<HiOutlineX className="w-4 h-4" />}>إلغاء</Button>
              </div>
            </div>
          ) : codeInput ? (
            <EmptyState icon={HiOutlineSearch} title="ابحث عن طالب" description="أدخل كود الطالب أو رقم الهاتف للبحث" />
          ) : null}
        </motion.div>
      )}

      {activeMode === "manual" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card/60 backdrop-blur-xl border border-border rounded-[24px] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)] space-y-4">
          <h3 className="text-lg font-semibold text-text">تسجيل حضور يدوي</h3>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">اختر الطالب</label>
            <select value={manualStudent} onChange={(e) => setManualStudent(e.target.value)}
              className="w-full bg-card/60 backdrop-blur border border-border rounded-[16px] px-4 py-2.5 text-sm text-text appearance-none shadow-[0_1px_3px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)] focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all">
              <option value="">اختر طالباً...</option>
              {mockStudents.map((s) => <option key={s.id} value={s.id}>{s.name} - {s.grade}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-secondary mb-1.5">حالة الحضور</label>
            <div className="flex gap-2">
              {(Object.entries(statusColors) as [AttendanceStatus, typeof statusColors[AttendanceStatus]][]).map(([key, cfg]) => (
                <button key={key} onClick={() => setManualStatus(key)}
                  className={cn("flex-1 px-3 py-2 rounded-[14px] text-sm font-medium border transition-all backdrop-blur-xl",
                    manualStatus === key ? cfg.color : "border-border text-text-tertiary hover:bg-card"
                  )}
                >{cfg.label}</button>
              ))}
            </div>
          </div>
          <Button onClick={handleManualRecord} size="lg" className="w-full" leftIcon={<HiOutlineCheckCircle className="w-4 h-4" />}>تسجيل الحضور</Button>
        </motion.div>
      )}

      {activeMode === "employee" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card/60 backdrop-blur-xl border border-border rounded-[24px] p-6 shadow-[0_8px_40px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text">حضور الموظفين</h3>
            <Badge variant="info" size="sm">تسجيل دخول/خروج</Badge>
          </div>
          {mockEmployees.length === 0 ? (
            <EmptyState icon={HiOutlineBriefcase} title="لا يوجد موظفون" description="لم يتم إضافة أي موظفين بعد" />
          ) : (
            <div className="space-y-3">
              {mockEmployees.map((emp) => (
                <div key={emp.id} className={cn(
                  "flex items-center justify-between p-4 rounded-[20px] border border-border backdrop-blur transition-all bg-card/40",
                  employeeCheckIn[emp.id] && !employeeCheckOut[emp.id] && "border-success/30 bg-success/5",
                  employeeCheckOut[emp.id] && "opacity-60"
                )}>
                  <div className="flex items-center gap-3">
                    <img src={emp.avatar} alt="" className="w-10 h-10 rounded-full bg-card border border-border" />
                    <div>
                      <p className="font-semibold text-text text-sm">{emp.name}</p>
                      <p className="text-xs text-text-tertiary">{emp.jobTitle}</p>
                      {employeeCheckIn[emp.id] && !employeeCheckOut[emp.id] && <Badge variant="success" size="sm" dot>داخل</Badge>}
                      {employeeCheckOut[emp.id] && <Badge variant="default" size="sm">منصرف</Badge>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant={employeeCheckIn[emp.id] ? "secondary" : "success"} onClick={() => handleEmployeeCheckIn(emp.id)} disabled={employeeCheckOut[emp.id]} leftIcon={<HiOutlineLogin className="w-4 h-4" />}>
                      دخول
                    </Button>
                    <Button size="sm" variant={employeeCheckOut[emp.id] ? "secondary" : "primary"} onClick={() => handleEmployeeCheckOut(emp.id)} disabled={!employeeCheckIn[emp.id] || employeeCheckOut[emp.id]} leftIcon={<HiOutlineLogout className="w-4 h-4" />}>
                      خروج
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
