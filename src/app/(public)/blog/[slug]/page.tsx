"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  HiAcademicCap, HiCalendar, HiClock, HiUser, HiTag,
  HiHeart, HiBookmark, HiShare, HiChevronRight,
} from "react-icons/hi"
import { mockBlogPosts } from "@/lib/mock/data"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/Badge"
import { Breadcrumb } from "@/components/ui/Breadcrumb"

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const arabicContent = `
<p>اللغة العربية ليست مجرد مادة دراسية، بل هي وعاء الثقافة العربية والإسلامية وهويتنا الحضارية. فهي لغة القرآن الكريم، وأداة التواصل بين مئات الملايين من البشر في أكثر من ٢٢ دولة عربية.</p>

<p>عندما يتعلم الطالب اللغة العربية بإتقان، فإنه يبني جسراً قوياً بينه وبين تراثه الغني، ويتمكن من فهم نصوصه المقدسة والأدبية بشكل أعمق. إن إتقان اللغة العربية يفتح آفاقاً واسعة للفهم والتحليل والإبداع.</p>

<h2>أهمية اللغة العربية في التعليم</h2>

<p>تعتبر اللغة العربية أساس التعليم في الوطن العربي، حيث تدرس جميع المواد باللغة العربية في المراحل التعليمية المختلفة. لذلك، فإن إتقانها شرط أساسي للنجاح الدراسي.</p>

<p>أثبتت الدراسات أن الطلاب المتمكنين من اللغة العربية يحققون نتائج أفضل في جميع المواد الدراسية الأخرى، وذلك لأن اللغة هي أداة الفهم والتعبير الأساسية.</p>

<h2>كيف تتعلم اللغة العربية بفعالية؟</h2>

<p>هناك عدة طرق يمكن اتباعها لتعلم اللغة العربية بشكل فعال:</p>

<ul>
  <li>القراءة اليومية: خصص وقتاً يومياً لقراءة النصوص العربية المتنوعة</li>
  <li>الاستماع للفصحى: تابع البرامج الإذاعية والتلفزيونية باللغة العربية الفصحى</li>
  <li>الممارسة العملية: حاول الكتابة والتحدث بالعربية الفصحى يومياً</li>
  <li>حل التمارين: قم بحل التمارين النحوية والصرفية بانتظام</li>
  <li>الاستعانة بالمدرسين: لا تتردد في طلب المساعدة من المختصين</li>
</ul>

<h2>دور التكنولوجيا في تعلم اللغة</h2>

<p>مع التطور التكنولوجي الهائل، ظهرت العديد من الأدوات والمنصات التعليمية التي تساعد في تعلم اللغة العربية بطرق مبتكرة. منصات مثل TeacherOS تقدم محتوى تعليمياً متكاملاً يجمع بين الشرح النظري والتطبيق العملي.</p>

<p>تتيح هذه المنصات للطلاب متابعة الدروس في أي وقت ومن أي مكان، والتفاعل مع المحتوى من خلال الامتحانات التفاعلية والواجبات الإلكترونية.</p>

<h2>نصائح للتفوق في اللغة العربية</h2>

<p>للتفوق في اللغة العربية، ينصح الخبراء باتباع الاستراتيجيات التالية:</p>

<ol>
  <li>فهم القواعد وليس حفظها فقط: حاول فهم المنطق وراء كل قاعدة نحوية</li>
  <li>التطبيق المستمر: طبق ما تتعلمه في كتاباتك اليومية</li>
  <li>المراجعة الدورية: راجع ما درسته بانتظام لتثبيت المعلومات</li>
  <li>المشاركة في النقاشات: ناقش ما تتعلمه مع زملائك ومدرسيك</li>
  <li>استخدام الخرائط الذهنية: استخدم الخرائط الذهنية لتنظيم المعلومات النحوية</li>
</ol>

<p>تذكر أن تعلم اللغة العربية رحلة ممتعة، وكل خطوة تخطوها تقربك من الإتقان. مع المثابرة والصبر، ستلاحظ تحسناً ملحوظاً في مستواك اللغوي.</p>

<p>نتمنى لك التوفيق في رحلتك التعليمية، ولا تتردد في الاستفادة من الموارد التعليمية المتاحة على منصة TeacherOS.</p>
`

export default function BlogPostPage() {
  const params = useParams()
  const post = useMemo(() => mockBlogPosts.find((p) => p.slug === params.slug), [params.slug])
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  const relatedPosts = useMemo(() => {
    if (!post) return []
    return mockBlogPosts.filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))).slice(0, 3)
  }, [post])

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <HiAcademicCap className="mx-auto text-text-tertiary mb-4" size={64} />
          <h2 className="text-2xl font-bold mb-2">المقال غير موجود</h2>
          <p className="text-text-secondary mb-6">عذراً، لم نجد المقال الذي تبحث عنه.</p>
          <Link href="/blog" className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-all">العودة للمدونة</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-surface to-surface pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 relative z-10 py-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Breadcrumb items={[{ label: "المدونة", href: "/blog" }, { label: post.category }, { label: post.title }]} className="mb-4" />
            <Badge variant="info" size="sm" className="mb-4">{post.category}</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-[1.2]">{post.title}</h1>
            <p className="text-lg text-text-secondary mb-8">{post.excerpt}</p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-text-tertiary">
              <div className="flex items-center gap-2">
                <img src={post.authorAvatar} alt={post.author} className="w-10 h-10 rounded-full bg-surface-tertiary object-cover" />
                <span className="font-medium text-text">{post.author}</span>
              </div>
              <span className="flex items-center gap-1"><HiCalendar size={16} /> {formatDate(post.publishedAt)}</span>
              <span className="flex items-center gap-1"><HiClock size={16} /> {post.readTime} دقيقة قراءة</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="-mt-4">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-2xl overflow-hidden shadow-xl">
            <img src={post.image} alt={post.title} className="w-full h-[400px] md:h-[500px] object-cover" />
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <article className="lg:col-span-2">
              <div className="prose prose-lg max-w-none text-text-secondary leading-relaxed space-y-4" dangerouslySetInnerHTML={{ __html: arabicContent }} />

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-8 p-4 rounded-xl border border-border">
                  <HiTag className="text-text-tertiary" size={16} />
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-surface-tertiary text-text-secondary text-xs font-medium rounded-lg hover:bg-primary/10 hover:text-primary transition-all cursor-default">{tag}</span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 p-6 rounded-xl border border-border bg-surface-secondary">
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setLiked(!liked)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm ${liked ? "border-error/30 bg-error/10 text-error" : "border-border text-text-secondary hover:bg-surface-tertiary"}`}>
                    <HiHeart size={18} /> {liked ? "أعجبني" : "إعجاب"}
                  </button>
                  <button type="button" onClick={() => setBookmarked(!bookmarked)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm ${bookmarked ? "border-primary/30 bg-primary/10 text-primary" : "border-border text-text-secondary hover:bg-surface-tertiary"}`}>
                    <HiBookmark size={18} /> {bookmarked ? "تم الحفظ" : "حفظ"}
                  </button>
                </div>
                <button type="button" onClick={() => { navigator.clipboard?.writeText(window.location.href) }} className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-text-secondary hover:bg-surface-tertiary transition-all">
                  <HiShare size={18} /> مشاركة
                </button>
              </div>

              <div className="p-6 rounded-xl border border-border mt-6">
                <div className="flex items-center gap-4">
                  <img src={post.authorAvatar} alt={post.author} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <h3 className="font-semibold">{post.author}</h3>
                    <p className="text-sm text-text-secondary mt-1">مدرس لغة عربية بخبرة تزيد عن ١٥ عاماً في تدريس المرحلة الثانوية. حاصل على ماجستير في اللغة العربية من جامعة القاهرة.</p>
                  </div>
                </div>
              </div>
            </article>

            <aside className="space-y-6">
              <div className="sticky top-28 space-y-6">
                {relatedPosts.length > 0 && (
                  <div className="p-6 rounded-xl border border-border">
                    <h3 className="font-semibold mb-4">مقالات ذات صلة</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((rp) => (
                        <Link key={rp.id} href={`/blog/${rp.slug}`} className="group flex gap-3">
                          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                            <img src={rp.image} alt={rp.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">{rp.title}</p>
                            <span className="text-xs text-text-tertiary">{rp.readTime} دقيقة</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-6 rounded-xl border border-border">
                  <h3 className="font-semibold mb-4">التصنيفات</h3>
                  <div className="flex flex-wrap gap-2">
                    {["اللغة العربية", "النحو", "البلاغة", "التعليم", "نصائح تعليمية"].map((cat) => (
                      <Link key={cat} href={`/blog?category=${cat}`} className="px-3 py-1 text-xs font-medium rounded-lg bg-surface-tertiary text-text-secondary hover:bg-primary/10 hover:text-primary transition-all">{cat}</Link>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-xl border border-border bg-gradient-to-br from-primary/5 to-surface text-center">
                  <HiAcademicCap className="mx-auto text-primary mb-3" size={36} />
                  <h3 className="font-semibold mb-2">هل تريد تعلم المزيد؟</h3>
                  <p className="text-xs text-text-secondary mb-4">تصفح كورساتنا المتكاملة في اللغة العربية.</p>
                  <Link href="/courses" className="inline-block px-6 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-all">عرض الكورسات</Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section className="py-16 bg-surface-secondary">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
              <div>
                <span className="text-primary text-sm font-medium mb-2 block">اقرأ أيضاً</span>
                <h2 className="text-2xl md:text-3xl font-bold">مقالات ذات صلة</h2>
              </div>
              <Link href="/blog" className="text-primary text-sm font-medium hover:underline shrink-0">عرض الكل ←</Link>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rp, i) => (
                <motion.div key={rp.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <Link href={`/blog/${rp.slug}`} className="group block rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all h-full">
                    <div className="relative h-44 overflow-hidden">
                      <img src={rp.image} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 right-3"><Badge variant="info" size="sm">{rp.category}</Badge></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{rp.title}</h3>
                      <div className="flex items-center justify-between text-xs text-text-tertiary">
                        <span className="flex items-center gap-1"><HiCalendar size={14} /> {formatDate(rp.publishedAt)}</span>
                        <span className="flex items-center gap-1"><HiClock size={14} /> {rp.readTime} دقيقة</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-secondary font-medium rounded-xl hover:bg-surface-tertiary transition-all">
            <HiChevronRight size={16} /> العودة إلى المدونة
          </Link>
        </div>
      </section>
    </>
  )
}
