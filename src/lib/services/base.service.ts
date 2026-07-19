export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export class BaseService {
  protected static async delay(ms?: number): Promise<void> {
    const time = ms ?? Math.floor(Math.random() * 400) + 200
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  protected static async simulateError(rate: number = 0.05): Promise<void> {
    if (Math.random() < rate) {
      throw new Error("خطأ في الخادم. يرجى المحاولة مرة أخرى.")
    }
  }

  protected static paginate<T>(data: T[], page: number, limit: number): PaginatedResult<T> {
    const start = (page - 1) * limit
    return {
      data: data.slice(start, start + limit),
      total: data.length,
      page,
      limit,
      totalPages: Math.ceil(data.length / limit),
    }
  }
}
