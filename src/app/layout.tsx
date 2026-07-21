import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/layout/ThemeProvider"
import { ToastProvider } from "@/components/ui/ToastProvider"

export const metadata: Metadata = {
  title: "TeacherOS — نظام تشغيل المدرس",
  description: "أول نظام تشغيل متكامل لإدارة الكورسات والطلاب والامتحانات والاشتراكات. منصة تعليمية متكاملة للمدرسين.",
  keywords: ["تعليم", "كورسات أونلاين", "منصة تعليمية", "مدرس", "إدارة طلاب", "TeacherOS"],
  openGraph: {
    title: "TeacherOS — نظام تشغيل المدرس",
    description: "أول نظام تشغيل متكامل لإدارة الكورسات والطلاب والامتحانات والاشتراكات",
    type: "website",
    locale: "ar_EG",
  },
  twitter: { card: "summary_large_image", title: "TeacherOS", description: "نظام تشغيل المدرس المتكامل" },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans antialiased" style={{ fontFamily: "'Cairo', 'Inter', system-ui, sans-serif" }}>
        <ThemeProvider>
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  )
}
