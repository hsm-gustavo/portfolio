"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { GitHubData } from "@/lib/types"
import { Clock, Code, GitCommit, Star } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import GitHubCalendar from "@/components/github-calendar"
import { motion } from "motion/react"
import { Button } from "./ui/button"
import { useState } from "react"
import { useTranslations } from "next-intl"

export default function GitHubStats({
  githubData,
}: {
  githubData: GitHubData
}) {
  const t = useTranslations("github")
  const [activeTab, setActiveTab] = useState("overview")

  const totalCommits =
    githubData.contributionsCollection.contributionCalendar.totalContributions

  const createdAt = new Date(githubData.createdAt)
  const currentYear = new Date().getFullYear()

  const statCards = [
    {
      title: t("stats.repositories"),
      value: githubData.repositories.totalCount,
      icon: <Code className="size-4 text-primary" />,
    },
    {
      title: t("stats.stars"),
      value: githubData.starredRepositories.totalCount,
      icon: <Star className="size-4 text-primary" />,
    },
    {
      title: t("stats.contributions"),
      value: totalCommits,
      icon: <GitCommit className="size-4 text-primary" />,
    },
    {
      title: t("stats.timeCoding"),
      value: `${currentYear - createdAt.getFullYear()} ${t("stats.years")}`,
      icon: <Clock className="size-4 text-primary" />,
    },
  ]

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * index, duration: 0.5 },
    }),
  }

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <section
      id="github"
      className="py-20 bg-muted/30 flex items-center justify-center"
    >
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-mono">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs
            defaultValue="overview"
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="flex justify-center mb-8">
              <div className="flex flex-wrap gap-2 justify-center max-w-md w-full bg-muted rounded-lg p-[3px]">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className="font-mono flex-1"
                  onClick={() => setActiveTab("overview")}
                >
                  {t("tabs.overview")}
                </Button>
                <Button
                  variant={activeTab === "contributions" ? "default" : "ghost"}
                  className="font-mono flex-1"
                  onClick={() => setActiveTab("contributions")}
                >
                  {t("tabs.contributions")}
                </Button>
              </div>
            </div>

            <TabsContent value="overview">
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              >
                {statCards.map((stat, index) => (
                  <motion.div key={stat.title} variants={fadeIn} custom={index}>
                    <Card className="border-none shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-center gap-2 mb-2 text-muted-foreground">
                          {stat.icon}
                          <span className="text-sm">{stat.title}</span>
                        </div>
                        {!githubData ? (
                          <Skeleton className="h-8 w-16" />
                        ) : (
                          <p className="text-2xl font-bold font-mono text-center">
                            {stat.value}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            <TabsContent value="contributions">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">
                    {t("contributionCalendarTitle", {
                      year: new Date().getFullYear(),
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!githubData ? (
                    <Skeleton className="h-32 w-full" />
                  ) : (
                    <GitHubCalendar
                      contributionData={
                        githubData.contributionsCollection.contributionCalendar
                      }
                    />
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
