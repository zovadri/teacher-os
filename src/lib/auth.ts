"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

type UserRole = "teacher" | "student" | "parent" | "staff"

interface AuthUser {
  id: string
  name: string
  email: string
  avatar: string
  role: UserRole
  permissions: string[]
  centerId?: string
  staffRole?: string
}

interface AuthStore {
  user: AuthUser | null
  isAuthenticated: boolean
  sessionId: string | null
  login: (email: string, password: string) => Promise<boolean>
  loginAs: (role: UserRole) => void
  logout: () => void
  hasPermission: (permission: string) => boolean
  sessionExpiresAt: Date | null
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      sessionId: null,
      sessionExpiresAt: null,

      login: async (emailOrPhone, password) => {
        const demoAccounts: (AuthUser & { phone: string })[] = [
          { id: "t-1", name: "أحمد محمد", email: "teacher@teacher-os.com", phone: "01000000001", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher", role: "teacher", permissions: ["all"] },
          { id: "s-1", name: "طالب 1", email: "student@teacher-os.com", phone: "01000000002", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student1", role: "student", permissions: [] },
          { id: "par-1", name: "ولي أمر 1", email: "parent@teacher-os.com", phone: "01000000003", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=parent1", role: "parent", permissions: [] },
          { id: "stf-1", name: "محمد علي", email: "staff@teacher-os.com", phone: "01000000004", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=staff1", role: "staff", permissions: ["manage_system", "manage_users", "view_reports"], staffRole: "مدير النظام" },
        ]

        const input = emailOrPhone.trim().toLowerCase()
        const user = demoAccounts.find((a) => a.email.toLowerCase() === input || a.phone === input)

        if (user && password === "123456") {
          set({
            user,
            isAuthenticated: true,
            sessionId: `sess_${Date.now().toString(36)}_${Math.floor(Math.random() * 1000)}`,
            sessionExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          })
          return true
        }
        return false
      },

      loginAs: (role) => {
        const roleMap: Record<UserRole, AuthUser> = {
          teacher: { id: "t-1", name: "أحمد محمد", email: "teacher@teacher-os.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher", role: "teacher", permissions: ["all"] },
          student: { id: "s-1", name: "طالب 1", email: "student@teacher-os.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student1", role: "student", permissions: [] },
          parent: { id: "par-1", name: "ولي أمر 1", email: "parent@teacher-os.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=parent1", role: "parent", permissions: [] },
          staff: { id: "stf-1", name: "محمد علي", email: "staff@teacher-os.com", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=staff1", role: "staff", permissions: ["manage_system", "manage_users", "view_reports"], staffRole: "مدير النظام" },
        }
        const user = roleMap[role]
        set({
          user,
          isAuthenticated: true,
          sessionId: `sess_${Date.now().toString(36)}_${Math.floor(Math.random() * 1000)}`,
          sessionExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, sessionId: null, sessionExpiresAt: null })
      },

      hasPermission: (permission) => {
        const { user } = get()
        if (!user) return false
        if (user.permissions.includes("all")) return true
        return user.permissions.includes(permission)
      },
    }),
    { name: "teacher-os-auth" }
  )
)
