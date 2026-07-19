import { BaseService, PaginatedResult } from "./base.service"
import { mockCourses } from "@/lib/mock/data"
import type { Course } from "@/lib/types"

export class CourseService extends BaseService {
  static async findAll(params?: {
    search?: string
    grade?: string
    status?: string
    page?: number
    limit?: number
  }): Promise<PaginatedResult<Course>> {
    await this.delay()
    await this.simulateError()

    let filtered = [...mockCourses]

    if (params?.search) {
      const q = params.search.toLowerCase()
      filtered = filtered.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.subject.toLowerCase().includes(q) ||
          c.shortDescription.toLowerCase().includes(q)
      )
    }

    if (params?.grade) {
      filtered = filtered.filter((c) => c.grade === params.grade)
    }

    if (params?.status) {
      filtered = filtered.filter((c) => c.status === params.status)
    }

    const page = params?.page ?? 1
    const limit = params?.limit ?? 10
    return this.paginate(filtered, page, limit)
  }

  static async findById(id: string): Promise<Course | null> {
    await this.delay()
    await this.simulateError()

    return mockCourses.find((c) => c.id === id) ?? null
  }

  static async create(data: Partial<Course>): Promise<Course> {
    await this.delay()
    await this.simulateError()

    const course: Course = {
      id: `c-${Date.now()}`,
      title: data.title ?? "",
      slug: data.slug ?? (data.title ?? "").toLowerCase().replace(/\s+/g, "-"),
      subject: data.subject ?? "",
      grade: data.grade ?? "",
      term: data.term ?? "",
      category: data.category ?? "",
      image: data.image ?? "",
      banner: data.banner ?? "",
      shortDescription: data.shortDescription ?? "",
      description: data.description ?? "",
      price: data.price ?? 0,
      discountPrice: data.discountPrice,
      isFree: data.isFree ?? false,
      requiresCode: data.requiresCode ?? false,
      status: data.status ?? "draft",
      studentsCount: data.studentsCount ?? 0,
      lessonsCount: data.lessonsCount ?? 0,
      videosCount: data.videosCount ?? 0,
      examsCount: data.examsCount ?? 0,
      homeworkCount: data.homeworkCount ?? 0,
      filesCount: data.filesCount ?? 0,
      rating: data.rating ?? 0,
      createdAt: data.createdAt ?? new Date(),
      updatedAt: data.updatedAt ?? new Date(),
      chapters: data.chapters ?? [],
    }

    mockCourses.push(course)
    return course
  }

  static async update(id: string, data: Partial<Course>): Promise<Course | null> {
    await this.delay()
    await this.simulateError()

    const index = mockCourses.findIndex((c) => c.id === id)
    if (index === -1) return null

    mockCourses[index] = { ...mockCourses[index], ...data, updatedAt: new Date() }
    return mockCourses[index]
  }

  static async delete(id: string): Promise<boolean> {
    await this.delay()
    await this.simulateError()

    const index = mockCourses.findIndex((c) => c.id === id)
    if (index === -1) return false

    mockCourses.splice(index, 1)
    return true
  }
}
