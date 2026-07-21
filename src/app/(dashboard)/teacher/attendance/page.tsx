"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineQrcode,
  HiOutlineKey,
  HiOutlineUserAdd,
  HiOutlineBriefcase,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClock,
  HiOutlineExclamation,
  HiOutlineSearch,
  HiOutlineCamera,
  HiOutlineLogin,
  HiOutlineLogout,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineUsers,
} from "react-icons/hi"
import { Toaster, toast } from "react-hot-toast"
import { cn, det } from "@/lib/utils"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { StatsCard } from "@/components/ui/StatsCard"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { SearchInput } from "@/components/ui/SearchInput"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { Skeleton, StatsSkeleton } from "@/components/ui/Skeleton"
import { mockAttendance, mockStudents, mockEmployees, mockCourses } from "@/lib/mock/data"
import type { AttendanceStatus } from "@/lib/types"

const modes = [
  { id: "qr", label: "QR كود", icon: HiOutlineQrcode },
  { id: "code", label: "كود الطالب", icon: HiOutlineKey },
  { id: "manual", label: "يدوي", icon: HiOutlineUserAdd },
  { id: "employee", label: "موظف", icon: HiOutlineBriefcase },
] as const

const statusColors: Record<AttendanceStatus, { label: string; variant: "success" | "error" | "warning" | "info"; color: string }> = {
  present: { label: "حاضر", variant: "success", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  absent: { label: "غائب", variant: "error", color: "bg-red-100 text-red-700 border-red-200" },
  late: { label: "متأخر", variant: "warning", color: "bg-amber-100 text-amber-700 border-amber-200" },
  excused: { label: "معذر", variant: "info", color: "bg-blue-100 text-blue-700 border-blue-200" },
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
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const todayStats = useMemo(() => {
    const today = mockAttendance.filter(
      (a) => a.date.toDateString() === new Date().toDateString()
    )
    if (today.length === 0) {
      return { total: 0, present: 0, absent: 0, late: 0, excused: 0, rate: 0 }
    }
    const present = today.filter((a) => a.status === "present").length
    const absent = today.filter((a) => a.status === "absent").length
    const late = today.filter((a) => a.status === "late").length
    const excused = today.filter((a) => a.status === "excused").length
    return {
      total: today.length,
      present,
      absent,
      late,
      excused,
      rate: Math.round((present / today.length) * 100),
    }
  }, [])

  const handleQrDetect = () => {
    const student = mockStudents[Math.floor(det() * mockStudents.length)]
    if (recordedIds.has(student.id)) {
      toast.error("هذا الطالب مسجل حضوره بالفعل", { position: "top-left" })
      return
    }
    setScannedStudent(student)
    toast.success("طھظ… مسح QR بنجاح", { position: "top-left" })
  }

  const handleQrConfirm = () => {
    if (!scannedStudent) return
    if (recordedIds.has(scannedStudent.id)) {
      toast.error("هذا الطالب مسجل حضوره بالفعل", { position: "top-left" })
      return
    }
    setRecordedIds((prev) => new Set(prev).add(scannedStudent.id))
    setScannedStudent(null)
    toast.success(`طھظ… تسجيل حضور ${scannedStudent.name}`, { position: "top-left" })
  }

  const handleCodeSearch = () => {
    if (!codeInput.trim()) {
      toast.error("يرجى إدخال كود الطالب", { position: "top-left" })
      return
    }
    const student = mockStudents.find(
      (s) => s.id === codeInput.trim() || s.phone.includes(codeInput.trim())
    )
    if (!student) {
      toast.error("لم ظٹطھظ… العثور على طالب بهذا الكود", { position: "top-left" })
      setCodeResult(null)
      return
    }
    if (recordedIds.has(student.id)) {
      toast.error("هذا الطالب مسجل حضوره بالفعل", { position: "top-left" })
      setCodeResult(null)
      return
    }
    setCodeResult(student)
    toast.success("طھظ… العثور على الطالب", { position: "top-left" })
  }

  const handleCodeConfirm = () => {
    if (!codeResult) return
    setRecordedIds((prev) => new Set(prev).add(codeResult.id))
    toast.success(`طھظ… تسجيل حضور ${codeResult.name}`, { position: "top-left" })
    setCodeInput("")
    setCodeResult(null)
  }

  const handleManualRecord = () => {
    if (!manualStudent) {
      toast.error("يرجى اختيار طالب", { position: "top-left" })
      return
    }
    if (recordedIds.has(manualStudent)) {
      toast.error("هذا الطالب مسجل حضوره بالفعل", { position: "top-left" })
      return
    }
    setRecordedIds((prev) => new Set(prev).add(manualStudent))
    const student = mockStudents.find((s) => s.id === manualStudent)
    toast.success(`طھظ… تسجيل ${student?.name || "الطالب"} ظƒظ€ ${statusColors[manualStatus].label}`, { position: "top-left" })
    setManualStudent("")
  }

  const handleEmployeeCheckIn = (empId: string) => {
    if (employeeCheckIn[empId]) {
      toast.error("طھظ… تسجيل دخول هذا الموظف بالفعل", { position: "top-left" })
      return
    }
    setEmployeeCheckIn((prev) => ({ ...prev, [empId]: true }))
    const emp = mockEmployees.find((e) => e.id === empId)
    toast.success(`طھظ… تسجيل دخول ${emp?.name || "الموظف"}`, { position: "top-left" })
  }

  const handleEmployeeCheckOut = (empId: string) => {
    if (!employeeCheckIn[empId]) {
      toast.error("لم يسجل هذا الموظف دخوله بعد", { position: "top-left" })
      return
    }
    if (employeeCheckOut[empId]) {
      toast.error("طھظ… تسجيل خروج هذا الموظف بالفعل", { position: "top-left" })
      return
    }
    setEmployeeCheckOut((prev) => ({ ...prev, [empId]: true }))
    const emp = mockEmployees.find((e) => e.id === empId)
    toast.success(`طھظ… تسجيل خروج ${emp?.name || "الموظف"}`, { position: "top-left" })
  }

  if (hasError) {
    return (
      <div className="p-4 md:p-6">
        <ErrorState
          title="حدث خطأ ظپظٹ تحميل صفحة الحضور"
          message="يرجى المحاولة مرة أخرى"
          onRetry={() => { setHasError(false); setIsLoading(true); setTimeout(() => setIsLoading(false), 1000) }}
        />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Toaster />
      <DashboardHeader title="نظام الحضور" subtitle="تسجيل ومتابعة حضور الطلاب والموظفين" />

      {isLoading ? (
        <StatsSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="نسبة الحضور" value={`${todayStats.rate}%`} icon={HiOutlineCheckCircle} color="primary" />
          <StatsCard title="الحاضرون" value={todayStats.present} icon={HiOutlineUsers} color="success" />
          <StatsCard title="الغائبون" value={todayStats.absent} icon={HiOutlineXCircle} color="error" />
          <StatsCard title="المتأخرون" value={todayStats.late} icon={HiOutlineClock} color="warning" />
        </div>
      )}

      <div className="flex gap-2 border-b border-border overflow-x-auto">
        {modes.map((mode) => {
          const Icon = mode.icon
          return (
            <button type="button"
              key={mode.id}
              onClick={() => setActiveMode(mode.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-all duration-200",
                activeMode === mode.id
                  ? "border-primary text-primary"
                  : "border-transparent text-text-tertiary hover:text-text-secondary hover:border-border"
              )}
            >
              <Icon className="w-4 h-4" />
              {mode.label}
            </button>
          )
        })}
      </div>

      {activeMode === "qr" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>مسح QR كود</CardTitle>
              <Badge variant="primary">كاميرا</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-border rounded-xl bg-surface-secondary">
                <HiOutlineCamera className="w-16 h-16 text-text-tertiary mb-4" />
                <p className="text-text-secondary text-sm mb-4">وجه الكاميرا نحو QR كود الطالب</p>
                <Button type="button" onClick={handleQrDetect} leftIcon={<HiOutlineQrcode className="w-4 h-4" />}>
                  محاكاة مسح QR
                </Button>
              </div>
              {scannedStudent ? (
                <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                  <div className="flex items-center gap-3">
                    <img src={scannedStudent.avatar} alt="" className="w-12 h-12 rounded-full bg-surface-tertiary" />
                    <div>
                      <p className="font-semibold text-text">{scannedStudent.name}</p>
                      <p className="text-sm text-text-secondary">{scannedStudent.grade} - {scannedStudent.group}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button type="button" onClick={handleQrConfirm} variant="success" size="sm" leftIcon={<HiOutlineCheck className="w-4 h-4" />}>
                      تأكيد الحضور
                    </Button>
                    <Button onClick={() => setScannedStudent(null)} variant="secondary" size="sm" leftIcon={<HiOutlineX className="w-4 h-4" />}>
                      إلغاء
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4 text-text-tertiary text-sm">اضغط على المحاكاة لمسح QR</div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeMode === "code" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>بحث بكود الطالب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Input
                    placeholder="أدخل كود الطالب أو رقم الهاتف"
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCodeSearch()}
                    leftIcon={<HiOutlineSearch className="w-4 h-4" />}
                  />
                </div>
                <Button onClick={handleCodeSearch}>بحث</Button>
              </div>
              {codeResult ? (
                <div className="p-4 rounded-xl bg-surface-secondary border border-border">
                  <div className="flex items-center gap-3">
                    <img src={codeResult.avatar} alt="" className="w-12 h-12 rounded-full bg-surface-tertiary" />
                    <div className="flex-1">
                      <p className="font-semibold text-text">{codeResult.name}</p>
                      <p className="text-sm text-text-secondary">{codeResult.grade} - {codeResult.group}</p>
                      <p className="text-xs text-text-tertiary mt-0.5">رقم: {codeResult.phone}</p>
                    </div>
                    <Badge variant="success" size="sm">طھظ… العثور</Badge>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button type="button" onClick={handleCodeConfirm} variant="success" size="sm" leftIcon={<HiOutlineCheck className="w-4 h-4" />}>
                      تأكيد الحضور
                    </Button>
                    <Button onClick={() => { setCodeResult(null); setCodeInput("") }} variant="secondary" size="sm" leftIcon={<HiOutlineX className="w-4 h-4" />}>
                      إلغاء
                    </Button>
                  </div>
                </div>
              ) : codeInput && (
                <EmptyState
                  icon={HiOutlineSearch}
                  title="ابحث عن طالب"
                  description="أدخل كود الطالب أو رقم الهاتف للبحث"
                />
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeMode === "manual" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>تسجيل حضور يدوي</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                label="اختر الطالب"
                placeholder="اختر طالباً..."
                value={manualStudent}
                onChange={(e) => setManualStudent(e.target.value)}
                options={mockStudents.map((s) => ({ value: s.id, label: `${s.name} - ${s.grade}` }))}
              />
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">حالة الحضور</label>
                <div className="flex gap-2">
                  {(Object.entries(statusColors) as [AttendanceStatus, typeof statusColors[AttendanceStatus]][]).map(
                    ([key, config]) => (
                      <button type="button"
                        key={key}
                        onClick={() => setManualStatus(key)}
                        className={cn(
                          "flex-1 px-3 py-2 rounded-lg text-sm font-medium border transition-all",
                          manualStatus === key
                            ? config.color
                            : "border-border text-text-tertiary hover:bg-surface-secondary"
                        )}
                      >
                        {config.label}
                      </button>
                    )
                  )}
                </div>
              </div>
              <Button type="button" onClick={handleManualRecord} size="lg" className="w-full" leftIcon={<HiOutlineCheckCircle className="w-4 h-4" />}>
                تسجيل الحضور
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {activeMode === "employee" && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader>
              <CardTitle>حضور الموظفين</CardTitle>
              <Badge variant="info">تسجيل دخول/خروج</Badge>
            </CardHeader>
            <CardContent>
              {mockEmployees.length === 0 ? (
                <EmptyState
                  icon={HiOutlineBriefcase}
                  title="لا يوجد موظفون"
                  description="لم ظٹطھظ… إضافة ط£ظٹ موظفين بعد"
                />
              ) : (
                <div className="space-y-3">
                  {mockEmployees.map((emp) => (
                    <div
                      key={emp.id}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border border-border transition-all",
                        employeeCheckIn[emp.id] && !employeeCheckOut[emp.id] && "border-emerald-200 bg-emerald-50/50",
                        employeeCheckOut[emp.id] && "border-gray-200 bg-gray-50/50 opacity-75"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <img src={emp.avatar} alt="" className="w-10 h-10 rounded-full bg-surface-tertiary" />
                        <div>
                          <p className="font-semibold text-text text-sm">{emp.name}</p>
                          <p className="text-xs text-text-tertiary">{emp.jobTitle}</p>
                          {employeeCheckIn[emp.id] && !employeeCheckOut[emp.id] && (
                            <Badge variant="success" size="sm" dot>داخل</Badge>
                          )}
                          {employeeCheckOut[emp.id] && (
                            <Badge variant="neutral" size="sm">منصرف</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant={employeeCheckIn[emp.id] ? "secondary" : "success"}
                          onClick={() => handleEmployeeCheckIn(emp.id)}
                          disabled={employeeCheckOut[emp.id]}
                          leftIcon={<HiOutlineLogin className="w-4 h-4" />}
                        >
                          دخول
                        </Button>
                        <Button
                          size="sm"
                          variant={employeeCheckOut[emp.id] ? "secondary" : "outline"}
                          onClick={() => handleEmployeeCheckOut(emp.id)}
                          disabled={!employeeCheckIn[emp.id] || employeeCheckOut[emp.id]}
                          leftIcon={<HiOutlineLogout className="w-4 h-4" />}
                        >
                          خروج
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
