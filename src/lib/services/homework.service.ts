import { BaseService, PaginatedResult } from "./base.service"
import { mockHomework, mockStudents } from "@/lib/mock/data"
import type { Homework } from "@/lib/types"

export class HomeworkService extends BaseService {
  static async findAll(params?: {
    search?: string
    courseId?: string
    status?: string
    page?: number
    limit?: number
  }): Promise<PaginatedResult<Homework>> {
    await this.delay()
    await this.simulateError()

    let filtered = [...mockHomework] as Homework[]

    if (params?.search) {
      const q = params.search.toLowerCase()
      filtered = filtered.filter((h) => h.title.toLowerCase().includes(q))
    }

    if (params?.courseId) {
      filtered = filtered.filter((h) => h.courseId === params.courseId)
    }

    if (params?.status) {
      filtered = filtered.filter((h) => h.status === params.status)
    }

    const page = params?.page ?? 1
    const limit = params?.limit ?? 10
    return this.paginate(filtered, page, limit)
  }

  static async findById(id: string): Promise<Homework | null> {
    await this.delay()
    await this.simulateError()

    return (mockHomework as Homework[]).find((h) => h.id === id) ?? null
  }

  static async create(data: Partial<Homework>): Promise<Homework> {
    await this.delay()
    await this.simulateError()

    const homework: Homework = {
      id: `hw-${Date.now()}`,
      title: data.title ?? "",
      description: data.description ?? "",
      courseId: data.courseId ?? "",
      chapterId: data.chapterId ?? "",
      lessonId: data.lessonId ?? "",
      totalGrade: data.totalGrade ?? 10,
      deadline: data.deadline ?? new Date(),
      lastSubmissionDate: data.lastSubmissionDate ?? new Date(),
      allowResubmit: data.allowResubmit ?? false,
      maxResubmitCount: data.maxResubmitCount ?? 0,
      type: data.type ?? "pdf",
      status: data.status ?? "draft",
      submissions: data.submissions ?? [],
      analytics: data.analytics ?? {
        submitted: 0,
        notSubmitted: 0,
        late: 0,
        averageGrade: 0,
        highestGrade: 0,
        lowestGrade: 0,
        passRate: 0,
      },
    }

    mockHomework.push(homework as any)
    return homework
  }

  static async update(id: string, data: Partial<Homework>): Promise<Homework | null> {
    await this.delay()
    await this.simulateError()

    const index = mockHomework.findIndex((h) => h.id === id)
    if (index === -1) return null

    mockHomework[index] = { ...mockHomework[index], ...data } as any
    return mockHomework[index] as Homework
  }

  static async delete(id: string): Promise<boolean> {
    await this.delay()
    await this.simulateError()

    const index = mockHomework.findIndex((h) => h.id === id)
    if (index === -1) return false

    mockHomework.splice(index, 1)
    return true
  }

  static async gradeSubmission(
    homeworkId: string,
    submissionId: string,
    grade: number,
    feedback: string
  ): Promise<boolean> {
    await this.delay()
    await this.simulateError()

    const homework = (mockHomework as Homework[]).find((h) => h.id === homeworkId)
    if (!homework) return false

    const submission = homework.submissions.find((s) => s.id === submissionId)
    if (!submission) return false

    submission.grade = grade
    submission.feedback = feedback
    submission.status = "graded"

    return true
  }

  static async submitHomework(
    homeworkId: string,
    studentId: string,
    files: string[],
    notes: string
  ): Promise<boolean> {
    await this.delay()
    await this.simulateError()

    const homework = (mockHomework as Homework[]).find((h) => h.id === homeworkId)
    if (!homework) return false

    const student = mockStudents.find((s) => s.id === studentId)
    if (!student) return false

    homework.submissions.push({
      id: `sub-${Date.now()}`,
      studentId,
      studentName: student.name,
      files,
      notes,
      submittedAt: new Date(),
      status: homework.deadline > new Date() ? "submitted" : "late",
    })

    return true
  }
}
