"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineStar,
  HiOutlineAcademicCap,
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineBookOpen,
  HiOutlineClipboardCheck,
  HiOutlineUserGroup,
  HiOutlineFire,
  HiOutlineDownload,
  HiOutlinePrinter,
  HiOutlineQrcode,
  HiOutlineDotsVertical,
  HiOutlineEye,
  HiOutlineTrash,
  HiOutlineBan,
  HiOutlinePause,
  HiOutlineSearch,
  HiOutlineFilter,
  HiOutlineCheck,
} from "react-icons/hi"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { det } from "@/lib/utils"
import { Timeline } from "@/components/ui/Timeline"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Table } from "@/components/ui/Table"
import { Progress } from "@/components/ui/Progress"
import { StudentTimeline } from "@/components/student/StudentTimeline"
import { StudentQRModal } from "@/components/student/StudentQRModal"
import { mockStudents, mockExams, mockAttendance, mockCertificates, mockCourses } from "@/lib/mock/data"
import { cn, formatDate } from "@/lib/utils"

const statusBadge: Record<string, "success" | "warning" | "error" | "neutral"> = {
  active: "success",
  inactive: "warning",
  expired: "error",
  suspended: "neutral",
}

const statusLabels: Record<string, string> = {
  active: "ظ†ط´ط·",
  inactive: "ظ…ظ†ظ‚ط·ط¹",
  suspended: "ظ…ط¹ظ„ظ‚",
  expired: "ظ…ظƒطھظ…ظ„",
}

const attStatusBadge: Record<string, "success" | "error" | "warning" | "info"> = {
  present: "success",
  absent: "error",
  late: "warning",
  excused: "info",
}

const attStatusLabels: Record<string, string> = {
  present: "ط­ط§ط¶ط±",
  absent: "ط؛ط§ط¦ط¨",
  late: "ظ…طھط£ط®ط±",
  excused: "ظ…ط¹ط°ظˆط±",
}

const courseStatusLabels: Record<string, string> = {
  in_progress: "ظ‚ظٹط¯ ط§ظ„طھظ†ظپظٹط°",
  completed: "ظ…ظƒطھظ…ظ„",
  not_started: "ظ„ظ… ظٹط¨ط¯ط£",
}

const certStatusLabels: Record<string, string> = {
  active: "ظ†ط´ط·",
  revoked: "ظ…ظ„ط؛ظٹ",
}

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"]

function getStudentExtended(studentId: string) {
  const idx = parseInt(studentId.replace("s-", "")) || 0
  const courses = mockCourses.slice(0, 4 + (idx % 4)).map((c, i) => ({
    id: c.id,
    name: c.title,
    progress: Math.floor(det() * 60) + 30,
    grade: Math.floor(det() * 30) + 65,
    status: (i % 3 === 1 ? "completed" : "in_progress") as "in_progress" | "completed" | "not_started",
    enrolledDate: new Date(2025, 4 + i, 1 + (idx % 20)),
  }))

  const exams = mockExams.slice(0, 6 + (idx % 4)).map((e) => ({
    id: e.id,
    name: e.title,
    date: new Date(2025, 5 + (idx % 3), (idx % 28) + 1),
    grade: 65 + (idx * 3) % 35,
    totalGrade: e.totalGrade,
    percentage: 70 + (idx * 2) % 25,
    result: (idx % 4 !== 0 ? "pass" : "fail") as "pass" | "fail",
  }))

  const attendance = mockAttendance
    .filter((a) => a.studentId === studentId)
    .slice(0, 15)
    .length > 0
    ? mockAttendance.filter((a) => a.studentId === studentId).slice(0, 15)
    : Array.from({ length: 10 }, (_, i) => ({
        id: `att-${studentId}-${i}`,
        studentId,
        studentName: "",
        courseId: mockCourses[i % mockCourses.length].id,
        courseName: mockCourses[i % mockCourses.length].title,
        date: new Date(2025, 5 + Math.floor(i / 20), (i % 28) + 1),
        status: (["present", "present", "present", "absent", "late"] as const)[i % 5],
      checkIn: i % 5 !== 3 ? `${8 + Math.floor(det() * 2)}:${String(Math.floor(det() * 60)).padStart(2, "0")}` : undefined,
      checkOut: i % 5 !== 3 ? `${10 + Math.floor(det() * 2)}:${String(Math.floor(det() * 60)).padStart(2, "0")}` : undefined,
        notes: "",
        recordedBy: "ط£ط­ظ…ط¯ ظ…ط­ظ…ط¯",
      }))

  const attSummary = {
    total: attendance.length,
    present: attendance.filter((a) => a.status === "present").length,
    absent: attendance.filter((a) => a.status === "absent").length,
    late: attendance.filter((a) => a.status === "late").length,
  }
  attSummary.present = Math.max(attSummary.present, 6)
  attSummary.absent = Math.max(attSummary.absent, 2)
  attSummary.late = Math.max(attSummary.late, 2)
  attSummary.total = attSummary.present + attSummary.absent + attSummary.late

  const certificates = mockCertificates
    .filter((c) => c.studentId === studentId)
    .slice(0, 6)

  const activities = Array.from({ length: 15 }, (_, i) => ({
    id: `act-${studentId}-${i}`,
    type: (["login", "exam", "course", "homework", "certificate", "payment"] as const)[i % 6],
    title: [
      "طھط³ط¬ظٹظ„ ط¯ط®ظˆظ„ ط¥ظ„ظ‰ ط§ظ„ظ…ظ†طµط©",
      `ط£ط¯ظ‰ ط§ظ…طھط­ط§ظ† ${mockCourses[i % mockCourses.length].title}`,
      `ط§ط´طھط±ظƒ ظپظٹ ${mockCourses[i % mockCourses.length].title}`,
      "ط³ظ„ظ… ظˆط§ط¬ط¨ ط§ظ„ظ†ط­ظˆ",
      "ط­طµظ„ ط¹ظ„ظ‰ ط´ظ‡ط§ط¯ط© ط¥طھظ…ط§ظ…",
      "طھظ… طھط¬ط¯ظٹط¯ ط§ظ„ط§ط´طھط±ط§ظƒ",
    ][i % 6],
    description: i % 2 === 0 ? undefined : "طھظپط§طµظٹظ„ ط¥ط¶ط§ظپظٹط© ط¹ظ† ط§ظ„ظ†ط´ط§ط·",
    date: new Date(Date.now() - 1000 * 60 * 60 * (i * 12)).toLocaleDateString("ar-EG"),
    time: new Date(Date.now() - 1000 * 60 * 60 * (i * 12)).toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" }),
  }))

  const devices = Array.from({ length: 2 + (idx % 2) }, (_, i) => ({
    id: `dev-${studentId}-${i}`,
    name: ["iPhone 14 Pro", "Samsung Galaxy S24", "MacBook Pro 16", "iPad Air"][i % 4],
    browser: ["Safari", "Chrome", "Chrome", "Safari"][i % 4],
    os: ["iOS 18", "Android 15", "macOS 15", "iPadOS 18"][i % 4],
    lastLogin: new Date(Date.now() - 1000 * 60 * 60 * (i === 0 ? 1 : 24)),
    ip: `192.168.1.${10 + i}`,
    isCurrent: i === 0,
  }))

  const gradeData = [
    { name: "ط§ظ…طھط­ط§ظ†ط§طھ", value: 40, fill: COLORS[0] },
    { name: "ظˆط§ط¬ط¨ط§طھ", value: 25, fill: COLORS[1] },
    { name: "ط­ط¶ظˆط±", value: 20, fill: COLORS[2] },
    { name: "ظ…ط´ط§ط±ظƒط©", value: 15, fill: COLORS[3] },
  ]

  return { courses, exams, attendance, attSummary, certificates, activities, devices, gradeData }
}

export default function StudentDetailPage() {
  const params = useParams()
  const student = mockStudents.find((s) => s.id === params.id)
  const [showQR, setShowQR] = useState(false)
  const [showMoreMenu, setShowMoreMenu] = useState(false)

  const extended = useMemo(() => student ? getStudentExtended(student.id) : null, [student])

  if (!student || !extended) {
    return (
      <div className="p-4 md:p-6 text-center py-20">
        <h2 className="text-xl font-bold text-text mb-2">ط§ظ„ط·ط§ظ„ط¨ ط؛ظٹط± ظ…ظˆط¬ظˆط¯</h2>
        <p className="text-sm text-text-tertiary mb-4">ظ„ظ… ظٹطھظ… ط§ظ„ط¹ط«ظˆط± ط¹ظ„ظ‰ ط§ظ„ط·ط§ظ„ط¨ ط§ظ„ظ…ط·ظ„ظˆط¨</p>
        <Link href="/teacher/students">
          <Button className="px-4 py-2 text-sm text-white bg-primary rounded-xl">ط§ظ„ط¹ظˆط¯ط© ظ„ظ„ط·ظ„ط§ط¨</Button>
        </Link>
      </div>
    )
  }

  const tabs = [
    { id: "summary", label: "ط§ظ„ظ…ظ„ط®طµ" },
    { id: "courses", label: "ط§ظ„ظƒظˆط±ط³ط§طھ", count: extended.courses.length },
    { id: "exams", label: "ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ", count: extended.exams.length },
    { id: "attendance", label: "ط§ظ„ط­ط¶ظˆط±" },
    { id: "certificates", label: "ط§ظ„ط´ظ‡ط§ط¯ط§طھ", count: extended.certificates.length },
    { id: "activity", label: "ط§ظ„ظ†ط´ط§ط·" },
    { id: "devices", label: "ط§ظ„ط£ط¬ظ‡ط²ط©", count: extended.devices.length },
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "ط§ظ„ط·ظ„ط§ط¨", href: "/teacher/students" }, { label: student.name }]} />

      <div className="bg-surface rounded-xl border border-border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full bg-primary/10 overflow-hidden shrink-0 ring-2 ring-primary/20">
              <img src={student.avatar} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-text">{student.name}</h1>
                <Badge variant={statusBadge[student.status]} size="md">{statusLabels[student.status] || student.status}</Badge>
              </div>
              <div className="flex items-center gap-3 text-sm text-text-secondary">
                <span>{student.grade}</span>
                <span className="w-1 h-1 rounded-full bg-text-tertiary" />
                <span>{student.group}</span>
                <span className="w-1 h-1 rounded-full bg-text-tertiary" />
                <span>{student.governorate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors">
              <HiOutlineMail size={16} /> ط±ط³ط§ظ„ط©
            </Button>
            <Button className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-text-secondary text-sm hover:bg-surface-secondary transition-colors">
              <HiOutlinePrinter size={16} /> ط·ط¨ط§ط¹ط© ط§ظ„ط¨ظٹط§ظ†ط§طھ
            </Button>
            <Button onClick={() => setShowQR(true)} className="p-2 rounded-xl border border-border text-text-secondary hover:bg-surface-secondary transition-colors" title="QR Code">
              <HiOutlineQrcode size={18} />
            </Button>
            <div className="relative">
              <Button onClick={() => setShowMoreMenu((p) => !p)} className="p-2 rounded-xl border border-border text-text-secondary hover:bg-surface-secondary transition-colors">
                <HiOutlineDotsVertical size={18} />
              </Button>
              {showMoreMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowMoreMenu(false)} />
                  <div className="absolute left-0 top-full mt-1 w-40 bg-surface border border-border rounded-xl shadow-lg z-20 py-1 overflow-hidden">
                    {[
                      { label: "طھط¹ظ„ظٹظ‚", icon: HiOutlinePause, color: "text-warning" },
                      { label: "ط­ط¸ط±", icon: HiOutlineBan, color: "text-error" },
                      { label: "ط­ط°ظپ", icon: HiOutlineTrash, color: "text-error" },
                    ].map((item) => (
                      <Button key={item.label}
                        onClick={() => setShowMoreMenu(false)}
                        className={cn("flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-surface-secondary transition-colors", item.color)}
                      >
                        <item.icon size={16} /> {item.label}
                      </Button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-text">{student.xp.toLocaleString("ar-EG")}</p>
            <p className="text-xs text-text-tertiary mt-0.5">XP</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text">{student.level}</p>
            <p className="text-xs text-text-tertiary mt-0.5">ط§ظ„ظ…ط³طھظˆظ‰</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text">{student.streak}</p>
            <p className="text-xs text-text-tertiary mt-0.5">ط£ظٹط§ظ… ط§ظ„طھطھط§ط¨ط¹</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-text">{extended.courses.length}</p>
            <p className="text-xs text-text-tertiary mt-0.5">ط§ظ„ظƒظˆط±ط³ط§طھ</p>
          </div>
          <div className="text-center">
              <p className="text-2xl font-bold text-text text-success">{Math.floor(det() * 20) + 75}%</p>
            <p className="text-xs text-text-tertiary mt-0.5">ط§ظ„طھظ‚ظٹظٹظ… ط§ظ„ط¹ط§ظ…</p>
          </div>
        </div>
      </div>

      <Tabs tabs={tabs} defaultTab="summary">
        {(activeTab) => (
          <>
            <TabPanel id="summary" activeTab={activeTab}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatsCard title="ظ†ط³ط¨ط© ط§ظ„ط­ط¶ظˆط±" value={`${extended.attSummary.present > 0 ? Math.round((extended.attSummary.present / extended.attSummary.total) * 100) : 90}%`} icon={HiOutlineCalendar} color="primary" />
                  <StatsCard title="ظ…طھظˆط³ط· ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ" value={`${Math.floor(det() * 15) + 75}%`} icon={HiOutlineChartBar} color="success" />
                  <StatsCard title="ظ…طھظˆط³ط· ط§ظ„ظˆط§ط¬ط¨ط§طھ" value={`${Math.floor(det() * 15) + 80}%`} icon={HiOutlineClipboardCheck} color="warning" />
                  <StatsCard title="ط§ظ„طھط±طھظٹط¨" value={`#${(Math.floor(det() * 20) + 1)}`} icon={HiOutlineStar} color="premium" subtitle="ظ…ظ† ط¨ظٹظ† 50 ط·ط§ظ„ط¨" />
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>طھظˆط²ظٹط¹ ط§ظ„ط¯ط±ط¬ط§طھ</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div dir="ltr" className="h-56">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie data={extended.gradeData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" stroke="none">
                              {extended.gradeData.map((entry, i) => (
                                <Cell key={entry.name} fill={COLORS[i]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "8px", fontSize: "13px" }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex flex-wrap justify-center gap-4 mt-2">
                        {extended.gradeData.map((item, i) => (
                          <div key={item.name} className="flex items-center gap-1.5 text-xs text-text-secondary">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                            {item.name}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>ط¢ط®ط± ط§ظ„ظ†ط´ط§ط·ط§طھ</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <StudentTimeline items={extended.activities.slice(0, 5)} />
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>ط§ظ„ظƒظˆط±ط³ط§طھ ط§ظ„ط­ط§ظ„ظٹط©</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {extended.courses.filter(c => c.status === "in_progress").slice(0, 3).map((course) => (
                      <div key={course.id} className="flex items-center gap-4 p-3 rounded-xl bg-surface-secondary border border-border">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <HiOutlineBookOpen className="text-primary" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-text truncate">{course.name}</p>
                          <Progress value={course.progress} size="sm" variant="primary" className="mt-1.5" />
                        </div>
                        <span className="text-xs font-medium text-text-secondary">{course.progress}%</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabPanel>

            <TabPanel id="courses" activeTab={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>ط§ظ„ظƒظˆط±ط³ط§طھ ط§ظ„ظ…ط³ط¬ظ„ ظپظٹظ‡ط§</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table
                    columns={[
                      { key: "name", header: "ط§ط³ظ… ط§ظ„ظƒظˆط±ط³" },
                      { key: "progress", header: "ط§ظ„طھظ‚ط¯ظ…", render: (c) => (
                        <div className="w-32">
                          <Progress value={c.progress} size="sm" variant={c.progress >= 80 ? "success" : "primary"} showLabel />
                        </div>
                      )},
                      { key: "grade", header: "ط§ظ„ط¯ط±ط¬ط©", render: (c) => (
                        <span className="font-medium text-text">{c.grade}%</span>
                      )},
                      { key: "status", header: "ط§ظ„ط­ط§ظ„ط©", render: (c) => (
                        <Badge variant={c.status === "completed" ? "success" : c.status === "in_progress" ? "primary" : "neutral"}>
                          {courseStatusLabels[c.status]}
                        </Badge>
                      )},
                      { key: "enrolledDate", header: "طھط§ط±ظٹط® ط§ظ„طھط³ط¬ظٹظ„", render: (c) => (
                        <span className="text-sm text-text-secondary">{c.enrolledDate.toLocaleDateString("ar-EG")}</span>
                      )},
                      { key: "actions", header: "", render: (c) => (
                        <Link href={`/teacher/courses/${c.id}`}>
                          <Button className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                            <HiOutlineEye size={16} />
                          </Button>
                        </Link>
                      )},
                    ]}
                    data={extended.courses}
                  />
                </CardContent>
              </Card>
            </TabPanel>

            <TabPanel id="exams" activeTab={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>ظ†طھط§ط¦ط¬ ط§ظ„ط§ظ…طھط­ط§ظ†ط§طھ</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table
                    columns={[
                      { key: "name", header: "ط§ظ„ط§ظ…طھط­ط§ظ†" },
                      { key: "date", header: "ط§ظ„طھط§ط±ظٹط®", render: (e) => (
                        <span className="text-sm text-text-secondary">{e.date.toLocaleDateString("ar-EG")}</span>
                      )},
                      { key: "grade", header: "ط§ظ„ط¯ط±ط¬ط©", render: (e) => (
                        <span className="font-medium">{e.grade} <span className="text-text-tertiary text-xs">/ {e.totalGrade}</span></span>
                      )},
                      { key: "percentage", header: "ط§ظ„ظ†ط³ط¨ط©", render: (e) => (
                        <span className={cn("font-medium", e.percentage >= 75 ? "text-success" : e.percentage >= 50 ? "text-warning" : "text-error")}>
                          {e.percentage}%
                        </span>
                      )},
                      { key: "result", header: "ط§ظ„ظ†طھظٹط¬ط©", render: (e) => (
                        <Badge variant={e.result === "pass" ? "success" : "error"}>
                          {e.result === "pass" ? "ظ†ط§ط¬ط­" : "ط±ط§ط³ط¨"}
                        </Badge>
                      )},
                      { key: "actions", header: "", render: (e) => (
                        <Link href={`/teacher/exams/${e.id}`}>
                          <Button className="p-1.5 text-text-tertiary hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                            <HiOutlineEye size={16} />
                          </Button>
                        </Link>
                      )},
                    ]}
                    data={extended.exams.sort((a, b) => b.date.getTime() - a.date.getTime())}
                  />
                </CardContent>
              </Card>
            </TabPanel>

            <TabPanel id="attendance" activeTab={activeTab}>
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <StatsCard title="ط¥ط¬ظ…ط§ظ„ظٹ ط§ظ„ط­طµطµ" value={extended.attSummary.total} icon={HiOutlineCalendar} color="primary" />
                  <StatsCard title="ط­ط§ط¶ط±" value={extended.attSummary.present} icon={HiOutlineCheck} color="success" />
                  <StatsCard title="ط؛ط§ط¦ط¨" value={extended.attSummary.absent} icon={HiOutlineBan} color="error" />
                  <StatsCard title="ظ…طھط£ط®ط±" value={extended.attSummary.late} icon={HiOutlineClock} color="warning" />
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>ط³ط¬ظ„ ط§ظ„ط­ط¶ظˆط±</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table
                      columns={[
                        { key: "date", header: "ط§ظ„طھط§ط±ظٹط®", render: (a) => (
                          <span className="text-sm text-text-secondary">{a.date.toLocaleDateString("ar-EG")}</span>
                        )},
                        { key: "courseName", header: "ط§ظ„ظƒظˆط±ط³" },
                        { key: "status", header: "ط§ظ„ط­ط§ظ„ط©", render: (a) => (
                          <Badge variant={attStatusBadge[a.status]}>{attStatusLabels[a.status]}</Badge>
                        )},
                        { key: "checkIn", header: "ظˆظ‚طھ ط§ظ„ط­ط¶ظˆط±", render: (a) => (
                          <span className="text-sm text-text-secondary" dir="ltr">{a.checkIn || "-"}</span>
                        )},
                      ]}
                      data={extended.attendance}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabPanel>

            <TabPanel id="certificates" activeTab={activeTab}>
              {extended.certificates.length === 0 ? (
                <Card>
                  <CardContent>
                    <div className="text-center py-12 text-text-tertiary">
                      <p className="text-lg font-medium mb-1">ظ„ط§ طھظˆط¬ط¯ ط´ظ‡ط§ط¯ط§طھ</p>
                      <p className="text-sm">ظ„ظ… ظٹط­طµظ„ ط§ظ„ط·ط§ظ„ط¨ ط¹ظ„ظ‰ ط£ظٹ ط´ظ‡ط§ط¯ط§طھ ط­طھظ‰ ط§ظ„ط¢ظ†</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {extended.certificates.map((cert) => (
                    <Card key={cert.id} hover>
                      <CardContent className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center">
                            <HiOutlineAcademicCap className="text-amber-600 dark:text-amber-400" size={22} />
                          </div>
                          <Badge variant={cert.status === "active" ? "success" : "error"} size="sm">
                            {certStatusLabels[cert.status]}
                          </Badge>
                        </div>
                        <div>
                          <p className="font-medium text-text">{cert.courseName}</p>
                          <p className="text-xs text-text-secondary mt-0.5">طµط§ط¯ط±ط© ظپظٹ {cert.issuedAt.toLocaleDateString("ar-EG")}</p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <span className="text-sm font-bold text-text">{cert.grade}%</span>
                          <Button className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark transition-colors">
                            <HiOutlineDownload size={14} /> طھط­ظ…ظٹظ„
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabPanel>

            <TabPanel id="activity" activeTab={activeTab}>
              <Card>
                <CardHeader>
                  <CardTitle>ط§ظ„ظ†ط´ط§ط·ط§طھ</CardTitle>
                </CardHeader>
                <CardContent>
                  <Timeline events={extended.activities.map((a: Record<string, unknown>) => ({ id: a.id || a, title: a.action || a.title || "ظ†ط´ط§ط·", date: a.date || new Date(), description: a.details || a.description }))} />
                </CardContent>
              </Card>
            </TabPanel>

            <TabPanel id="devices" activeTab={activeTab}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-text-secondary">{extended.devices.length} ط¬ظ‡ط§ط² ظ…ط³ط¬ظ„</p>
                  <Button className="flex items-center gap-1.5 px-4 py-2 text-sm text-error border border-error/30 rounded-xl hover:bg-error/5 transition-colors">
                    <HiOutlineTrash size={16} /> ط¥ظ†ظ‡ط§ط، ط¬ظ…ظٹط¹ ط§ظ„ط¬ظ„ط³ط§طھ
                  </Button>
                </div>
                <Card>
                  <CardContent>
                    <Table
                      columns={[
                        { key: "name", header: "ط§ظ„ط¬ظ‡ط§ط²" },
                        { key: "browser", header: "ط§ظ„ظ…طھطµظپط­" },
                        { key: "os", header: "ظ†ط¸ط§ظ… ط§ظ„طھط´ط؛ظٹظ„" },
                        { key: "lastLogin", header: "ط¢ط®ط± طھط³ط¬ظٹظ„", render: (d) => (
                          <span className="text-sm text-text-secondary" dir="ltr">{d.lastLogin.toLocaleDateString("ar-EG")} {d.lastLogin.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" })}</span>
                        )},
                        { key: "ip", header: "IP", render: (d) => (
                          <span className="text-xs font-mono text-text-secondary" dir="ltr">{d.ip}</span>
                        )},
                        { key: "current", header: "ط§ظ„ط­ط§ظ„ط©", render: (d) => (
                          d.isCurrent ? <Badge variant="success" size="sm">ط§ظ„ط¬ظ„ط³ط© ط§ظ„ط­ط§ظ„ظٹط©</Badge> : <span className="text-xs text-text-tertiary">-</span>
                        )},
                      ]}
                      data={extended.devices}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabPanel>
          </>
        )}
      </Tabs>

      <StudentQRModal
        isOpen={showQR}
        onClose={() => setShowQR(false)}
        student={{ id: student.id, name: student.name, grade: student.grade, group: student.group }}
      />
    </div>
  )
}
