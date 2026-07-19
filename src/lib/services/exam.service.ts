import { BaseService, PaginatedResult } from "./base.service"
import { mockExams, mockQuestions, mockStudents } from "@/lib/mock/data"
import type { Exam, Question } from "@/lib/types"

export class ExamService extends BaseService {
  static async findAll(params?: {
    search?: string
    courseId?: string
    status?: string
    page?: number
    limit?: number
  }): Promise<PaginatedResult<Exam>> {
    await this.delay()
    await this.simulateError()

    let filtered = [...mockExams] as Exam[]

    if (params?.search) {
      const q = params.search.toLowerCase()
      filtered = filtered.filter((e) => e.title.toLowerCase().includes(q))
    }

    if (params?.courseId) {
      filtered = filtered.filter((e) => e.courseId === params.courseId)
    }

    if (params?.status) {
      filtered = filtered.filter((e) => e.status === params.status)
    }

    const page = params?.page ?? 1
    const limit = params?.limit ?? 10
    return this.paginate(filtered, page, limit)
  }

  static async findById(id: string): Promise<Exam | null> {
    await this.delay()
    await this.simulateError()

    return (mockExams as Exam[]).find((e) => e.id === id) ?? null
  }

  static async create(data: Partial<Exam>): Promise<Exam> {
    await this.delay()
    await this.simulateError()

    const exam: Exam = {
      id: `exam-${Date.now()}`,
      title: data.title ?? "",
      description: data.description ?? "",
      courseId: data.courseId ?? "",
      chapterId: data.chapterId ?? "",
      lessonId: data.lessonId ?? "",
      duration: data.duration ?? 60,
      totalGrade: data.totalGrade ?? 100,
      maxAttempts: data.maxAttempts ?? 1,
      shuffleQuestions: data.shuffleQuestions ?? false,
      shuffleChoices: data.shuffleChoices ?? false,
      startDate: data.startDate ?? new Date(),
      endDate: data.endDate ?? new Date(),
      showResultImmediately: data.showResultImmediately ?? true,
      status: data.status ?? "draft",
      gradingMode: data.gradingMode ?? "auto",
      questions: data.questions ?? [],
      analytics: data.analytics ?? {
        averageGrade: 0,
        highestGrade: 0,
        lowestGrade: 0,
        passRate: 0,
        failRate: 0,
        hardestQuestion: "",
        easiestQuestion: "",
        mostMistakenQuestion: "",
        mostSkippedQuestion: "",
        averageTime: 0,
      },
    }

    mockExams.push(exam as any)
    return exam
  }

  static async update(id: string, data: Partial<Exam>): Promise<Exam | null> {
    await this.delay()
    await this.simulateError()

    const index = mockExams.findIndex((e) => e.id === id)
    if (index === -1) return null

    mockExams[index] = { ...mockExams[index], ...data } as any
    return mockExams[index] as Exam
  }

  static async delete(id: string): Promise<boolean> {
    await this.delay()
    await this.simulateError()

    const index = mockExams.findIndex((e) => e.id === id)
    if (index === -1) return false

    mockExams.splice(index, 1)
    return true
  }

  static async autoGrade(
    examId: string,
    answers: Record<string, string | boolean | string[] | Record<string, string>>
  ): Promise<{
    score: number
    total: number
    percentage: number
    correct: number
    incorrect: number
    questionResults: { questionId: string; isCorrect: boolean | null; grade: number }[]
  }> {
    await this.delay()
    await this.simulateError()

    const exam = (mockExams as Exam[]).find((e) => e.id === examId)
    if (!exam) throw new Error("الامتحان غير موجود")

    const results = exam.questions.map((q) => {
      const answer = answers[q.id]
      let isCorrect: boolean | null = null

      if (q.type === "essay") {
        isCorrect = null
      } else if (q.type === "multiple-choice") {
        const correctChoice = q.choices?.find((c) => c.isCorrect)
        isCorrect = answer === correctChoice?.id
      } else if (q.type === "true-false") {
        isCorrect = String(answer).toLowerCase() === q.correctAnswer?.toLowerCase()
      } else if (q.type === "fill-blank") {
        const validAnswers = (q.correctAnswer ?? "").split("-").map((a) => a.trim().toLowerCase())
        isCorrect = validAnswers.includes(String(answer).toLowerCase())
      } else if (q.type === "ordering") {
        if (Array.isArray(answer)) {
          const correctOrder = q.orderingItems?.map((i) => i.id)
          isCorrect =
            JSON.stringify(answer) === JSON.stringify(correctOrder)
        } else {
          isCorrect = false
        }
      } else if (q.type === "matching") {
        if (typeof answer === "object" && !Array.isArray(answer)) {
          const matchMap = new Map(
            q.matchingRight?.map((r) => [r.id, r.matchId]) ?? []
          )
          isCorrect = Object.entries(answer).every(
            ([leftId, rightId]) => matchMap.get(rightId as string) === leftId
          )
        } else {
          isCorrect = false
        }
      }

      return {
        questionId: q.id,
        isCorrect,
        grade: isCorrect === true ? q.grade : isCorrect === null ? 0 : 0,
      }
    })

    const score = results.reduce((sum, r) => sum + r.grade, 0)
    const total = exam.questions.reduce((sum, q) => sum + q.grade, 0)
    const correct = results.filter((r) => r.isCorrect === true).length
    const incorrect = results.filter((r) => r.isCorrect === false).length

    return {
      score,
      total,
      percentage: total > 0 ? Math.round((score / total) * 100) : 0,
      correct,
      incorrect,
      questionResults: results,
    }
  }

  static async getLeaderboard(
    examId: string
  ): Promise<
    { studentId: string; studentName: string; score: number; time: number; date: string }[]
  > {
    await this.delay()
    await this.simulateError()

    const exam = (mockExams as Exam[]).find((e) => e.id === examId)
    if (!exam) return []

    const students = mockStudents.slice(0, 20)
    const total = exam.totalGrade

    return students
      .map((s) => ({
        studentId: s.id,
        studentName: s.name,
        score: Math.floor(det() * (total + 1)),
        time: Math.floor(det() * exam.duration) + 5,
        date: new Date(
          Date.now() - Math.floor(det() * 7 * 24 * 60 * 60 * 1000)
        ).toISOString(),
      }))
      .sort((a, b) => b.score - a.score || a.time - b.time)
  }
}
