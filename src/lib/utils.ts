import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

export function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return "الآن"
  if (minutes < 60) return `منذ ${minutes} دقيقة`
  if (hours < 24) return `منذ ${hours} ساعة`
  if (days < 30) return `منذ ${days} يوم`
  return formatDate(date)
}

let _idCounter = 0
export function generateId(): string {
  _idCounter++
  return `id_${Date.now().toString(36)}_${_idCounter}`
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim()
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text
  return text.substring(0, length).trim() + "..."
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0) return `${h} س ${m} دقيقة`
  return `${m} دقيقة`
}

let _detIndex = 0
const _detTable = [0.42, 0.17, 0.83, 0.65, 0.31, 0.95, 0.08, 0.72, 0.53, 0.26, 0.89, 0.14, 0.67, 0.49, 0.03, 0.77, 0.58, 0.21, 0.91, 0.36, 0.81, 0.09, 0.74, 0.44, 0.62, 0.18, 0.96, 0.05, 0.69, 0.52, 0.27, 0.87, 0.12, 0.71, 0.34, 0.94, 0.01, 0.63, 0.48, 0.23, 0.85, 0.55, 0.19, 0.79, 0.38, 0.92, 0.07, 0.66, 0.42, 0.29]
export function det(): number {
  _detIndex = (_detIndex + 1) % _detTable.length
  return _detTable[_detIndex]
}