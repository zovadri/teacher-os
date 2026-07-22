"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import {
  HiOutlineUserGroup, HiOutlinePlus, HiOutlineCurrencyDollar, HiOutlinePhone,
  HiOutlineBriefcase, HiOutlineChevronDown, HiOutlineChevronUp, HiOutlineOfficeBuilding,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { StatsCard } from "@/components/ui/StatsCard"
import { Badge } from "@/components/ui/Badge"
import { Modal } from "@/components/ui/Modal"
import { Pagination } from "@/components/ui/Pagination"
import Button from "@/components/ui/Button"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import { SearchInput } from "@/components/ui/SearchInput"
import { CardSkeleton, StatsSkeleton } from "@/components/ui/Skeleton"
import { EmptyState } from "@/components/ui/EmptyState"
import { ErrorState } from "@/components/ui/ErrorState"
import { cn, formatCurrency } from "@/lib/utils"
import { mockEmployees, mockBranches } from "@/lib/mock/data"

const statusConfig: Record<string, { label: string; variant: "success" | "warning" | "neutral" }> = {
  active: { label: "نشط", variant: "success" },
  "on-leave": { label: "إجازة", variant: "warning" },
  inactive: { label: "غير نشط", variant: "neutral" },
}

const PAGE_SIZE = 5

export default function EmployeesPage() {
  const [employees, setEmployees] = useState(mockEmployees)
  const [search, setSearch] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [branchFilter, setBranchFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", phone: "", jobTitle: "", department: "", salary: 0, branchId: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)

  const loadData = useCallback(() => {
    setIsLoading(true)
    setHasError(false)
    setTimeout(() => {
      setEmployees(mockEmployees)
      setIsLoading(false)
    }, 1000)
  }, [])

  const stats = useMemo(() => ({
    total: employees.length,
    active: employees.filter((e) => e.status === "active").length,
    onLeave: employees.filter((e) => e.status === "on-leave").length,
    inactive: employees.filter((e) => e.status === "inactive").length,
    totalSalary: employees.reduce((s, e) => s + e.salary, 0),
  }), [employees])

  const departments = useMemo(() => [...new Set(employees.map((e) => e.department))], [employees])

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchSearch = e.name.includes(search) || e.jobTitle.includes(search)
      const matchDept = departmentFilter === "all" || e.department === departmentFilter
      const matchBranch = branchFilter === "all" || e.branchId === branchFilter
      const matchStatus = statusFilter === "all" || e.status === statusFilter
      return matchSearch && matchDept && matchBranch && matchStatus
    })
  }, [search, departmentFilter, branchFilter, statusFilter, employees])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleAddEmployee = () => {
    const emp = {
      id: `emp-${Date.now()}`,
      name: newEmployee.name,
      email: newEmployee.email,
      phone: newEmployee.phone,
      jobTitle: newEmployee.jobTitle,
      department: newEmployee.department,
      salary: newEmployee.salary,
      hireDate: new Date(),
      status: "active" as const,
      branchId: newEmployee.branchId || mockBranches[0].id,
    }
    setEmployees((prev) => [emp, ...prev])
    setShowAddModal(false)
    setNewEmployee({ name: "", email: "", phone: "", jobTitle: "", department: "", salary: 0, branchId: "" })
    toast.success("تم إضافة الموظف بنجاح")
  }

  const getBranchName = (branchId: string) => mockBranches.find((b) => b.id === branchId)?.name || branchId

  if (hasError) {
    return (
      <div className="p-4 md:p-6 space-y-6">
        <DashboardHeader title="الموظفون" subtitle="إدارة الموظفين" />
        <ErrorState onRetry={() => { setHasError(false); loadData() }} />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6 space-y-6" dir="rtl">
      <DashboardHeader title="الموظفون" subtitle="إدارة بيانات الموظفين" />
      <div className="flex justify-end">
        <Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>
          إضافة موظف
        </Button>
      </div>

      {isLoading ? (
        <StatsSkeleton count={4} />
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard title="إجمالي الموظفين" value={stats.total} icon={HiOutlineUserGroup} color="primary" />
          <StatsCard title="نشط" value={stats.active} icon={HiOutlineBriefcase} color="success" />
          <StatsCard title="إجازة" value={stats.onLeave} icon={HiOutlineChevronDown} color="warning" />
          <StatsCard title="إجمالي الرواتب" value={formatCurrency(stats.totalSalary)} icon={HiOutlineCurrencyDollar} color="info" />
        </motion.div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>قائمة الموظفين</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 border-b border-border flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <SearchInput value={search} onChange={(v) => { setSearch(v); setPage(1) }} placeholder="بحث بالاسم أو المسمى..." />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select options={[{ value: "all", label: "جميع الأقسام" }, ...departments.map((d) => ({ value: d, label: d }))]} value={departmentFilter} onChange={(e) => { setDepartmentFilter(e.target.value); setPage(1) }} />
              <Select options={[{ value: "all", label: "جميع الفروع" }, ...mockBranches.map((b) => ({ value: b.id, label: b.name }))]} value={branchFilter} onChange={(e) => { setBranchFilter(e.target.value); setPage(1) }} />
              <Select options={[{ value: "all", label: "جميع الحالات" }, { value: "active", label: "نشط" }, { value: "on-leave", label: "إجازة" }, { value: "inactive", label: "غير نشط" }]} value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1) }} />
            </div>
          </div>

          {isLoading ? (
            <div className="p-4"><CardSkeleton count={3} /></div>
          ) : filtered.length === 0 ? (
            <EmptyState icon={HiOutlineUserGroup} title="لا يوجد موظفون" description="لم يتم العثور على موظفين مطابقين" action={search ? undefined : <Button variant="primary" leftIcon={<HiOutlinePlus className="w-4 h-4" />} onClick={() => setShowAddModal(true)}>إضافة موظف</Button>} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-secondary">
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">الاسم</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">المسمى</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">القسم</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">الهاتف</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">الراتب</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">الفرع</th>
                    <th className="text-right px-4 py-3 font-semibold text-text-secondary">الحالة</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((emp) => (
                    <>
                      <tr key={emp.id} className="border-b border-border hover:bg-surface-secondary transition-colors cursor-pointer" onClick={() => setExpandedId(expandedId === emp.id ? null : emp.id)}>
                        <td className="px-4 py-3">
                          <span className="font-medium text-text">{emp.name}</span>
                        </td>
                        <td className="px-4 py-3 text-text-secondary">{emp.jobTitle}</td>
                        <td className="px-4 py-3 text-text-secondary">{emp.department}</td>
                        <td className="px-4 py-3 text-text-secondary">
                          <div className="flex items-center gap-1.5">
                            <HiOutlinePhone className="w-3.5 h-3.5" />
                            <span>{emp.phone}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-text font-medium">{formatCurrency(emp.salary)}</td>
                        <td className="px-4 py-3 text-text-secondary">{getBranchName(emp.branchId)}</td>
                        <td className="px-4 py-3"><Badge variant={statusConfig[emp.status].variant} size="sm">{statusConfig[emp.status].label}</Badge></td>
                      </tr>
                      {expandedId === emp.id && (
                        <tr key={`${emp.id}-detail`} className="bg-surface-secondary">
                          <td colSpan={7} className="px-4 py-4">
                            <div className="space-y-3">
                              <h4 className="text-sm font-semibold text-text">تفاصيل الراتب</h4>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="p-3 rounded-lg bg-surface border border-border">
                                  <p className="text-xs text-text-tertiary">الراتب الأساسي</p>
                                  <p className="text-lg font-bold text-text">{formatCurrency(emp.salary)}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-surface border border-border">
                                  <p className="text-xs text-text-tertiary">صافي الراتب</p>
                                  <p className="text-lg font-bold text-text">{formatCurrency(emp.salary)}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-surface border border-border">
                                  <p className="text-xs text-text-tertiary">تاريخ التوظيف</p>
                                  <p className="text-sm font-medium text-text">{new Date(emp.hireDate).toLocaleDateString("ar-EG")}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-surface border border-border">
                                  <p className="text-xs text-text-tertiary">البريد</p>
                                  <p className="text-sm font-medium text-text truncate">{emp.email}</p>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {totalPages > 1 && (
            <div className="p-4 border-t border-border">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          )}
        </CardContent>
      </Card>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="إضافة موظف جديد" size="md">
        <div className="space-y-4">
          <Input label="الاسم" value={newEmployee.name} onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })} placeholder="اسم الموظف" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="البريد" value={newEmployee.email} onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })} placeholder="البريد الإلكتروني" />
            <Input label="الهاتف" value={newEmployee.phone} onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })} placeholder="رقم الهاتف" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="المسمى" value={newEmployee.jobTitle} onChange={(e) => setNewEmployee({ ...newEmployee, jobTitle: e.target.value })} placeholder="المسمى الوظيفي" />
            <Input label="القسم" value={newEmployee.department} onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })} placeholder="القسم" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="الراتب" type="number" value={String(newEmployee.salary)} onChange={(e) => setNewEmployee({ ...newEmployee, salary: Number(e.target.value) })} placeholder="الراتب" />
            <Select
              label="الفرع"
              options={mockBranches.map((b) => ({ value: b.id, label: b.name }))}
              value={newEmployee.branchId} onChange={(e) => setNewEmployee({ ...newEmployee, branchId: e.target.value })}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button variant="primary" className="flex-1" onClick={handleAddEmployee} disabled={!newEmployee.name}>إضافة الموظف</Button>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>إلغاء</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
