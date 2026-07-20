import type { Bundle, CenterCode, CourseEnrollment, EnrollmentStatus, AccessType } from "@/lib/types"

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

const det = seededRandom(42)
const detInt = (min: number, max: number) => Math.floor(det() * (max - min + 1)) + min
const detPick = <T,>(arr: T[]): T => arr[Math.floor(det() * arr.length)]

export const mockTeacher = {
  id: "t-1",
  name: "أحمد محمد",
  email: "ahmed@teacher-os.com",
  phone: "+20 100 000 0000",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher",
  role: "teacher" as const,
  createdAt: new Date("2020-01-15"),
  status: "active" as const,
  bio: "مدرس لغة عربية بخبرة تزيد عن 15 عاماً في التدريس للمرحلة الثانوية. حاصل على ماجستير في اللغة العربية من جامعة القاهرة.",
  experience: 15,
  achievements: ["أفضل مدرس 2023", "تطوير المناهج 2022", "500+ طالب ناجح"],
  studentsCount: 1250,
  coursesCount: 8,
  rating: 4.8,
}

export const mockStats = {
  totalStudents: 1250,
  activeStudents: 980,
  newStudents: 45,
  expiredStudents: 120,
  totalParents: 820,
  totalStaff: 6,
  totalCourses: 8,
  totalLessons: 240,
  totalVideos: 520,
  totalPdfs: 180,
  totalHomework: 350,
  totalExams: 120,
  totalCertificates: 380,
  totalCodes: 2500,
  totalPayments: 1850,
  dailyRevenue: 4500,
  monthlyRevenue: 135000,
  yearlyRevenue: 1620000,
}

export const mockStudents = Array.from({ length: 50 }, (_, i) => ({
  id: `s-${i + 1}`,
  name: `طالب ${i + 1}`,
  phone: `+20 100 000 ${String(i + 1).padStart(4, "0")}`,
  parentPhone: `+20 100 000 ${String(i + 1000).padStart(4, "0")}`,
  email: `student${i + 1}@email.com`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=student${i}`,
  grade: ["أولى ثانوي", "ثانية ثانوي", "ثالثة ثانوي"][i % 3],
  group: ["مجموعة A", "مجموعة B", "مجموعة C"][i % 3],
  school: "مدرسة النصر الثانوية",
  governorate: ["القاهرة", "الجيزة", "الإسكندرية"][i % 3],
  city: ["مدينة نصر", "المهندسين", "سموحة"][i % 3],
  gender: i % 2 === 0 ? ("male" as const) : ("female" as const),
  birthDate: new Date(2005 + (i % 5), i % 12, (i % 28) + 1),
  status: (["active", "active", "active", "inactive", "expired"] as const)[i % 5],
  subscription: {
    status: (["active", "active", "active", "expired", "pending"] as const)[i % 5],
    planName: ["الباقة الشهرية", "الباقة الثلاثية", "الباقة السنوية"][i % 3],
    startDate: new Date(2025, 6, 1),
    endDate: new Date(2025, 6 + (i % 3), 1),
  },
  xp: Math.floor(det() * 5000),
  level: Math.floor(det() * 15) + 1,
  streak: Math.floor(det() * 30),
}))

export const mockCourses = [
  {
    id: "c-1", title: "النحو والصرف", subject: "لغة عربية", grade: "ثالثة ثانوي", term: "الأول",
    studentsCount: 350, lessonsCount: 36, videosCount: 72, examsCount: 12, homeworkCount: 24, filesCount: 45,
    price: 1500, discountPrice: 1200, rating: 4.9,
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=85",
    status: "published" as const,
    shortDescription: "دورة شاملة في النحو والصرف للمرحلة الثانوية",
    description: "دورة متكاملة في النحو والصرف العربي تغطي جميع قواعد النحو والصرف المقررة للمرحلة الثانوية. تشمل شرحاً وافياً للأبواب النحوية مع تطبيقات عملية وتمارين تفاعلية.",
    banner: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=1200&q=85",
    category: "لغويات", isFree: false, requiresCode: false, createdAt: new Date("2024-01-01"), updatedAt: new Date("2025-05-01"),
    chapters: generateChapters(6, "c-1"),
  },
  {
    id: "c-2", title: "البلاغة والأدب", subject: "لغة عربية", grade: "ثالثة ثانوي", term: "الأول",
    studentsCount: 280, lessonsCount: 24, videosCount: 48, examsCount: 8, homeworkCount: 16, filesCount: 30,
    price: 1200, discountPrice: 1000, rating: 4.7,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=85",
    status: "published" as const,
    shortDescription: "دراسة البلاغة العربية والأدب للنظام الحديث",
    description: "دورة شاملة في البلاغة العربية (المعاني والبيان والبديع) والأدب العربي للنظام الحديث.",
    banner: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=85",
    category: "أدب", isFree: false, requiresCode: false, createdAt: new Date("2024-01-15"), updatedAt: new Date("2025-05-15"),
    chapters: generateChapters(4, "c-2"),
  },
  {
    id: "c-3", title: "النصوص الأدبية", subject: "لغة عربية", grade: "ثانية ثانوي", term: "الأول",
    studentsCount: 220, lessonsCount: 18, videosCount: 36, examsCount: 6, homeworkCount: 12, filesCount: 25,
    price: 900, rating: 4.8,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=85",
    status: "published" as const,
    shortDescription: "تحليل النصوص الأدبية المقررة للصف الثاني الثانوي",
    description: "دورة تحليل النصوص الأدبية المقررة للصف الثاني الثانوي مع شرح وافٍ.",
    banner: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=85",
    category: "أدب", isFree: true, requiresCode: false, createdAt: new Date("2024-02-01"), updatedAt: new Date("2025-04-20"),
    chapters: generateChapters(3, "c-3"),
  },
  {
    id: "c-4", title: "قواعد النحو المتقدم", subject: "لغة عربية", grade: "ثالثة ثانوي", term: "الثاني",
    studentsCount: 190, lessonsCount: 30, videosCount: 60, examsCount: 10, homeworkCount: 20, filesCount: 35,
    price: 1500, discountPrice: 1300, rating: 4.6,
    image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=800&q=85",
    status: "published" as const,
    shortDescription: "قواعد النحو المتقدمة للترم الثاني",
    description: "استكمال قواعد النحو المتقدمة للترم الثاني مع تمارين شاملة.",
    banner: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=1200&q=85",
    category: "لغويات", isFree: false, requiresCode: false, createdAt: new Date("2024-02-15"), updatedAt: new Date("2025-05-10"),
    chapters: generateChapters(5, "c-4"),
  },
  {
    id: "c-5", title: "الإملاء والخط", subject: "لغة عربية", grade: "أولى ثانوي", term: "الأول",
    studentsCount: 150, lessonsCount: 12, videosCount: 24, examsCount: 4, homeworkCount: 8, filesCount: 15,
    price: 600, rating: 4.5,
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=85",
    status: "published" as const,
    shortDescription: "تصحيح الإملاء وتحسين الخط العربي",
    description: "دورة تصحيح الأخطاء الإملائية وتحسين الخط العربي للطلاب.",
    banner: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=85",
    category: "مهارات", isFree: false, requiresCode: false, createdAt: new Date("2024-03-01"), updatedAt: new Date("2025-04-01"),
    chapters: generateChapters(2, "c-5"),
  },
  {
    id: "c-6", title: "التعبير والإنشاء", subject: "لغة عربية", grade: "ثالثة ثانوي", term: "الأول",
    studentsCount: 310, lessonsCount: 20, videosCount: 40, examsCount: 10, homeworkCount: 20, filesCount: 20,
    price: 1000, discountPrice: 800, rating: 4.9,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=85",
    status: "published" as const,
    shortDescription: "تقنيات التعبير والإنشاء الإبداعي",
    description: "دورة متقدمة في فنون التعبير والإنشاء الإبداعي.",
    banner: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=85",
    category: "مهارات", isFree: false, requiresCode: false, createdAt: new Date("2024-03-15"), updatedAt: new Date("2025-05-20"),
    chapters: generateChapters(4, "c-6"),
  },
  {
    id: "c-7", title: "مراجعة نهائية - لغة عربية", subject: "لغة عربية", grade: "ثالثة ثانوي", term: "الأول",
    studentsCount: 420, lessonsCount: 48, videosCount: 96, examsCount: 20, homeworkCount: 30, filesCount: 60,
    price: 2000, discountPrice: 1700, rating: 5.0,
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=85",
    status: "published" as const,
    shortDescription: "المراجعة النهائية الشاملة ليلة الامتحان",
    description: "المراجعة النهائية الشاملة لكل فروع اللغة العربية للمرحلة الثانوية.",
    banner: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=85",
    category: "مراجعة", isFree: false, requiresCode: false, createdAt: new Date("2024-04-01"), updatedAt: new Date("2025-06-01"),
    chapters: generateChapters(8, "c-7"),
  },
  {
    id: "c-8", title: "النحو التطبيقي", subject: "لغة عربية", grade: "ثانية ثانوي", term: "الثاني",
    studentsCount: 170, lessonsCount: 24, videosCount: 48, examsCount: 8, homeworkCount: 16, filesCount: 28,
    price: 1000, rating: 4.7,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=85",
    status: "coming-soon" as const,
    shortDescription: "تطبيقات عملية على قواعد النحو",
    description: "تطبيقات عملية شاملة على جميع قواعد النحو العربي.",
    banner: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&q=85",
    category: "لغويات", isFree: false, requiresCode: false, createdAt: new Date("2025-06-01"), updatedAt: new Date("2025-06-01"),
    chapters: [],
  },
]

function generateChapters(count: number, courseId: string) {
  const chapterNames = ["المقدمة", "الأساسيات", "المستوى المتقدم", "التطبيقات", "المراجعة", "الاختبارات", "تمارين شاملة", "المشروع النهائي"]
  return Array.from({ length: count }, (_, i) => {
    const lessonCount = Math.floor(det() * 6) + 3
    return {
      id: `ch-${courseId}-${i + 1}`,
      title: chapterNames[i] || `الفصل ${i + 1}`,
      description: `شرح مفصل لـ ${chapterNames[i] || `الفصل ${i + 1}`}`,
      order: i + 1,
      status: "active" as const,
      lessons: Array.from({ length: lessonCount }, (_, j) => ({
        id: `ls-${courseId}-${i + 1}-${j + 1}`,
        title: `درس ${j + 1}: ${["المقدمة", "الشرح", "التطبيق", "الملخص", "تمارين", "اختبار قصير"][j % 6]}`,
        description: `شرح الدرس ${j + 1}`,
        order: j + 1,
        duration: Math.floor(det() * 45) + 10,
        isFree: j === 0,
        isLocked: false,
        status: "published" as const,
        video: {
          id: `vid-${courseId}-${i + 1}-${j + 1}`,
          title: `فيديو الدرس ${j + 1}`,
          description: `شرح فيديو للدرس ${j + 1}`,
          thumbnail: `https://images.unsplash.com/photo-${[1611162617474, 1611162617474, 1611162617474][j % 3]}?w=640&q=85`,
          duration: Math.floor(det() * 45) + 10,
          url: "#",
          views: Math.floor(det() * 5000),
          completionRate: Math.floor(det() * 40) + 60,
          status: "ready" as const,
        },
        files: [],
      })),
    }
  })
}

export const mockParents = Array.from({ length: 30 }, (_, i) => ({
  id: `par-${i + 1}`,
  name: `ولي أمر ${i + 1}`,
  email: `parent${i + 1}@email.com`,
  phone: `+20 100 000 ${String(5000 + i).padStart(4, "0")}`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=parent${i}`,
  role: "parent" as const,
  createdAt: new Date(2024, i % 12, (i % 28) + 1),
  status: (["active", "active", "active", "inactive"] as const)[i % 4],
  children: Array.from({ length: (i % 3) + 1 }, (_, j) => ({
    id: `s-${((i * 3 + j) % 50) + 1}`,
    name: `طالب ${((i * 3 + j) % 50) + 1}`,
    grade: ["أولى ثانوي", "ثانية ثانوي", "ثالثة ثانوي"][j % 3],
  })),
  totalPaid: Math.floor(det() * 5000) + 1000,
  lastPayment: new Date(2025, 5 + (i % 3), (i % 28) + 1),
}))

export const mockCenterCodes = Array.from({ length: 40 }, (_, i) => {
  const planIds = ["plan-1", "plan-2", "plan-3", "plan-4"]
  const planNames = ["الباقة الشهرية", "الباقة الثلاثية", "الباقة السنوية", "باقة الكورس الواحد"]
  const prices = [300, 765, 2700, 150]
  return {
    id: `code-${i + 1}`,
    code: `TOS-${String(i + 1).padStart(5, "0")}`,
    batchId: `batch-${Math.floor(i / 10) + 1}`,
    planId: planIds[i % 4],
    planName: planNames[i % 4],
    courseId: i % 2 === 0 ? undefined : mockCourses[i % 8].id,
    courseName: i % 2 === 0 ? undefined : mockCourses[i % 8].title,
    status: (["new", "new", "new", "used", "expired"] as const)[i % 5],
    usedBy: i % 5 === 3 ? `s-${i + 1}` : undefined,
    usedAt: i % 5 === 3 ? new Date(2025, 5, (i % 28) + 1) : undefined,
    expiresAt: new Date(2025, 11, 31),
    qrCode: "#",
    price: prices[i % 4],
    createdAt: new Date(2025, 3 + Math.floor(i / 10), (i % 28) + 1),
  }
})

export const mockWallet = {
  balance: 28450,
  totalDeposits: 150000,
  totalWithdrawals: 121550,
  pendingWithdrawals: 0,
  currency: "EGP",
  transactions: Array.from({ length: 30 }, (_, i) => ({
    id: `txn-${i + 1}`,
    type: (["deposit", "deposit", "withdrawal", "refund"] as const)[i % 4],
    amount: Math.floor(det() * 5000) + 100,
    description: ["إيداع نقدي", "تحويل فوري", "سحب رصيد", "استرداد اشتراك"][i % 4],
    status: (["completed", "completed", "completed", "pending", "failed"] as const)[i % 5],
    createdAt: new Date(2025, 4 + Math.floor(i / 5), (i % 28) + 1),
    paymentMethod: (["cash", "fawry", "bank"] as const)[i % 3],
    reference: `REF-${String(i + 1).padStart(6, "0")}`,
  })),
}

export const mockMessages = Array.from({ length: 25 }, (_, i) => ({
  id: `msg-${i + 1}`,
  senderId: i % 3 === 0 ? "t-1" : `s-${(i % 50) + 1}`,
  senderName: i % 3 === 0 ? "أحمد محمد" : `طالب ${(i % 50) + 1}`,
  senderAvatar: i % 3 === 0
    ? "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher"
    : `https://api.dicebear.com/7.x/avataaars/svg?seed=student${i}`,
  recipientId: i % 3 === 0 ? `s-${(i % 50) + 1}` : "t-1",
  subject: ["استفسار عن الامتحان", "طلب تأجيل واجب", "استفسار عن الدرس", "مشكلة في الفيديو", "شكر وتقدير"][i % 5],
  content: "نص الرسالة الكامل مع التفاصيل...",
  read: i % 3 !== 0,
  attachments: i % 4 === 0 ? ["ملف1.pdf"] : [],
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * (i * 3)),
  isStarred: i % 5 === 0,
  conversationId: `conv-${Math.floor(i / 3) + 1}`,
}))

export const mockAttendance = Array.from({ length: 50 }, (_, i) => ({
  id: `att-${i + 1}`,
  studentId: `s-${(i % 50) + 1}`,
  studentName: `طالب ${(i % 50) + 1}`,
  courseId: mockCourses[i % 8].id,
  courseName: mockCourses[i % 8].title,
  date: new Date(2025, 5 + Math.floor(i / 20), (i % 28) + 1),
  status: (["present", "present", "present", "absent", "late", "excused"] as const)[i % 6],
  checkIn: i % 6 !== 3 ? `${8 + Math.floor(det() * 2)}:${String(Math.floor(det() * 60)).padStart(2, "0")}` : undefined,
  checkOut: i % 6 !== 3 ? `${10 + Math.floor(det() * 2)}:${String(Math.floor(det() * 60)).padStart(2, "0")}` : undefined,
  notes: i % 5 === 0 ? "ملاحظات عن الحضور" : "",
  recordedBy: "أحمد محمد",
}))

export const mockStaffPermissions = [
  { id: "role-1", name: "مدير النظام", description: "صلاحية كاملة على جميع أجزاء النظام", isSystem: true, userCount: 1,
    permissions: ["manage_system","manage_users","manage_students","manage_teachers","manage_courses","manage_exams","manage_payments","manage_subscriptions","manage_codes","manage_certificates","manage_content","view_reports","view_analytics"] },
  { id: "role-2", name: "مشرف", description: "إدارة الطلاب والكورسات والتقارير", isSystem: false, userCount: 2,
    permissions: ["manage_students","manage_courses","manage_exams","view_reports","view_analytics"] },
  { id: "role-3", name: "محاسب", description: "إدارة المدفوعات والاشتراكات والتقارير المالية", isSystem: false, userCount: 1,
    permissions: ["manage_payments","manage_subscriptions","manage_codes","view_reports"] },
  { id: "role-4", name: "دعم فني", description: "التعامل مع الطلاب وأولياء الأمور والدعم", isSystem: false, userCount: 2,
    permissions: ["manage_students","manage_parents","manage_content"] },
  { id: "role-5", name: "مشرف محتوى", description: "إدارة المحتوى التعليمي وCMS", isSystem: false, userCount: 0,
    permissions: ["manage_content","manage_cms","manage_courses"] },
]

export const mockFawrySimulation = Array.from({ length: 15 }, (_, i) => ({
  id: `fawry-${i + 1}`,
  referenceNumber: `FRY-${String(i + 1).padStart(8, "0")}`,
  studentId: `s-${(i % 50) + 1}`,
  studentName: `طالب ${(i % 50) + 1}`,
  amount: [300, 765, 2700, 1500, 1000][i % 5],
  status: (["paid", "paid", "paid", "pending", "expired"] as const)[i % 5],
  createdAt: new Date(2025, 5 + (i % 3), (i % 28) + 1),
  paidAt: i % 5 !== 3 ? new Date(2025, 5 + (i % 3), (i % 28) + 2) : undefined,
  paymentMethod: "fawry" as const,
}))

export const mockInvoices = Array.from({ length: 20 }, (_, i) => {
  const planNames = ["الباقة الشهرية", "الباقة الثلاثية", "الباقة السنوية", "باقة الكورس الواحد"]
  const prices = [300, 765, 2700, 150]
  return {
    id: `inv-${i + 1}`,
    invoiceNumber: `INV-${String(i + 1).padStart(6, "0")}`,
    studentId: `s-${(i % 50) + 1}`,
    studentName: `طالب ${(i % 50) + 1}`,
    items: [
      { description: planNames[i % 4], amount: prices[i % 4] },
      { description: "رسوم إدارية", amount: 50 },
    ],
    subtotal: prices[i % 4] + 50,
    discount: i % 3 === 0 ? 100 : 0,
    total: prices[i % 4] + 50 - (i % 3 === 0 ? 100 : 0),
    status: (["paid", "paid", "paid", "pending", "cancelled"] as const)[i % 5],
    issueDate: new Date(2025, 4 + (i % 3), (i % 28) + 1),
    dueDate: new Date(2025, 5 + (i % 3), (i % 28) + 1),
    paidAt: i % 5 !== 4 ? new Date(2025, 4 + (i % 3), (i % 28) + 3) : undefined,
    paymentMethod: (["cash", "fawry", "code"] as const)[i % 3],
  }
})

export const mockVideoLibrary = Array.from({ length: 30 }, (_, i) => ({
  id: `vidlib-${i + 1}`,
  title: `فيديو ${i + 1}: ${["شرح قاعدة النحو", "تحليل النص", "حل تمارين", "مراجعة", "اختبار تجريبي"][i % 5]}`,
  description: "وصف الفيديو مع تفاصيل المحتوى",
  thumbnail: `https://images.unsplash.com/photo-${[1611162617474, 1513475382585, 1434030216411][i % 3]}?w=640&q=85`,
  duration: Math.floor(det() * 45) + 5,
  size: Math.floor(det() * 500) + 50,
  format: ["mp4", "mp4", "mp4", "avi", "mkv"][i % 5],
  resolution: ["1080p", "1080p", "720p", "720p", "480p"][i % 5],
  courseId: mockCourses[i % 8].id,
  courseName: mockCourses[i % 8].title,
  chapterId: "",
  uploadDate: new Date(2025, 4 + Math.floor(i / 6), (i % 28) + 1),
  views: Math.floor(det() * 3000) + 100,
  status: (["ready", "ready", "ready", "processing", "failed"] as const)[i % 5],
}))

export const mockAuditLogs = Array.from({ length: 50 }, (_, i) => ({
  id: `audit-${i + 1}`,
  userId: ["t-1", "stf-1", "stf-2", "stf-3"][i % 4],
  userName: ["أحمد محمد", "محمد علي", "نورا حسن", "أحمد سامي"][i % 4],
  action: ["create", "update", "delete", "login", "logout", "export", "approve", "reject"][i % 8],
  resource: ["user", "course", "exam", "payment", "subscription", "certificate", "code", "setting"][i % 8],
  resourceId: `res-${Math.floor(i / 2) + 1}`,
  details: `تفاصيل العملية: ${["إضافة مستخدم جديد", "تعديل بيانات كورس", "حذف امتحان", "تسجيل دخول"][i % 4]}`,
  ip: `192.168.1.${(i % 255) + 1}`,
  device: ["Chrome/Windows", "Safari/macOS", "Chrome/Android", "Firefox/Windows"][i % 4],
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * i),
  severity: (["info", "info", "info", "warning", "error"] as const)[i % 5],
}))

export const mockExams = Array.from({ length: 15 }, (_, i) => ({
  id: `exam-${i + 1}`,
  title: ["اختبار النحو الشهري", "اختبار البلاغة", "امتحان منتصف الترم", "اختبار النصوص", "امتحان التعبير", "اختبار الإملاء", "امتحان المراجعة الأولى", "امتحان المراجعة الثانية", "اختبار الفصل الأول", "اختبار الفصل الثاني", "امتحان تجريبي 1", "امتحان تجريبي 2", "امتحان نهاية الترم", "اختبار التقييم الأسبوعي", "اختبار التقييم الشهري"][i],
  description: "اختبار تقييمي لمستوى الطالب في المادة",
  courseId: mockCourses[i % mockCourses.length].id,
  chapterId: "",
  lessonId: "",
  duration: [60, 90, 120][i % 3],
  totalGrade: [20, 40, 50, 80, 100][i % 5],
  maxAttempts: [1, 2, 3][i % 3],
  shuffleQuestions: true,
  shuffleChoices: true,
  startDate: new Date(2025, 5, 1),
  endDate: new Date(2025, 7, 30),
  showResultImmediately: true,
  status: (["active", "active", "active", "closed", "draft"] as const)[i % 5],
  gradingMode: (["auto", "auto", "mixed", "manual"] as const)[i % 4],
  questions: Array.from({ length: [12, 15, 18][i % 3] }, (_, q) => {
    const types = ["multiple-choice", "true-false", "fill-blank", "essay", "ordering", "matching"] as const
    const type = types[q % 6]
    const mcTexts = ["ما هو إعراب المبتدأ في جملة 'الطالب مجتهد'؟", "علامة رفع جمع المذكر السالم هي:", "ما هي علامة نصب الاسم المنقوص؟", "أي من التالية أداة نصب للفعل المضارع؟", "ما إعراب كلمة 'طلاباً' في جملة 'رأيت الطلاباً'؟", "اختر الجملة الصحيحة نحوياً:"]
    const tfTexts = ["الفعل المضارع يرفع بالضمة الظاهرة إذا كان صحيح الآخر", "الاسم المنقوص تقدر فيه الضمة والكسرة", "جملة 'الطالب الذي نجح مجتهد' تشتمل على خبر مفرد", "المبتدأ دائماً يأتي في أول الجملة", "الأفعال الخمسة ترفع بثبوت النون", "كان وأخواتها ترفع المبتدأ وتنصب الخبر"]
    const fillTexts = ["يكتب الطالب ........... الدرس (باستخدام - بكتابة - بقراءة)", "................. الجو بارداً (إن - ليت - لعل)", "المسلمون ............ صادقون (هم - هم - أولئك)", "إن .............. مجتهدان (الطالبان - الطالبين - الطالبون)"]
    const essayTexts = ["اشرح قاعدة إعراب المبتدأ والخبر مع ثلاثة أمثلة", "ما الفرق بين الاسم المقصور والاسم المنقوص؟ وضح بالأمثلة", "اكتب فقرة عن أهمية النحو في فهم اللغة العربية", "حلل الجمل التالية إعرابياً: 'كان الطالب مجتهداً في دراسته'"]
    const orderingTexts = ["رتب الأحداث التالية حسب تسلسلها التاريخي:", "رتب خطوات الإعراب الصحيحة:", "رتب الجمل التالية لتكوين فقرة مترابطة:"]
    const matchingTexts = ["وصل كل مصطلح من العمود الأول بالتعريف المناسب من العمود الثاني:", "وصل كل حرف جر بمعناه المناسب:"]
    const text = type === 'multiple-choice' ? mcTexts[q % mcTexts.length] :
                 type === 'true-false' ? tfTexts[q % tfTexts.length] :
                 type === 'fill-blank' ? fillTexts[q % fillTexts.length] :
                 type === 'essay' ? essayTexts[q % essayTexts.length] :
                 type === 'ordering' ? orderingTexts[q % orderingTexts.length] :
                 matchingTexts[q % matchingTexts.length]
    const base = {
      id: `q-${i + 1}-${q + 1}`,
      type,
      text,
      grade: type === 'essay' ? 10 : type === 'ordering' || type === 'matching' ? 8 : [2, 3, 5][q % 3],
      suggestedTime: type === 'essay' ? 5 : [1, 2, 3][q % 3],
      difficulty: (["easy", "medium", "hard"] as const)[q % 3],
      tags: ["نحو", "صرف", "بلاغة", "أدب"],
      explanation: "الشرح التفصيلي للإجابة الصحيحة",
      stats: { timesUsed: Math.floor(det() * 50) + 1, correctRate: Math.floor(det() * 40) + 60, incorrectRate: Math.floor(det() * 40) },
    } as any
    if (type === 'multiple-choice' || type === 'true-false') {
      const mcChoices = [
        [{ id: "a", text: "الرفع بالضمة", isCorrect: true }, { id: "b", text: "النصب بالفتحة", isCorrect: false }, { id: "c", text: "الجر بالكسرة", isCorrect: false }, { id: "d", text: "الجزم بالسكون", isCorrect: false }],
        [{ id: "a", text: "الواو", isCorrect: true }, { id: "b", text: "الألف", isCorrect: false }, { id: "c", text: "الياء", isCorrect: false }, { id: "d", text: "النون", isCorrect: false }],
        [{ id: "a", text: "الفتحة المقدرة", isCorrect: true }, { id: "b", text: "الكسرة المقدرة", isCorrect: false }, { id: "c", text: "الضمة المقدرة", isCorrect: false }, { id: "d", text: "السكون", isCorrect: false }],
        [{ id: "a", text: "أن", isCorrect: true }, { id: "b", text: "لم", isCorrect: false }, { id: "c", text: "لن", isCorrect: false }, { id: "d", text: "لا", isCorrect: false }],
        [{ id: "a", text: "مفعول به منصوب", isCorrect: true }, { id: "b", text: "فاعل مرفوع", isCorrect: false }, { id: "c", text: "مبتدأ مرفوع", isCorrect: false }, { id: "d", text: "خبر مرفوع", isCorrect: false }],
        [{ id: "a", text: "الطالبان مجتهدان", isCorrect: true }, { id: "b", text: "الطالب مجتهد", isCorrect: false }, { id: "c", text: "الطلاب مجتهدون", isCorrect: false }, { id: "d", text: "طالب مجتهد", isCorrect: false }],
      ]
      base.choices = mcChoices[q % mcChoices.length]
    }
    if (type === 'ordering') {
      base.orderingItems = [
        { id: "ord-1", text: "الفعل المضارع" },
        { id: "ord-2", text: "الفعل الماضي" },
        { id: "ord-3", text: "فعل الأمر" },
        { id: "ord-4", text: "المصدر المؤول" },
      ]
    }
    if (type === 'matching') {
      base.matchingLeft = [
        { id: "ml-1", text: "حرف الجر 'في'" },
        { id: "ml-2", text: "حرف الجر 'على'" },
        { id: "ml-3", text: "حرف الجر 'عن'" },
        { id: "ml-4", text: "حرف الجر 'الباء'" },
      ]
      base.matchingRight = [
        { id: "mr-1", text: "الاستعلاء" },
        { id: "mr-2", text: "الظرفية" },
        { id: "mr-3", text: "الإلصاق" },
        { id: "mr-4", text: "المجاوزة" },
      ]
    }
    return base
  }),
  analytics: {
    averageGrade: 68, highestGrade: 100, lowestGrade: 15, passRate: 72, failRate: 28,
    hardestQuestion: "", easiestQuestion: "", mostMistakenQuestion: "", mostSkippedQuestion: "",
    averageTime: 45,
  },
}))

export const mockHomework = Array.from({ length: 20 }, (_, i) => ({
  id: `hw-${i + 1}`,
  title: `واجب ${["النحو", "البلاغة", "النصوص", "الإملاء", "التعبير", "القواعد", "المراجعة", "التطبيقات"][i % 8]} - ${["الأسبوعي", "الشهري", "التكميلي", "الإضافي"][i % 4]}`,
  description: "حل التمارين المطلوبة وإرسالها قبل الموعد النهائي",
  courseId: mockCourses[i % mockCourses.length].id,
  chapterId: "",
  lessonId: "",
  totalGrade: [10, 20, 30][i % 3],
  deadline: new Date(2025, 7, 15 + (i % 14)),
  lastSubmissionDate: new Date(2025, 7, 20 + (i % 10)),
  allowResubmit: i % 3 !== 0,
  maxResubmitCount: [1, 2, 3][i % 3],
  type: (["quiz", "pdf", "writing", "mixed"] as const)[i % 4],
  status: (["pending", "active", "submitted", "graded", "closed", "draft", "late"] as const)[i % 7],
  submissions: Array.from({ length: Math.floor(det() * 30) + 20 }, (_, s) => ({
    id: `sub-${i + 1}-${s + 1}`,
    studentId: `s-${s + 1}`,
    studentName: `طالب ${s + 1}`,
    files: [],
    notes: "",
    submittedAt: new Date(2025, 7, 10 + (s % 15)),
    grade: det() > 0.15 ? Math.floor(det() * 30) + 1 : undefined,
    feedback: det() > 0.5 ? "ممتاز، عمل جيد" : undefined,
    status: (["submitted", "graded", "graded", "graded", "late"] as const)[s % 5],
  })),
  analytics: {
    submitted: Math.floor(det() * 10) + 25,
    notSubmitted: Math.floor(det() * 8) + 2,
    late: Math.floor(det() * 5),
    averageGrade: Math.floor(det() * 30) + 15,
    highestGrade: 30,
    lowestGrade: Math.floor(det() * 10) + 3,
    passRate: Math.floor(det() * 30) + 60,
  },
  grade: i % 3 === 0 ? undefined : Math.floor(det() * 30) + 1,
  feedback: i % 3 === 0 ? undefined : "ممتاز، عمل جيد",
  downloadUrl: `https://example.com/homework/hw-${i + 1}.pdf`,
  submission: {
    fileName: `واجب_${i + 1}.pdf`,
    submittedAt: new Date(2025, 7, 10 + (i % 15)),
    notes: i % 2 === 0 ? "لدي استفسار بخصوص التمرين الثالث" : undefined,
    feedback: i % 3 === 0 ? "ممتاز، عمل جيد" : undefined,
    grade: Math.floor(det() * 30) + 1,
  },
}))

export const mockQuestions = Array.from({ length: 50 }, (_, i) => ({
  id: `qbank-${i + 1}`,
  type: (["multiple-choice", "true-false", "fill-blank", "ordering", "matching", "essay"] as const)[i % 6],
  text: `سؤال بنك الأسئلة رقم ${i + 1}: ${["اختر الإجابة الصحيحة مما يلي", "حدد صحة أو خطأ العبارة", "اكتب الكلمة المناسبة في الفراغ", "رتب الأحداث ترتيباً صحيحاً", "وصل ما يناسب من العمودين", "أجب عن السؤال التالي"][i % 6]}`,
  grade: [2, 3, 4, 5, 10][i % 5],
  suggestedTime: [1, 2, 3, 5][i % 4],
  difficulty: (["easy", "medium", "hard"] as const)[i % 3],
  tags: ["نحو", "صرف", "بلاغة", "أدب", "نصوص", "إملاء"].slice(0, (i % 4) + 1),
  courseId: mockCourses[i % mockCourses.length].id,
  chapterId: "",
  choices: i % 6 < 2 ? Array.from({ length: 4 }, (_, c) => ({ id: `ch-${c + 1}`, text: `اختيار ${c + 1}`, isCorrect: c === 0 })) : undefined,
  correctAnswer: "الإجابة الصحيحة",
  explanation: "شرح الإجابة الصحيحة مع التفاصيل",
  stats: { timesUsed: Math.floor(det() * 30) + 1, correctRate: Math.floor(det() * 40) + 60, incorrectRate: Math.floor(det() * 40) },
}))

export const mockSubscriptionPlans = [
  { id: "plan-1", name: "الباقة الشهرية", description: "اشتراك شهري مع إمكانية الوصول لجميع الكورسات", price: 300, duration: 1, durationUnit: "month" as const, coursesCount: 5, allCourses: false, color: "primary", icon: "HiOutlineCalendar", order: 1, status: "active" as const },
  { id: "plan-2", name: "الباقة الثلاثية", description: "اشتراك 3 أشهر مع خصم 15%", price: 765, duration: 3, durationUnit: "month" as const, coursesCount: -1, allCourses: true, color: "warning", icon: "HiOutlineClock", order: 2, status: "active" as const },
  { id: "plan-3", name: "الباقة السنوية", description: "اشتراك سنوي كامل مع خصم 25%", price: 2700, duration: 12, durationUnit: "month" as const, coursesCount: -1, allCourses: true, color: "success", icon: "HiOutlineStar", order: 3, status: "active" as const },
  { id: "plan-4", name: "باقة الكورس الواحد", description: "اشتراك في كورس واحد فقط لمدة شهر", price: 150, duration: 1, durationUnit: "month" as const, coursesCount: 1, allCourses: false, color: "info", icon: "HiOutlineBookOpen", order: 0, status: "active" as const },
]

export const mockPayments = Array.from({ length: 50 }, (_, i) => ({
  id: `pay-${i + 1}`,
  studentId: `s-${(i % 50) + 1}`,
  studentName: `طالب ${(i % 50) + 1}`,
  amount: [300, 765, 2700, 1500, 1200, 900][i % 6],
  method: (["cash", "fawry", "code"] as const)[i % 3],
  status: (["completed", "completed", "completed", "pending", "failed", "refunded"] as const)[i % 6],
  transactionId: `TXN-${String(i + 1).padStart(6, "0")}`,
  subscriptionId: `sub-${i + 1}`,
  invoiceId: `INV-${String(i + 1).padStart(6, "0")}`,
  createdAt: new Date(2025, 4 + (i % 3), (i % 28) + 1),
}))

export const mockCertificates = Array.from({ length: 30 }, (_, i) => ({
  id: `cert-${i + 1}`,
  studentId: `s-${(i % 50) + 1}`,
  studentName: `طالب ${(i % 50) + 1}`,
  courseId: mockCourses[i % mockCourses.length].id,
  courseName: mockCourses[i % mockCourses.length].title,
  teacherName: "أحمد محمد",
  grade: Math.floor(det() * 30) + 70,
  percentage: Math.floor(det() * 25) + 75,
  issuedAt: new Date(2025, 4 + (i % 4), (i % 28) + 1),
  certificateNumber: `CRT-${String(i + 1).padStart(6, "0")}`,
  qrCode: "#",
  status: (["active", "active", "active", "revoked"] as const)[i % 4],
}))

export const mockNotifications = [
  { id: "notif-1", type: "info" as const, title: "تم إضافة 5 طلاب جدد", message: "تم تسجيل 5 طلاب جدد في النظام اليوم", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 30), link: "/dashboard/teacher/students" },
  { id: "notif-2", type: "success" as const, title: "اكتمال دفع 3 اشتراكات", message: "تم تأكيد دفع 3 اشتراكات جديدة", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 120), link: "/dashboard/teacher/subscriptions" },
  { id: "notif-3", type: "warning" as const, title: "اقتراب موعد امتحان النحو", message: "باقي 3 أيام على امتحان النحو الشهري", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 180), link: "/dashboard/teacher/exams" },
  { id: "notif-4", type: "error" as const, title: "انتهاء اشتراك 12 طالباً", message: "اشتراك 12 طالباً سينتهي خلال 5 أيام", read: false, createdAt: new Date(Date.now() - 1000 * 60 * 300), link: "/dashboard/teacher/students" },
  { id: "notif-5", type: "info" as const, title: "تحديث جديد للنظام", message: "تم إضافة ميزة التقارير المتقدمة", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), link: "/dashboard/teacher/analytics" },
  { id: "notif-6", type: "success" as const, title: "تم رفع 3 فيديوهات جديدة", message: "تم رفع فيديوهات جديدة لكورس النحو", read: true, createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), link: "/dashboard/teacher/courses" },
]

export const mockActivityLog = Array.from({ length: 20 }, (_, i) => ({
  id: `act-${i + 1}`,
  userId: "t-1",
  userName: "أحمد محمد",
  action: ["تسجيل دخول", "إضافة طالب", "رفع فيديو", "إنشاء امتحان", "إضافة واجب", "تعديل كورس", "حذف طالب", "إصدار شهادة", "تسجيل اشتراك", "تعديل صلاحيات"][i % 10],
  resource: ["نظام", "طلاب", "فيديوهات", "امتحانات", "واجبات", "كورسات", "طلاب", "شهادات", "اشتراكات", "صلاحيات"][i % 10],
  resourceId: `res-${i + 1}`,
  details: `تفاصيل العملية رقم ${i + 1}`,
  ip: "192.168.1.100",
  device: "Windows Chrome",
  timestamp: new Date(Date.now() - 1000 * 60 * 60 * i),
}))

export const mockBlogPosts = [
  { id: "blog-1", title: "أهمية التخطيط الجيد للمراجعة النهائية", slug: "importance-of-final-review-planning", excerpt: "نصائح واستراتيجيات لوضع خطة مراجعة فعالة للامتحانات النهائية", content: "نص كامل عن أهمية التخطيط للمراجعة...", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=85", category: "نصائح تعليمية", author: "أحمد محمد", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher", publishedAt: new Date("2025-06-01"), readTime: 8, tags: ["مراجعة", "امتحانات", "تخطيط"] },
  { id: "blog-2", title: "كيف تتعلم قواعد النحو بسهولة", slug: "learn-grammar-easily", excerpt: "طرق مبتكرة لفهم قواعد النحو العربي وتطبيقها", content: "نص كامل عن طرق تعلم النحو...", image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&q=85", category: "قواعد اللغة", author: "أحمد محمد", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher", publishedAt: new Date("2025-05-25"), readTime: 10, tags: ["نحو", "قواعد", "تعلم"] },
  { id: "blog-3", title: "دور التكنولوجيا في تطوير التعليم", slug: "technology-in-education", excerpt: "كيف تساهم التكنولوجيا في تحسين العملية التعليمية", content: "نص كامل عن التكنولوجيا في التعليم...", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=85", category: "تكنولوجيا تعليم", author: "أحمد محمد", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher", publishedAt: new Date("2025-05-20"), readTime: 7, tags: ["تكنولوجيا", "تعليم", "تطوير"] },
  { id: "blog-4", title: "أسرار البلاغة العربية للمبتدئين", slug: "arabic-rhetoric-secrets", excerpt: "مدخل مبسط لعلم البلاغة العربية وفروعه", content: "نص كامل عن البلاغة العربية...", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&q=85", category: "بلاغة", author: "أحمد محمد", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher", publishedAt: new Date("2025-05-15"), readTime: 12, tags: ["بلاغة", "أدب", "عربي"] },
  { id: "blog-5", title: "نصائح للتعامل مع قلق الامتحانات", slug: "exam-anxiety-tips", excerpt: "استراتيجيات فعالة للتغلب على التوتر والقلق قبل الامتحانات", content: "نص كامل عن قلق الامتحانات...", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=85", category: "صحة نفسية", author: "أحمد محمد", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher", publishedAt: new Date("2025-05-10"), readTime: 6, tags: ["صحة", "امتحانات", "نصائح"] },
  { id: "blog-6", title: "أفضل طرق المذاكرة الفعالة", slug: "best-study-methods", excerpt: "طرق علمية للمذاكرة تحقق أفضل النتائج في أقل وقت", content: "نص كامل عن طرق المذاكرة...", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=85", category: "نصائح تعليمية", author: "أحمد محمد", authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher", publishedAt: new Date("2025-05-05"), readTime: 9, tags: ["مذاكرة", "تعليم", "إنتاجية"] },
]

export const mockFaq = [
  { id: "faq-1", question: "ما هي منصة TeacherOS؟", answer: "TeacherOS هو نظام تشغيل متكامل لإدارة الكورسات التعليمية والطلاب والامتحانات والاشتراكات. يهدف إلى توفير بيئة تعليمية متكاملة للمدرسين والطلاب وأولياء الأمور.", category: "عام" },
  { id: "faq-2", question: "كيف يمكنني الاشتراك في المنصة؟", answer: "يمكنك الاشتراك من خلال اختيار الباقة المناسبة من صفحة الأسعار، ثم إنشاء حساب جديد واختيار طريقة الدفع المناسبة.", category: "اشتراكات" },
  { id: "faq-3", question: "هل يمكنني تجربة المنصة قبل الاشتراك؟", answer: "نعم، يمكنك تجربة المنصة مجاناً لمدة 7 أيام مع وصول محدود لبعض الكورسات. وكذلك يمكنك استخدام صفحة بيانات التجربة للدخول بحسابات تجريبية.", category: "عام" },
  { id: "faq-4", question: "ما هي طرق الدفع المتاحة؟", answer: "ندعم الدفع نقداً (فروع الشركة)، فوري (Fawry)، وأكواد الشحن (Codes).", category: "اشتراكات" },
  { id: "faq-5", question: "هل يمكنني إلغاء الاشتراك؟", answer: "نعم، يمكنك إلغاء الاشتراك في أي وقت. في حالة الإلغاء، يظل الاشتراك سارياً حتى نهاية الفترة المدفوعة.", category: "اشتراكات" },
  { id: "faq-6", question: "كيف يمكن للمدرس إضافة كورس جديد؟", answer: "من لوحة تحكم المدرس، يمكنك الذهاب إلى إدارة الكورسات ثم النقر على إضافة كورس جديد. ستظهر لك نموذج إدخال بيانات الكورس.", category: "للمدرسين" },
  { id: "faq-7", question: "هل يوجد تطبيق جوال للمنصة؟", answer: "قريباً سيتم إطلاق تطبيق جوال للمنصة على متجري App Store و Google Play.", category: "عام" },
  { id: "faq-8", question: "كيف يمكن متابعة تقدم الطالب؟", answer: "يمكن للمدرس متابعة تقدم كل طالب من خلال لوحة التحكم، حيث تتوفر تقارير مفصلة عن أداء الطالب في الامتحانات والواجبات.", category: "للمدرسين" },
  { id: "faq-9", question: "هل يتم إصدار شهادات للطلاب؟", answer: "نعم، يتم إصدار شهادات إتمام للطلاب بعد اجتياز كل كورس بنجاح، مع إمكانية التحقق من صحة الشهادة عبر QR Code.", category: "شهادات" },
]

export const mockTeamMembers = [
  { id: "tm-1", name: "أحمد محمد", role: "المؤسس والمدرس", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1", bio: "مدرس لغة عربية بخبرة 15 عاماً" },
  { id: "tm-2", name: "سارة أحمد", role: "مديرة التطوير", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher2", bio: "متخصصة في تطوير المناهج التعليمية" },
  { id: "tm-3", name: "محمد علي", role: "مطور تقني", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher3", bio: "مهندس برمجيات بخبرة 10 سنوات" },
  { id: "tm-4", name: "نورا حسن", role: "دعم العملاء", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher4", bio: "متخصصة في خدمة العملاء والدعم الفني" },
]

export const mockTestimonials = [
  { id: "test-1", name: "والد أحمد", role: "ولي أمر", text: "منصة رائعة! ساعدت ابني على تحسين مستواه في اللغة العربية بشكل ملحوظ. المدرس أحمد شرحه ممتاز.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=parent1", rating: 5 },
  { id: "test-2", name: "يوسف عمرو", role: "طالب", text: "أفضل منصة تعليمية جربتها. الدروس منظمة والامتحانات التفاعلية بتساعدني على التقييم المستمر.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student48", rating: 5 },
  { id: "test-3", name: "والدة مريم", role: "ولي أمر", text: "بفضل TeacherOS ابنتي حصلت على أعلى الدرجات في اللغة العربية. أنصح كل الأمهات بالتسجيل.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=parent2", rating: 5 },
  { id: "test-4", name: "خالد سعيد", role: "مدرس", text: "النظام سهل الاستخدام جداً. إضافة الدروس ومتابعة الطلاب أصبحت أسهل بكثير.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=teacher_alt", rating: 4 },
]

export const mockAnalytics = {
  monthlyRevenue: Array.from({ length: 12 }, (_, i) => ({ month: ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"][i], revenue: Math.floor(det() * 50000) + 80000, students: Math.floor(det() * 40) + 80 })),
  weeklyActivity: Array.from({ length: 7 }, (_, i) => ({ day: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"][i], videos: Math.floor(det() * 15) + 5, exams: Math.floor(det() * 5) + 1, homework: Math.floor(det() * 8) + 3 })),
  coursePerformance: mockCourses.map(c => ({ courseId: c.id, courseName: c.title, completionRate: Math.floor(det() * 30) + 65, avgGrade: Math.floor(det() * 20) + 70, studentSatisfaction: Math.floor(det() * 15) + 80 })),
  studentGrowth: Array.from({ length: 12 }, (_, i) => ({ month: ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"][i], total: 500 + (i * 65) + Math.floor(det() * 50), newStudents: Math.floor(det() * 30) + 20 + (i * 3) })),
  examPerformance: Array.from({ length: 10 }, (_, i) => ({ examName: `امتحان ${i + 1}`, passRate: Math.floor(det() * 20) + 70, avgScore: Math.floor(det() * 15) + 70, participationRate: Math.floor(det() * 20) + 75 })),
}

export const mockGamification = {
  levels: Array.from({ length: 10 }, (_, i) => ({ level: i + 1, name: ["مبتدئ", "مستكشف", "مجتهد", "نشيط", "متميز", "خبير", "متقن", "بارع", "مبدع", "أسطورة"][i], xpRequired: (i + 1) * 500, badge: `🏆` })),
  badges: [
    { id: "badge-1", name: "الانضباط", description: "حضور 30 يوماً متتالياً", icon: "🔥", xpReward: 100 },
    { id: "badge-2", name: "المثابر", description: "إكمال 10 واجبات", icon: "💪", xpReward: 200 },
    { id: "badge-3", name: "النجاح", description: "الحصول على 100% في امتحان", icon: "🎯", xpReward: 300 },
    { id: "badge-4", name: "المتفوق", description: "الحصول على معدل 95% فأكثر", icon: "⭐", xpReward: 500 },
    { id: "badge-5", name: "المنافس", description: "الفوز في التحدي الأسبوعي", icon: "🏅", xpReward: 200 },
    { id: "badge-6", name: "المساعد", description: "مساعدة 5 زملاء في المنتدى", icon: "🤝", xpReward: 150 },
  ],
  leaderboard: Array.from({ length: 20 }, (_, i) => ({ rank: i + 1, studentName: `طالب ${i + 1}`, xp: 5000 - (i * 180), level: 15 - Math.floor(i / 2), badges: Math.floor(det() * 6) + 1, streak: Math.floor(det() * 30) + 1 })),
}

export const mockParentChildren = [
  { id: "s-1", name: "أحمد طالب 1", grade: "ثالثة ثانوي", school: "مدرسة النصر الثانوية", governorate: "القاهرة", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student1", status: "active", subscription: { status: "active", planName: "الباقة السنوية" }, xp: 3200, level: 8, streak: 15 },
  { id: "s-2", name: "مريم طالب 2", grade: "ثانية ثانوي", school: "مدرسة النصر الثانوية", governorate: "القاهرة", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=student2", status: "active", subscription: { status: "active", planName: "الباقة الثلاثية" }, xp: 2800, level: 7, streak: 12 },
]

export const mockStaffMembers = [
  { id: "stf-1", name: "محمد علي", email: "mohamed@teacher-os.com", phone: "+20 100 000 0001", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=staff1", role: "staff", jobTitle: "مسؤول تقنية المعلومات", permissions: ["manage_system", "manage_users", "view_reports"], status: "active", createdAt: new Date("2024-01-01") },
  { id: "stf-2", name: "نورا حسن", email: "noura@teacher-os.com", phone: "+20 100 000 0002", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=staff2", role: "staff", jobTitle: "مسؤولة دعم العملاء", permissions: ["manage_students", "manage_parents", "view_payments"], status: "active", createdAt: new Date("2024-02-01") },
  { id: "stf-3", name: "أحمد سامي", email: "ahmeds@teacher-os.com", phone: "+20 100 000 0003", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=staff3", role: "staff", jobTitle: "محاسب", permissions: ["manage_payments", "manage_subscriptions", "view_reports"], status: "active", createdAt: new Date("2024-03-01") },
]

export const mockPermissions = [
  { id: "perm-1", key: "manage_system", label: "إدارة النظام", group: "النظام", description: "التحكم في إعدادات النظام العامة" },
  { id: "perm-2", key: "manage_users", label: "إدارة المستخدمين", group: "المستخدمون", description: "إضافة وتعديل وحذف المستخدمين" },
  { id: "perm-3", key: "manage_students", label: "إدارة الطلاب", group: "الطلاب", description: "التحكم في بيانات الطلاب" },
  { id: "perm-4", key: "manage_teachers", label: "إدارة المدرسين", group: "المدرسون", description: "التحكم في بيانات المدرسين" },
  { id: "perm-5", key: "manage_courses", label: "إدارة الكورسات", group: "الكورسات", description: "إضافة وتعديل الكورسات" },
  { id: "perm-6", key: "manage_exams", label: "إدارة الامتحانات", group: "الامتحانات", description: "التحكم في الامتحانات والأسئلة" },
  { id: "perm-7", key: "manage_payments", label: "إدارة المدفوعات", group: "المالية", description: "التحكم في المعاملات المالية" },
  { id: "perm-8", key: "manage_subscriptions", label: "إدارة الاشتراكات", group: "الاشتراكات", description: "التحكم في خطط واشتراكات الطلاب" },
  { id: "perm-9", key: "manage_codes", label: "إدارة الأكواد", group: "الأكواد", description: "إدارة أكواد الشحن والتفعيل" },
  { id: "perm-10", key: "manage_certificates", label: "إدارة الشهادات", group: "الشهادات", description: "إصدار وإدارة الشهادات" },
  { id: "perm-11", key: "manage_content", label: "إدارة المحتوى", group: "المحتوى", description: "إدارة المحتوى التعليمي" },
  { id: "perm-12", key: "manage_cms", label: "إدارة CMS", group: "المحتوى", description: "التحكم في نظام إدارة المحتوى" },
  { id: "perm-13", key: "view_reports", label: "عرض التقارير", group: "التقارير", description: "الاطلاع على جميع التقارير" },
  { id: "perm-14", key: "view_analytics", label: "عرض التحليلات", group: "التقارير", description: "الاطلاع على تحليلات الأداء" },
]

export const mockCmsContent = {
  homeHero: { title: "نظام تشغيل المدرس الأول في الوطن العربي", subtitle: "منصة متكاملة لإدارة الكورسات والطلاب والامتحانات والاشتراكات", cta: "ابدأ الآن مجاناً", backgroundImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1440&q=85" },
  aboutVision: "نحن في TeacherOS نؤمن بأن التعليم الجيد هو أساس تقدم المجتمعات. نسعى لتوفير أدوات تعليمية متطورة تمكن المدرسين من تقديم أفضل محتوى تعليمي للطلاب.",
  aboutMission: "تقديم منصة تعليمية متكاملة تجمع بين أحدث التقنيات وأساليب التدريس التقليدية لتوفير تجربة تعليمية فريدة.",
  aboutValues: [
    { title: "الجودة", description: "نسعى دائماً لتقديم أفضل محتوى تعليمي بأعلى معايير الجودة" },
    { title: "الابتكار", description: "نستخدم أحدث التقنيات لتطوير تجربة تعليمية مبتكرة" },
    { title: "المصداقية", description: "نلتزم بالشفافية والمصداقية في جميع تعاملاتنا" },
    { title: "التميز", description: "نطمح للتميز في كل ما نقدمه من خدمات ومنتجات" },
  ],
  contactInfo: { address: "القاهرة الجديدة، التجمع الخامس، مصر", phone: "+20 100 000 0000", email: "info@teacher-os.com", workingHours: "السبت - الخميس: 9 ص - 9 م" },
  socialLinks: { facebook: "#", twitter: "#", youtube: "#", whatsapp: "#", telegram: "#" },
}

export function getStudentPerformance(studentId: string) {
  const idx = parseInt(studentId.replace("s-", "")) || 0
  return {
    overallGrade: Math.floor(det() * 20) + 75,
    attendance: Math.floor(det() * 15) + 85,
    examsAvg: Math.floor(det() * 20) + 70,
    homeworkAvg: Math.floor(det() * 15) + 80,
    completedLessons: Math.floor(det() * 40) + 60,
    totalLessons: 100,
    strengths: ["النحو", "الإملاء", "القراءة"],
    weaknesses: ["البلاغة", "التعبير"],
    recentExams: Array.from({ length: 5 }, (_, i) => ({ name: `امتحان ${i + 1}`, grade: Math.floor(det() * 30) + 65, date: new Date(2025, 5 + i, 15) })),
    weeklyProgress: Array.from({ length: 7 }, (_, i) => ({ day: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"][i], hours: Math.floor(det() * 3) + 1 })),
  }
}

export const mockAchievements = [
  { id: "ach-1", name: "البداية القوية", description: "أول 10 دروس مكتملة", icon: "🚀", xpReward: 100, criteria: { type: "lessons_completed", count: 10 }, unlockedBy: [] },
  { id: "ach-2", name: "المثابر", description: "30 يوم متابعة متواصلة", icon: "🔥", xpReward: 300, criteria: { type: "streak", count: 30 }, unlockedBy: [] },
  { id: "ach-3", name: "الامتياز", description: "الحصول على 100% في 3 امتحانات", icon: "💯", xpReward: 500, criteria: { type: "perfect_exams", count: 3 }, unlockedBy: [] },
  { id: "ach-4", name: "النجم المتألق", description: "التواجد في قائمة الأوائل", icon: "⭐", xpReward: 200, criteria: { type: "leaderboard_top", count: 1 }, unlockedBy: [] },
  { id: "ach-5", name: "جامع المعرفة", description: "إكمال 5 كورسات", icon: "📚", xpReward: 1000, criteria: { type: "courses_completed", count: 5 }, unlockedBy: [] },
  { id: "ach-6", name: "المتصدر", description: "المركز الأول في Leaderboard", icon: "👑", xpReward: 2000, criteria: { type: "rank_one", count: 1 }, unlockedBy: [] },
  { id: "ach-7", name: "المشارك", description: "المشاركة في 10 مناقشات", icon: "💬", xpReward: 150, criteria: { type: "discussions", count: 10 }, unlockedBy: [] },
  { id: "ach-8", name: "الاسطورة", description: "الوصول للمستوى 20", icon: "🏆", xpReward: 5000, criteria: { type: "level", count: 20 }, unlockedBy: [] },
]

export const mockStudentXpData = Array.from({ length: 50 }, (_, i) => ({
  studentId: `s-${i + 1}`,
  studentName: `طالب ${i + 1}`,
  totalXp: Math.floor(det() * 8000) + 500,
  level: Math.floor(det() * 18) + 1,
  streak: Math.floor(det() * 40) + 1,
  badges: Math.floor(det() * 8) + 1,
  achievements: Math.floor(det() * 5),
  rank: 0,
  weeklyXp: Math.floor(det() * 500) + 100,
  monthlyXp: Math.floor(det() * 2000) + 500,
  lastActive: new Date(Date.now() - det() * 86400000 * 3),
})).sort((a, b) => b.totalXp - a.totalXp).map((s, i) => ({ ...s, rank: i + 1 }))

export const mockGamificationConfig = {
  xpPerLesson: 50,
  xpPerExam: 100,
  xpPerHomework: 30,
  xpStreakBonus: 20,
  levels: Array.from({ length: 25 }, (_, i) => ({
    level: i + 1,
    name: ["مبتدئ", "مستكشف", "مجتهد", "نشيط", "متميز", "خبير", "متقن", "بارع", "مبدع", "أسطورة",
            "أسطورة فضية", "أسطورة ذهبية", "الماسة", "الياقوتة", "الزمردة", "السافاير", "التاج", "العرش", "الملك", "الإمبراطور",
            "العظيم", "الجبار", "المهيب", "الأعظم", "الخرافي"][i],
    xpRequired: (i + 1) * 200 * (i + 1),
  })),
  badgeCategories: [
    { id: "cat-1", name: "أكاديمي", icon: "📖", badges: ["المتفوق", "المجتهد", "النجم", "العبقري"] },
    { id: "cat-2", name: "حضور", icon: "📅", badges: ["المواظب", "المثابر", "المنضبط", "الملتزم"] },
    { id: "cat-3", name: "مهارات", icon: "🎯", badges: ["المبدع", "المحلل", "الناقد", "المبتكر"] },
    { id: "cat-4", name: "اجتماعي", icon: "🤝", badges: ["المتعاون", "القائد", "المساعد", "الصديق"] },
    { id: "cat-5", name: "خاص", icon: "👑", badges: ["الأسطورة", "التاج", "الملك", "الإمبراطور"] },
  ],
}

export const mockCmsPages = {
  homepage: {
    sections: [
      { id: "sec-1", type: "hero", title: "نظام تشغيل المدرس الأول", subtitle: "منصة متكاملة للتعليم", cta: "ابدأ الآن", backgroundImage: "", order: 1, active: true },
      { id: "sec-2", type: "features", title: "مميزات المنصة", subtitle: "كل ما تحتاجه في مكان واحد", columns: 3, active: true, order: 2 },
      { id: "sec-3", type: "stats", title: "إحصائيات", active: true, order: 3 },
      { id: "sec-4", type: "courses", title: "الكورسات", active: true, order: 4 },
      { id: "sec-5", type: "testimonials", title: "آراء العملاء", active: true, order: 5 },
      { id: "sec-6", type: "pricing", title: "الباقات", active: true, order: 6 },
      { id: "sec-7", type: "faq", title: "الأسئلة الشائعة", active: true, order: 7 },
      { id: "sec-8", type: "cta", title: "انضم إلينا", active: true, order: 8 },
    ],
  },
  theme: {
    primaryColor: "#6366F1",
    secondaryColor: "#8B5CF6",
    fontFamily: "Cairo",
    borderRadius: "rounded-xl",
    animationStyle: "smooth",
    layoutWidth: "boxed",
    headerStyle: "glass",
    footerStyle: "dark",
  },
  branding: {
    logo: "/logo.png",
    favicon: "/favicon.ico",
    brandName: "TeacherOS",
    brandSlogan: "نظام تشغيل المدرس",
    socialLinks: { facebook: "#", twitter: "#", youtube: "#", whatsapp: "#", telegram: "#" },
    contactEmail: "info@teacher-os.com",
    contactPhone: "+20 100 000 0000",
  },
  seo: {
    title: "TeacherOS — نظام تشغيل المدرس",
    description: "أول نظام تشغيل متكامل لإدارة الكورسات والطلاب والامتحانات والاشتراكات",
    keywords: "تعليم, كورسات أونلاين, منصة تعليمية, مدرس, إدارة طلاب",
    ogImage: "/og-image.png",
    twitterHandle: "@teacher_os",
    googleAnalyticsId: "UA-XXXXXXXXX-X",
    enableSitemap: true,
    enableRobots: true,
  },
}

export const mockSettings = {
  general: {
    centerName: 'أكاديمية النخبة التعليمية',
    centerDescription: 'أكاديمية تعليمية متخصصة في تقديم الكورسات والتدريبات للطلاب في مختلف المراحل الدراسية',
    email: 'info@elite-academy.com',
    phone: '+201234567890',
    address: 'شارع النخيل، مدينة نصر، القاهرة',
    timezone: 'Africa/Cairo',
    defaultLanguage: 'ar',
    trialDays: 7,
    maxStudentsPerCourse: 100,
  },
  notifications: {
    newStudent: true,
    newPayment: true,
    examResults: true,
    attendance: false,
    subscriptionExpiry: true,
    newMessages: true,
    weeklyReport: false,
  },
  payment: {
    fawryEnabled: true,
    creditCardEnabled: false,
    walletEnabled: true,
    currency: 'EGP',
    vatPercent: 14,
    maxDiscountPercent: 50,
    renewalPeriod: 'monthly',
    bankAccount: {
      bankName: 'البنك الأهلي المصري',
      accountNumber: '1234567890123456',
      iban: 'EG123456789012345678901234',
    },
  },
  security: {
    twoFactorEnabled: false,
    sessionTimeout: 2,
    loginHistory: [
      { date: '2026-07-19', time: '10:30', ip: '192.168.1.100', device: 'Windows Desktop', browser: 'Chrome 126', location: 'القاهرة، مصر', status: 'success' },
      { date: '2026-07-18', time: '22:15', ip: '192.168.1.100', device: 'Windows Desktop', browser: 'Chrome 126', location: 'القاهرة، مصر', status: 'success' },
      { date: '2026-07-17', time: '08:45', ip: '10.0.0.5', device: 'iPhone 15', browser: 'Safari 18', location: 'القاهرة، مصر', status: 'success' },
      { date: '2026-07-16', time: '14:20', ip: '203.0.113.50', device: 'Unknown', browser: 'Unknown', location: 'بكين، الصين', status: 'failed' },
      { date: '2026-07-15', time: '19:00', ip: '192.168.1.100', device: 'MacBook Pro', browser: 'Firefox 128', location: 'القاهرة، مصر', status: 'success' },
    ],
    activeSessions: [
      { device: 'Windows Desktop', browser: 'Chrome 126', ip: '192.168.1.100', lastActive: 'منذ دقيقتين', isCurrent: true },
      { device: 'iPhone 15', browser: 'Safari 18', ip: '10.0.0.5', lastActive: 'منذ 3 ساعات', isCurrent: false },
    ],
  },
  social: {
    facebook: 'https://facebook.com/eliteacademy',
    twitter: 'https://twitter.com/eliteacademy',
    youtube: 'https://youtube.com/@eliteacademy',
    tiktok: 'https://tiktok.com/@eliteacademy',
    whatsapp: 'https://wa.me/201234567890',
    telegram: 'https://t.me/eliteacademy',
    linkedin: 'https://linkedin.com/company/eliteacademy',
    instagram: 'https://instagram.com/eliteacademy',
  },
}

export const mockCourseCategories = [
  { id: '1', name: 'الرياضيات', description: 'كورسات الرياضيات لجميع المراحل', icon: '📐', color: '#6366F1', courseCount: 5 },
  { id: '2', name: 'العلوم', description: 'كورسات العلوم والفيزياء والكيمياء', icon: '🔬', color: '#10B981', courseCount: 4 },
  { id: '3', name: 'اللغات', description: 'كورسات اللغات المختلفة', icon: '🌍', color: '#F59E0B', courseCount: 3 },
  { id: '4', name: 'التاريخ', description: 'كورسات التاريخ والجغرافيا', icon: '📜', color: '#EF4444', courseCount: 2 },
  { id: '5', name: 'البرمجة', description: 'كورسات البرمجة وتكنولوجيا المعلومات', icon: '💻', color: '#8B5CF6', courseCount: 6 },
  { id: '6', name: 'الفنون', description: 'كورسات الفنون والإبداع', icon: '🎨', color: '#EC4899', courseCount: 1 },
]

export const mockComingSoonLessons = [
  { lessonId: 'ls-1', name: 'تطبيقات التفاضل', courseId: 'c1', status: 'coming-soon', availableDate: '2026-08-01' },
  { lessonId: 'ls-2', name: 'قوانين نيوتن المتقدمة', courseId: 'c2', status: 'locked', prerequisite: 'قوانين نيوتن الأساسية' },
  { lessonId: 'ls-3', name: 'التفاعلات العضوية', courseId: 'c3', status: 'coming-soon', availableDate: '2026-07-25' },
]

export const mockAnalyticsDetailed = {
  overview: {
    totalStudents: 1250,
    totalRevenue: 587500,
    totalCourses: 24,
    totalExams: 156,
    completionRate: 73,
    averageRating: 4.6,
    revenueGrowth: 12.5,
    studentGrowth: 8.3,
  },
  courseAnalytics: [
    { id: '1', name: 'الرياضيات المتكاملة', enrolled: 245, revenue: 122500, rating: 4.8, completionRate: 78, lessons: 48, status: 'active' },
    { id: '2', name: 'الفيزياء الحديثة', enrolled: 189, revenue: 94500, rating: 4.6, completionRate: 72, lessons: 36, status: 'active' },
    { id: '3', name: 'الكيمياء العضوية', enrolled: 167, revenue: 83500, rating: 4.5, completionRate: 68, lessons: 42, status: 'active' },
    { id: '4', name: 'الأحياء الدقيقة', enrolled: 134, revenue: 67000, rating: 4.7, completionRate: 75, lessons: 30, status: 'active' },
    { id: '5', name: 'اللغة العربية', enrolled: 198, revenue: 99000, rating: 4.4, completionRate: 65, lessons: 54, status: 'active' },
    { id: '6', name: 'اللغة الإنجليزية', enrolled: 212, revenue: 106000, rating: 4.3, completionRate: 62, lessons: 50, status: 'active' },
    { id: '7', name: 'التاريخ الحديث', enrolled: 98, revenue: 49000, rating: 4.2, completionRate: 55, lessons: 28, status: 'draft' },
    { id: '8', name: 'الجغرافيا السياسية', enrolled: 87, revenue: 43500, rating: 4.1, completionRate: 52, lessons: 24, status: 'draft' },
  ],
  videoAnalytics: [
    { id: '1', name: 'مقدمة في التفاضل', course: 'الرياضيات المتكاملة', views: 3420, avgWatchTime: '18:25', completionRate: 85, likes: 234, comments: 45, uploadDate: '2026-01-15' },
    { id: '2', name: 'قوانين نيوتن', course: 'الفيزياء الحديثة', views: 2890, avgWatchTime: '22:10', completionRate: 82, likes: 198, comments: 38, uploadDate: '2026-02-03' },
    { id: '3', name: 'الروابط الكيميائية', course: 'الكيمياء العضوية', views: 2650, avgWatchTime: '15:45', completionRate: 78, likes: 176, comments: 29, uploadDate: '2026-01-28' },
    { id: '4', name: 'الخلية النباتية', course: 'الأحياء الدقيقة', views: 2340, avgWatchTime: '20:30', completionRate: 88, likes: 156, comments: 34, uploadDate: '2026-03-12' },
    { id: '5', name: 'النحو والصرف', course: 'اللغة العربية', views: 2100, avgWatchTime: '25:00', completionRate: 72, likes: 145, comments: 52, uploadDate: '2026-02-20' },
    { id: '6', name: 'المعادلات التفاضلية', course: 'الرياضيات المتكاملة', views: 1950, avgWatchTime: '16:30', completionRate: 70, likes: 123, comments: 28, uploadDate: '2026-03-05' },
    { id: '7', name: 'الكهرباء الساكنة', course: 'الفيزياء الحديثة', views: 1820, avgWatchTime: '19:15', completionRate: 74, likes: 112, comments: 22, uploadDate: '2026-03-18' },
    { id: '8', name: 'التفاعلات الكيميائية', course: 'الكيمياء العضوية', views: 1650, avgWatchTime: '14:50', completionRate: 71, likes: 98, comments: 19, uploadDate: '2026-04-01' },
    { id: '9', name: 'الانقسام الخلوي', course: 'الأحياء الدقيقة', views: 1480, avgWatchTime: '21:00', completionRate: 80, likes: 87, comments: 15, uploadDate: '2026-04-10' },
    { id: '10', name: 'الأدب والنقد', course: 'اللغة العربية', views: 1340, avgWatchTime: '23:45', completionRate: 66, likes: 76, comments: 31, uploadDate: '2026-04-22' },
  ],
  examAnalytics: [
    { id: '1', name: 'امتحان التفاضل النهائي', course: 'الرياضيات المتكاملة', students: 215, avgGrade: 78, highestGrade: 100, lowestGrade: 32, passRate: 82, attempts: 215 },
    { id: '2', name: 'اختبار الفيزياء الشهري', course: 'الفيزياء الحديثة', students: 178, avgGrade: 72, highestGrade: 98, lowestGrade: 28, passRate: 76, attempts: 185 },
    { id: '3', name: 'امتحان الكيمياء النهائي', course: 'الكيمياء العضوية', students: 156, avgGrade: 75, highestGrade: 97, lowestGrade: 25, passRate: 79, attempts: 160 },
    { id: '4', name: 'اختبار الأحياء الشهري', course: 'الأحياء الدقيقة', students: 125, avgGrade: 81, highestGrade: 100, lowestGrade: 35, passRate: 86, attempts: 130 },
    { id: '5', name: 'امتحان اللغة العربية', course: 'اللغة العربية', students: 185, avgGrade: 70, highestGrade: 96, lowestGrade: 20, passRate: 73, attempts: 192 },
  ],
  financialReports: [
    { month: 'يناير', revenue: 95000, expenses: 32000, netProfit: 63000, growth: 8.2 },
    { month: 'فبراير', revenue: 102000, expenses: 35000, netProfit: 67000, growth: 6.3 },
    { month: 'مارس', revenue: 88000, expenses: 30000, netProfit: 58000, growth: -13.4 },
    { month: 'أبريل', revenue: 115000, expenses: 38000, netProfit: 77000, growth: 32.8 },
    { month: 'مايو', revenue: 98000, expenses: 33000, netProfit: 65000, growth: -15.6 },
    { month: 'يونيو', revenue: 120000, expenses: 40000, netProfit: 80000, growth: 23.1 },
    { month: 'يوليو', revenue: 105000, expenses: 36000, netProfit: 69000, growth: -13.8 },
    { month: 'أغسطس', revenue: 112000, expenses: 37000, netProfit: 75000, growth: 6.7 },
  ],
  revenueBreakdown: [
    { name: 'اشتراكات شهرية', value: 320000 },
    { name: 'اشتراكات سنوية', value: 185000 },
    { name: 'مدفوعات فردية', value: 75000 },
    { name: 'أخرى', value: 7500 },
  ],
  monthlyRevenue: [
    { month: 'يناير', الإيرادات: 95000, المصروفات: 32000 },
    { month: 'فبراير', الإيرادات: 102000, المصروفات: 35000 },
    { month: 'مارس', الإيرادات: 88000, المصروفات: 30000 },
    { month: 'أبريل', الإيرادات: 115000, المصروفات: 38000 },
    { month: 'مايو', الإيرادات: 98000, المصروفات: 33000 },
    { month: 'يونيو', الإيرادات: 120000, المصروفات: 40000 },
    { month: 'يوليو', الإيرادات: 105000, المصروفات: 36000 },
    { month: 'أغسطس', الإيرادات: 112000, المصروفات: 37000 },
  ],
}

export const mockBackupHistory = [
  { id: "bck-1", fileName: "backup-2025-07-01.zip", size: "256 MB", createdAt: new Date("2025-07-01"), type: "full", status: "completed" },
  { id: "bck-2", fileName: "backup-2025-06-15.zip", size: "248 MB", createdAt: new Date("2025-06-15"), type: "full", status: "completed" },
  { id: "bck-3", fileName: "backup-2025-06-01.zip", size: "240 MB", createdAt: new Date("2025-06-01"), type: "incremental", status: "completed" },
]

export const mockSessions = [
  { id: '1', user: 'أحمد محمد', role: 'مدرس', device: 'Windows Desktop', browser: 'Chrome 126', ip: '192.168.1.100', lastActive: 'منذ دقيقة واحدة', loginDate: '2026-07-19 08:30', status: 'active' },
  { id: '2', user: 'أحمد محمد', role: 'مدرس', device: 'iPhone 15', browser: 'Safari 18', ip: '10.0.0.5', lastActive: 'منذ 3 ساعات', loginDate: '2026-07-19 10:00', status: 'active' },
  { id: '3', user: 'سارة أحمد', role: 'موظف', device: 'MacBook Pro', browser: 'Firefox 128', ip: '192.168.1.102', lastActive: 'منذ 30 دقيقة', loginDate: '2026-07-19 09:15', status: 'active' },
  { id: '4', user: 'خالد عمر', role: 'مدرس', device: 'Windows Laptop', browser: 'Edge 125', ip: '192.168.1.103', lastActive: 'منذ 2 ساعات', loginDate: '2026-07-18 14:00', status: 'active' },
  { id: '5', user: 'فاطمة علي', role: 'موظف', device: 'Android Tablet', browser: 'Chrome 126', ip: '10.0.0.10', lastActive: 'منذ 5 ساعات', loginDate: '2026-07-18 08:00', status: 'expired' },
  { id: '6', user: 'محمد حسن', role: 'مدرس', device: 'Windows Desktop', browser: 'Chrome 125', ip: '192.168.1.105', lastActive: 'أمس', loginDate: '2026-07-17 11:00', status: 'expired' },
  { id: '7', user: 'نورا سامي', role: 'موظف', device: 'MacBook Air', browser: 'Safari 17', ip: '192.168.1.106', lastActive: 'منذ 4 ساعات', loginDate: '2026-07-18 16:30', status: 'active' },
  { id: '8', user: 'عمر خالد', role: 'مدرس', device: 'iPhone 14', browser: 'Safari 17', ip: '10.0.0.15', lastActive: 'منذ 6 ساعات', loginDate: '2026-07-18 07:45', status: 'expired' },
]

export const mockSessionStats = {
  totalActive: 5,
  todaySessions: 12,
  averageDuration: '2h 45m',
  topBrowser: 'Chrome 126',
}

export const mockBundles: Bundle[] = [
  { id: "bundle-1", name: "الباقة العربية", description: "جميع كورسات اللغة العربية", courses: ["c-1", "c-2", "c-3"], price: 450, discount: 20, status: "active", createdAt: new Date("2026-01-01") },
  { id: "bundle-2", name: "الباقة الشاملة", description: "جميع الكورسات المتاحة", courses: ["c-1", "c-2", "c-3", "c-4", "c-5", "c-6", "c-7", "c-8"], price: 1200, discount: 35, status: "active", createdAt: new Date("2026-01-01") },
  { id: "bundle-3", name: "باقة النحو والصرف", description: "كورسات النحو والصرف المتقدمة", courses: ["c-1", "c-5"], price: 250, discount: 15, status: "active", createdAt: new Date("2026-02-01") },
  { id: "bundle-4", name: "باقة المراجعة النهائية", description: "جميع كورسات المراجعة للامتحانات", courses: ["c-3", "c-6", "c-8"], price: 350, discount: 10, status: "inactive", createdAt: new Date("2026-03-01") },
]

export const mockEnrollments: CourseEnrollment[] = Array.from({ length: 60 }, (_, i) => {
  const course = mockCourses[i % mockCourses.length]
  const statuses: EnrollmentStatus[] = ["active", "active", "active", "expired", "cancelled", "trial"]
  const accessTypes: AccessType[] = ["single", "bundle", "free", "trial", "vip", "lifetime"]
  return {
    id: `enr-${i + 1}`,
    studentId: `s-${(i % 50) + 1}`,
    studentName: `طالب ${(i % 50) + 1}`,
    courseId: course.id,
    courseName: course.title,
    bundleId: i % 4 === 0 ? "bundle-1" : undefined,
    status: statuses[i % 6],
    accessType: accessTypes[i % 6],
    enrolledAt: new Date(2026, 0, (i % 28) + 1),
    expiresAt: i % 3 === 0 ? new Date(2026, 6 + (i % 3), (i % 28) + 1) : undefined,
    progress: Math.floor(det() * 100),
    grade: det() > 0.3 ? Math.floor(det() * 40) + 60 : undefined,
    completedAt: det() > 0.7 ? new Date(2026, 3 + (i % 3), (i % 28) + 1) : undefined,
    source: (["payment", "code", "free", "admin"] as const)[i % 4],
    sourceId: i % 4 === 1 ? `code-${(i % 10) + 1}` : undefined,
  }
})



export const mockClassGroups = Array.from({ length: 8 }, (_, i) => {
  const course = mockCourses[i % mockCourses.length]
  const capacity = [20, 25, 30][i % 3]
  return {
    id: `grp-${i + 1}`,
    name: `مجموعة ${String.fromCharCode(65 + i)}`,
    courseId: course.id,
    courseName: course.title,
    capacity,
    enrolledCount: Math.floor(det() * capacity * 0.9),
    waitingCount: det() > 0.6 ? Math.floor(det() * 5) + 1 : 0,
    seatNumbers: true,
    classroom: `قاعة ${["الأندلس", "الأزهر", "النور", "الهدى", "الفرقان", "البيان", "الإيمان", "القراءات"][i]}`,
    schedule: [
      { id: `sched-${i + 1}-1`, day: ["saturday", "monday", "wednesday"][i % 3] as ClassSchedule["day"], startTime: "10:00", endTime: "11:30", classroom: `قاعة ${["الأندلس", "الأزهر", "النور", "الهدى"][i % 4]}` },
    ],
    status: (["active", "active", "active", "completed"] as const)[i % 4],
  }
})

export const mockWaitingStudents: WaitingStudent[] = Array.from({ length: 12 }, (_, i) => ({
  id: `wait-${i + 1}`,
  studentId: `s-${(i % 50) + 1}`,
  studentName: `طالب منتظر ${i + 1}`,
  groupId: `grp-${(i % 4) + 1}`,
  groupName: `مجموعة ${String.fromCharCode(65 + (i % 4))}`,
  joinedAt: new Date(2026, 5, (i % 28) + 1),
  priority: i < 3 ? 1 : i < 7 ? 2 : 3,
  notified: i % 3 === 0,
  status: (["waiting", "waiting", "waiting", "offered", "enrolled", "cancelled"] as const)[i % 6],
}))

export const mockFreezeRecords: FreezeRecord[] = Array.from({ length: 8 }, (_, i) => ({
  id: `frz-${i + 1}`,
  studentId: `s-${(i % 50) + 1}`,
  studentName: `طالب ${(i % 50) + 1}`,
  groupId: `grp-${(i % 4) + 1}`,
  enrollmentId: `enr-${(i % 20) + 1}`,
  startDate: new Date(2026, 5, (i % 28) + 1),
  endDate: new Date(2026, 6 + (i % 3), (i % 28) + 1),
  reason: ["سفر", "ظروف عائلية", "انقطاع مؤقت", "مرض"][i % 4],
  status: (["active", "active", "expired", "cancelled"] as const)[i % 4],
}))

export const mockMissedLessons: MissedLesson[] = Array.from({ length: 10 }, (_, i) => ({
  id: `miss-${i + 1}`,
  studentId: `s-${(i % 50) + 1}`,
  studentName: `طالب ${(i % 50) + 1}`,
  lessonId: `ls-${(i % 8) + 1}`,
  lessonTitle: `درس ${(i % 6) + 1}: ${["المقدمة", "الشرح", "التطبيق", "الملخص", "تمارين", "اختبار قصير"][i % 6]}`,
  courseId: mockCourses[i % mockCourses.length].id,
  date: new Date(2026, 5, (i % 20) + 1),
  recovered: i % 4 === 0,
  recoveredAt: i % 4 === 0 ? new Date(2026, 5, (i % 20) + 3) : undefined,
}))

export const mockExamVersions: ExamVersion[] = Array.from({ length: 6 }, (_, i) => ({
  id: `ev-${i + 1}`,
  examId: `exam-${(i % 5) + 1}`,
  label: `النسخة ${String.fromCharCode(65 + i)}`,
  questions: Array.from({ length: 10 }, (_, q) => ({
    id: `evq-${i + 1}-${q + 1}`,
    type: (["multiple-choice", "true-false", "fill-blank", "essay"] as const)[q % 4],
    text: `سؤال النسخة ${String.fromCharCode(65 + i)} رقم ${q + 1}`,
    grade: [2, 3, 5][q % 3],
    suggestedTime: [1, 2, 3][q % 3],
    difficulty: (["easy", "medium", "hard"] as const)[q % 3],
    tags: ["نحو", "صرف", "بلاغة"],
    choices: q % 4 < 2 ? Array.from({ length: 4 }, (_, c) => ({ id: `ech-${c + 1}`, text: `اختيار ${String.fromCharCode(65 + c)}`, isCorrect: c === 0 })) : undefined,
    explanation: "شرح الإجابة الصحيحة",
  })),
  shuffleQuestions: true,
  shuffleChoices: true,
  totalGrade: 100,
}))

export const mockQuestionAnalysis: QuestionAnalysis[] = Array.from({ length: 20 }, (_, i) => ({
  questionId: `qan-${i + 1}`,
  questionText: `سؤال التحليل رقم ${i + 1}`,
  type: (["multiple-choice", "true-false", "fill-blank", "essay"] as const)[i % 4],
  difficulty: (["easy", "medium", "hard"] as const)[i % 3],
  correctCount: Math.floor(det() * 60) + 10,
  incorrectCount: Math.floor(det() * 30) + 5,
  skippedCount: Math.floor(det() * 10),
  correctRate: Math.floor(det() * 40) + 60,
  averageTime: Math.floor(det() * 120) + 30,
  tag: (["نحو", "صرف", "بلاغة", "أدب", "نصوص"] as const)[i % 5],
}))

export const mockInstallments: Installment[] = Array.from({ length: 10 }, (_, i) => {
  const total = [3000, 4500, 6000, 12000][i % 4]
  const paid = det() > 0.5 ? Math.floor(det() * total) : 0
  const numInst = [3, 4, 6][i % 3]
  return {
    id: `inst-${i + 1}`,
    studentId: `s-${(i % 50) + 1}`,
    studentName: `طالب ${(i % 50) + 1}`,
    enrollmentId: `enr-${(i % 20) + 1}`,
    totalAmount: total,
    paidAmount: paid,
    remainingAmount: total - paid,
    numberOfInstallments: numInst,
    installments: Array.from({ length: numInst }, (_, j) => ({
      id: `inst-item-${i + 1}-${j + 1}`,
      amount: total / numInst,
      dueDate: new Date(2026, 5 + j, 1),
      paidDate: j < Math.floor(paid / (total / numInst)) ? new Date(2026, 4 + j, 15) : undefined,
      status: (j < Math.floor(paid / (total / numInst)) ? "paid" : j === Math.floor(paid / (total / numInst)) ? "pending" : "pending") as "paid" | "pending" | "overdue",
      lateFee: j === Math.floor(paid / (total / numInst)) && det() > 0.7 ? 25 : undefined,
    })),
    status: (["active", "active", "completed", "defaulted"] as const)[i % 4],
    startDate: new Date(2026, 4, 1),
    nextDueDate: new Date(2026, 5 + Math.floor(paid / (total / numInst)), 1),
  }
})

export const mockCoupons: Coupon[] = Array.from({ length: 8 }, (_, i) => ({
  id: `cup-${i + 1}`,
  code: `SAVE${[10, 15, 20, 25, 30, 50][i % 6]}${i + 1}`,
  type: (["percentage", "fixed"] as const)[i % 2],
  value: [10, 15, 20, 25, 100, 200, 300, 500][i],
  maxUses: [50, 100, 200][i % 3],
  currentUses: Math.floor(det() * 30),
  minAmount: i % 2 === 0 ? 500 : undefined,
  maxDiscount: i % 2 === 0 ? 2000 : undefined,
  expiresAt: new Date(2026, 11, 31),
  status: (["active", "active", "active", "expired", "disabled"] as const)[i % 5],
}))

export const mockReceipts: Receipt[] = Array.from({ length: 15 }, (_, i) => ({
  id: `rcpt-${i + 1}`,
  receiptNumber: `RCP-${String(i + 1).padStart(5, "0")}`,
  studentId: `s-${(i % 50) + 1}`,
  studentName: `طالب ${(i % 50) + 1}`,
  amount: [300, 765, 2700, 1500][i % 4],
  method: (["cash", "fawry", "code"] as const)[i % 3],
  status: "completed",
  items: [{ description: ["اشتراك شهري", "اشتراك ثلاثي", "اشتراك سنوي", "كورس واحد"][i % 4], amount: [300, 765, 2700, 1500][i % 4] }],
  createdAt: new Date(2026, 4 + (i % 3), (i % 28) + 1),
  printed: i % 3 === 0,
}))

export const mockRefunds: Refund[] = Array.from({ length: 5 }, (_, i) => ({
  id: `ref-${i + 1}`,
  paymentId: `pay-${(i % 20) + 1}`,
  studentId: `s-${(i % 50) + 1}`,
  studentName: `طالب ${(i % 50) + 1}`,
  amount: [300, 765, 1500][i % 3],
  reason: ["إلغاء اشتراك", "خطأ في الدفع", "عدم رضا", "ظروف شخصية", "تغيير خطة"][i],
  status: (["pending", "approved", "processed", "rejected", "processed"] as const)[i],
  requestedAt: new Date(2026, 5, (i % 20) + 1),
  processedAt: i > 0 ? new Date(2026, 5, (i % 20) + 3) : undefined,
}))

export const mockBranches: Branch[] = Array.from({ length: 4 }, (_, i) => ({
  id: `br-${i + 1}`,
  name: ["الفرع الرئيسي - القاهرة", "فرع الإسكندرية", "فرع المنصورة", "فرع أونلاين"][i],
  address: ["القاهرة الجديدة", "سموحة، الإسكندرية", "مدينة المنصورة", "عن بُعد"][i],
  phone: `+20 100 000 0${i + 1}0${i + 1}`,
  email: `branch${i + 1}@teacher-os.com`,
  manager: ["أحمد محمد", "سارة أحمد", "محمد علي", "نورا حسن"][i],
  status: (["active", "active", "active", "inactive"] as const)[i % 4],
  capacity: [500, 300, 200, 9999][i],
  currentCount: [420, 180, 150, 1230][i],
  createdAt: new Date(2024, 0, 1),
}))

export const mockClassrooms: Classroom[] = Array.from({ length: 12 }, (_, i) => ({
  id: `clr-${i + 1}`,
  name: `قاعة ${["الأندلس", "الأزهر", "النور", "الهدى", "الفرقان", "البيان", "الإيمان", "القراءات", "الحكمة", "المعرفة", "النجاح", "التفوق"][i]}`,
  branchId: `br-${(i % 2) + 1}`,
  capacity: [20, 25, 30, 40][i % 4],
  equipment: [["سبورة ذكية", "بروجيكتور"], ["سبورة ذكية"], ["بروجيكتور", "نظام صوت"], ["سبورة عادية", "بروجيكتور", "نظام تسجيل"]][i % 4],
  status: (["available", "occupied", "occupied", "occupied", "maintenance"] as const)[i % 5],
}))

export const mockSeats: Seat[] = Array.from({ length: 60 }, (_, i) => ({
  id: `seat-${i + 1}`,
  classroomId: `clr-${(i % 6) + 1}`,
  number: i + 1,
  status: (["available", "occupied", "occupied", "reserved", "maintenance"] as const)[i % 5],
  assignedTo: i % 5 === 1 ? `s-${(i % 50) + 1}` : i % 5 === 2 ? `s-${((i + 13) % 50) + 1}` : undefined,
  assignedName: i % 5 === 1 ? `طالب ${(i % 50) + 1}` : i % 5 === 2 ? `طالب ${((i + 13) % 50) + 1}` : undefined,
}))

export const mockEmployees: Employee[] = Array.from({ length: 10 }, (_, i) => ({
  id: `emp-${i + 1}`,
  name: ["محمد علي", "نورا حسن", "أحمد سامي", "سارة محمود", "خالد عمر", "فاطمة أحمد", "يوسف إبراهيم", "مريم كامل", "عمر حسن", "ليلى عبدالله"][i],
  email: `emp${i + 1}@teacher-os.com`,
  phone: `+20 100 000 ${String(2000 + i).padStart(4, "0")}`,
  jobTitle: ["مسؤول تقنية", "دعم عملاء", "محاسب", "موارد بشرية", "مدرس", "مدرس", "مساعد إداري", "مسوق", "مشرف", "سكرتير"][i],
  department: ["تقنية", "دعم", "مالية", "إدارة", "تعليم", "تعليم", "إدارة", "تسويق", "إشراف", "إدارة"][i],
  salary: [8000, 5000, 7000, 6000, 10000, 10000, 4500, 5500, 9000, 4000][i],
  hireDate: new Date(2024, (i % 12), (i % 28) + 1),
  status: (["active", "active", "active", "active", "active", "on-leave", "active", "active", "active", "inactive"] as const)[i],
  branchId: `br-${(i % 2) + 1}`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=emp${i}`,
}))

export const mockSalaries: SalaryRecord[] = Array.from({ length: 10 }, (_, i) => {
  const emp = mockEmployees[i]
  const bonus = [0, 200, 500, 0, 1000, 0, 300, 0, 750, 0][i]
  const deduction = [0, 0, 0, 200, 0, 500, 0, 100, 0, 300][i]
  return {
    id: `sal-${i + 1}`,
    employeeId: emp.id,
    employeeName: emp.name,
    baseSalary: emp.salary,
    bonuses: bonus,
    deductions: deduction,
    netSalary: emp.salary + bonus - deduction,
    month: 7,
    year: 2026,
    paidAt: det() > 0.2 ? new Date(2026, 6, 28) : undefined,
    status: (["paid", "paid", "paid", "pending", "paid", "paid", "pending", "paid", "paid", "cancelled"] as const)[i],
  }
})

export const mockInventory: InventoryItem[] = Array.from({ length: 15 }, (_, i) => ({
  id: `inv-${i + 1}`,
  name: ["سبورة بيضاء", "بروجيكتور", "كرسي طالب", "طاولة مدرس", "مروحة", "مكيف", "حاسوب", "طابعة", "كاميرا", "مكبر صوت", "جهاز لوحي", "مايكروفون", "سماعة", "شاشة عرض", "واي فاي راوتر"][i],
  category: ["أثاث", "الكترونيات", "أثاث", "أثاث", "الكترونيات", "الكترونيات", "الكترونيات", "الكترونيات", "الكترونيات", "الكترونيات", "الكترونيات", "الكترونيات", "الكترونيات", "الكترونيات", "الكترونيات"][i],
  quantity: [5, 3, 50, 2, 8, 4, 10, 2, 3, 6, 15, 5, 8, 4, 3][i],
  minQuantity: [2, 2, 30, 1, 4, 2, 5, 1, 2, 3, 10, 3, 5, 2, 2][i],
  unit: ["وحدة", "وحدة", "وحدة", "وحدة", "وحدة", "وحدة", "وحدة", "وحدة", "وحدة", "وحدة", "وحدة", "وحدة", "وحدة", "وحدة", "وحدة"][i],
  price: [500, 3000, 150, 800, 400, 5000, 8000, 2500, 2000, 600, 3000, 350, 200, 4000, 1500][i],
  branchId: `br-${(i % 2) + 1}`,
  status: (["in-stock", "in-stock", "in-stock", "low-stock", "in-stock", "in-stock", "low-stock", "in-stock", "in-stock", "in-stock", "out-of-stock", "in-stock", "in-stock", "in-stock", "low-stock"] as const)[i],
}))

export const mockExpenses: Expense[] = Array.from({ length: 12 }, (_, i) => ({
  id: `exp-${i + 1}`,
  category: ["إيجار", "كهرباء", "مياه", "إنترنت", "صيانة", "تنظيف", "قرطاسية", "إعلانات", "مواصلات", "رواتب", "تأمين", "أخرى"][i],
  description: ["دفع إيجار المقر الشهري", "فاتورة كهرباء يوليو", "فاتورة مياه", "اشتراك إنترنت", "صيانة مكيفات", "خدمات نظافة", "شراء قرطاسية", "إعلان فيسبوك", "مواصلات موظفين", "مرتبات الشهر", "تأمين صحي", "مصاريف متنوعة"][i],
  amount: [15000, 2500, 800, 1200, 3500, 1000, 500, 3000, 1500, 45000, 2000, 1000][i],
  date: new Date(2026, 6, (i % 28) + 1),
  branchId: `br-${(i % 2) + 1}`,
  paidBy: ["أحمد محمد", "نورا حسن", "أحمد محمد", "محمد علي", "نورا حسن", "أحمد محمد", "نورا حسن", "محمد علي", "أحمد محمد", "أحمد محمد", "نورا حسن", "محمد علي"][i],
  receipt: det() > 0.5 ? `receipt-${i + 1}.pdf` : undefined,
  status: (["approved", "approved", "pending", "approved", "approved", "approved", "pending", "approved", "rejected", "approved", "pending", "approved"] as const)[i],
}))

export const mockVideoSessions: VideoSession[] = Array.from({ length: 20 }, (_, i) => ({
  id: `vs-${i + 1}`,
  videoId: `vidlib-${(i % 30) + 1}`,
  studentId: `s-${(i % 50) + 1}`,
  deviceId: `dev-${(i % 5) + 1}`,
  deviceName: (["Windows Desktop", "iPhone 15", "Android Tablet", "MacBook Pro", "iPad Air"] as const)[i % 5],
  deviceType: (["desktop", "mobile", "tablet", "laptop", "tablet"] as const)[i % 5],
  ip: `192.168.${Math.floor(i / 10) + 1}.${(i % 255) + 1}`,
  startedAt: new Date(Date.now() - 86400000 * (i % 3) - 3600000 * (i % 8)),
  lastActiveAt: new Date(Date.now() - 3600000 * (i % 4)),
  active: i % 4 !== 0,
}))

export const mockDevices: DeviceInfo[] = Array.from({ length: 8 }, (_, i) => ({
  id: `dev-${i + 1}`,
  studentId: `s-${(i % 50) + 1}`,
  name: (["جهاز منزلي", "لابتوب شخصي", "الآيباد", "الجوال", "جهاز العمل", "التابلت", "اللابتوب الثاني", "الساعة الذكية"] as const)[i],
  type: (["desktop", "laptop", "tablet", "mobile", "laptop", "tablet", "laptop", "watch"] as const)[i],
  os: (["Windows 11", "macOS 14", "iOS 18", "Android 14", "Windows 10", "iPadOS 18", "macOS 13", "WatchOS 11"] as const)[i],
  browser: (["Chrome 126", "Safari 18", "Chrome 126", "Chrome Android", "Firefox 128", "Safari 18", "Safari 17", "WatchOS"] as const)[i],
  lastUsed: new Date(Date.now() - 86400000 * (i % 5)),
  trusted: i % 3 !== 0,
}))

export const mockWatchProgress: WatchProgress[] = Array.from({ length: 50 }, (_, i) => ({
  videoId: `vidlib-${(i % 30) + 1}`,
  studentId: `s-${(i % 50) + 1}`,
  progress: Math.floor(det() * 100),
  lastPosition: Math.floor(det() * 3000),
  completed: det() > 0.6,
  startedAt: new Date(2026, 4 + Math.floor(i / 15), (i % 28) + 1),
  lastWatchedAt: new Date(Date.now() - 86400000 * (i % 7)),
  completions: Math.floor(det() * 3) + (det() > 0.6 ? 1 : 0),
}))

export const mockStudentIDCards: StudentIDCard[] = Array.from({ length: 10 }, (_, i) => ({
  id: `idcard-${i + 1}`,
  studentId: `s-${(i % 50) + 1}`,
  studentName: `طالب ${(i % 50) + 1}`,
  studentImage: `https://api.dicebear.com/7.x/avataaars/svg?seed=student${i}`,
  grade: ["أولى ثانوي", "ثانية ثانوي", "ثالثة ثانوي"][i % 3],
  group: `مجموعة ${String.fromCharCode(65 + (i % 4))}`,
  studentCode: `STU-${String(i + 1).padStart(5, "0")}`,
  enrollmentStatus: "active",
  qrCode: "#",
  issuedAt: new Date(2026, 0, 1),
  expiresAt: new Date(2027, 0, 1),
}))

export const mockRecycleBin: RecycleBinItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `rbin-${i + 1}`,
  originalId: `del-${i + 1}`,
  type: ["طالب", "كورس", "امتحان", "واجب", "اشتراك", "قسط", "كوبون", "فاتورة"][i],
  name: [`طالب ${i + 1} (محذوف)`, `كورس ${i + 1}`, `امتحان ${i + 1}`, `واجب ${i + 1}`, `اشتراك ${i + 1}`, `قسط ${i + 1}`, `كوبون ${i + 1}`, `فاتورة ${i + 1}`][i],
  deletedBy: "أحمد محمد",
  deletedAt: new Date(2026, 5 + Math.floor(i / 3), (i % 20) + 1),
  expiresAt: new Date(2026, 8 + Math.floor(i / 3), (i % 20) + 1),
  data: {},
}))

export const mockPermissionRoles: PermissionRole[] = [
  {
    id: "role-1", name: "مدير النظام", description: "صلاحية كاملة", isSystem: true, userCount: 1,
    permissions: {
      "students": { module: "students", label: "الطلاب", canView: true, canCreate: true, canEdit: true, canDelete: true, canPrint: true, canExport: true, canApprove: true, canManage: true },
      "courses": { module: "courses", label: "الكورسات", canView: true, canCreate: true, canEdit: true, canDelete: true, canPrint: true, canExport: true, canApprove: true, canManage: true },
      "exams": { module: "exams", label: "الامتحانات", canView: true, canCreate: true, canEdit: true, canDelete: true, canPrint: true, canExport: true, canApprove: true, canManage: true },
      "homework": { module: "homework", label: "الواجبات", canView: true, canCreate: true, canEdit: true, canDelete: true, canPrint: true, canExport: true, canApprove: true, canManage: true },
      "payments": { module: "payments", label: "المدفوعات", canView: true, canCreate: true, canEdit: true, canDelete: true, canPrint: true, canExport: true, canApprove: true, canManage: true },
      "attendance": { module: "attendance", label: "الحضور", canView: true, canCreate: true, canEdit: true, canDelete: true, canPrint: true, canExport: true, canApprove: true, canManage: true },
      "reports": { module: "reports", label: "التقارير", canView: true, canCreate: true, canEdit: true, canDelete: true, canPrint: true, canExport: true, canApprove: true, canManage: true },
      "employees": { module: "employees", label: "الموظفين", canView: true, canCreate: true, canEdit: true, canDelete: true, canPrint: true, canExport: true, canApprove: true, canManage: true },
      "inventory": { module: "inventory", label: "المخزون", canView: true, canCreate: true, canEdit: true, canDelete: true, canPrint: true, canExport: true, canApprove: true, canManage: true },
      "settings": { module: "settings", label: "الإعدادات", canView: true, canCreate: true, canEdit: true, canDelete: false, canPrint: false, canExport: false, canApprove: true, canManage: true },
    },
  },
  {
    id: "role-2", name: "مشرف", description: "إدارة الطلاب والكورسات والتقارير", isSystem: false, userCount: 2,
    permissions: {
      "students": { module: "students", label: "الطلاب", canView: true, canCreate: true, canEdit: true, canDelete: false, canPrint: true, canExport: true, canApprove: false, canManage: false },
      "courses": { module: "courses", label: "الكورسات", canView: true, canCreate: true, canEdit: true, canDelete: false, canPrint: true, canExport: true, canApprove: false, canManage: false },
      "exams": { module: "exams", label: "الامتحانات", canView: true, canCreate: true, canEdit: true, canDelete: false, canPrint: true, canExport: true, canApprove: false, canManage: false },
      "homework": { module: "homework", label: "الواجبات", canView: true, canCreate: true, canEdit: true, canDelete: false, canPrint: true, canExport: true, canApprove: false, canManage: false },
      "payments": { module: "payments", label: "المدفوعات", canView: true, canCreate: false, canEdit: false, canDelete: false, canPrint: false, canExport: false, canApprove: false, canManage: false },
      "attendance": { module: "attendance", label: "الحضور", canView: true, canCreate: true, canEdit: true, canDelete: false, canPrint: true, canExport: true, canApprove: false, canManage: false },
      "reports": { module: "reports", label: "التقارير", canView: true, canCreate: false, canEdit: false, canDelete: false, canPrint: true, canExport: true, canApprove: false, canManage: false },
      "employees": { module: "employees", label: "الموظفين", canView: false, canCreate: false, canEdit: false, canDelete: false, canPrint: false, canExport: false, canApprove: false, canManage: false },
      "inventory": { module: "inventory", label: "المخزون", canView: true, canCreate: true, canEdit: true, canDelete: false, canPrint: false, canExport: false, canApprove: false, canManage: false },
      "settings": { module: "settings", label: "الإعدادات", canView: false, canCreate: false, canEdit: false, canDelete: false, canPrint: false, canExport: false, canApprove: false, canManage: false },
    },
  },
  {
    id: "role-3", name: "محاسب", description: "إدارة المدفوعات والاشتراكات والتقارير المالية", isSystem: false, userCount: 1,
    permissions: {
      "students": { module: "students", label: "الطلاب", canView: true, canCreate: false, canEdit: false, canDelete: false, canPrint: false, canExport: false, canApprove: false, canManage: false },
      "courses": { module: "courses", label: "الكورسات", canView: true, canCreate: false, canEdit: false, canDelete: false, canPrint: false, canExport: false, canApprove: false, canManage: false },
      "exams": { module: "exams", label: "الامتحانات", canView: false, canCreate: false, canEdit: false, canDelete: false, canPrint: false, canExport: false, canApprove: false, canManage: false },
      "homework": { module: "homework", label: "الواجبات", canView: false, canCreate: false, canEdit: false, canDelete: false, canPrint: false, canExport: false, canApprove: false, canManage: false },
      "payments": { module: "payments", label: "المدفوعات", canView: true, canCreate: true, canEdit: true, canDelete: false, canPrint: true, canExport: true, canApprove: true, canManage: false },
      "attendance": { module: "attendance", label: "الحضور", canView: false, canCreate: false, canEdit: false, canDelete: false, canPrint: false, canExport: false, canApprove: false, canManage: false },
      "reports": { module: "reports", label: "التقارير", canView: true, canCreate: false, canEdit: false, canDelete: false, canPrint: true, canExport: true, canApprove: false, canManage: false },
      "employees": { module: "employees", label: "الموظفين", canView: false, canCreate: false, canEdit: false, canDelete: false, canPrint: false, canExport: false, canApprove: false, canManage: false },
      "inventory": { module: "inventory", label: "المخزون", canView: false, canCreate: false, canEdit: false, canDelete: false, canPrint: false, canExport: false, canApprove: false, canManage: false },
      "settings": { module: "settings", label: "الإعدادات", canView: false, canCreate: false, canEdit: false, canDelete: false, canPrint: false, canExport: false, canApprove: false, canManage: false },
    },
  },
]

export const mockStudentNotes: StudentNote[] = Array.from({ length: 15 }, (_, i) => ({
  id: `note-${i + 1}`,
  type: (["personal", "academic"] as const)[i % 2],
  title: ["ملاحظة شخصية", "ملاحظة أكاديمية", "تقييم سلوك", "توصيات", "متابعة", "إنجاز"][i % 6],
  content: `محتوى الملاحظة رقم ${i + 1} مع تفاصيل كاملة عن الطالب وملاحظاته`,
  createdBy: "أحمد محمد",
  createdAt: new Date(2026, 4 + Math.floor(i / 3), (i % 28) + 1),
  priority: (["low", "medium", "high"] as const)[i % 3],
}))

export const mockTimelineEvents: TimelineEvent[] = Array.from({ length: 20 }, (_, i) => ({
  id: `tl-${i + 1}`,
  type: (["enrolled", "completed", "payment", "attendance", "exam", "reward", "penalty", "note"] as const)[i % 8],
  title: ["تسجيل في الكورس", "إكمال الكورس", "دفع اشتراك", "تسجيل حضور", "أدى امتحان", "حصل على مكافأة", "عقوبة تأخير", "إضافة ملاحظة"][i % 8],
  description: `تفاصيل الحدث: ${["تم تسجيل الطالب في الكورس", "أكمل الطالب جميع متطلبات الكورس", "تم دفع مبلغ الاشتراك", "حضر الطالب الحصة", "أدى الطالب الامتحان وحصل على درجة", "حصل الطالب على شهادة تقدير", "تم تسجيل مخالفة تأخير", "تم إضافة ملاحظة من المدرس"][i % 8]}`,
  date: new Date(2026, 4 + Math.floor(i / 4), (i % 28) + 1),
}))

export const mockDisciplineRecords: DisciplineRecord[] = Array.from({ length: 10 }, (_, i) => ({
  id: `disc-${i + 1}`,
  type: (i < 6 ? "reward" : "penalty") as "reward" | "penalty",
  title: i < 6 ? ["تفوق دراسي", "تميز في الحضور", "مشاركة فعالة", "تحسن ملحوظ", "مساعدة الزملاء", "إنجاز متميز"][i] : ["تأخير متكرر", "عدم انضباط", "تأخير في تسليم الواجبات", "سلوك غير لائق"][i - 6],
  description: i < 6 ? "تكريم الطالب على تميزه واجتهاده" : "تنبيه الطالب بضرورة الالتزام باللوائح",
  points: i < 6 ? [50, 30, 40, 60, 20, 100][i] : [-20, -30, -10, -50][i - 6],
  date: new Date(2026, 4 + (i % 3), (i % 28) + 1),
  issuedBy: "أحمد محمد",
}))

export const mockParentDocuments: StudentDocument[] = Array.from({ length: 8 }, (_, i) => ({
  id: `doc-${i + 1}`,
  name: ["شهادة ميلاد", "صورة شخصية", "إثبات قيد", "شهادة نجاح", "شهادة صحية", "تقرير درجات", "صورة بطاقة", "إقرار ولي الأمر"][i],
  type: (["birth", "photo", "certificate", "certificate", "other", "certificate", "id", "other"] as const)[i],
  url: "#",
  uploadedAt: new Date(2026, 0, (i % 28) + 1),
  verified: i % 3 !== 0,
}))

export const mockMedicalInfo: MedicalInfo = {
  id: "med-1",
  bloodType: "O+",
  allergies: ["بنسلين", "مكسرات"],
  chronicDiseases: ["حساسية صدرية"],
  medications: ["بخاخ الربو عند اللزوم"],
  emergencyNotes: "يرجى الاتصال بولي الأمر في حالة الطوارئ",
  doctorName: "د. محمد السيد",
  doctorPhone: "+20 100 000 0000",
}

export const mockParentContacts: ParentInfo[] = Array.from({ length: 8 }, (_, i) => ({
  id: `parc-${i + 1}`,
  name: `ولي أمر ${i + 1}`,
  relation: ["أب", "أم", "وصي", "أخ", "جد", "جدة", "عم", "خال"][i],
  phone: `+20 100 000 ${String(8000 + i).padStart(4, "0")}`,
  email: `parent${i + 1}@email.com`,
  isPrimary: i === 0,
}))

export const mockEmergencyContacts: EmergencyContact[] = Array.from({ length: 6 }, (_, i) => ({
  id: `emc-${i + 1}`,
  name: `مخالصة ${i + 1}`,
  relation: ["والد", "والدة", "عم", "خال", "جدة", "أخ"][i],
  phone: `+20 100 000 ${String(9000 + i).padStart(4, "0")}`,
  alternatePhone: i % 2 === 0 ? `+20 100 000 ${String(9500 + i).padStart(4, "0")}` : undefined,
}))

export const mockStudentReports = Array.from({ length: 10 }, (_, i) => ({
  id: `srep-${i + 1}`,
  studentId: `s-${(i % 50) + 1}`,
  studentName: `طالب ${(i % 50) + 1}`,
  reportType: (["monthly", "weekly", "final"] as const)[i % 3],
  period: `شهر ${["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو"][i % 6]}`,
  attendanceRate: Math.floor(det() * 20) + 80,
  averageGrade: Math.floor(det() * 25) + 65,
  completedHomework: Math.floor(det() * 10) + 10,
  missedHomework: Math.floor(det() * 5),
  behavior: (["ممتاز", "جيد جداً", "جيد", "مقبول"] as const)[i % 4],
  teacherNotes: `ملاحظات المدرس عن الطالب للفترة ${["الأولى", "الثانية", "الثالثة"][i % 3]}`,
  generatedAt: new Date(2026, 4 + (i % 3), (i % 28) + 1),
}))

export const mockWaitingQueueStats: WaitingQueueStats = {
  totalWaiting: 12,
  byGroup: [
    { groupName: "مجموعة A", count: 4 },
    { groupName: "مجموعة B", count: 3 },
    { groupName: "مجموعة C", count: 3 },
    { groupName: "مجموعة D", count: 2 },
  ],
  averageWaitDays: 7,
  notifiedToday: 2,
  enrolledToday: 1,
}
