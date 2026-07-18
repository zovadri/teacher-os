"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { HiOutlineUserGroup, HiOutlineUserAdd, HiOutlineShieldCheck, HiOutlineClock, HiOutlineSearch, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi"

const staffMembers = [
  { id: "st-1", name: "أحمد محمد", email: "ahmed@teacher-os.com", role: "مدير النظام", permissions: ["جميع الصلاحيات"], status: "active", lastActive: new Date(2026, 6, 17) },
  { id: "st-2", name: "محمود علي", email: "mahmoud@teacher-os.com", role: "مشرف", permissions: ["إدارة الطلاب", "إدارة الكورسات"], status: "active", lastActive: new Date(2026, 6, 17) },
  { id: "st-3", name: "سارة خالد", email: "sara@teacher-os.com", role: "محاسب", permissions: ["المدفوعات", "التقارير المالية"], status: "active", lastActive: new Date(2026, 6, 16) },
  { id: "st-4", name: "خالد حسن", email: "khaled@teacher-os.com", role: "دعم فني", permissions: ["الدعم الفني", "إدارة الطلاب"], status: "active", lastActive: new Date(2026, 6, 15) },
  { id: "st-5", name: "نورة أحمد", email: "noura@teacher-os.com", role: "مساعد إداري", permissions: ["إدارة الطلاب"], status: "inactive", lastActive: new Date(2026, 6, 1) },
]

const permissionGroups = [
  { group: "الطلاب", permissions: ["عرض", "إضافة", "تعديل", "حذف"] },
  { group: "الكورسات", permissions: ["عرض", "إضافة", "تعديل", "حذف"] },
  { group: "الامتحانات", permissions: ["عرض", "إضافة", "تعديل", "حذف"] },
  { group: "المدفوعات", permissions: ["عرض", "تحصيل", "استرجاع"] },
  { group: "التقارير", permissions: ["عرض", "تصدير"] },
  { group: "الإدارة", permissions: ["إدارة الموظفين", "إعدادات النظام"] },
]

const activityLog = Array.from({ length: 8 }, (_, i) => ({
  id: `log-${i + 1}`,
  user: staffMembers[i % staffMembers.length].name,
  action: ["قام بتسجيل الدخول", "أضاف طالب جديد", "عدّل كورس", "حذف امتحان", "وافق على دفع", "صدّر تقرير", "أضاف موظف", "عدّل إعدادات"][i],
  resource: ["النظام", "سجل الطلاب", "النحو والصرف", "اختبار البلاغة", "فاتورة #INV-2026-0012", "التقرير الشهري", "حساب موظف", "الإعدادات العامة"][i],
  timestamp: new Date(2026, 6, 17, 8 + i, i * 15),
}))

export default function StaffManagePage() {
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const filtered = staffMembers.filter((s) => s.name.includes(search) || s.email.includes(search))

  return (
    <div className="min-h-screen bg-surface-secondary">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">إدارة الموظفين</h1>
            <p className="text-text-secondary text-sm">إدارة صلاحيات وحسابات الموظفين</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-all"
          >
            <HiOutlineUserAdd size={18} />
            إضافة موظف جديد
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
          <input
            type="text" placeholder="بحث باسم الموظف أو البريد..."
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Staff List */}
          <div className="lg:col-span-2 rounded-xl border border-border bg-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary">
                    <th className="text-right p-4 font-medium text-text-secondary">الموظف</th>
                    <th className="text-right p-4 font-medium text-text-secondary">الدور</th>
                    <th className="text-center p-4 font-medium text-text-secondary">الحالة</th>
                    <th className="text-center p-4 font-medium text-text-secondary">آخر نشاط</th>
                    <th className="text-center p-4 font-medium text-text-secondary"></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((staff, i) => (
                    <motion.tr
                      key={staff.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                            {staff.name[0]}
                          </div>
                          <div>
                            <p className="font-medium">{staff.name}</p>
                            <p className="text-xs text-text-tertiary">{staff.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{staff.role}</p>
                        <p className="text-xs text-text-tertiary">{staff.permissions.join("، ")}</p>
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                          staff.status === "active" ? "bg-success/10 text-success" : "bg-surface-tertiary text-text-tertiary"
                        }`}>
                          {staff.status === "active" ? "نشط" : "غير نشط"}
                        </span>
                      </td>
                      <td className="p-4 text-center text-xs text-text-secondary">
                        {staff.lastActive.toLocaleDateString("ar-EG")}
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-1.5 rounded-lg hover:bg-surface-secondary text-text-secondary hover:text-warning transition-colors">
                            <HiOutlinePencil size={14} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-surface-secondary text-text-secondary hover:text-error transition-colors">
                            <HiOutlineTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Permissions Matrix & Activity Log */}
          <div className="space-y-4">
            {/* Permissions Matrix */}
            <div className="p-5 rounded-xl bg-surface border border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm">
                <HiOutlineShieldCheck className="text-primary" size={16} />
                مصفوفة الصلاحيات
              </h3>
              <div className="space-y-3">
                {permissionGroups.map((group) => (
                  <div key={group.group}>
                    <p className="text-xs font-medium text-text-secondary mb-1.5">{group.group}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {group.permissions.map((perm) => (
                        <span key={perm} className="px-2 py-0.5 rounded-md bg-primary/5 text-primary text-[10px] border border-primary/20">
                          {perm}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Log */}
            <div className="p-5 rounded-xl bg-surface border border-border">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-sm">
                <HiOutlineClock className="text-primary" size={16} />
                سجل النشاطات
              </h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {activityLog.map((log) => (
                  <div key={log.id} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div>
                      <p className="text-xs">
                        <span className="font-medium">{log.user}</span> {log.action}
                      </p>
                      <p className="text-[10px] text-text-tertiary">{log.resource} • {log.timestamp.toLocaleTimeString("ar-EG")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add Staff Modal */}
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md w-full p-6 rounded-2xl bg-surface border border-border"
            >
              <h2 className="text-lg font-bold mb-4">إضافة موظف جديد</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">الاسم</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="الاسم الكامل" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
                  <input type="email" className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="email@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">الدور</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none appearance-none">
                    <option>مشرف</option>
                    <option>محاسب</option>
                    <option>دعم فني</option>
                    <option>مساعد إداري</option>
                    <option>مدير النظام</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">كلمة المرور</label>
                  <input type="password" className="w-full px-4 py-2.5 rounded-xl border border-border bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="••••••••" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-surface-secondary transition-colors"
                >
                  إلغاء
                </button>
                <button className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors">
                  إضافة
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
