import Link from "next/link"
import { HiMail, HiPhone, HiLocationMarker } from "react-icons/hi"

const footerLinks = {
  منصة: [
    { href: "/courses", label: "الكورسات" },
    { href: "/pricing", label: "الباقات" },
    { href: "/about", label: "عن المدرس" },
    { href: "/contact", label: "اتصل بنا" },
  ],
  الدعم: [
    { href: "/faq", label: "الأسئلة الشائعة" },
    { href: "/blog", label: "المقالات" },
    { href: "/about", label: "سياسة الخصوصية" },
    { href: "/about", label: "شروط الخدمة" },
  ],
  الحساب: [
    { href: "/login", label: "تسجيل الدخول" },
    { href: "/register", label: "إنشاء حساب" },
    { href: "/demo", label: "تجربة المنصة" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.02),transparent_70%)] bg-surface-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
                T
              </div>
              <span className="font-bold text-lg tracking-tight">Teacher<span className="text-primary">OS</span></span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed mb-6 max-w-xs">
              أول نظام تشغيل متكامل للمدرس. إدارة الكورسات والطلاب والامتحانات والاشتراكات من مكان واحد.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <HiMail className="text-primary" size={16} />
                <span>info@teacher-os.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <HiPhone className="text-primary" size={16} />
                <span>+20 100 000 0000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary">
                <HiLocationMarker className="text-primary" size={16} />
                <span>القاهرة، مصر</span>
              </div>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-text-secondary hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs text-text-tertiary">© 2026 TeacherOS. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            {["Facebook", "Instagram", "YouTube", "Telegram", "WhatsApp"].map((s) => (
              <a key={s} href="#" className="text-text-tertiary hover:text-primary transition-colors text-xs">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
