"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { HiAcademicCap, HiCalendar, HiClock, HiUser, HiTag, HiSearch } from "react-icons/hi"
import { mockBlogPosts } from "@/lib/mock/data"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import { SearchInput } from "@/components/ui/SearchInput"
import { Pagination } from "@/components/ui/Pagination"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const POSTS_PER_PAGE = 6

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("الكل")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const categories = useMemo(() => ["الكل", ...Array.from(new Set(mockBlogPosts.map((p) => p.category)))], [])

  const filteredPosts = useMemo(() => {
    let posts = mockBlogPosts
    if (activeCategory !== "الكل") posts = posts.filter((p) => p.category === activeCategory)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      posts = posts.filter((p) => p.title.includes(q) || p.excerpt.includes(q) || p.tags.some((t) => t.includes(q)))
    }
    return posts
  }, [activeCategory, searchQuery])

  const featuredPost = useMemo(() => filteredPosts.length > 0 ? filteredPosts[0] : null, [filteredPosts])
  const regularPosts = useMemo(() => filteredPosts.filter((p) => p.id !== featuredPost?.id), [filteredPosts, featuredPost])
  const totalPages = Math.ceil(regularPosts.length / POSTS_PER_PAGE)
  const paginatedPosts = regularPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat)
    setCurrentPage(1)
  }

  return (
    <>
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-surface to-surface pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-6">
              <HiAcademicCap size={14} /> المدونة
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-primary">المقالات</span> التعليمية
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              مقالات ودروس تعليمية في اللغة العربية والنحو والبلاغة، ونصائح للتفوق الدراسي.
            </p>
            <div className="max-w-lg mx-auto">
              <SearchInput value={searchQuery} onChange={setSearchQuery} placeholder="ابحث في المقالات..." />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="sticky top-20 z-30 bg-surface/80 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 overflow-x-auto">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <HiTag className="text-text-tertiary ml-2 shrink-0" size={16} />
            {categories.map((cat) => (
              <button key={cat} onClick={() => handleCategoryChange(cat)} className={`px-4 py-1.5 text-xs font-medium rounded-lg transition-all ${activeCategory === cat ? "bg-primary text-white" : "bg-surface-tertiary text-text-secondary hover:bg-primary/10"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {featuredPost && activeCategory === "الكل" && !searchQuery && (
        <section className="py-12 md:pt-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div {...fadeUp}>
              <Link href={`/blog/${featuredPost.slug}`} className="group grid md:grid-cols-2 gap-8 items-center p-6 md:p-8 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-surface hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="relative rounded-xl overflow-hidden h-64 md:h-80">
                  <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4"><Badge variant="primary" size="sm">مميز</Badge></div>
                </div>
                <div>
                  <Badge variant="info" size="sm" className="mb-3">{featuredPost.category}</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">{featuredPost.title}</h2>
                  <p className="text-text-secondary leading-relaxed mb-6">{featuredPost.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-tertiary">
                    <span className="flex items-center gap-1"><HiUser size={14} /> {featuredPost.author}</span>
                    <span className="flex items-center gap-1"><HiCalendar size={14} /> {formatDate(featuredPost.publishedAt)}</span>
                    <span className="flex items-center gap-1"><HiClock size={14} /> {featuredPost.readTime} دقيقة</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-text-secondary">
              <span className="font-semibold text-text">{filteredPosts.length}</span> مقالة
              {activeCategory !== "الكل" && <> في <span className="text-primary">{activeCategory}</span></>}
            </p>
          </div>
          {paginatedPosts.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedPosts.map((post, i) => (
                  <motion.div key={post.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
                    <Link href={`/blog/${post.slug}`} className="group block rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-3 right-3"><Badge variant="info" size="sm">{post.category}</Badge></div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors leading-relaxed">{post.title}</h3>
                        <p className="text-sm text-text-secondary mb-4 line-clamp-2 flex-1">{post.excerpt}</p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="px-2 py-0.5 bg-surface-tertiary text-text-tertiary text-[10px] rounded">{tag}</span>
                            ))}
                          </div>
                        )}
                        <div className="flex items-center justify-between text-xs text-text-tertiary pt-3 border-t border-border">
                          <span className="flex items-center gap-1"><HiCalendar size={14} /> {formatDate(post.publishedAt)}</span>
                          <span className="flex items-center gap-1"><HiClock size={14} /> {post.readTime} دقيقة</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              {totalPages > 1 && (
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} className="mt-10" />
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <HiAcademicCap className="mx-auto text-text-tertiary mb-4" size={48} />
              <p className="text-text-secondary mb-2">لا توجد مقالات تطابق بحثك.</p>
              <button onClick={() => { setSearchQuery(""); setActiveCategory("الكل") }} className="text-primary text-sm font-medium hover:underline">إعادة ضبط</button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
