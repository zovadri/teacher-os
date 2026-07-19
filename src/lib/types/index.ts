export interface User {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  role: "teacher" | "student" | "parent" | "staff"
  createdAt: Date
  status: "active" | "inactive" | "suspended"
}

export interface Teacher extends User {
  role: "teacher"
  bio: string
  experience: number
  achievements: string[]
  studentsCount: number
  coursesCount: number
  rating: number
}

export interface Student extends User {
  role: "student"
  parentId?: string
  grade: string
  group: string
  school: string
  governorate: string
  city: string
  gender: "male" | "female"
  birthDate: Date
  subscription?: Subscription
  xp: number
  level: number
  streak: number
}

export interface Parent extends User {
  role: "parent"
  children: string[]
}

export interface Staff extends User {
  role: "staff"
  jobTitle: string
  permissions: string[]
}

export interface Course {
  id: string
  title: string
  slug?: string
  subject: string
  grade: string
  term: string
  category: string
  image: string
  banner: string
  shortDescription: string
  description: string
  price: number
  discountPrice?: number
  isFree: boolean
  requiresCode: boolean
  status: "draft" | "published" | "hidden" | "archived" | "coming-soon"
  studentsCount: number
  lessonsCount: number
  videosCount: number
  examsCount: number
  homeworkCount: number
  filesCount: number
  rating: number
  createdAt: Date
  updatedAt: Date
  chapters: Chapter[]
}

export interface Chapter {
  id: string
  title: string
  description: string
  order: number
  status: "active" | "hidden"
  lessons: Lesson[]
}

export interface Lesson {
  id: string
  title: string
  description: string
  order: number
  duration: number
  isFree: boolean
  isLocked: boolean
  status: "draft" | "published" | "hidden"
  publishedAt?: Date
  video?: Video
  files: FileItem[]
  homework?: Homework
  exam?: Exam
}

export interface Video {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: number
  url: string
  views: number
  completionRate: number
  status: "processing" | "ready" | "failed"
}

export interface FileItem {
  id: string
  name: string
  type: "pdf" | "word" | "excel" | "powerpoint" | "zip" | "image" | "audio"
  size: number
  pages?: number
  downloads: number
  url: string
}

export interface Homework {
  id: string
  title: string
  description: string
  courseId: string
  chapterId: string
  lessonId: string
  totalGrade: number
  deadline: Date
  lastSubmissionDate: Date
  allowResubmit: boolean
  maxResubmitCount: number
  type: "quiz" | "pdf" | "image" | "word" | "video" | "zip" | "writing" | "mixed"
  status: "active" | "closed" | "draft"
  submissions: Submission[]
  analytics: HomeworkAnalytics
}

export interface Submission {
  id: string
  studentId: string
  studentName: string
  files: string[]
  notes: string
  submittedAt: Date
  grade?: number
  feedback?: string
  status: "submitted" | "graded" | "late"
}

export interface HomeworkAnalytics {
  submitted: number
  notSubmitted: number
  late: number
  averageGrade: number
  highestGrade: number
  lowestGrade: number
  passRate: number
}

export interface Exam {
  id: string
  title: string
  description: string
  courseId: string
  chapterId: string
  lessonId: string
  duration: number
  totalGrade: number
  maxAttempts: number
  shuffleQuestions: boolean
  shuffleChoices: boolean
  startDate: Date
  endDate: Date
  showResultImmediately: boolean
  status: "draft" | "active" | "closed"
  gradingMode: "auto" | "manual" | "mixed"
  questions: Question[]
  analytics: ExamAnalytics
}

export interface Question {
  id: string
  type: "multiple-choice" | "true-false" | "fill-blank" | "ordering" | "matching" | "essay"
  text: string
  image?: string
  grade: number
  suggestedTime: number
  difficulty: "easy" | "medium" | "hard"
  tags: string[]
  choices?: { id: string; text: string; isCorrect: boolean }[]
  correctAnswer?: string
  explanation?: string
  orderingItems?: { id: string; text: string; correctOrder: number }[]
  matchingLeft?: { id: string; text: string }[]
  matchingRight?: { id: string; text: string; matchId: string }[]
  stats?: QuestionStats
}

export interface QuestionStats {
  timesUsed: number
  correctRate: number
  incorrectRate: number
}

export interface ExamAnalytics {
  averageGrade: number
  highestGrade: number
  lowestGrade: number
  passRate: number
  failRate: number
  hardestQuestion: string
  easiestQuestion: string
  mostMistakenQuestion: string
  mostSkippedQuestion: string
  averageTime: number
}

export interface Subscription {
  id: string
  studentId: string
  planId: string
  planName: string
  startDate: Date
  endDate: Date
  daysRemaining: number
  status: "active" | "pending" | "expired" | "frozen" | "cancelled"
  paymentMethod: "cash" | "fawry" | "code"
  amount: number
  transactionId?: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  description: string
  price: number
  duration: number
  durationUnit: "day" | "month" | "year"
  coursesCount: number
  allCourses: boolean
  color: string
  icon: string
  order: number
  status: "active" | "inactive"
}

export interface Payment {
  id: string
  studentId: string
  studentName: string
  amount: number
  method: "cash" | "fawry" | "code"
  status: "pending" | "completed" | "failed" | "refunded"
  transactionId: string
  subscriptionId: string
  invoiceId: string
  createdAt: Date
}

export interface Certificate {
  id: string
  studentId: string
  studentName: string
  courseId: string
  courseName: string
  teacherName: string
  grade: number
  percentage: number
  issuedAt: Date
  certificateNumber: string
  qrCode: string
  status: "active" | "revoked"
}

export interface Notification {
  id: string
  type: "info" | "warning" | "success" | "error"
  title: string
  message: string
  read: boolean
  createdAt: Date
  link?: string
}

export interface ActivityLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  resourceId: string
  details: string
  ip: string
  device: string
  timestamp: Date
}

export interface DashboardStats {
  totalStudents: number
  activeStudents: number
  newStudents: number
  expiredStudents: number
  totalParents: number
  totalStaff: number
  totalCourses: number
  totalLessons: number
  totalVideos: number
  totalPdfs: number
  totalHomework: number
  totalExams: number
  totalCertificates: number
  totalCodes: number
  totalPayments: number
  dailyRevenue: number
  monthlyRevenue: number
  yearlyRevenue: number
}

export interface Permission {
  id: string
  key: string
  label: string
  group: string
  description: string
}

export type EnrollmentStatus = "active" | "expired" | "cancelled" | "trial"
export type AccessType = "single" | "bundle" | "free" | "trial" | "vip" | "lifetime"

export interface CourseEnrollment {
  id: string
  studentId: string
  studentName: string
  courseId: string
  courseName: string
  bundleId?: string
  status: EnrollmentStatus
  accessType: AccessType
  enrolledAt: Date
  expiresAt?: Date
  progress: number
  grade?: number
  completedAt?: Date
  source: "payment" | "code" | "free" | "admin"
  sourceId?: string
}

export interface Bundle {
  id: string
  name: string
  description: string
  courses: string[]
  price: number
  discount: number
  status: "active" | "inactive"
  createdAt: Date
}

export interface CenterCode {
  id: string
  code: string
  type: "single" | "bundle" | "discount" | "free"
  value: number
  courseId?: string
  bundleId?: string
  maxUses: number
  currentUses: number
  expiresAt: Date
  status: "active" | "expired" | "disabled"
  createdBy: string
  createdAt: Date
}

// ===== Attendance System =====
export type AttendanceStatus = "present" | "absent" | "late" | "excused"
export type AttendanceMethod = "qr" | "code" | "manual" | "employee"

export interface Attendance {
  id: string
  studentId: string
  studentName: string
  studentImage?: string
  courseId: string
  courseName: string
  date: Date
  status: AttendanceStatus
  method: AttendanceMethod
  checkIn?: string
  checkOut?: string
  notes?: string
  lateMinutes?: number
  isDuplicate: boolean
  recordedBy: string
  recordedAt: Date
}

export interface AttendanceStats {
  total: number
  present: number
  absent: number
  late: number
  excused: number
  attendanceRate: number
  lateRate: number
}

export interface EmployeeAttendance {
  id: string
  employeeId: string
  employeeName: string
  date: Date
  checkIn: string
  checkOut?: string
  status: "ontime" | "late" | "absent" | "excused"
  lateMinutes?: number
  notes?: string
}

// ===== Student Profile =====
export interface StudentNote {
  id: string
  type: "personal" | "academic"
  title: string
  content: string
  createdBy: string
  createdAt: Date
  priority: "low" | "medium" | "high"
}

export interface ParentInfo {
  id: string
  name: string
  relation: string
  phone: string
  email: string
  isPrimary: boolean
}

export interface EmergencyContact {
  id: string
  name: string
  relation: string
  phone: string
  alternatePhone?: string
}

export interface StudentDocument {
  id: string
  name: string
  type: "id" | "birth" | "certificate" | "photo" | "other"
  url: string
  uploadedAt: Date
  verified: boolean
}

export interface MedicalInfo {
  id: string
  bloodType: string
  allergies: string[]
  chronicDiseases: string[]
  medications: string[]
  emergencyNotes?: string
  doctorName?: string
  doctorPhone?: string
}

export interface TimelineEvent {
  id: string
  type: "enrolled" | "completed" | "payment" | "attendance" | "exam" | "reward" | "penalty" | "note"
  title: string
  description: string
  date: Date
  icon?: string
}

export interface DisciplineRecord {
  id: string
  type: "reward" | "penalty"
  title: string
  description: string
  points: number
  date: Date
  issuedBy: string
}

// ===== Class & Group Management =====
export type EnrollmentState = "active" | "frozen" | "waiting" | "reserved" | "cancelled" | "completed"

export interface ClassGroup {
  id: string
  name: string
  courseId: string
  courseName: string
  capacity: number
  enrolledCount: number
  waitingCount: number
  seatNumbers: boolean
  classroom?: string
  schedule: ClassSchedule[]
  status: "active" | "inactive" | "completed"
}

export interface ClassSchedule {
  id: string
  day: "saturday" | "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday"
  startTime: string
  endTime: string
  classroom: string
}

export interface WaitingStudent {
  id: string
  studentId: string
  studentName: string
  groupId: string
  groupName: string
  joinedAt: Date
  priority: number
  notified: boolean
  status: "waiting" | "offered" | "enrolled" | "cancelled"
}

export interface FreezeRecord {
  id: string
  studentId: string
  studentName: string
  groupId: string
  enrollmentId: string
  startDate: Date
  endDate: Date
  reason: string
  status: "active" | "expired" | "cancelled"
}

export interface MissedLesson {
  id: string
  studentId: string
  studentName: string
  lessonId: string
  lessonTitle: string
  courseId: string
  date: Date
  recovered: boolean
  recoveredAt?: Date
}

// ===== Advanced Exam =====
export interface ExamVersion {
  id: string
  examId: string
  label: string
  questions: Question[]
  shuffleQuestions: boolean
  shuffleChoices: boolean
  totalGrade: number
}

export interface QuestionAnalysis {
  questionId: string
  questionText: string
  type: string
  difficulty: string
  correctCount: number
  incorrectCount: number
  skippedCount: number
  correctRate: number
  averageTime: number
  tag: string
}

export interface PrintConfig {
  includeHeader: boolean
  includeFooter: boolean
  includeStudentInfo: boolean
  showAnswers: boolean
  showGrade: boolean
  fontSize: "small" | "medium" | "large"
  columns: 1 | 2
}

// ===== Reports =====
export type ReportType = "student" | "group" | "teacher" | "attendance" | "financial" | "homework" | "exam" | "revenue" | "expense"
export type ExportFormat = "pdf" | "excel" | "print"

export interface Report {
  id: string
  type: ReportType
  title: string
  description: string
  dateRange: { from: Date; to: Date }
  generatedAt: Date
  generatedBy: string
  format: ExportFormat
  data: Record<string, unknown>
}

// ===== Payment System =====
export interface Installment {
  id: string
  studentId: string
  studentName: string
  enrollmentId: string
  totalAmount: number
  paidAmount: number
  remainingAmount: number
  numberOfInstallments: number
  installments: InstallmentItem[]
  status: "active" | "completed" | "defaulted"
  startDate: Date
  nextDueDate: Date
}

export interface InstallmentItem {
  id: string
  amount: number
  dueDate: Date
  paidDate?: Date
  status: "pending" | "paid" | "overdue"
  lateFee?: number
}

export interface Coupon {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  maxUses: number
  currentUses: number
  minAmount?: number
  maxDiscount?: number
  expiresAt: Date
  status: "active" | "expired" | "disabled"
}

export interface Receipt {
  id: string
  receiptNumber: string
  studentId: string
  studentName: string
  amount: number
  method: string
  status: string
  items: { description: string; amount: number }[]
  createdAt: Date
  printed: boolean
}

export interface Refund {
  id: string
  paymentId: string
  studentId: string
  studentName: string
  amount: number
  reason: string
  status: "pending" | "approved" | "processed" | "rejected"
  requestedAt: Date
  processedAt?: Date
}

export interface AccountStatement {
  studentId: string
  studentName: string
  balance: number
  transactions: StatementTransaction[]
}

export interface StatementTransaction {
  id: string
  type: "payment" | "refund" | "fee" | "adjustment"
  description: string
  amount: number
  balanceAfter: number
  date: Date
}

// ===== Center Management =====
export interface Branch {
  id: string
  name: string
  address: string
  phone: string
  email: string
  manager: string
  status: "active" | "inactive"
  capacity: number
  currentCount: number
  createdAt: Date
}

export interface Classroom {
  id: string
  name: string
  branchId: string
  capacity: number
  equipment: string[]
  status: "available" | "occupied" | "maintenance"
}

export interface Seat {
  id: string
  classroomId: string
  number: number
  status: "available" | "occupied" | "reserved" | "maintenance"
  assignedTo?: string
  assignedName?: string
}

export interface ScheduleSlot {
  id: string
  branchId: string
  classroomId: string
  courseId: string
  courseName: string
  teacherId: string
  teacherName: string
  day: string
  startTime: string
  endTime: string
  type: "lecture" | "section" | "lab" | "office-hours"
}

export interface Employee {
  id: string
  name: string
  email: string
  phone: string
  jobTitle: string
  department: string
  salary: number
  hireDate: Date
  status: "active" | "inactive" | "on-leave"
  branchId: string
  avatar?: string
}

export interface SalaryRecord {
  id: string
  employeeId: string
  employeeName: string
  baseSalary: number
  bonuses: number
  deductions: number
  netSalary: number
  month: number
  year: number
  paidAt?: Date
  status: "pending" | "paid" | "cancelled"
}

export interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  minQuantity: number
  unit: string
  price: number
  branchId: string
  status: "in-stock" | "low-stock" | "out-of-stock"
}

export interface Expense {
  id: string
  category: string
  description: string
  amount: number
  date: Date
  branchId: string
  paidBy: string
  receipt?: string
  status: "pending" | "approved" | "rejected"
}

// ===== Video Protection =====
export interface VideoSession {
  id: string
  videoId: string
  studentId: string
  deviceId: string
  deviceName: string
  deviceType: string
  ip: string
  startedAt: Date
  lastActiveAt: Date
  active: boolean
}

export interface DeviceInfo {
  id: string
  studentId: string
  name: string
  type: string
  os: string
  browser: string
  lastUsed: Date
  trusted: boolean
}

export interface WatchProgress {
  videoId: string
  studentId: string
  progress: number
  lastPosition: number
  completed: boolean
  startedAt: Date
  lastWatchedAt: Date
  completions: number
}

// ===== Student ID Card =====
export interface StudentIDCard {
  id: string
  studentId: string
  studentName: string
  studentImage: string
  grade: string
  group: string
  studentCode: string
  enrollmentStatus: string
  qrCode: string
  issuedAt: Date
  expiresAt: Date
}

// ===== Audit Log =====
export interface AuditEntry {
  id: string
  userId: string
  userName: string
  userRole: string
  action: "login" | "logout" | "create" | "edit" | "delete" | "payment" | "attendance" | "exam" | "homework"
  module: string
  description: string
  ip: string
  device: string
  timestamp: Date
  metadata?: Record<string, unknown>
}

// ===== Advanced Permissions =====
export interface ModulePermission {
  module: string
  label: string
  canView: boolean
  canCreate: boolean
  canEdit: boolean
  canDelete: boolean
  canPrint: boolean
  canExport: boolean
  canApprove: boolean
  canManage: boolean
}

export interface PermissionRole {
  id: string
  name: string
  description: string
  isSystem: boolean
  userCount: number
  permissions: Record<string, ModulePermission>
}

// ===== Parent Portal =====
export interface ParentDashboardData {
  children: ParentChildData[]
  notifications: Notification[]
  recentMessages: { from: string; subject: string; date: Date }[]
  weeklyReports: WeeklyReport[]
}

export interface ParentChildData {
  studentId: string
  studentName: string
  attendance: AttendanceStats
  upcomingExams: Exam[]
  homeworkStatus: { submitted: number; pending: number; late: number }
  recentGrades: { exam: string; grade: number; total: number }[]
}

export interface WeeklyReport {
  id: string
  studentId: string
  weekStart: Date
  weekEnd: Date
  attendanceRate: number
  completedHomework: number
  averageGrade: number
  behavior: string
  notes: string
}

// ===== Waiting Queue =====
export interface WaitingQueueStats {
  totalWaiting: number
  byGroup: { groupName: string; count: number }[]
  averageWaitDays: number
  notifiedToday: number
  enrolledToday: number
}

// ===== Backup & Recovery =====
export interface BackupRecord {
  id: string
  name: string
  size: string
  type: "manual" | "auto"
  status: "completed" | "failed" | "in-progress"
  createdAt: Date
  createdBy: string
  restoredAt?: Date
}

export interface RecycleBinItem {
  id: string
  originalId: string
  type: string
  name: string
  deletedBy: string
  deletedAt: Date
  expiresAt: Date
  data: Record<string, unknown>
}
