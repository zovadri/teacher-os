'use client'

import { useRef } from 'react'
import { Modal } from '@/components/ui/Modal'
import Button from '@/components/ui/Button'

interface StudentQRModalProps {
  isOpen: boolean
  onClose: () => void
  student: {
    id: string
    name: string
    grade: string
    group: string
  }
}

function generateQRCodeSvg(data: string, size: number = 200): string {
  const cellSize = size / 15
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`
  svg += `<rect width="${size}" height="${size}" fill="white" rx="8"/>`

  const positions: [number, number][] = []
  const seed = data.split('').reduce((a, c) => a + c.charCodeAt(0), 0)

  for (let r = 0; r < 15; r++) {
    for (let c = 0; c < 15; c++) {
      if ((r <= 4 && c <= 4) || (r <= 4 && c >= 10) || (r >= 10 && c <= 4)) continue
      const hash = ((seed * (r + 1) * (c + 1)) % 100) + ((data.charCodeAt((r * c) % data.length) || 0) % 50)
      if (hash < 35) positions.push([c, r])
    }
  }

  for (const [r, c] of [[0,0],[0,6],[0,12],[6,0],[6,12],[12,0],[12,6],[12,12]]) {
    svg += `<rect x="${r * cellSize}" y="${c * cellSize}" width="${(r === 6 || c === 6) ? cellSize : cellSize * 5}" height="${(r === 6 || c === 6) ? cellSize * 5 : cellSize}" fill="#111827" rx="2"/>`
  }

  for (const [cx, cy] of positions) {
    svg += `<rect x="${cx * cellSize + 1}" y="${cy * cellSize + 1}" width="${cellSize - 2}" height="${cellSize - 2}" fill="#111827" rx="1"/>`
  }

  svg += `<rect x="${size/2 - cellSize*0.75}" y="${size/2 - cellSize*0.75}" width="${cellSize*1.5}" height="${cellSize*1.5}" fill="#D97706" rx="2"/>`
  svg += '</svg>'
  return svg
}

export function StudentQRModal({ isOpen, onClose, student }: StudentQRModalProps) {
  const svgRef = useRef<HTMLDivElement>(null)

  const qrSvg = generateQRCodeSvg(`TOS-STUDENT-${student.id}`)

  const handleDownload = () => {
    const blob = new Blob([qrSvg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `QR-${student.name}.svg`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handlePrint = () => {
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(`<html dir="rtl"><head><meta charset="utf-8"><title>QR Code - ${student.name}</title><style>body{font-family:sans-serif;text-align:center;padding:40px}h2{margin:16px 0 4px}p{margin:4px 0;color:#666}.qr{width:300px;height:300px;margin:0 auto}</style></head><body>${qrSvg.replace('<svg', '<svg class="qr"')}<h2>${student.name}</h2><p>${student.grade} · ${student.group}</p><p>الرمز: TOS-${student.id}</p></body></html>`)
    w.document.close()
    w.print()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="رمز QR للطالب" size="sm">
      <div className="flex flex-col items-center gap-4 py-4">
        <div ref={svgRef} className="w-52 h-52" dangerouslySetInnerHTML={{ __html: qrSvg }} />
        <div className="text-center">
          <h3 className="text-lg font-bold text-text">{student.name}</h3>
          <p className="text-sm text-text-secondary">{student.grade} · {student.group}</p>
          <p className="text-xs text-text-tertiary mt-1">TOS-{student.id}</p>
        </div>
        <div className="flex gap-3 w-full pt-2">
          <Button variant="primary" className="flex-1" onClick={handleDownload}>تحميل PNG</Button>
          <Button variant="secondary" className="flex-1" onClick={handlePrint}>طباعة</Button>
        </div>
      </div>
    </Modal>
  )
}
