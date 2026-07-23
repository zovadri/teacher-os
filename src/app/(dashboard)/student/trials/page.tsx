"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  HiOutlinePlusCircle, HiOutlineClock, HiOutlineAcademicCap,
  HiOutlineStar, HiOutlineEye, HiOutlineCheckCircle,
  HiOutlineLockOpen, HiOutlineArrowLeft, HiOutlineFire,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { StatsCard } from "@/components/ui/StatsCard"
import { Progress } from "@/components/ui/Progress"

interface TrialLesson {
  id: number
  title: string
  subject: string
  teacher: string
  duration: number
  views: number
  maxViews: number
  rating: number
  watched: boolean
  category: "video" | "interactive" | "pdf"
  description: string
  color: string
}

const trialLessons: TrialLesson[] = [
  { id: 1, title: "الكيمياء - الباب الأول: العناصر الانتقالية", subject: "كيمياء", teacher: "ط£. خالد صقر", duration: 45, views: 3, maxViews: 5, rating: 4.9, watched: false, category: "video", description: "شرح كامل للعناصر الانتقالية وخواصها", color: "from-emerald-400 to-emerald-600" },
  { id: 2, title: "الفيزياء - الفصل الأول: التيار الكهربي", subject: "فيزياء", teacher: "ط£. أحمد سمير", duration: 40, views: 2, maxViews: 5, rating: 4.8, watched: false, category: "video", description: "قوانين التيار الكهربي وطرق حسابه", color: "from-blue-400 to-blue-600" },
  { id: 3, title: "التفاضل - النهايات والاتصال", subject: "رياضيات", teacher: "ط£. نبيل إبراهيم", duration: 35, views: 1, maxViews: 5, rating: 4.7, watched: false, category: "interactive", description: "تمارين تفاعلية على النهايات", color: "from-purple-400 to-purple-600" },
  { id: 4, title: "النحو - المبتدأ والخبر", subject: "عربي", teacher: "ط£. محمد صلاح", duration: 30, views: 4, maxViews: 5, rating: 4.9, watched: true, category: "video", description: "قواعد المبتدأ والخبر مع الأمثلة", color: "from-amber-400 to-amber-600" },
  { id: 5, title: "Grammar - Present Tenses", subject: "إنجليزي", teacher: "ط£. أحمد فريد", duration: 25, views: 0, maxViews: 5, rating: 4.5, watched: false, category: "interactive", description: "الأزمنة الحالية في اللغة الإنجليزية", color: "from-rose-400 to-rose-600" },
  { id: 6, title: "الكيمياء - الإتزان الكيميائي", subject: "كيمياء", teacher: "ط£. محمود جلال", duration: 50, views: 2, maxViews: 3, rating: 4.6, watched: false, category: "pdf", description: "ملخص تفاعلات الإتزان مع التمارين", color: "from-cyan-400 to-cyan-600" },
  { id: 7, title: "الفيزياء الحديثة - مقدمة", subject: "فيزياء", teacher: "ط£. مينا مجدي", duration: 30, views: 1, maxViews: 5, rating: 4.7, watched: false, category: "video", description: "نظريات الفيزياء الحديثة", color: "from-indigo-400 to-indigo-600" },
  { id: 8, title: "الأحياء - الخلية", subject: "أحياء", teacher: "ط£. هاني جمعة", duration: 35, views: 0, maxViews: 5, rating: 4.4, watched: false, category: "interactive", description: "تركيب الخلية ووظائفها", color: "from-green-400 to-green-600" },
]

const categories = ["الكل", "فيديو", "تفاعلي", "PDF"]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function TrialsPage() {
  const [filter, setFilter] = useState("الكل")
  const [playing, setPlaying] = useState<number | null>(null)
  const [lessons, setLessons] = useState(trialLessons)

  const catMap: Record<string, string> = { "الكل": "all", "فيديو": "video", "تفاعلي": "interactive", "PDF": "pdf" }
  const filtered = filter === "الكل" ? lessons : lessons.filter((l) => l.category === catMap[filter])

  const totalViews = lessons.reduce((s, l) => s + l.views, 0)
  const lessonsLeft = lessons.filter((l) => !l.watched).length
  const avgRating = (lessons.reduce((s, l) => s + l.rating, 0) / lessons.length).toFixed(1)

  const watchLesson = (id: number) => {
    setPlaying(id)
    toast.success("جاري تشغيل الحصة التجريبية...")
    setTimeout(() => {
      setLessons((prev) => prev.map((l) => l.id === id ? { ...l, views: l.views + 1, watched: true } : l))
      setPlaying(null)
      toast.success("تم مشاهدة الحصة التجريبية! متبقي " + (lessons.find((l) => l.id === id)?.maxViews! - lessons.find((l) => l.id === id)?.views! - 1) + " مشاهدة")
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader title="حصص تجريبية مجانية" subtitle="جرب الدروس مجاناً قبل الاشتراك - أول 4 حصص مجاناً" />
      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-4 gap-5">
            <StatsCard title="الحصص المتاحة" value={lessons.length} icon={HiOutlinePlusCircle} color="primary" />
            <StatsCard title="تم المشاهدة" value={lessons.filter((l) => l.watched).length} icon={HiOutlineEye} color="success" />
            <StatsCard title="الحصص المتبقية" value={lessonsLeft} icon={HiOutlineLockOpen} color="warning" />
            <StatsCard title="التقييم" value={`${avgRating}/5`} icon={HiOutlineStar} color="info" />
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button type="button"
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    filter === c ? "border-primary bg-primary/10 text-primary" : "border-border text-text-secondary hover:bg-surface-secondary"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <Badge variant="premium" size="md">
              <HiOutlineFire className="w-3.5 h-3.5 ml-1" />
              أول 4 حصص مجاناً تماماً
            </Badge>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((lesson) => (
              <motion.div key={lesson.id} variants={itemVariants}>
                <Card className={`h-full flex flex-col border-2 ${lesson.watched ? "border-success/30" : "border-border"}`}>
                  <div className={`h-28 bg-gradient-to-br ${lesson.color} flex items-center justify-center relative`}>
                    <HiOutlineAcademicCap className="w-10 h-10 text-white/60" />
                    <Badge variant="neutral" size="sm" className="absolute top-2 right-2 bg-white/20 text-white border-0">
                      {lesson.subject}
                    </Badge>
                    {lesson.watched && (
                      <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-success/80 text-white text-[10px] px-2 py-0.5 rounded-full">
                        <HiOutlineCheckCircle className="w-3 h-3" /> تمت المشاهدة
                      </div>
                    )}
                  </div>
                  <CardContent className="flex-1 flex flex-col gap-2 p-4">
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-text leading-snug mb-1">{lesson.title}</h3>
                      <p className="text-xs text-text-tertiary mb-1">{lesson.teacher}</p>
                      <p className="text-[11px] text-text-tertiary">{lesson.description}</p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-text-tertiary">
                      <span className="flex items-center gap-1"><HiOutlineClock className="w-3.5 h-3.5" /> {lesson.duration} دقيقة</span>
                      <span className="flex items-center gap-1"><HiOutlineStar className="w-3.5 h-3.5 text-amber-400" /> {lesson.rating}</span>
                    </div>
                    <div className="text-[11px] text-text-tertiary flex items-center justify-between">
                      <span>المشاهدات: {lesson.views}/{lesson.maxViews}</span>
                      <Progress value={(lesson.views / lesson.maxViews) * 100} size="sm" variant="primary" className="w-16" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-3 pt-0">
                    <button type="button"
                      onClick={() => watchLesson(lesson.id)}
                      disabled={playing === lesson.id || lesson.views >= lesson.maxViews}
                      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                        lesson.views >= lesson.maxViews
                          ? "bg-surface-tertiary text-text-tertiary cursor-not-allowed"
                          : playing === lesson.id
                            ? "bg-primary/50 text-white cursor-wait"
                            : "bg-primary text-white hover:bg-primary-dark"
                      }`}
                    >
                      {playing === lesson.id ? (
                        <>جاري التشغيل...</>
                      ) : lesson.views >= lesson.maxViews ? (
                        <>انتهت المشاهدات المتاحة</>
                      ) : (
                        <><HiOutlinePlusCircle className="w-4 h-4" /> مشاهدة الحصة التجريبية</>
                      )}
                    </button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-text-tertiary">
              <HiOutlinePlusCircle className="w-16 h-16 mx-auto mb-3 opacity-30" />
              <p className="text-sm">لا توجد حصص تجريبية في هذا التصنيف</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
