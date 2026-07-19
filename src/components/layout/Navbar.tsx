"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useThemeStore } from "@/lib/store/useThemeStore"
import { HiMenu, HiX, HiSun, HiMoon, HiSearch } from "react-icons/hi"

const navLinks = [
  { href: "/", label: "ط·آ§ط¸â€‍ط·آ±ط·آ¦ط¸ظ¹ط·آ³ط¸ظ¹ط·آ©" },
  { href: "/courses", label: "ط·آ§ط¸â€‍ط¸ئ’ط¸ث†ط·آ±ط·آ³ط·آ§ط·ع¾" },
  { href: "/pricing", label: "ط·آ§ط¸â€‍ط·آ¨ط·آ§ط¸â€ڑط·آ§ط·ع¾" },
  { href: "/about", label: "ط·آ¹ط¸â€  ط·آ§ط¸â€‍ط¸â€¦ط·آ¯ط·آ±ط·آ³" },
  { href: "/blog", label: "ط·آ§ط¸â€‍ط¸â€¦ط¸â€ڑط·آ§ط¸â€‍ط·آ§ط·ع¾" },
  { href: "/contact", label: "ط·آ§ط·ع¾ط·آµط¸â€‍ ط·آ¨ط¸â€ ط·آ§" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useThemeStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "glass shadow-lg" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
            T
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">
            Teacher<span className="text-primary">OS</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-text-secondary hover:text-primary transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button type="button" className="p-2 text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-surface-tertiary" aria-label="ط·آ¨ط·آ­ط·آ«">
            <HiSearch size={20} />
          </button>
          <button type="button" onClick={toggleTheme} className="p-2 text-text-secondary hover:text-primary transition-colors rounded-lg hover:bg-surface-tertiary" aria-label="ط·آ§ط¸â€‍ط¸ث†ط·آ¶ط·آ¹">
            {theme === "dark" ? <HiSun size={20} /> : <HiMoon size={20} />}
          </button>
          <Link href="/login" className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-lg transition-colors">
            ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·آ¯ط·آ®ط¸ث†ط¸â€‍
          </Link>
          <Link href="/demo" className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-primary border border-primary hover:bg-primary/5 rounded-lg transition-colors">
            ط·آ§ط¸â€‍ط¸â€ ط·آ³ط·آ®ط·آ© ط·آ§ط¸â€‍ط·ع¾ط·آ¬ط·آ±ط¸ظ¹ط·آ¨ط¸ظ¹ط·آ©
          </Link>
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-text-secondary hover:text-primary transition-colors" aria-label="ط·آ§ط¸â€‍ط¸â€ڑط·آ§ط·آ¦ط¸â€¦ط·آ©">
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass border-t border-border">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-text-secondary hover:text-primary hover:bg-surface-tertiary rounded-lg transition-colors">
                {link.label}
              </Link>
            ))}
            <hr className="border-border my-2" />
            <Link href="/login" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-center text-white bg-primary rounded-lg">
              ط·ع¾ط·آ³ط·آ¬ط¸ظ¹ط¸â€‍ ط·آ§ط¸â€‍ط·آ¯ط·آ®ط¸ث†ط¸â€‍
            </Link>
            <Link href="/demo" onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-center text-primary border border-primary rounded-lg">
              ط·آ§ط¸â€‍ط¸â€ ط·آ³ط·آ®ط·آ© ط·آ§ط¸â€‍ط·ع¾ط·آ¬ط·آ±ط¸ظ¹ط·آ¨ط¸ظ¹ط·آ©
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
