import { BaseService, PaginatedResult } from "./base.service"
import { mockPayments, mockSubscriptionPlans } from "@/lib/mock/data"
import type { Payment, SubscriptionPlan } from "@/lib/types"

export class PaymentService extends BaseService {
  static async getPayments(params?: {
    search?: string
    status?: string
    method?: string
    page?: number
    limit?: number
  }): Promise<PaginatedResult<Payment>> {
    await this.delay()
    await this.simulateError()

    let filtered = [...mockPayments] as Payment[]

    if (params?.search) {
      const q = params.search.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.studentName.toLowerCase().includes(q) ||
          p.transactionId.toLowerCase().includes(q)
      )
    }

    if (params?.status) {
      filtered = filtered.filter((p) => p.status === params.status)
    }

    if (params?.method) {
      filtered = filtered.filter((p) => p.method === params.method)
    }

    const page = params?.page ?? 1
    const limit = params?.limit ?? 10
    return this.paginate(filtered, page, limit)
  }

  static async getPlans(): Promise<SubscriptionPlan[]> {
    await this.delay()
    await this.simulateError()

    return [...mockSubscriptionPlans] as SubscriptionPlan[]
  }

  static async createPayment(data: Partial<Payment>): Promise<Payment> {
    await this.delay()
    await this.simulateError()

    const payment: Payment = {
      id: `pay-${Date.now()}`,
      studentId: data.studentId ?? "",
      studentName: data.studentName ?? "",
      amount: data.amount ?? 0,
      method: data.method ?? "cash",
      status: data.status ?? "pending",
      transactionId: data.transactionId ?? `TXN-${Date.now()}`,
      subscriptionId: data.subscriptionId ?? "",
      invoiceId: data.invoiceId ?? "",
      createdAt: data.createdAt ?? new Date(),
    }

    mockPayments.push(payment as any)
    return payment
  }

  static async getRevenueSummary(): Promise<{
    daily: number
    monthly: number
    yearly: number
    total: number
    byMethod: { cash: number; fawry: number; code: number }
  }> {
    await this.delay()
    await this.simulateError()

    const payments = mockPayments as Payment[]
    const completed = payments.filter((p) => p.status === "completed")
    const now = new Date()

    const daily = completed
      .filter((p) => p.createdAt.toDateString() === now.toDateString())
      .reduce((sum, p) => sum + p.amount, 0)

    const monthly = completed
      .filter(
        (p) =>
          p.createdAt.getMonth() === now.getMonth() &&
          p.createdAt.getFullYear() === now.getFullYear()
      )
      .reduce((sum, p) => sum + p.amount, 0)

    const yearly = completed
      .filter((p) => p.createdAt.getFullYear() === now.getFullYear())
      .reduce((sum, p) => sum + p.amount, 0)

    const total = completed.reduce((sum, p) => sum + p.amount, 0)

    const byMethod = {
      cash: completed
        .filter((p) => p.method === "cash")
        .reduce((sum, p) => sum + p.amount, 0),
      fawry: completed
        .filter((p) => p.method === "fawry")
        .reduce((sum, p) => sum + p.amount, 0),
      code: completed
        .filter((p) => p.method === "code")
        .reduce((sum, p) => sum + p.amount, 0),
    }

    return { daily, monthly, yearly, total, byMethod }
  }
}
