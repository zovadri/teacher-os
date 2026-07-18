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
  slug: string
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

export interface CenterCode {
  id: string
  code: string
  batchId: string
  planId?: string
  courseId?: string
  status: "new" | "used" | "expired" | "cancelled"
  usedBy?: string
  usedAt?: Date
  expiresAt?: Date
  qrCode: string
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
