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
  xp: Math.floor(Math.random() * 5000),
  level: Math.floor(Math.random() * 15) + 1,
  streak: Math.floor(Math.random() * 30),
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
    const lessonCount = Math.floor(Math.random() * 6) + 3
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
        duration: Math.floor(Math.random() * 45) + 10,
        isFree: j === 0,
        isLocked: false,
        status: "published" as const,
        video: {
          id: `vid-${courseId}-${i + 1}-${j + 1}`,
          title: `فيديو الدرس ${j + 1}`,
          description: `شرح فيديو للدرس ${j + 1}`,
          thumbnail: `https://images.unsplash.com/photo-${[1611162617474, 1611162617474, 1611162617474][j % 3]}?w=640&q=85`,
          duration: Math.floor(Math.random() * 45) + 10,
          url: "#",
          views: Math.floor(Math.random() * 5000),
          completionRate: Math.floor(Math.random() * 40) + 60,
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
  totalPaid: Math.floor(Math.random() * 5000) + 1000,
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
    amount: Math.floor(Math.random() * 5000) + 100,
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
  checkIn: i % 6 !== 3 ? `${8 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}` : undefined,
  checkOut: i % 6 !== 3 ? `${10 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}` : undefined,
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
  duration: Math.floor(Math.random() * 45) + 5,
  size: Math.floor(Math.random() * 500) + 50,
  format: ["mp4", "mp4", "mp4", "avi", "mkv"][i % 5],
  resolution: ["1080p", "1080p", "720p", "720p", "480p"][i % 5],
  courseId: mockCourses[i % 8].id,
  courseName: mockCourses[i % 8].title,
  chapterId: "",
  uploadDate: new Date(2025, 4 + Math.floor(i / 6), (i % 28) + 1),
  views: Math.floor(Math.random() * 3000) + 100,
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
  questions: Array.from({ length: [10, 15, 20][i % 3] }, (_, q) => ({
    id: `q-${i + 1}-${q + 1}`,
    type: (["multiple-choice", "true-false", "fill-blank", "essay"] as const)[q % 4],
    text: `السؤال رقم ${q + 1}: ${["اختر الإجابة الصحيحة", "ضع علامة صح أو خطأ", "املأ الفراغ", "أجب عن السؤال التالي"][q % 4]}`,
    grade: [2, 3, 5][q % 3],
    suggestedTime: [1, 2, 3][q % 3],
    difficulty: (["easy", "medium", "hard"] as const)[q % 3],
    tags: ["نحو", "صرف", "بلاغة", "أدب"],
    choices: q % 4 !== 3 ? Array.from({ length: 4 }, (_, c) => ({ id: `ch-${c + 1}`, text: `اختيار ${c + 1}`, isCorrect: c === 0 })) : undefined,
    explanation: "الشرح التفصيلي للإجابة الصحيحة",
    stats: { timesUsed: Math.floor(Math.random() * 50) + 1, correctRate: Math.floor(Math.random() * 40) + 60, incorrectRate: Math.floor(Math.random() * 40) },
  })),
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
  status: (["active", "active", "active", "closed", "draft"] as const)[i % 5],
  submissions: Array.from({ length: Math.floor(Math.random() * 30) + 20 }, (_, s) => ({
    id: `sub-${i + 1}-${s + 1}`,
    studentId: `s-${s + 1}`,
    studentName: `طالب ${s + 1}`,
    files: [],
    notes: "",
    submittedAt: new Date(2025, 7, 10 + (s % 15)),
    grade: Math.random() > 0.15 ? Math.floor(Math.random() * 30) + 1 : undefined,
    feedback: Math.random() > 0.5 ? "ممتاز، عمل جيد" : undefined,
    status: (["submitted", "graded", "graded", "graded", "late"] as const)[s % 5],
  })),
  analytics: {
    submitted: Math.floor(Math.random() * 10) + 25,
    notSubmitted: Math.floor(Math.random() * 8) + 2,
    late: Math.floor(Math.random() * 5),
    averageGrade: Math.floor(Math.random() * 30) + 15,
    highestGrade: 30,
    lowestGrade: Math.floor(Math.random() * 10) + 3,
    passRate: Math.floor(Math.random() * 30) + 60,
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
  stats: { timesUsed: Math.floor(Math.random() * 30) + 1, correctRate: Math.floor(Math.random() * 40) + 60, incorrectRate: Math.floor(Math.random() * 40) },
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
  grade: Math.floor(Math.random() * 30) + 70,
  percentage: Math.floor(Math.random() * 25) + 75,
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
  monthlyRevenue: Array.from({ length: 12 }, (_, i) => ({ month: ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"][i], revenue: Math.floor(Math.random() * 50000) + 80000, students: Math.floor(Math.random() * 40) + 80 })),
  weeklyActivity: Array.from({ length: 7 }, (_, i) => ({ day: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"][i], videos: Math.floor(Math.random() * 15) + 5, exams: Math.floor(Math.random() * 5) + 1, homework: Math.floor(Math.random() * 8) + 3 })),
  coursePerformance: mockCourses.map(c => ({ courseId: c.id, courseName: c.title, completionRate: Math.floor(Math.random() * 30) + 65, avgGrade: Math.floor(Math.random() * 20) + 70, studentSatisfaction: Math.floor(Math.random() * 15) + 80 })),
  studentGrowth: Array.from({ length: 12 }, (_, i) => ({ month: ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"][i], total: 500 + (i * 65) + Math.floor(Math.random() * 50), newStudents: Math.floor(Math.random() * 30) + 20 + (i * 3) })),
  examPerformance: Array.from({ length: 10 }, (_, i) => ({ examName: `امتحان ${i + 1}`, passRate: Math.floor(Math.random() * 20) + 70, avgScore: Math.floor(Math.random() * 15) + 70, participationRate: Math.floor(Math.random() * 20) + 75 })),
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
  leaderboard: Array.from({ length: 20 }, (_, i) => ({ rank: i + 1, studentName: `طالب ${i + 1}`, xp: 5000 - (i * 180), level: 15 - Math.floor(i / 2), badges: Math.floor(Math.random() * 6) + 1, streak: Math.floor(Math.random() * 30) + 1 })),
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
    overallGrade: Math.floor(Math.random() * 20) + 75,
    attendance: Math.floor(Math.random() * 15) + 85,
    examsAvg: Math.floor(Math.random() * 20) + 70,
    homeworkAvg: Math.floor(Math.random() * 15) + 80,
    completedLessons: Math.floor(Math.random() * 40) + 60,
    totalLessons: 100,
    strengths: ["النحو", "الإملاء", "القراءة"],
    weaknesses: ["البلاغة", "التعبير"],
    recentExams: Array.from({ length: 5 }, (_, i) => ({ name: `امتحان ${i + 1}`, grade: Math.floor(Math.random() * 30) + 65, date: new Date(2025, 5 + i, 15) })),
    weeklyProgress: Array.from({ length: 7 }, (_, i) => ({ day: ["السبت", "الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"][i], hours: Math.floor(Math.random() * 3) + 1 })),
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
  totalXp: Math.floor(Math.random() * 8000) + 500,
  level: Math.floor(Math.random() * 18) + 1,
  streak: Math.floor(Math.random() * 40) + 1,
  badges: Math.floor(Math.random() * 8) + 1,
  achievements: Math.floor(Math.random() * 5),
  rank: 0,
  weeklyXp: Math.floor(Math.random() * 500) + 100,
  monthlyXp: Math.floor(Math.random() * 2000) + 500,
  lastActive: new Date(Date.now() - Math.random() * 86400000 * 3),
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

export const mockBackupHistory = [
  { id: "bck-1", fileName: "backup-2025-07-01.zip", size: "256 MB", createdAt: new Date("2025-07-01"), type: "full", status: "completed" },
  { id: "bck-2", fileName: "backup-2025-06-15.zip", size: "248 MB", createdAt: new Date("2025-06-15"), type: "full", status: "completed" },
  { id: "bck-3", fileName: "backup-2025-06-01.zip", size: "240 MB", createdAt: new Date("2025-06-01"), type: "incremental", status: "completed" },
]
