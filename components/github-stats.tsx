"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GitHubData } from "@/lib/types"
import { Code, GitCommit, Star } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import GitHubCalendar from "@/components/github-calendar"

export default function GitHubStats({
  githubData,
}: {
  githubData: GitHubData
}) {
  const totalCommits =
    githubData.contributionsCollection.contributionCalendar.totalContributions

  const statCards = [
    {
      title: "Repositories",
      value: githubData.repositories.totalCount,
      icon: <Code className="size-4 text-primary" />,
    },
    {
      title: "Stars",
      value: githubData.starredRepositories.totalCount,
      icon: <Star className="size-4 text-primary" />,
    },
    {
      title: "Contributions",
      value: totalCommits,
      icon: <GitCommit className="size-4 text-primary" />,
    },
  ]

  return (
    <section
      id="github"
      className="py-20 bg-muted/30 flex items-center justify-center"
    >
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-mono">GitHub Activity</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A snapshot of my coding journey and open-source contributions
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="overview" className="font-mono">
                Overview
              </TabsTrigger>
              <TabsTrigger value="contributions" className="font-mono">
                Contributions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {statCards.map((stat) => (
                  <Card key={stat.title} className="border-none shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        {stat.icon}
                        <span className="text-sm">{stat.title}</span>
                      </div>
                      {!githubData ? (
                        <Skeleton className="h-8 w-16" />
                      ) : (
                        <p className="text-2xl font-bold font-mono">
                          {stat.value}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="contributions">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-mono">
                    Contribution Calendar of {new Date().getFullYear()}
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
