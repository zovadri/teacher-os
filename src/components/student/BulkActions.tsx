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
  { label: 'ظ…ط¬ظ…ظˆط¹ط© A', value: 'ظ…ط¬ظ…ظˆط¹ط© A' },
  { label: 'ظ…ط¬ظ…ظˆط¹ط© B', value: 'ظ…ط¬ظ…ظˆط¹ط© B' },
  { label: 'ظ…ط¬ظ…ظˆط¹ط© C', value: 'ظ…ط¬ظ…ظˆط¹ط© C' },
]

const statuses = [
  { label: 'ظ†ط´ط·', value: 'active' },
  { label: 'ط؛ظٹط± ظ†ط´ط·', value: 'inactive' },
  { label: 'ظ…ظ†طھظ‡ظٹ', value: 'expired' },
  { label: 'ظ…ظˆظ‚ظˆظپ', value: 'suspended' },
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
          {selectedCount} ط·ط§ظ„ط¨ ظ…ط­ط¯ط¯
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          <button type="button"
            onClick={() => setShowGroupModal(true)}
            className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 border border-border rounded-lg text-text-secondary hover:bg-surface-tertiary transition-colors"
          >
            ظ†ظ‚ظ„ ط¥ظ„ظ‰ ظ…ط¬ظ…ظˆط¹ط©
          </button>
          <button type="button"
            onClick={() => setShowStatusModal(true)}
            className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 border border-border rounded-lg text-text-secondary hover:bg-surface-tertiary transition-colors"
          >
            طھط؛ظٹظٹط± ط§ظ„ط­ط§ظ„ط©
          </button>
          <button type="button"`nonClick={onSendMessage}
            className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 border border-border rounded-lg text-text-secondary hover:bg-surface-tertiary transition-colors"
          >
            ط¥ط±ط³ط§ظ„ ط±ط³ط§ظ„ط©
          </button>
          <button type="button"`nonClick={onPrint}
            className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 border border-border rounded-lg text-text-secondary hover:bg-surface-tertiary transition-colors"
          >
            ط·ط¨ط§ط¹ط©
          </button>
          <button type="button"`nonClick={onExportExcel}
            className="px-3 py-1.5 text-xs font-medium bg-white dark:bg-gray-800 border border-border rounded-lg text-text-secondary hover:bg-surface-tertiary transition-colors"
          >
            طھطµط¯ظٹط± Excel
          </button>
        </div>
        <button type="button"`nonClick={onClear}
          className="mr-auto p-1.5 text-text-tertiary hover:text-error transition-colors"
          title="ط¥ظ„ط؛ط§ط، ط§ظ„طھط­ط¯ظٹط¯"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </motion.div>

      <Modal isOpen={showGroupModal} onClose={() => setShowGroupModal(false)} title="ظ†ظ‚ظ„ ط¥ظ„ظ‰ ظ…ط¬ظ…ظˆط¹ط©" size="sm">
        <div className="space-y-4">
          <Select
            label="ط§ط®طھط± ط§ظ„ظ…ط¬ظ…ظˆط¹ط©"
            options={groups}
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            placeholder="-- ط§ط®طھط± --"
          />
          <div className="flex gap-3">
            <button type="button" variant="secondary" className="flex-1" onClick={() => setShowGroupModal(false)}>ط¥ظ„ط؛ط§ط،</Button>
            <button type="button" variant="primary" className="flex-1" onClick={() => { onMoveToGroup(selectedGroup); setShowGroupModal(false) }} disabled={!selectedGroup}>ظ†ظ‚ظ„</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showStatusModal} onClose={() => setShowStatusModal(false)} title="طھط؛ظٹظٹط± ط§ظ„ط­ط§ظ„ط©" size="sm">
        <div className="space-y-4">
          <Select
            label="ط§ط®طھط± ط§ظ„ط­ط§ظ„ط©"
            options={statuses}
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            placeholder="-- ط§ط®طھط± --"
          />
          <div className="flex gap-3">
            <button type="button" variant="secondary" className="flex-1" onClick={() => setShowStatusModal(false)}>ط¥ظ„ط؛ط§ط،</Button>
            <button type="button" variant="primary" className="flex-1" onClick={() => { onChangeStatus(selectedStatus); setShowStatusModal(false) }} disabled={!selectedStatus}>طھط؛ظٹظٹط±</Button>
          </div>
        </div>
      </Modal>
    </>
  )
}
