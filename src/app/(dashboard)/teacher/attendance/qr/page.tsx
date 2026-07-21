"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineCamera,
  HiOutlineQrcode,
  HiOutlineCheckCircle,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineClock,
} from "react-icons/hi"
import { Toaster, toast } from "react-hot-toast"
import { cn, det } from "@/lib/utils"
import { Breadcrumb } from "@/components/ui/Breadcrumb"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import Button from "@/components/ui/Button"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { Skeleton } from "@/components/ui/Skeleton"
import { mockStudents } from "@/lib/mock/data"

interface ScanRecord {
  id: string
  studentName: string
  studentImage: string
  grade: string
  time: string
  success: boolean
}

export default function QRAttendancePage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [detectedStudent, setDetectedStudent] = useState<typeof mockStudents[0] | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [recentScans, setRecentScans] = useState<ScanRecord[]>([])
  const scanLineRef = useRef<HTMLDivElement>(null)

  const resolvedRef = useRef(false)

  const startScan = () => {
    if (isScanning) return
    resolvedRef.current = false
    setIsScanning(true)
    setScanComplete(false)
    setDetectedStudent(null)
    setConfirmed(false)
    setHasError(false)

    setTimeout(() => {
      if (resolvedRef.current) return
      resolvedRef.current = true
      const student = mockStudents[Math.floor(det() * mockStudents.length)]
      setDetectedStudent(student)
      setScanComplete(true)
      setIsScanning(false)
      toast.success(`طھظ… التعرف على ${student.name}`, { position: "top-left" })
    }, 3000)

    setTimeout(() => {
      if (resolvedRef.current) return
      resolvedRef.current = true
      setHasError(true)
      setIsScanning(false)
      toast.error("فشل مسح QR كود، حاول مرة أخرى", { position: "top-left" })
    }, 8000)
  }

  useEffect(() => {
    if (!isScanning) return
    let animationId: number
    let startTime: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = (elapsed % 2500) / 2500
      if (scanLineRef.current) {
        scanLineRef.current.style.top = `${progress * 100}%`
      }
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [isScanning])

  const handleConfirm = () => {
    if (!detectedStudent) return
    setConfirmed(true)
    setRecentScans((prev) => [
      {
        id: `${detectedStudent.id}-${Date.now()}`,
        studentName: detectedStudent.name,
        studentImage: detectedStudent.avatar,
        grade: detectedStudent.grade,
        time: new Date().toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
        success: true,
      },
      ...prev.slice(0, 9),
    ])
    toast.success(`طھظ… تسجيل حضور ${detectedStudent.name}`, { position: "top-left" })
  }

  const handleCancel = () => {
    setDetectedStudent(null)
    setScanComplete(false)
    setHasError(false)
    toast("طھظ… إلغاء المسح", { position: "top-left" })
  }

  const handleRetry = () => {
    setHasError(false)
    setScanComplete(false)
    setDetectedStudent(null)
    startScan()
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Toaster />
      <Breadcrumb items={[{ label: "الحضور", href: "/teacher/attendance" }, { label: "مسح QR" }]} />
      <PageHeader
        title="مسح QR كود"
        description="مسح QR كود الطالب لتسجيل الحضور"
        actions={
          <Button type="button"
variant="primary"
            onClick={startScan}
            disabled={isScanning}
            leftIcon={<HiOutlineQrcode className="w-4 h-4" />}
          >
            {isScanning ? "جارٍ المسح..." : "بدء المسح"}
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-0">
              <div className="relative flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden" style={{ minHeight: 400 }}>
                {isScanning ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                    <div className="relative w-64 h-64 border-2 border-primary/50 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-black/5" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <HiOutlineCamera className="w-16 h-16 text-primary/40" />
                      </div>
                      <div
                        ref={scanLineRef}
                        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent shadow-lg shadow-primary/50"
                        style={{ top: "0%" }}
                      />
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary rounded-tl" />
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary rounded-tr" />
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary rounded-bl" />
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary rounded-br" />
                    </div>
                    <p className="text-text-secondary text-sm mt-6">وجه الكاميرا نحو QR كود الطالب...</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs text-text-tertiary">جارٍ المسح</span>
                    </div>
                  </div>
                ) : hasError ? (
                  <ErrorState
                    title="فشل المسح"
                    message="لم ظٹطھظ… التعرف على QR كود. حاول مرة أخرى."
                    onRetry={handleRetry}
                  />
                ) : detectedStudent && !confirmed ? (
                  <div className="flex flex-col items-center justify-center p-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary mb-4">
                      <img src={detectedStudent.avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <h3 className="text-xl font-bold text-text">{detectedStudent.name}</h3>
                    <p className="text-text-secondary">{detectedStudent.grade} - {detectedStudent.group}</p>
                    <div className="flex gap-3 mt-6">
                      <Button type="button" onClick={handleConfirm} variant="success" size="lg" leftIcon={<HiOutlineCheck className="w-5 h-5" />}>
                        تأكيد الحضور
                      </Button>
                      <Button type="button" onClick={handleCancel} variant="secondary" size="lg" leftIcon={<HiOutlineX className="w-5 h-5" />}>
                        إلغاء
                      </Button>
                    </div>
                  </div>
                ) : confirmed ? (
                  <div className="flex flex-col items-center justify-center p-8">
                    <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                      <HiOutlineCheckCircle className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-text mb-1">طھظ… تسجيل الحضور بنجاح</h3>
                    <p className="text-text-secondary text-sm">{detectedStudent?.name}</p>
                    <Button type="button" onClick={startScan} variant="primary" className="mt-6" leftIcon={<HiOutlineQrcode className="w-4 h-4" />}>
                      مسح QR جديد
                    </Button>
                  </div>
                ) : (
                  <EmptyState
                    icon={HiOutlineCamera}
                    title="الكاميرا ظپظٹ وضع الاستعداد"
                    description="اضغط على 'بدء المسح' لبدء مسح QR كود الطالب"
                    action={
                      <Button type="button" onClick={startScan} variant="primary" leftIcon={<HiOutlineQrcode className="w-4 h-4" />}>
                        بدء المسح
                      </Button>
                    }
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>عمليات المسح الأخيرة</CardTitle>
              <Badge variant="primary" size="sm">{recentScans.length}</Badge>
            </CardHeader>
            <CardContent>
              {recentScans.length === 0 ? (
                <EmptyState
                  icon={HiOutlineClock}
                  title="لا توجد عمليات مسح"
                  description="عمليات مسح QR ستظهر هنا"
                  withBackground={false}
                />
              ) : (
                <div className="space-y-2">
                  {recentScans.map((scan, idx) => (
                    <motion.div
                      key={scan.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-surface-secondary border border-border"
                    >
                      <img src={scan.studentImage} alt="" className="w-8 h-8 rounded-full bg-surface-tertiary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-text truncate">{scan.studentName}</p>
                        <p className="text-xs text-text-tertiary">{scan.grade}</p>
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-text-tertiary">{scan.time}</p>
                        {scan.success && <HiOutlineCheckCircle className="w-4 h-4 text-success mt-0.5" />}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
