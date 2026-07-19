# TeacherOS — Enterprise SaaS Documentation

## Project Statistics

| Metric | Value |
|--------|-------|
| TypeScript Files | ~180 |
| Total Pages | ~70 |
| Components | ~50 |
| Types | ~60 interfaces |
| Mock Data Sets | ~55 |
| Services | 7 |
| Zustand Stores | 3 |
| External Dependencies | Next.js 16, React 19, Framer Motion, Zustand, Recharts, React Icons, React Hot Toast |

## Architecture

```
opencode.json              — opencode config
src/
├── app/
│   ├── (auth)/            — Login, Register, Demo, 403
│   ├── (dashboard)/       — All authenticated pages
│   │   ├── teacher/       — ~40 pages (main role)
│   │   ├── student/       — ~8 pages
│   │   ├── parent/        — ~6 pages
│   │   └── staff/         — ~2 pages
│   ├── (public)/          — Public site (home, blog, courses, faq, contact)
│   └── layout.tsx         — Root layout (RTL, Cairo font, ThemeProvider)
├── components/
│   ├── ui/                — 25 shared components (DataTable, Button, Card, etc.)
│   ├── layout/            — Navbar, Sidebar, Footer, DemoBanner, GlobalSearch
│   ├── dashboard/         — Dashboard widgets (LiveActivity, DnD widgets)
│   ├── exam/              — QuestionPalette, QuestionCard, ExamTimer, ExamHeader
│   ├── student/           — BulkActions, StudentQRModal, StudentTimeline
│   └── staff/             — PermissionTemplateModal
└── lib/
    ├── types/             — All TypeScript interfaces
    ├── mock/data.ts       — All mock datasets (~1000 lines)
    ├── services/          — Fake API services (auth, course, student, exam, etc.)
    ├── stores/            — Zustand stores (auth, dashboard, notification)
    └── utils.ts           — cn(), formatDate(), etc.
```

## Route Map

### Teacher Pages (40+)
| Route | Module | Description |
|-------|--------|-------------|
| `/teacher` | Dashboard | Smart dashboard with DnD widgets |
| `/teacher/students` | Students | Full student list with filters |
| `/teacher/students/[id]` | Student | Profile, performance, timeline, payments |
| `/teacher/students/id-cards` | ID Cards | Generate & print student ID cards |
| `/teacher/courses` | Courses | Course management |
| `/teacher/courses/create` | Courses | Create course |
| `/teacher/courses/[id]` | Courses | Course detail |
| `/teacher/courses/schedule` | Courses | Schedule |
| `/teacher/courses/categories` | Courses | Categories |
| `/teacher/groups` | Groups | Class & group management |
| `/teacher/groups/[id]` | Groups | Group detail with students |
| `/teacher/waiting-queue` | Groups | Waiting list management |
| `/teacher/attendance` | Attendance | 4 modes (QR/Code/Manual/Employee) |
| `/teacher/attendance/qr` | Attendance | QR scanner |
| `/teacher/attendance/reports` | Attendance | Attendance reports |
| `/teacher/exams` | Exams | All exams |
| `/teacher/exams/create` | Exams | Create exam |
| `/teacher/exams/[id]` | Exams | Exam detail & grading |
| `/teacher/exams/versions` | Exams | Multiple versions |
| `/teacher/exams/analysis` | Exams | Question analysis |
| `/teacher/exams/print` | Exams | Print exams & answer sheets |
| `/teacher/exams/leaderboard` | Exams | Leaderboard |
| `/teacher/homework` | Homework | All homework |
| `/teacher/homework/create` | Homework | Create homework |
| `/teacher/homework/[id]` | Homework | Homework detail & grading |
| `/teacher/questions` | Questions | Question bank |
| `/teacher/questions/categories` | Questions | Question categories |
| `/teacher/enrollments` | Enrollments | Course enrollments |
| `/teacher/enrollments/bundles` | Enrollments | Bundle management |
| `/teacher/announcements` | Announcements | Announcement center |
| `/teacher/calendar` | Calendar | 4 views (month/week/day/agenda) |
| `/teacher/subscriptions` | Subscriptions | Subscription management |
| `/teacher/codes` | Codes | Center code management |
| `/teacher/payments/installments` | Payments | Installment plans |
| `/teacher/payments/coupons` | Payments | Coupon management |
| `/teacher/payments/receipts` | Payments | Receipt management |
| `/teacher/payments/refunds` | Payments | Refund processing |
| `/teacher/wallet` | Payments | Wallet management |
| `/teacher/reports` | Reports | Reports center |
| `/teacher/analytics` | Analytics | Analytics dashboard |
| `/teacher/analytics/reports` | Analytics | Analytics reports |
| `/teacher/notifications` | Notifications | Notification center |
| `/teacher/certificates` | Certificates | Certificate management |
| `/teacher/reception` | Reception | Reception dashboard |
| `/teacher/branches` | Center Mgmt | Branch management |
| `/teacher/classrooms` | Center Mgmt | Classroom management |
| `/teacher/employees` | Center Mgmt | Employee management |
| `/teacher/employees/salaries` | Center Mgmt | Salary management |
| `/teacher/inventory` | Center Mgmt | Inventory management |
| `/teacher/expenses` | Center Mgmt | Expense tracking |
| `/teacher/messages` | Messages | Direct messaging |
| `/teacher/videos` | Videos | Video library |
| `/teacher/videos/protection` | Videos | Video protection system |
| `/teacher/files` | Files | File management |
| `/teacher/cms` | CMS | Content management |
| `/teacher/cms/*` | CMS | Homepage, theme, branding, SEO |
| `/teacher/gamification` | Gamification | Gamification hub |
| `/teacher/gamification/*` | Gamification | Achievements, badges |
| `/teacher/sessions` | Sessions | Session management |
| `/teacher/backup` | Backup | Backup & recovery |
| `/teacher/audit-log` | Audit | Audit log |
| `/teacher/permissions` | Permissions | Advanced permissions |
| `/teacher/settings` | Settings | System settings |
| `/teacher/staff` | Staff | Staff management |
| `/teacher/support` | Support | Support tickets |

### Student Pages
| Route | Description |
|-------|-------------|
| `/student` | Student dashboard |
| `/student/courses` | My courses |
| `/student/courses/[id]` | Course detail & lessons |
| `/student/exams` | My exams |
| `/student/exams/[id]` | Take exam |
| `/student/homework` | My homework |
| `/student/homework/[id]` | Submit homework |
| `/student/results` | My results |
| `/student/planner` | Study planner |
| `/student/planner/weekly` | Weekly view |
| `/student/goals` | Goals & progress |
| `/student/subscription` | My subscription |

### Parent Pages
| Route | Description |
|-------|-------------|
| `/parent` | Parent dashboard |
| `/parent/children/[id]` | Child dashboard |
| `/parent/attendance` | Child attendance |
| `/parent/results` | Child results |
| `/parent/homework` | Child homework |
| `/parent/payments` | Payment history |
| `/parent/notifications` | Notifications |
| `/parent/messages` | Direct messaging |
| `/parent/reports` | Weekly reports |

### Staff Pages
| Route | Description |
|-------|-------------|
| `/staff` | Staff dashboard |
| `/staff/manage` | Management panel |

### Public Pages
| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/courses` | Course catalog |
| `/courses/[id]` | Course details |
| `/blog` | Blog |
| `/blog/[slug]` | Blog post |
| `/faq` | FAQ |
| `/contact` | Contact us |

## Components

### UI Components (`@/components/ui`)
- **DataTable** — Enterprise table with sorting, pagination, select, bulk actions, export, print, column visibility
- **Button** — 7 variants, 5 sizes, loading state
- **Card** — Paper container with header/content/footer
- **Modal** — Dialog with animation, backdrop, size prop
- **Table** — Basic table (legacy)
- **Tabs** — Tab navigation
- **Badge** — Status badge with colors
- **PageHeader** — Page title + breadcrumbs + actions
- **StatsCard** — Statistics card with icon
- **Progress** — Progress bar
- **Skeleton** — Loading skeleton (rows, card, stats variants)
- **EmptyState** — Empty data state
- **ErrorState** — Error state with retry
- **SearchInput** — Search input with icon
- **Select** — Select dropdown
- **Input** — Text input
- **Textarea** — Text area
- **Pagination** — Page navigation
- **ConfirmDialog** — Confirmation dialog
- **Toast** — Toast notification
- **Timeline** — Event timeline
- **Spinner** — Loading spinner
- **Alert** — Alert banner
- **Breadcrumb** — Breadcrumb navigation
- **Avatar** — Avatar with fallback

### Layout Components
- **DashboardSidebar** — 40+ nav items, collapsible, sub-menus, mobile overlay
- **Navbar** — Top navigation bar
- **DemoBanner** — Demo environment banner
- **GlobalSearch** — 14 entity types search
- **Footer** — Public footer

### Dashboard Widgets
- LiveActivityFeed, NoteWidget, QuickActionsWidget, WeatherWidget, ClockWidget, CalendarWidget, ActivityWidget, etc.

## State Management
- **useAuthStore** — Auth state, user, login/logout, role switching, permissions
- **useDashboardStore** — Widget layout, visibility, sizes (persisted)
- **useNotificationStore** — Toast notifications

## Data Flow
```
Page → Mock Data / Service → Zustand Store → Component → UI
                                   ↓
                           Toast Notification
```

## Future Backend Migration Plan
1. Replace `src/lib/mock/data.ts` with Prisma models + PostgreSQL
2. Replace service files (`src/lib/services/*.ts`) with actual API calls (Axios/fetch)
3. Replace Zustand stores with server-side rendering + React Query
4. Add server actions for mutations
5. Add rate limiting, caching, and validation layers
6. Migrate file storage to S3-compatible storage
7. Add authentication with NextAuth.js or Clerk

## Known Limitations
- All data is mock (~1000-line file), not connected to a backend
- No real authentication — uses hardcoded demo accounts
- No real file uploads or video streaming
- No real QR scanning — uses simulated detection
- No real PDF generation — uses browser print
- No real email/SMS notifications
- npm/pnpm slow on this machine (network timeouts)
- TypeScript check and Next.js build both time out on this environment
