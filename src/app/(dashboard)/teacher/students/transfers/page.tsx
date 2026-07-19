"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineUserGroup, HiOutlineUsers, HiOutlineSwitchHorizontal,
  HiOutlineOfficeBuilding, HiOutlineAcademicCap, HiOutlineCalendar,
  HiOutlineFilter, HiOutlineChevronDown, HiOutlineCheck,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Modal } from "@/components/ui/Modal"
import { Table } from "@/components/ui/Table"
import { Tabs, TabPanel } from "@/components/ui/Tabs"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Textarea from "@/components/ui/Textarea"
import { cn, generateId, det } from "@/lib/utils"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

const mockStudents = [
  { id: "st-1", name: "أحمد علي", grade: "أولى ثانوي", group: "مجموعة ألف", branch: "الفرع الرئيسي - القاهرة" },
  { id: "st-2", name: "محمد حسن", grade: "أولى ثانوي", group: "مجموعة ألف", branch: "الفرع الرئيسي - القاهرة" },
  { id: "st-3", name: "سارة خالد", grade: "ثانية ثانوي", group: "مجموعة ألف", branch: "الفرع الرئيسي - القاهرة" },
  { id: "st-4", name: "نورا أحمد", grade: "ثانية ثانوي", group: "مجموعة باء", branch: "الفرع الرئيسي - القاهرة" },
  { id: "st-5", name: "عمر محمود", grade: "ثالثة ثانوي", group: "مجموعة باء", branch: "فرع الإسكندرية" },
  { id: "st-6", name: "فاطمة إبراهيم", grade: "ثالثة ثانوي", group: "مجموعة باء", branch: "فرع الإسكندرية" },
  { id: "st-7", name: "يوسف كريم", grade: "أولى ثانوي", group: "مجموعة جيم", branch: "الفرع الرئيسي - القاهرة" },
  { id: "st-8", name: "مريم عادل", grade: "ثانية ثانوي", group: "مجموعة جيم", branch: "فرع الإسكندرية" },
  { id: "st-9", name: "خالد سامي", grade: "ثالثة ثانوي", group: "مجموعة دال", branch: "الفرع الرئيسي - القاهرة" },
  { id: "st-10", name: "ليلى عبدالله", grade: "أولى ثانوي", group: "مجموعة دال", branch: "فرع الإسكندرية" },
]

const mockGroups = [
  { id: "grp-1", name: "مجموعة ألف", branch: "الفرع الرئيسي - القاهرة", capacity: 25, enrolled: 8 },
  { id: "grp-2", name: "مجموعة باء", branch: "الفرع الرئيسي - القاهرة", capacity: 25, enrolled: 10 },
  { id: "grp-3", name: "مجموعة جيم", branch: "فرع الإسكندرية", capacity: 20, enrolled: 7 },
  { id: "grp-4", name: "مجموعة دال", branch: "فرع الإسكندرية", capacity: 20, enrolled: 6 },
]

const mockBranches = [
  { id: "br-1", name: "الفرع الرئيسي - القاهرة" },
  { id: "br-2", name: "فرع الإسكندرية" },
]

const mockTeachers = [
  { id: "tch-1", name: "أحمد محمد", subject: "لغة عربية", students: 45 },
  { id: "tch-2", name: "سارة أحمد", subject: "رياضيات", students: 38 },
  { id: "tch-3", name: "محمد علي", subject: "علوم", students: 52 },
  { id: "tch-4", name: "نورا حسن", subject: "لغة إنجليزية", students: 41 },
  { id: "tch-5", name: "خالد عمر", subject: "دراسات اجتماعية", students: 33 },
]

const transferReasons = [
  "تغيير المستوى الدراسي",
  "طلب ولي الأمر",
  "ظروف عائلية",
  "انتقال مكان السكن",
  "تطوير المستوى الأكاديمي",
  "عدم التوافق مع المجموعة",
  "انتقال إلى فرع آخر",
  "تغيير الجدول الزمني",
]

const transferTypeLabels: Record<string, string> = {
  student: "نقل طالب",
  group: "نقل مجموعة",
  branch: "نقل فرع",
  teacher: "نقل مدرس",
}

const transferTypeIcon: Record<string, React.ReactNode> = {
  student: <HiOutlineUsers className="w-4 h-4" />,
  group: <HiOutlineUserGroup className="w-4 h-4" />,
  branch: <HiOutlineOfficeBuilding className="w-4 h-4" />,
  teacher: <HiOutlineAcademicCap className="w-4 h-4" />,
}

const typeBadgeVariant: Record<string, "primary" | "info" | "warning" | "success"> = {
  student: "primary",
  group: "info",
  branch: "warning",
  teacher: "success",
}

const tabs = [
  { id: "student", label: "نقل طالب", icon: <HiOutlineUsers className="w-4 h-4" /> },
  { id: "group", label: "نقل مجموعة", icon: <HiOutlineUserGroup className="w-4 h-4" /> },
  { id: "branch", label: "نقل فرع", icon: <HiOutlineOfficeBuilding className="w-4 h-4" /> },
  { id: "teacher", label: "نقل مدرس", icon: <HiOutlineAcademicCap className="w-4 h-4" /> },
]

const today = new Date()
const todayStr = today.toISOString().split("T")[0]

interface TransferRecord {
  id: string
  date: Date
  studentName: string
  from: string
  to: string
  type: "student" | "group" | "branch" | "teacher"
  reason: string
  performedBy: string
}

function generateMockHistory(): TransferRecord[] {
  const students = mockStudents.map((s) => s.name)
  const groups = mockGroups.map((g) => g.name)
  const branches = mockBranches.map((b) => b.name)
  const teachers = mockTeachers.map((t) => t.name)
  const types = ["student", "group", "branch", "teacher"] as const
  const fromOptions: Record<string, string[]> = {
    student: groups,
    group: groups,
    branch: branches,
    teacher: groups,
  }
  const toOptions: Record<string, string[]> = {
    student: groups,
    group: groups,
    branch: branches,
    teacher: groups,
  }
  return Array.from({ length: 15 }, (_, i) => {
    const type = types[i % 4]
    const student = students[i % students.length]
    const fromArr = fromOptions[type]
    let toArr = toOptions[type]
    let from = fromArr[i % fromArr.length]
    let to = toArr[(i + 3) % toArr.length]
    if (from === to) to = toArr[(i + 5) % toArr.length]
    const month = 5 + Math.floor(i / 5)
    return {
      id: generateId(),
      date: new Date(2026, month, (i % 28) + 1),
      studentName: student,
      from,
      to,
      type,
      reason: transferReasons[i % transferReasons.length],
      performedBy: teachers[i % teachers.length],
    }
  })
}

const initialHistory = generateMockHistory()

export default function TransfersPage() {
  const [history, setHistory] = useState<TransferRecord[]>(initialHistory)
  const [activeTab, setActiveTab] = useState("student")
  const [typeFilter, setTypeFilter] = useState("all")
  const [sortField, setSortField] = useState<"date" | "studentName">("date")
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [detailRecord, setDetailRecord] = useState<TransferRecord | null>(null)

  const [studentForm, setStudentForm] = useState({ student: "", targetGroup: "", reason: "", date: todayStr })
  const [groupForm, setGroupForm] = useState({ sourceGroup: "", targetGroup: "", reason: "" })
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set())
  const [branchForm, setBranchForm] = useState({ student: "", sourceBranch: "", targetBranch: "", reason: "", date: todayStr })
  const [teacherForm, setTeacherForm] = useState({ teacher: "", targetGroup: "", reassign: false, date: todayStr })

  const sourceGroupStudents = useMemo(() => {
    if (!groupForm.sourceGroup) return []
    const g = mockGroups.find((g) => g.id === groupForm.sourceGroup)
    if (!g) return []
    return mockStudents.filter((s) => s.group === g.name)
  }, [groupForm.sourceGroup])

  const stats = useMemo(() => {
    const now = new Date()
    const thisMonth = history.filter((h) =>
      h.date.getMonth() === now.getMonth() && h.date.getFullYear() === now.getFullYear()
    )
    const todayRecords = history.filter((h) =>
      h.date.toDateString() === now.toDateString()
    )
    const byType = { student: 0, group: 0, branch: 0, teacher: 0 }
    history.forEach((h) => { byType[h.type]++ })
    return {
      thisMonth: thisMonth.length,
      today: todayRecords.length,
      byType,
    }
  }, [history])

  const filteredHistory = useMemo(() => {
    let result = [...history]
    if (typeFilter !== "all") result = result.filter((h) => h.type === typeFilter)
    result.sort((a, b) => {
      const dir = sortDir === "asc" ? 1 : -1
      if (sortField === "date") return (a.date.getTime() - b.date.getTime()) * dir
      return a.studentName.localeCompare(b.studentName) * dir
    })
    return result
  }, [history, typeFilter, sortField, sortDir])

  const toggleSort = useCallback((field: "date" | "studentName") => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    else { setSortField(field); setSortDir("desc") }
  }, [sortField])

  const resetStudentForm = () => setStudentForm({ student: "", targetGroup: "", reason: "", date: todayStr })
  const resetGroupForm = () => { setGroupForm({ sourceGroup: "", targetGroup: "", reason: "" }); setSelectedStudents(new Set()) }
  const resetBranchForm = () => setBranchForm({ student: "", sourceBranch: "", targetBranch: "", reason: "", date: todayStr })
  const resetTeacherForm = () => setTeacherForm({ teacher: "", targetGroup: "", reassign: false, date: todayStr })

  const handleStudentTransfer = () => {
    const student = mockStudents.find((s) => s.id === studentForm.student)
    const group = mockGroups.find((g) => g.id === studentForm.targetGroup)
    if (!student || !group) { toast.error("يرجى اختيار الطالب والمجموعة المستهدفة"); return }
    setHistory((prev) => [{
      id: generateId(), date: new Date(studentForm.date + "T00:00:00"),
      studentName: student.name, from: student.group, to: group.name,
      type: "student", reason: studentForm.reason || "بدون سبب", performedBy: "أحمد محمد",
    }, ...prev])
    toast.success(`تم نقل الطالب ${student.name} إلى ${group.name} بنجاح`)
    resetStudentForm()
  }

  const handleGroupTransfer = () => {
    const src = mockGroups.find((g) => g.id === groupForm.sourceGroup)
    const tgt = mockGroups.find((g) => g.id === groupForm.targetGroup)
    if (!src || !tgt) { toast.error("يرجى اختيار المجموعة المصدر والهدف"); return }
    if (selectedStudents.size === 0) { toast.error("يرجى اختيار طالب واحد على الأقل"); return }
    const names = [...selectedStudents].map((id) => {
      const s = mockStudents.find((st) => st.id === id)
      return s?.name || ""
    }).filter(Boolean)
    names.forEach((name) => {
      setHistory((prev) => [{
        id: generateId(), date: new Date(),
        studentName: name, from: src.name, to: tgt.name,
        type: "group", reason: groupForm.reason || "نقل مجموعة", performedBy: "أحمد محمد",
      }, ...prev])
    })
    toast.success(`تم نقل ${names.length} طالب${names.length > 1 ? "اً" : ""} من ${src.name} إلى ${tgt.name} بنجاح`)
    resetGroupForm()
  }

  const handleBranchTransfer = () => {
    const student = mockStudents.find((s) => s.id === branchForm.student)
    const src = mockBranches.find((b) => b.id === branchForm.sourceBranch)
    const tgt = mockBranches.find((b) => b.id === branchForm.targetBranch)
    if (!student || !src || !tgt) { toast.error("يرجى اختيار جميع الحقول"); return }
    if (src.id === tgt.id) { toast.error("الفرع المصدر والهدف لا يمكن أن يكونا نفس الفرع"); return }
    setHistory((prev) => [{
      id: generateId(), date: new Date(branchForm.date + "T00:00:00"),
      studentName: student.name, from: src.name, to: tgt.name,
      type: "branch", reason: branchForm.reason || "نقل فرع", performedBy: "أحمد محمد",
    }, ...prev])
    toast.success(`تم نقل الطالب ${student.name} من ${src.name} إلى ${tgt.name} بنجاح`)
    resetBranchForm()
  }

  const handleTeacherTransfer = () => {
    const teacher = mockTeachers.find((t) => t.id === teacherForm.teacher)
    const group = mockGroups.find((g) => g.id === teacherForm.targetGroup)
    if (!teacher || !group) { toast.error("يرجى اختيار المدرس والمجموعة المستهدفة"); return }
    setHistory((prev) => [{
      id: generateId(), date: new Date(teacherForm.date + "T00:00:00"),
      studentName: teacher.name, from: teacher.subject, to: group.name,
      type: "teacher", reason: `نقل مدرس - ${teacherForm.reassign ? "إعادة تعيين الطلاب" : "بدون إعادة تعيين"}`,
      performedBy: "أحمد محمد",
    }, ...prev])
    toast.success(`تم نقل المدرس ${teacher.name} إلى ${group.name} بنجاح`)
    resetTeacherForm()
  }

  const studentOptions = mockStudents.map((s) => ({ value: s.id, label: `${s.name} - ${s.group}` }))
  const groupOptions = mockGroups.map((g) => ({ value: g.id, label: `${g.name} (${g.enrolled}/${g.capacity})` }))
  const branchOptions = mockBranches.map((b) => ({ value: b.id, label: b.name }))
  const teacherOptions = mockTeachers.map((t) => ({ value: t.id, label: `${t.name} - ${t.subject}` }))

  const getStudentGroup = (studentId: string): string => {
    const s = mockStudents.find((st) => st.id === studentId)
    return s?.group || ""
  }

  const getStudentBranch = (studentId: string): string => {
    const s = mockStudents.find((st) => st.id === studentId)
    const b = mockBranches.find((br) => br.name === s?.branch)
    return b?.id || ""
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <Breadcrumb items={[{ label: "الطلاب", href: "/teacher/students" }, { label: "نقل الطلاب" }]} />
      <DashboardHeader title="النقل والتحويلات" subtitle="إدارة نقل الطلاب والمجموعات والفروع والمدرسين" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="تحويلات هذا الشهر" value={stats.thisMonth} icon={HiOutlineCalendar} color="primary" />
        <StatsCard title="تحويلات اليوم" value={stats.today} icon={HiOutlineSwitchHorizontal} color="success" />
        <StatsCard title="نقل طلاب" value={stats.byType.student} icon={HiOutlineUsers} color="info" />
        <StatsCard title="نقل مجموعات" value={stats.byType.group} icon={HiOutlineUserGroup} color="warning" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>نقل جديد</CardTitle>
          <CardDescription>اختر نوع النقل من التبويبات أدناه</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs tabs={tabs} defaultTab="student" onChange={setActiveTab}>
            {(currentTab) => (
              <>
                <TabPanel id="student" activeTab={currentTab}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select label="الطالب" options={studentOptions} value={studentForm.student}
                      onChange={(e) => setStudentForm({ ...studentForm, student: e.target.value })}
                      placeholder="اختر الطالب" />
                    <Select label="المجموعة المستهدفة" options={groupOptions} value={studentForm.targetGroup}
                      onChange={(e) => setStudentForm({ ...studentForm, targetGroup: e.target.value })}
                      placeholder="اختر المجموعة" />
                    <div className="md:col-span-2">
                      <Textarea label="سبب النقل" value={studentForm.reason}
                        onChange={(e) => setStudentForm({ ...studentForm, reason: e.target.value })}
                        placeholder="اذكر سبب النقل..." />
                    </div>
                    <Input label="تاريخ النقل" type="date" value={studentForm.date}
                      onChange={(e) => setStudentForm({ ...studentForm, date: e.target.value })} />
                    <div className="flex items-end">
                      <Button onClick={handleStudentTransfer} className="w-full">
                        تأكيد نقل الطالب
                      </Button>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel id="group" activeTab={currentTab}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select label="المجموعة المصدر" options={groupOptions} value={groupForm.sourceGroup}
                      onChange={(e) => { setGroupForm({ ...groupForm, sourceGroup: e.target.value }); setSelectedStudents(new Set()) }}
                      placeholder="اختر المجموعة المصدر" />
                    <Select label="المجموعة المستهدفة" options={groupOptions} value={groupForm.targetGroup}
                      onChange={(e) => setGroupForm({ ...groupForm, targetGroup: e.target.value })}
                      placeholder="اختر المجموعة الهدف" />
                    <div className="md:col-span-2">
                      <Textarea label="سبب النقل" value={groupForm.reason}
                        onChange={(e) => setGroupForm({ ...groupForm, reason: e.target.value })}
                        placeholder="اذكر سبب نقل المجموعة..." />
                    </div>
                  </div>
                  {sourceGroupStudents.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-text">طلاب المجموعة المصدر ({sourceGroupStudents.length})</span>
                        <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer">
                          <input type="checkbox"
                            checked={selectedStudents.size === sourceGroupStudents.length && sourceGroupStudents.length > 0}
                            onChange={() => {
                              if (selectedStudents.size === sourceGroupStudents.length) setSelectedStudents(new Set())
                              else setSelectedStudents(new Set(sourceGroupStudents.map((s) => s.id)))
                            }}
                            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30" />
                          تحديد الكل
                        </label>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {sourceGroupStudents.map((s) => (
                          <label key={s.id}
                            className={cn(
                              "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                              selectedStudents.has(s.id)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:border-primary/30 hover:bg-surface-secondary"
                            )}>
                            <input type="checkbox"
                              checked={selectedStudents.has(s.id)}
                              onChange={() => {
                                const next = new Set(selectedStudents)
                                if (next.has(s.id)) next.delete(s.id); else next.add(s.id)
                                setSelectedStudents(next)
                              }}
                              className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30" />
                            <div>
                              <p className="text-sm font-medium text-text">{s.name}</p>
                              <p className="text-xs text-text-tertiary">{s.grade}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                      <Button onClick={handleGroupTransfer} className="w-full md:w-auto">
                        نقل {selectedStudents.size > 0 ? `(${selectedStudents.size}) ` : ""}طالباً
                      </Button>
                    </motion.div>
                  )}
                </TabPanel>

                <TabPanel id="branch" activeTab={currentTab}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select label="الطالب" options={studentOptions} value={branchForm.student}
                      onChange={(e) => setBranchForm({ ...branchForm, student: e.target.value, sourceBranch: getStudentBranch(e.target.value) })}
                      placeholder="اختر الطالب" />
                    <Select label="الفرع الحالي" options={branchOptions} value={branchForm.sourceBranch}
                      onChange={(e) => setBranchForm({ ...branchForm, sourceBranch: e.target.value })}
                      placeholder="الفرع الحالي" />
                    <Select label="الفرع المستهدف" options={branchOptions} value={branchForm.targetBranch}
                      onChange={(e) => setBranchForm({ ...branchForm, targetBranch: e.target.value })}
                      placeholder="اختر الفرع المستهدف" />
                    <div className="md:col-span-2">
                      <Textarea label="سبب النقل" value={branchForm.reason}
                        onChange={(e) => setBranchForm({ ...branchForm, reason: e.target.value })}
                        placeholder="اذكر سبب نقل الفرع..." />
                    </div>
                    <Input label="تاريخ التفعيل" type="date" value={branchForm.date}
                      onChange={(e) => setBranchForm({ ...branchForm, date: e.target.value })} />
                    <div className="flex items-end">
                      <Button onClick={handleBranchTransfer} className="w-full">
                        تأكيد نقل الفرع
                      </Button>
                    </div>
                  </div>
                </TabPanel>

                <TabPanel id="teacher" activeTab={currentTab}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select label="المدرس" options={teacherOptions} value={teacherForm.teacher}
                      onChange={(e) => setTeacherForm({ ...teacherForm, teacher: e.target.value })}
                      placeholder="اختر المدرس" />
                    <Select label="المجموعة / المادة المستهدفة" options={groupOptions} value={teacherForm.targetGroup}
                      onChange={(e) => setTeacherForm({ ...teacherForm, targetGroup: e.target.value })}
                      placeholder="اختر المجموعة" />
                    <label className="flex items-center gap-3 p-3 rounded-xl border border-border cursor-pointer hover:bg-surface-secondary transition-colors">
                      <input type="checkbox"
                        checked={teacherForm.reassign}
                        onChange={(e) => setTeacherForm({ ...teacherForm, reassign: e.target.checked })}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30" />
                      <div>
                        <p className="text-sm font-medium text-text">إعادة تعيين الطلاب لمدرس جديد</p>
                        <p className="text-xs text-text-tertiary">نقل جميع طلاب المدرس الحالي إلى مدرس آخر</p>
                      </div>
                    </label>
                    <Input label="تاريخ التفعيل" type="date" value={teacherForm.date}
                      onChange={(e) => setTeacherForm({ ...teacherForm, date: e.target.value })} />
                    <div className="flex items-end">
                      <Button onClick={handleTeacherTransfer} className="w-full">
                        تأكيد نقل المدرس
                      </Button>
                    </div>
                  </div>
                </TabPanel>
              </>
            )}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>سجل التحويلات</CardTitle>
          <div className="flex items-center gap-2">
            <HiOutlineFilter className="w-4 h-4 text-text-tertiary" />
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-1.5 bg-surface border border-border rounded-lg text-sm text-text focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer">
              <option value="all">جميع الأنواع</option>
              <option value="student">نقل طالب</option>
              <option value="group">نقل مجموعة</option>
              <option value="branch">نقل فرع</option>
              <option value="teacher">نقل مدرس</option>
            </select>
          </div>
        </CardHeader>
        <CardContent>
          <Table
            columns={[
              { key: "date", header: "التاريخ", sortable: true,
                render: (r: TransferRecord) => (
                  <span className="text-text-secondary text-xs">{r.date.toLocaleDateString("ar-EG")}</span>
                )
              },
              { key: "studentName", header: "الطالب / المدرس", sortable: true,
                render: (r: TransferRecord) => (
                  <span className="font-medium text-text">{r.studentName}</span>
                )
              },
              { key: "from", header: "من",
                render: (r: TransferRecord) => (
                  <span className="text-text-secondary">{r.from}</span>
                )
              },
              { key: "to", header: "إلى",
                render: (r: TransferRecord) => (
                  <span className="text-text-secondary">{r.to}</span>
                )
              },
              { key: "type", header: "النوع",
                render: (r: TransferRecord) => (
                  <Badge variant={typeBadgeVariant[r.type]} size="sm">
                    {transferTypeLabels[r.type]}
                  </Badge>
                )
              },
              { key: "reason", header: "السبب",
                render: (r: TransferRecord) => (
                  <span className="text-text-tertiary text-xs truncate max-w-[120px] inline-block">{r.reason}</span>
                )
              },
              { key: "performedBy", header: "تم بواسطة",
                render: (r: TransferRecord) => (
                  <span className="text-text-secondary text-xs">{r.performedBy}</span>
                )
              },
            ]}
            data={filteredHistory}
            onRowClick={(r) => { setDetailRecord(r); setShowDetailModal(true) }}
            emptyMessage="لا توجد تحويلات مسجلة"
          />
          <div className="flex items-center gap-2 mt-3 text-xs text-text-tertiary">
            <HiOutlineChevronDown className="w-3 h-3" />
            <span>انقر على أي صف لعرض التفاصيل الكاملة</span>
          </div>
        </CardContent>
      </Card>

      <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title="تفاصيل التحويل" size="md">
        {detailRecord && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">التاريخ</p>
                <p className="text-sm text-text font-medium">{detailRecord.date.toLocaleDateString("ar-EG")}</p>
              </div>
              <div className="p-3 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">النوع</p>
                <Badge variant={typeBadgeVariant[detailRecord.type]}>{transferTypeLabels[detailRecord.type]}</Badge>
              </div>
              <div className="p-3 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">الطالب / المدرس</p>
                <p className="text-sm text-text font-medium">{detailRecord.studentName}</p>
              </div>
              <div className="p-3 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">تم بواسطة</p>
                <p className="text-sm text-text font-medium">{detailRecord.performedBy}</p>
              </div>
              <div className="p-3 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">من</p>
                <p className="text-sm text-text font-medium">{detailRecord.from}</p>
              </div>
              <div className="p-3 rounded-xl bg-surface-secondary border border-border">
                <p className="text-xs text-text-tertiary mb-1">إلى</p>
                <p className="text-sm text-text font-medium">{detailRecord.to}</p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-surface-secondary border border-border">
              <p className="text-xs text-text-tertiary mb-1">السبب</p>
              <p className="text-sm text-text">{detailRecord.reason}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
