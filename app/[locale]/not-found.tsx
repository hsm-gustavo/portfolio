"use client"

import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"

export default function NotFound() {
  const t = useTranslations("notFound")

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold font-mono text-primary">404</h1>

          <h2 className="text-2xl font-bold mt-6 mb-2">{t("title")}</h2>

          <p className="text-muted-foreground mb-8">{t("description")}</p>

          <Button asChild>
            <Link href="/">{t("backHome")}</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
