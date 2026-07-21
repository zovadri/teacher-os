'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Modal } from '@/components/ui/Modal'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'

interface BulkActionsProps {
  selectedCount: number
  onClear: () => void
  onMoveToGroup: (group: string) => void
  onChangeStatus: (status: string) => void
  onSendMessage: () => void
  onPrint: () => void
  onExportExcel: () => void
}

const groups = [
  { label: 'المجموعة A', value: 'المجموعة A' },
  { label: 'المجموعة B', value: 'المجموعة B' },
  { label: 'المجموعة C', value: 'المجموعة C' },
]

const statuses = [
  { label: 'نشط', value: 'active' },
  { label: 'غير نشط', value: 'inactive' },
  { label: 'منتهي', value: 'expired' },
  { label: 'موقوف', value: 'suspended' },
]

export function BulkActions({ selectedCount, onClear, onMoveToGroup, onChangeStatus, onSendMessage, onPrint, onExportExcel }: BulkActionsProps) {
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  if (selectedCount === 0) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="flex items-center gap-3 px-4 py-3 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl"
      >
        <span className="text-sm font-medium text-primary-700 dark:text-primary-300 whitespace-nowrap">
          {selectedCount} طالب محدد
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <button type="button"
            onClick={() => setShowGroupModal(true)}
            className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 border border-border rounded-lg text-text-secondary hover:bg-surface-tertiary transition-colors"
          >
            نقل إلى مجموعة
          </button>
          <button type="button"
            onClick={() => setShowStatusModal(true)}
            className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 border border-border rounded-lg text-text-secondary hover:bg-surface-tertiary transition-colors"
          >
            تغيير الحالة
          </button>
          <button type="button"
            onClick={onSendMessage}
            className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 border border-border rounded-lg text-text-secondary hover:bg-surface-tertiary transition-colors"
          >
            إرسال رسالة
          </button>
          <button type="button"
            onClick={onPrint}
            className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 border border-border rounded-lg text-text-secondary hover:bg-surface-tertiary transition-colors"
          >
            طباعة
          </button>
          <button type="button"
            onClick={onExportExcel}
            className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 border border-border rounded-lg text-text-secondary hover:bg-surface-tertiary transition-colors"
          >
            تصدير Excel
          </button>
        </div>
        <button type="button"
          onClick={onClear}
          className="mr-auto p-1.5 text-text-tertiary hover:text-error transition-colors"
          title="إلغاء التحديد"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </motion.div>

      <Modal isOpen={showGroupModal} onClose={() => setShowGroupModal(false)} title="نقل إلى مجموعة" size="sm">
        <div className="space-y-4">
          <Select
            label="اختر المجموعة"
            options={groups}
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            placeholder="-- اختر --"
          />
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setShowGroupModal(false)}>إلغاء</Button>
            <Button variant="primary" className="flex-1" onClick={() => { onMoveToGroup(selectedGroup); setShowGroupModal(false) }} disabled={!selectedGroup}>نقل</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showStatusModal} onClose={() => setShowStatusModal(false)} title="تغيير الحالة" size="sm">
        <div className="space-y-4">
          <Select
            label="اختر الحالة"
            options={statuses}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            placeholder="-- اختر --"
          />
          <div className="flex gap-3">
            <Button variant="secondary" className="flex-1" onClick={() => setShowStatusModal(false)}>إلغاء</Button>
            <Button variant="primary" className="flex-1" onClick={() => { onChangeStatus(selectedStatus); setShowStatusModal(false) }} disabled={!selectedStatus}>تغيير</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
