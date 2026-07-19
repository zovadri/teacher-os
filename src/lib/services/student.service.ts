import { BaseService, PaginatedResult } from "./base.service"
import { mockStudents, mockCourses, mockExams, mockHomework } from "@/lib/mock/data"
import type { Student, Course } from "@/lib/types"

export class StudentService extends BaseService {
  static async findAll(params?: {
    search?: string
    grade?: string
    status?: string
    page?: number
    limit?: number
  }): Promise<PaginatedResult<Student>> {
    await this.delay()
    await this.simulateError()

    let filtered = [...mockStudents] as Student[]

    if (params?.search) {
      const q = params.search.toLowerCase()
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.phone.toLowerCase().includes(q)
      )
    }

    if (params?.grade) {
      filtered = filtered.filter((s) => s.grade === params.grade)
    }

    if (params?.status) {
      filtered = filtered.filter((s) => s.status === params.status)
    }

    const page = params?.page ?? 1
    const limit = params?.limit ?? 10
    return this.paginate(filtered, page, limit)
  }

  static async findById(id: string): Promise<Student | null> {
    await this.delay()
    await this.simulateError()

    return (mockStudents as Student[]).find((s) => s.id === id) ?? null
  }

  static async getStudentCourses(studentId: string): Promise<Course[]> {
    await this.delay()
    await this.simulateError()

    const student = (mockStudents as Student[]).find((s) => s.id === studentId)
    if (!student) return []

    return mockCourses.filter((c) => c.grade === student.grade)
  }

  static async getStudentStats(studentId: string): Promise<{
    totalCourses: number
    completedLessons: number
    averageGrade: number
    streak: number
    xp: number
    level: number
  }> {
    await this.delay()
    await this.simulateError()

    const student = (mockStudents as Student[]).find((s) => s.id === studentId)
    if (!student) {
      return { totalCourses: 0, completedLessons: 0, averageGrade: 0, streak: 0, xp: 0, level: 0 }
    }

    const courses = mockCourses.filter((c) => c.grade === student.grade)
    const totalCourses = courses.length
    const completedLessons = courses.reduce((sum, c) => sum + Math.floor(c.lessonsCount * 0.7), 0)

    const studentExams = mockExams.filter((e) =>
      courses.some((c) => c.id === e.courseId)
    )
    const averageGrade =
      studentExams.length > 0
        ? Math.round(
            studentExams.reduce((sum, e) => sum + e.analytics.averageGrade, 0) /
              studentExams.length
          )
        : 0

    return {
      totalCourses,
      completedLessons,
      averageGrade,
      streak: student.streak,
      xp: student.xp,
      level: student.level,
    }
  }
}
