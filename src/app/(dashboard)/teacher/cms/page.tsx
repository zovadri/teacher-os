"use client"

import { useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  HiOutlineDesktopComputer,
  HiOutlineColorSwatch,
  HiOutlinePhotograph,
  HiOutlineSearchCircle,
  HiOutlineDocumentText,
  HiOutlineChevronLeft,
  HiOutlineGlobe,
  HiOutlineTemplate,
  HiOutlineEye,
} from "react-icons/hi"
import DashboardHeader from "@/components/layout/DashboardHeader"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { mockCmsPages } from "@/lib/mock/data"

const cmsCards = [
  {
    id: "homepage",
    title: "بناء الصفحة الرئيسية",
    description: "تخصيص أقسام الصفحة الرئيسية وترتيبها",
    icon: HiOutlineDesktopComputer,
    color: "primary",
    href: "/teacher/cms/homepage",
    status: `${mockCmsPages.homepage.sections.length} أقسام`,
    statusBadge: "info" as const,
  },
  {
    id: "theme",
    title: "إعدادات المظهر",
    description: "التحكم في الألوان والخطوط والأنماط",
    icon: HiOutlineColorSwatch,
    color: "success",
    href: "/teacher/cms/theme",
    status: `${mockCmsPages.theme.fontFamily} · ${mockCmsPages.theme.primaryColor}`,
    statusBadge: "success" as const,
  },
  {
    id: "branding",
    title: "العلامة التجارية",
    description: "الشعار والاسم والروابط الاجتماعية",
    icon: HiOutlinePhotograph,
    color: "warning",
    href: "/teacher/cms/branding",
    status: mockCmsPages.branding.brandName,
    statusBadge: "warning" as const,
  },
  {
    id: "seo",
    title: "إعدادات SEO",
    description: "تحسين محركات البحث والبيانات الوصفية",
    icon: HiOutlineSearchCircle,
    color: "error",
    href: "/teacher/cms/seo",
    status: "ميتا تاج · سيو",
    statusBadge: "error" as const,
  },
  {
    id: "pages",
    title: "الصفحات الثابتة",
    description: "إدارة صفحات الموقع الثابتة",
    icon: HiOutlineDocumentText,
    color: "info",
    href: "/teacher/cms/pages",
    status: "من نحن · اتصل بنا",
    statusBadge: "info" as const,
  },
]

export default function CmsPage() {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <DashboardHeader title="إدارة المحتوى" subtitle="التحكم في محتوى الموقع والمظهر" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cmsCards.map((item, idx) => {
          const Icon = item.icon
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
            >
              <Link href={item.href}>
                <Card hover className="h-full flex flex-col">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-2xl bg-${item.color}-100 dark:bg-${item.color}-900/30 flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 text-${item.color}-600`} />
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription className="mt-1">{item.description}</CardDescription>
                    <div className="mt-3">
                      <Badge variant={item.statusBadge} size="sm">{item.status}</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3 mt-auto">
                    <span className="text-sm text-primary flex items-center gap-1">
                      إدارة
                      <HiOutlineChevronLeft className="w-3 h-3" />
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>نظرة عامة على الموقع</CardTitle>
          <Badge variant="success" size="sm">
            <HiOutlineGlobe className="w-3 h-3 ml-1" />
            الموقع منشور
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-xl bg-surface-secondary border border-border">
              <p className="text-2xl font-bold text-text">{mockCmsPages.homepage.sections.length}</p>
              <p className="text-xs text-text-tertiary mt-1">أقسام الصفحة الرئيسية</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-surface-secondary border border-border">
              <p className="text-2xl font-bold text-text">{mockCmsPages.branding.brandName}</p>
              <p className="text-xs text-text-tertiary mt-1">العلامة التجارية</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-surface-secondary border border-border">
              <p className="text-2xl font-bold text-text">{Object.keys(mockCmsPages.branding.socialLinks).length}</p>
              <p className="text-xs text-text-tertiary mt-1">روابط التواصل</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-surface-secondary border border-border">
              <p className="text-2xl font-bold text-text">{mockCmsPages.seo.keywords.split(",").length}</p>
              <p className="text-xs text-text-tertiary mt-1">كلمات مفتاحية</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
