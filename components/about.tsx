"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Laptop, Rocket } from "lucide-react"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"

export default function About() {
  const t = useTranslations("about")

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * index, duration: 0.5 },
    }),
  }

  const features = [
    {
      icon: <GraduationCap className="h-10 w-10 text-primary" />,
      title: t("features.student.title"),
      description: t("features.student.description"),
    },
    {
      icon: <Laptop className="h-10 w-10 text-primary" />,
      title: t("features.linux.title"),
      description: t("features.linux.description"),
    },
    {
      icon: <Rocket className="h-10 w-10 text-primary" />,
      title: t("features.developer.title"),
      description: t("features.developer.description"),
    },
  ]

  return (
    <section
      id="about"
      className="py-20 bg-muted/30 flex items-center justify-center"
    >
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-mono">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={fadeIn}
              initial="initial"
              whileInView={"animate"}
              viewport={{ once: true }}
            >
              <Card className="h-full border-none shadow-sm bg-card hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 font-mono">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
