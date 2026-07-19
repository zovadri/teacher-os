import { useAuthStore } from "@/lib/auth"

interface AuthUser {
  id: string
  name: string
  email: string
  avatar: string
  role: "teacher" | "student" | "parent" | "staff"
  permissions: string[]
  centerId?: string
  staffRole?: string
}

interface LoginResult {
  success: boolean
  user?: AuthUser
  error?: string
}

export class AuthService {
  static async login(email: string, password: string): Promise<LoginResult> {
    const store = useAuthStore.getState()
    const success = await store.login(email, password)
    if (success) {
      const user = store.user ?? undefined
      return { success: true, user }
    }
    return { success: false, error: "بيانات الدخول غير صحيحة" }
  }

  static logout(): void {
    useAuthStore.getState().logout()
  }

  static getCurrentUser(): AuthUser | null {
    return useAuthStore.getState().user
  }

  static checkSession(): boolean {
    const expiresAt = useAuthStore.getState().sessionExpiresAt
    if (!expiresAt) return false
    return new Date(expiresAt).getTime() > Date.now()
  }

  static hasPermission(permission: string): boolean {
    return useAuthStore.getState().hasPermission(permission)
  }
}
