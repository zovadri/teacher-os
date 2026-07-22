"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineStar,
  HiOutlineUsers,
  HiOutlineAcademicCap,
  HiStar,
  HiOutlineFire,
  HiOutlineCog,
  HiOutlineBadgeCheck,
  HiOutlineChartSquareBar,
} from "react-icons/hi"
import { PageHeader } from "@/components/ui/PageHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Tabs } from "@/components/ui/Tabs"
import { Badge } from "@/components/ui/Badge"
import { Avatar } from "@/components/ui/Avatar"
import { Progress } from "@/components/ui/Progress"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import { mockStudentXpData, mockAchievements, mockGamificationConfig } from "@/lib/mock/data"
import { cn, formatDate } from "@/lib/utils"
import toast from "react-hot-toast"
import Link from "next/link"
import { EmptyState } from "@/components/ui/EmptyState"

export default function GamificationPage() {
  const [xpPerLesson, setXpPerLesson] = useState(mockGamificationConfig.xpPerLesson)
  const [xpPerExam, setXpPerExam] = useState(mockGamificationConfig.xpPerExam)
  const [xpPerHomework, setXpPerHomework] = useState(mockGamificationConfig.xpPerHomework)
  const [xpStreakBonus, setXpStreakBonus] = useState(mockGamificationConfig.xpStreakBonus)

  const stats = useMemo(() => ({
    totalXp: mockStudentXpData.reduce((s, x) => s + x.totalXp, 0),
    activeStudents: mockStudentXpData.length,
    avgLevel: Math.round(mockStudentXpData.reduce((s, x) => s + x.level, 0) / mockStudentXpData.length),
    topStudent: mockStudentXpData[0],
  }), [])

  const top3 = useMemo(() => mockStudentXpData.slice(0, 3), [])

  const levelColors = [
    "bg-gray-400", "bg-green-400", "bg-emerald-500", "bg-teal-500", "bg-blue-500",
    "bg-indigo-500", "bg-violet-500", "bg-purple-500", "bg-fuchsia-500", "bg-pink-500",
    "bg-rose-500", "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-yellow-500",
    "bg-yellow-400", "bg-amber-300", "bg-orange-300", "bg-red-300", "bg-rose-300",
    "bg-purple-300", "bg-violet-300", "bg-indigo-300", "bg-blue-300", "bg-teal-300",
  ]

  return (
    <div className="p-4 md:p-6 space-y-6">
      <PageHeader title="نظام التحديات والمكافآت" description="XPطŒ المستويات، الشارات، والإنجازات" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="إجمالي XP الممنوح" value={stats.totalXp.toLocaleString("ar-EG")} icon={HiOutlineStar} color="primary" />
        <StatsCard title="الطلاب النشطون" value={stats.activeStudents} icon={HiOutlineUsers} color="success" />
        <StatsCard title="متوسط المستوى" value={stats.avgLevel} icon={HiOutlineAcademicCap} color="info" />
        <StatsCard title="أفضل طالب" value={stats.topStudent.studentName} icon={HiStar} color="warning" />
      </motion.div>

      <Tabs
        tabs={[
          { id: "leaderboard", label: "لوحة المتصدرين", icon: <HiStar className="w-4 h-4" /> },
          { id: "badges", label: "الشارات والإنجازات", icon: <HiOutlineBadgeCheck className="w-4 h-4" /> },
          { id: "levels", label: "المستويات", icon: <HiOutlineChartSquareBar className="w-4 h-4" /> },
          { id: "settings", label: "الإعدادات", icon: <HiOutlineCog className="w-4 h-4" /> },
        ]}
      >
        {(activeTab) => (
          <>
            {activeTab === "leaderboard" && (
              mockStudentXpData.length === 0 ? (
                <EmptyState icon={HiOutlineStar} title="لا توجد بيانات ألعاب" description="لم يتم تسجيل أي نشاط ألعاب بعد" />
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {top3.map((s, i) => (
                      <motion.div
                        key={s.studentId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={cn(
                          "relative bg-surface border-2 rounded-xl p-6 text-center",
                          i === 0 ? "border-yellow-400 shadow-lg shadow-yellow-400/10" : i === 1 ? "border-gray-300" : "border-amber-600"
                        )}
                      >
                        {i === 0 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl">👑</div>}
                        <div className="flex justify-center mb-3 mt-2">
                          <Avatar name={s.studentName} size="xl" />
                        </div>
                        <h3 className="font-bold text-text text-lg">{s.studentName}</h3>
                        <div className="flex items-center justify-center gap-2 mt-2">
                          <Badge variant="warning" size="sm">
                            <HiOutlineStar className="w-3 h-3 ml-1" />
                            {s.totalXp.toLocaleString("ar-EG")} XP
                          </Badge>
                          <Badge variant="primary" size="sm">مستوى {s.level}</Badge>
                        </div>
                        <div className="flex items-center justify-center gap-4 mt-3 text-xs text-text-tertiary">
                          <span className="flex items-center gap-1"><HiOutlineFire className="w-3 h-3" />{s.streak} يوم</span>
                          <span className="flex items-center gap-1"><HiOutlineBadgeCheck className="w-3 h-3" />{s.badges} شارة</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>جميع المتصدرين</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-right px-3 py-3 font-semibold text-text-secondary">الترتيب</th>
                              <th className="text-right px-3 py-3 font-semibold text-text-secondary">الطالب</th>
                              <th className="text-right px-3 py-3 font-semibold text-text-secondary">XP</th>
                              <th className="text-right px-3 py-3 font-semibold text-text-secondary">المستوى</th>
                              <th className="text-right px-3 py-3 font-semibold text-text-secondary">الشارات</th>
                              <th className="text-right px-3 py-3 font-semibold text-text-secondary">التسلسل</th>
                              <th className="text-right px-3 py-3 font-semibold text-text-secondary">XP أسبوعي</th>
                              <th className="text-right px-3 py-3 font-semibold text-text-secondary">آخر نشاط</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockStudentXpData.map((s, i) => (
                              <tr key={s.studentId} className={cn("border-b border-border last:border-0 hover:bg-surface-secondary transition-colors", i < 3 && "bg-primary-50/30 dark:bg-primary-900/10")}>
                                <td className="px-3 py-3">
                                  <span className={cn(
                                    "inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold",
                                    i === 0 ? "bg-yellow-100 text-yellow-700" : i === 1 ? "bg-gray-200 text-gray-600" : i === 2 ? "bg-amber-100 text-amber-700" : "bg-surface-tertiary text-text-tertiary"
                                  )}>{s.rank}</span>
                                </td>
                                <td className="px-3 py-3">
                                  <div className="flex items-center gap-3">
                                    <Avatar name={s.studentName} size="sm" />
                                    <span className="font-medium text-text">{s.studentName}</span>
                                  </div>
                                </td>
                                <td className="px-3 py-3"><span className="font-bold text-text">{s.totalXp.toLocaleString("ar-EG")}</span></td>
                                <td className="px-3 py-3"><Badge variant="primary" size="sm">مستوى {s.level}</Badge></td>
                                <td className="px-3 py-3">{s.badges}</td>
                                <td className="px-3 py-3">
                                  <div className="flex items-center gap-1">
                                    <HiOutlineFire className={cn("w-4 h-4", s.streak >= 30 ? "text-warning" : "text-text-tertiary")} />
                                    <span className={s.streak >= 30 ? "text-warning font-medium" : "text-text-secondary"}>{s.streak} يوم</span>
                                  </div>
                                </td>
                                <td className="px-3 py-3 text-text-secondary">{s.weeklyXp.toLocaleString("ar-EG")}</td>
                                <td className="px-3 py-3 text-xs text-text-tertiary">{formatDate(s.lastActive)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            )}

            {activeTab === "badges" && (
              mockAchievements.length === 0 && mockGamificationConfig.badgeCategories.every((c) => c.badges.length === 0) ? (
                <EmptyState icon={HiOutlineStar} title="لا توجد بيانات ألعاب" description="لم يتم تسجيل أي نشاط ألعاب بعد" />
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-6 text-sm">
                    <Link href="/teacher/gamification/badges" className="text-primary hover:underline font-medium">
                      إدارة الشارات
                    </Link>
                    <Link href="/teacher/gamification/achievements" className="text-primary hover:underline font-medium">
                      إدارة الإنجازات
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockGamificationConfig.badgeCategories.map((cat) => (
                      <Card key={cat.id}>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{cat.icon}</span>
                            <CardTitle>{cat.name}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            {cat.badges.map((b) => (
                              <Badge key={b} variant="premium" size="md">{b}</Badge>
                            ))}
                          </div>
                          <p className="text-xs text-text-tertiary mt-3">{cat.badges.length} شارة</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>الإنجازات</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {mockAchievements.map((ach) => (
                          <div key={ach.id} className="p-4 rounded-xl bg-surface-secondary border border-border hover:border-primary/30 transition-colors">
                            <div className="text-3xl mb-2">{ach.icon}</div>
                            <h4 className="font-semibold text-text text-sm">{ach.name}</h4>
                            <p className="text-xs text-text-tertiary mt-1">{ach.description}</p>
                            <div className="flex items-center justify-between mt-3">
                              <Badge variant="warning" size="sm">+{ach.xpReward} XP</Badge>
                              <span className="text-xs text-text-tertiary">{ach.criteria.type.replace("_", " ")}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            )}

            {activeTab === "levels" && (
              <Card>
                <CardHeader>
                  <CardTitle>شجرة المستويات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {mockGamificationConfig.levels.map((lvl, i) => {
                      const nextXp = i < mockGamificationConfig.levels.length - 1 ? mockGamificationConfig.levels[i + 1].xpRequired : lvl.xpRequired
                      return (
                        <motion.div
                          key={lvl.level}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.03 }}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-secondary transition-colors"
                        >
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0", levelColors[i % levelColors.length])}>
                            {lvl.level}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-text">{lvl.name}</span>
                              <span className="text-xs text-text-tertiary">{lvl.xpRequired.toLocaleString("ar-EG")} XP</span>
                            </div>
                            <Progress value={lvl.xpRequired} max={nextXp} size="sm" variant={i < 5 ? "primary" : i < 10 ? "success" : i < 15 ? "warning" : "error"} className="mt-1" />
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات XP</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 max-w-lg">
                  <Input
                    label="XP لكل درس"
                    type="number"
                    value={xpPerLesson}
                    onChange={(e) => setXpPerLesson(Number(e.target.value))}
                    leftIcon={<HiOutlineStar className="w-4 h-4" />}
                  />
                  <Input
                    label="XP لكل امتحان"
                    type="number"
                    value={xpPerExam}
                    onChange={(e) => setXpPerExam(Number(e.target.value))}
                    leftIcon={<HiOutlineStar className="w-4 h-4" />}
                  />
                  <Input
                    label="XP لكل واجب"
                    type="number"
                    value={xpPerHomework}
                    onChange={(e) => setXpPerHomework(Number(e.target.value))}
                    leftIcon={<HiOutlineStar className="w-4 h-4" />}
                  />
                  <Input
                    label="مكافأة التسلسل (Streak)"
                    type="number"
                    value={xpStreakBonus}
                    onChange={(e) => setXpStreakBonus(Number(e.target.value))}
                    leftIcon={<HiOutlineFire className="w-4 h-4" />}
                  />
                  <div className="pt-2">
                    <Button variant="primary" onClick={() => toast.success("تم حفظ إعدادات XP بنجاح")}>حفظ الإعدادات</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </Tabs>
    </div>
  )
}
