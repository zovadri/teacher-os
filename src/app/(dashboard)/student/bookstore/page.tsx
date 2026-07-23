"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  HiOutlineBookOpen, HiOutlineShoppingCart, HiOutlineSearch,
  HiOutlineStar, HiOutlineX, HiOutlineDownload, HiOutlineEye,
  HiOutlineFilter, HiOutlineCash, HiOutlineCheckCircle,
  HiOutlineCreditCard, HiOutlineArrowRight,
} from "react-icons/hi"
import toast from "react-hot-toast"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

interface Book {
  id: number
  title: string
  author: string
  price: number
  rating: number
  category: "external" | "notes" | "revision" | "interactive"
  coverColor: string
}

const books: Book[] = [
  { id: 1, title: "المرجع الشامل في الكيمياء", author: "أ. خالد صقر", price: 250, rating: 4.8, category: "external", coverColor: "from-emerald-400 to-emerald-600" },
  { id: 2, title: "المعاصر في الفيزياء", author: "أ. أحمد سمير", price: 220, rating: 4.7, category: "external", coverColor: "from-blue-400 to-blue-600" },
  { id: 3, title: "مذكرة الرياضيات البحتة", author: "أ. نبيل إبراهيم", price: 80, rating: 4.5, category: "notes", coverColor: "from-purple-400 to-purple-600" },
  { id: 4, title: "مراجعة نهائية كيمياء 2026", author: "أ. خالد صقر", price: 150, rating: 4.9, category: "revision", coverColor: "from-rose-400 to-rose-600" },
  { id: 5, title: "المراجعة النهائية عربي", author: "أ. محمد صلاح", price: 140, rating: 4.8, category: "revision", coverColor: "from-amber-400 to-amber-600" },
  { id: 6, title: "بنك الأسئلة التفاعلي", author: "أ. محمود جلال", price: 200, rating: 4.6, category: "interactive", coverColor: "from-cyan-400 to-cyan-600" },
  { id: 7, title: "الامتحان في الفيزياء", author: "أ. مينا مجدي", price: 180, rating: 4.4, category: "external", coverColor: "from-indigo-400 to-indigo-600" },
  { id: 8, title: "مذكرة شرح الجيولوجيا", author: "أ. هاني جمعة", price: 75, rating: 4.3, category: "notes", coverColor: "from-green-400 to-green-600" },
  { id: 9, title: "مراجعة ليلة الامتحان", author: "أ. مراد العليمي", price: 120, rating: 4.7, category: "revision", coverColor: "from-orange-400 to-orange-600" },
  { id: 10, title: "التفوق في الإنجليزي", author: "أ. محمد فريد", price: 190, rating: 4.5, category: "external", coverColor: "from-pink-400 to-pink-600" },
  { id: 11, title: "موسوعة العلوم المتكاملة", author: "د. محمود الجنايني", price: 260, rating: 4.6, category: "interactive", coverColor: "from-teal-400 to-teal-600" },
  { id: 12, title: "إجابات النماذج الاسترشادية", author: "أ. أحمد خالد", price: 95, rating: 4.4, category: "notes", coverColor: "from-sky-400 to-sky-600" },
]

const categories = [
  { id: "all", label: "الكل" },
  { id: "external", label: "كتب خارجية" },
  { id: "notes", label: "مذكرات" },
  { id: "revision", label: "مراجعات" },
  { id: "interactive", label: "كتب تفاعلية" },
]

const purchaseHistory = [
  { id: "p1", title: "المرجع الشامل في الكيمياء", date: "2026-07-10", price: 250 },
  { id: "p2", title: "مراجعة نهائية عربي", date: "2026-07-05", price: 140 },
  { id: "p3", title: "مذكرة الرياضيات البحتة", date: "2026-06-28", price: 80 },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

export default function BookStorePage() {
  const [category, setCategory] = useState("all")
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<"latest" | "cheapest" | "top">("latest")
  const [cart, setCart] = useState<Book[]>([])
  const [showCart, setShowCart] = useState(false)

  const filtered = useMemo(() => {
    let result = category === "all" ? books : books.filter((b) => b.category === category)
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter((b) => b.title.includes(q) || b.author.includes(q))
    }
    if (sort === "cheapest") result = [...result].sort((a, b) => a.price - b.price)
    else if (sort === "top") result = [...result].sort((a, b) => b.rating - a.rating)
    else result = [...result].sort((a, b) => b.id - a.id)
    return result
  }, [category, search, sort])

  const addToCart = (book: Book) => {
    if (cart.find((b) => b.id === book.id)) {
      toast.error("الكتاب موجود بالفعل في السلة")
      return
    }
    setCart((prev) => [...prev, book])
    toast.success("تمت الإضافة إلى السلة")
  }

  const removeFromCart = (bookId: number) => {
    setCart((prev) => prev.filter((b) => b.id !== bookId))
    toast.success("تمت الإزالة من السلة")
  }

  const cartTotal = cart.reduce((sum, b) => sum + b.price, 0)

  const checkout = () => {
    if (cart.length === 0) { toast.error("السلة فارغة"); return }
    toast.success("تم إتمام الشراء بنجاح! سيتم التواصل معك للتوصيل.")
    setCart([])
    setShowCart(false)
  }

  const stars = (rating: number) => {
    const full = Math.floor(rating)
    const half = rating - full >= 0.5
    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <HiOutlineStar key={i} className={`w-3.5 h-3.5 ${i < full ? "text-amber-400 fill-amber-400" : half && i === full ? "text-amber-400" : "text-text-tertiary"}`} />
        ))}
        <span className="text-[10px] text-text-tertiary mr-1">{rating}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <DashboardHeader title="مكتبة الكتب" subtitle="تسوق الكتب والمذكرات والمراجعات" />
      <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
          <motion.div variants={itemVariants} className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {categories.map((c) => (
                <button type="button"
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    category === c.id ? "border-primary bg-primary/10 text-primary" : "border-border text-text-secondary hover:bg-surface-secondary"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setShowCart(true)}
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm text-text hover:bg-surface-secondary transition-all"
            >
              <HiOutlineShoppingCart className="w-5 h-5" />
              <span>السلة</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">{cart.length}</span>
              )}
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <HiOutlineSearch className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن كتاب أو مؤلف..."
                className="w-full bg-surface border border-border rounded-lg pr-9 pl-3 py-2 text-sm text-text placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-text-tertiary">
              <HiOutlineFilter className="w-4 h-4" />
              <span>ترتيب:</span>
              {(["latest", "cheapest", "top"] as const).map((s) => (
                <button type="button"
                  key={s}
                  onClick={() => setSort(s)}
                  className={`px-2 py-1 rounded-md border text-[11px] transition-all ${
                    sort === s ? "border-primary bg-primary/10 text-primary" : "border-border text-text-tertiary hover:bg-surface-secondary"
                  }`}
                >
                  {s === "latest" ? "الأحدث" : s === "cheapest" ? "الأقل سعراً" : "الأعلى تقييماً"}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((book) => (
              <motion.div key={book.id} variants={itemVariants}>
                <Card className="overflow-hidden group h-full flex flex-col">
                  <div className={`h-32 bg-gradient-to-br ${book.coverColor} flex items-center justify-center relative`}>
                    <HiOutlineBookOpen className="w-12 h-12 text-white/60" />
                    <Badge variant="neutral" size="sm" className="absolute top-2 right-2 bg-white/20 text-white border-0">
                      {categories.find((c) => c.id === book.category)?.label}
                    </Badge>
                  </div>
                  <CardContent className="flex-1 flex flex-col gap-2 p-5">
                    <h3 className="text-sm font-bold text-text leading-snug">{book.title}</h3>
                    <p className="text-xs text-text-tertiary">{book.author}</p>
                    {stars(book.rating)}
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-sm font-bold text-primary">{book.price} ج.م</span>
                      <button type="button" onClick={() => addToCart(book)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                          cart.find((b) => b.id === book.id)
                            ? "bg-success/10 text-success border border-success/30"
                            : "bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white"
                        }`}
                      >
                        {cart.find((b) => b.id === book.id) ? "تمت الإضافة ✓" : "أضف إلى السلة"}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-text-tertiary">
              <HiOutlineBookOpen className="w-16 h-16 mx-auto mb-3 opacity-30" />
              <p className="text-sm">لا توجد كتب تطابق بحثك</p>
            </div>
          )}

          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader>
                <CardTitle>المشتريات السابقة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {purchaseHistory.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-4 rounded-xl bg-surface-secondary">
                      <div>
                        <p className="text-sm font-medium text-text">{p.title}</p>
                        <p className="text-xs text-text-tertiary">{p.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-primary font-bold">{p.price} ج.م</span>
                        <button type="button" className="flex items-center gap-1 text-xs text-primary hover:underline">
                          <HiOutlineDownload className="w-3.5 h-3.5" /> تحميل
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40"
              onClick={() => setShowCart(false)}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="absolute left-0 top-0 h-full w-full max-w-md bg-surface border-l border-border shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <h3 className="text-lg font-bold text-text">سلة المشتريات</h3>
                  <button type="button" onClick={() => setShowCart(false)} className="p-1.5 rounded-lg hover:bg-surface-secondary transition-colors">
                    <HiOutlineX className="w-5 h-5 text-text-tertiary" />
                  </button>
                </div>
                <div className="p-4 space-y-3 overflow-y-auto flex-1" style={{ maxHeight: "calc(100% - 190px)" }}>
                  {cart.length === 0 ? (
                    <div className="text-center py-16 text-text-tertiary">
                      <HiOutlineShoppingCart className="w-16 h-16 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">السلة فارغة</p>
                    </div>
                  ) : (
                    cart.map((book) => (
                      <div key={book.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-secondary">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${book.coverColor} flex items-center justify-center`}>
                            <HiOutlineBookOpen className="w-5 h-5 text-white/70" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text">{book.title}</p>
                            <p className="text-xs text-text-tertiary">{book.price} ج.م</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeFromCart(book.id)} className="text-xs text-error hover:underline">إزالة</button>
                      </div>
                    ))
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-surface">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-text-tertiary">المجموع</span>
                      <span className="text-lg font-bold text-primary">{cartTotal} ج.م</span>
                    </div>
                    <button type="button" onClick={checkout}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-all"
                    >
                      <HiOutlineCreditCard className="w-5 h-5" />
                      إتمام الشراء
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
