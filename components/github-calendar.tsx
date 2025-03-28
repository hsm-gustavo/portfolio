"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { GitHubCalendarProps } from "@/lib/types"
import { motion } from "motion/react"
import { useTranslations } from "next-intl"

export default function GitHubCalendar({
  contributionData,
}: GitHubCalendarProps) {
  const t = useTranslations("github")

  if (!contributionData) {
    return <Skeleton className="h-32 w-full" />
  }

  if (!contributionData || contributionData.weeks.length === 0) {
    return <p>{t("noContributionData")}</p>
  }

  const weeks = contributionData.weeks.filter((week) =>
    week.contributionDays.some((day) =>
      day.date.startsWith(`${new Date().getFullYear()}`)
    )
  )
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  const maxContribution = Math.max(
    ...weeks.flatMap((week) =>
      week.contributionDays.map((day) => day.contributionCount)
    ),
    1
  )

  return (
    <div className="overflow-x-auto pb-4">
      <div className="min-w-[750px]">
        <div className="flex flex-col">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            {months.map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
          <motion.div
            className="grid grid-cols-52 gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              staggerChildren: 0.01,
              delayChildren: 0.2,
            }}
          >
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-1">
                {week.contributionDays.map((day, dayIndex) => {
                  const level = Math.ceil(
                    (day.contributionCount / maxContribution) * 4
                  )
                  let bgColor = "bg-muted"

                  if (level === 1)
                    bgColor = "bg-emerald-200 dark:bg-emerald-900/30"
                  if (level === 2)
                    bgColor = "bg-emerald-300 dark:bg-emerald-800/40"
                  if (level === 3)
                    bgColor = "bg-emerald-400 dark:bg-emerald-700/60"
                  if (level === 4 && day.contributionCount > 0)
                    bgColor = "bg-emerald-500 dark:bg-emerald-600/80"

                  const date = new Date(`${day.date}T00:00:00`)
                  return (
                    <div
                      key={dayIndex}
                      className={`size-3 rounded-sm ${bgColor}`}
                      title={`${
                        day.contributionCount
                      } ${t("contributionsOn")} ${date.toLocaleDateString()}`}
                    />
                  )
                })}
              </div>
            ))}
          </motion.div>
        </div>
        <div className="flex items-center justify-end mt-2 gap-2">
          <span className="text-xs text-muted-foreground">
            {t("contributionScale.less")}
          </span>
          <div className="size-3 rounded-sm bg-muted"></div>
          <div className="size-3 rounded-sm bg-emerald-200 dark:bg-emerald-900/30"></div>
          <div className="size-3 rounded-sm bg-emerald-300 dark:bg-emerald-800/40"></div>
          <div className="size-3 rounded-sm bg-emerald-400 dark:bg-emerald-700/60"></div>
          <div className="size-3 rounded-sm bg-emerald-500 dark:bg-emerald-600/80"></div>
          <span className="text-xs text-muted-foreground">
            {t("contributionScale.more")}
          </span>
        </div>
      </div>
    </div>
  )
}
