"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineAcademicCap, HiOutlineChartBar, HiOutlineCheckCircle,
  HiOutlineDownload, HiOutlinePrinter, HiOutlineSearch, HiOutlinePencil,
  HiOutlinePlus, HiOutlineStar, HiOutlineTrendingUp, HiOutlineTrendingDown,
  HiOutlineCash, HiOutlineClock, HiOutlineExclamationCircle, HiOutlineUserGroup,
} from "react-icons/hi"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from "recharts"
import toast from "react-hot-toast"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { EmptyState } from "@/components/ui/EmptyState"
import { Progress } from "@/components/ui/Progress"
import { SearchInput } from "@/components/ui/SearchInput"
import Button from "@/components/ui/Button"

interface StudentGrade {
  id: string; name: string; avatar: string; exam1: { score: number; max: number }; exam2: { score: number; max: number }; final: { score: number; max: number }; homework: number; yearWork: number; participation: number; bonus: number; deduction: number
}

const students: StudentGrade[] = [
  { id: "s1", name: "أحمد محمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=g1", exam1: { score: 42, max: 50 }, exam2: { score: 38, max: 50 }, final: { score: 88, max: 100 }, homework: 45, yearWork: 48, participation: 18, bonus: 5, deduction: 0 },
  { id: "s2", name: "مريم أحمد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=g2", exam1: { score: 40, max: 50 }, exam2: { score: 44, max: 50 }, final: { score: 92, max: 100 }, homework: 48, yearWork: 50, participation: 20, bonus: 3, deduction: 0 },
  { id: "s3", name: "يوسف علي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=g3", exam1: { score: 35, max: 50 }, exam2: { score: 32, max: 50 }, final: { score: 75, max: 100 }, homework: 38, yearWork: 40, participation: 15, bonus: 0, deduction: 2 },
  { id: "s4", name: "سارة خالد", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=g4", exam1: { score: 48, max: 50 }, exam2: { score: 47, max: 50 }, final: { score: 96, max: 100 }, homework: 50, yearWork: 49, participation: 20, bonus: 7, deduction: 0 },
  { id: "s5", name: "عمر حسن", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=g5", exam1: { score: 28, max: 50 }, exam2: { score: 30, max: 50 }, final: { score: 62, max: 100 }, homework: 30, yearWork: 32, participation: 10, bonus: 0, deduction: 5 },
  { id: "s6", name: "ندى سامي", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=g6", exam1: { score: 38, max: 50 }, exam2: { score: 42, max: 50 }, final: { score: 85, max: 100 }, homework: 42, yearWork: 44, participation: 16, bonus: 2, deduction: 0 },
  { id: "s7", name: "عبدالرحمن نور", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=g7", exam1: { score: 32, max: 50 }, exam2: { score: 36, max: 50 }, final: { score: 70, max: 100 }, homework: 35, yearWork: 38, participation: 12, bonus: 0, deduction: 3 },
  { id: "s8", name: "ليلى إبراهيم", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=g8", exam1: { score: 45, max: 50 }, exam2: { score: 43, max: 50 }, final: { score: 90, max: 100 }, homework: 47, yearWork: 46, participation: 19, bonus: 4, deduction: 0 },
  { id: "s9", name: "محمد كريم", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=g9", exam1: { score: 25, max: 50 }, exam2: { score: 28, max: 50 }, final: { score: 55, max: 100 }, homework: 28, yearWork: 30, participation: 8, bonus: 0, deduction: 5 },
  { id: "s10", name: "هند مصطفى", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=g10", exam1: { score: 36, max: 50 }, exam2: { score: 38, max: 50 }, final: { score: 78, max: 100 }, homework: 40, yearWork: 42, participation: 14, bonus: 1, deduction: 1 },
]

const gradeDist = [
  { range: "A (90%+)", count: 3, fill: "#16C784" },
  { range: "B (80-89%)", count: 3, fill: "#D97706" },
  { range: "C (70-79%)", count: 2, fill: "#F5B301" },
  { range: "D (60-69%)", count: 1, fill: "#FF5C74" },
  { range: "F (-60%)", count: 1, fill: "#FF5C74" },
]

function calcTotal(s: StudentGrade): number {
  return s.exam1.score + s.exam2.score + s.final.score + s.homework + s.yearWork + s.participation + s.bonus - s.deduction
}

function getGrade(total: number): { label: string; variant: "success" | "primary" | "warning" | "error" } {
  const pct = (total / 390) * 100
  if (pct >= 90) return { label: "A", variant: "success" }
  if (pct >= 80) return { label: "B", variant: "primary" }
  if (pct >= 70) return { label: "C", variant: "warning" }
  if (pct >= 60) return { label: "D", variant: "warning" }
  return { label: "F", variant: "error" }
}

export default function GradebookPage() {
  const [subject, setSubject] = useState("الكيمياء")
  const [search, setSearch] = useState("")
  const [editing, setEditing] = useState<string | null>(null)
  const [editValue, setEditValue] = useState("")
  const [selected, setSelected] = useState<string | null>(null)

  const sorted = useMemo(() => {
    let result = [...students].map((s) => ({ ...s, total: calcTotal(s), grade: getGrade(calcTotal(s)) }))
    result.sort((a, b) => b.total - a.total)
    return result.map((s, i) => ({ ...s, rank: i + 1 }))
  }, [])

  const avgTotal = Math.round(sorted.reduce((s, st) => s + st.total, 0) / sorted.length)
  const passCount = sorted.filter((s) => (s.total / 390) * 100 >= 60).length
  const passRate = Math.round((passCount / sorted.length) * 100)

  const handleEdit = (id: string, field: string, current: number) => {
    setEditing(id + "-" + field)
    setEditValue(String(current))
  }
  const handleSave = () => {
    toast.success("تم حفظ التعديل")
    setEditing(null)
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="دفتر الدرجات"
        description="نظام تقييم متكامل للطلاب"
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.04 } } }}
        className="space-y-6"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
          className="grid grid-cols-1 sm:grid-cols-5 gap-3"
        >
          <StatsCard title="عدد الطلاب" value={sorted.length} icon={HiOutlineUserGroup} color="primary" />
          <StatsCard title="متوسط الدرجات" value={`${avgTotal}/390`} icon={HiOutlineChartBar} color="success" />
          <StatsCard title="نسبة النجاح" value={`${passRate}%`} icon={HiOutlineCheckCircle} color="success" />
          <StatsCard title="الأعلى" value={sorted[0]?.total || 0} icon={HiOutlineTrendingUp} color="info" />
          <StatsCard title="الأدنى" value={sorted[sorted.length - 1]?.total || 0} icon={HiOutlineTrendingDown} color="error" />
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>توزيع الدرجات</CardTitle>
                <div className="flex gap-2">
                  {["الكيمياء", "الفيزياء", "الرياضيات"].map((s) => (
                    <button key={s} type="button" onClick={() => setSubject(s)}
                      className={cn(
                        "px-3 py-1.5 rounded-[10px] text-xs font-medium border transition-all",
                        subject === s ? "border-primary/30 bg-primary/10 text-primary" : "border-border text-text-tertiary",
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div dir="ltr" className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={gradeDist}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="range" tick={{ fontSize: 11, fill: "#96A3B8" }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: "#96A3B8" }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ background: "#151D2F", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", color: "#FFFFFF", fontSize: "13px", backdropFilter: "blur(12px)" }}
                    />
                    <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                      {gradeDist.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>إجراءات سريعة</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button variant="primary" size="md" className="w-full justify-center" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => toast.success("تم إضافة عمود تقييم جديد")}>
                إضافة عمود تقييم
              </Button>
              <Button variant="secondary" size="md" className="w-full justify-center" leftIcon={<HiOutlineDownload className="w-4 h-4" />} onClick={() => toast.success("جاري تصدير Excel...")}>
                تصدير Excel
              </Button>
              <Button variant="secondary" size="md" className="w-full justify-center" leftIcon={<HiOutlinePrinter className="w-4 h-4" />} onClick={() => toast.success("جاري التحميل للطباعة...")}>
                طباعة
              </Button>
              <Button variant="secondary" size="md" className="w-full justify-center" leftIcon={<HiOutlineAcademicCap className="w-4 h-4" />} onClick={() => toast.success("تم إرسال الدرجات للطلاب")}>
                إرسال للطلاب
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}>
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>سجل الدرجات</CardTitle>
                <SearchInput value={search} onChange={setSearch} placeholder="ابحث عن طالب..." className="max-w-xs" />
              </div>
            </CardHeader>
            <CardContent>
              {sorted.filter((s) => s.name.includes(search)).length === 0 ? (
                <EmptyState icon={HiOutlineAcademicCap} title="لا يوجد درجات" description="لم يتم تسجيل أي درجات بعد" />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[900px]">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-right py-3 px-2 text-xs text-text-tertiary font-medium">#</th>
                        <th className="text-right py-3 px-2 text-xs text-text-tertiary font-medium">الطالب</th>
                        <th className="text-center py-3 px-2 text-xs text-text-tertiary font-medium">امتحان أول (50)</th>
                        <th className="text-center py-3 px-2 text-xs text-text-tertiary font-medium">امتحان ثاني (50)</th>
                        <th className="text-center py-3 px-2 text-xs text-text-tertiary font-medium">نهائي (100)</th>
                        <th className="text-center py-3 px-2 text-xs text-text-tertiary font-medium">واجبات (50)</th>
                        <th className="text-center py-3 px-2 text-xs text-text-tertiary font-medium">سنة (50)</th>
                        <th className="text-center py-3 px-2 text-xs text-text-tertiary font-medium">مشاركة (20)</th>
                        <th className="text-center py-3 px-2 text-xs text-text-tertiary font-medium">Bonus</th>
                        <th className="text-center py-3 px-2 text-xs text-text-tertiary font-medium">خصم</th>
                        <th className="text-center py-3 px-2 text-xs text-text-tertiary font-medium">المجموع (390)</th>
                        <th className="text-center py-3 px-2 text-xs text-text-tertiary font-medium">التقدير</th>
                        <th className="text-center py-3 px-2 text-xs text-text-tertiary font-medium">الترتيب</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sorted.filter((s) => s.name.includes(search)).map((s, i) => (
                        <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                          className={cn(
                            "border-b border-border/50 hover:bg-card/40 transition-all cursor-pointer",
                            selected === s.id && "bg-primary/5",
                          )}
                          onClick={() => setSelected(selected === s.id ? null : s.id)}
                        >
                          <td className="py-3 px-2 text-center text-text-tertiary text-xs">{s.rank}</td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <img src={s.avatar} alt="" className="w-7 h-7 rounded-full bg-card" />
                              <span className="text-sm font-medium text-text">{s.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <button type="button" onClick={(e) => { e.stopPropagation(); handleEdit(s.id, "exam1", s.exam1.score) }}
                              className="text-sm font-mono text-text hover:text-primary transition-colors"
                            >
                              {s.exam1.score}
                            </button>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <button type="button" onClick={(e) => { e.stopPropagation(); handleEdit(s.id, "exam2", s.exam2.score) }}
                              className="text-sm font-mono text-text hover:text-primary transition-colors"
                            >
                              {s.exam2.score}
                            </button>
                          </td>
                          <td className="py-3 px-2 text-center">
                            <button type="button" onClick={(e) => { e.stopPropagation(); handleEdit(s.id, "final", s.final.score) }}
                              className="text-sm font-mono text-text hover:text-primary transition-colors"
                            >
                              {s.final.score}
                            </button>
                          </td>
                          <td className="py-3 px-2 text-center"><span className="text-sm text-text">{s.homework}</span></td>
                          <td className="py-3 px-2 text-center"><span className="text-sm text-text">{s.yearWork}</span></td>
                          <td className="py-3 px-2 text-center"><span className="text-sm text-text">{s.participation}</span></td>
                          <td className="py-3 px-2 text-center"><span className="text-sm font-semibold text-success">{s.bonus > 0 ? `+${s.bonus}` : "0"}</span></td>
                          <td className="py-3 px-2 text-center"><span className="text-sm font-semibold text-error">{s.deduction > 0 ? `-${s.deduction}` : "0"}</span></td>
                          <td className="py-3 px-2 text-center"><span className="text-sm font-bold text-text">{s.total}</span></td>
                          <td className="py-3 px-2 text-center"><Badge variant={s.grade.variant} size="sm">{s.grade.label}</Badge></td>
                          <td className="py-3 px-2 text-center">
                            <span className={cn("text-xs font-bold", s.rank <= 3 ? "text-primary" : "text-text-tertiary")}>#{s.rank}</span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {selected && (() => {
          const s = sorted.find((x) => x.id === selected)
          if (!s) return null
          const trendData = [
            { name: "امتحان أول", score: (s.exam1.score / s.exam1.max) * 100 },
            { name: "امتحان ثاني", score: (s.exam2.score / s.exam2.max) * 100 },
            { name: "نهائي", score: (s.final.score / s.final.max) * 100 },
          ]
          return (
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35 } } }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={s.avatar} alt="" className="w-10 h-10 rounded-full bg-card" />
                      <div>
                        <CardTitle>{s.name}</CardTitle>
                        <p className="text-xs text-text-tertiary">الترتيب #{s.rank} من {sorted.length}</p>
                      </div>
                    </div>
                    <button type="button" onClick={() => setSelected(null)} className="text-xs text-primary hover:underline">إغلاق</button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-text mb-3">تفاصيل الدرجات</p>
                      <div className="space-y-2">
                        {[
                          { label: "امتحان أول", score: `${s.exam1.score}/${s.exam1.max}`, pct: (s.exam1.score / s.exam1.max) * 100 },
                          { label: "امتحان ثاني", score: `${s.exam2.score}/${s.exam2.max}`, pct: (s.exam2.score / s.exam2.max) * 100 },
                          { label: "امتحان نهائي", score: `${s.final.score}/${s.final.max}`, pct: (s.final.score / s.final.max) * 100 },
                          { label: "الدرجة الكلية", score: `${s.total}/390`, pct: (s.total / 390) * 100 },
                        ].map((item) => (
                          <div key={item.label} className="flex items-center justify-between p-3 rounded-[12px] bg-card/40 border border-border">
                            <span className="text-xs text-text-tertiary">{item.label}</span>
                            <div className="flex items-center gap-3">
                              <Progress value={item.pct} size="sm" variant={item.pct >= 80 ? "success" : "warning"} className="w-20" />
                              <span className="text-xs font-bold text-text">{item.score}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text mb-3">منحنى الأداء</p>
                      <div dir="ltr" className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />
                            <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#96A3B8" }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} tickLine={false} />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#96A3B8" }} axisLine={false} tickLine={false} />
                            <Tooltip
                              contentStyle={{ background: "#151D2F", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", color: "#FFFFFF", fontSize: "13px", backdropFilter: "blur(12px)" }}
                            />
                            <Line type="monotone" dataKey="score" stroke="#D97706" strokeWidth={2} dot={{ r: 4, fill: "#D97706" }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })()}
      </motion.div>
    </div>
  )
}

