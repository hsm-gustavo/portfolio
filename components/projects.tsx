"use client"

import { motion } from "motion/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ExternalLink } from "lucide-react"
import { SiGithub as Github } from "@icons-pack/react-simple-icons"
import dots from "@/public/dots.png"
import mona from "@/public/mona.png"
import portfolio from "@/public/portfolio.png"
import rai from "@/public/rai.png"
import rpd from "@/public/rpd.png"
import Image from "next/image"
import { useState } from "react"
import { useTranslations } from "next-intl"

interface Project {
  title: string
  description: string
  tags: string[]
  github: string | null
  demo: string | null
  image: string | null
  featured: boolean
}

interface ProjectCardProps {
  project: Project
  index: number
  fadeIn: {
    initial: {
      opacity: number
      y: number
    }
    animate: (index: number) => {
      opacity: number
      y: number
      transition: {
        delay: number
        duration: number
      }
    }
  }
  codeTranslation: string
  demoTranslation: string
}

const ProjectCard = ({
  project,
  index,
  fadeIn,
  codeTranslation,
  demoTranslation,
}: ProjectCardProps) => (
  <motion.div
    key={project.title}
    custom={index}
    variants={fadeIn}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    className={project.featured ? "md:col-span-2 lg:col-span-2" : ""}
  >
    <Card className="h-full overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
      <div
        className={`relative ${
          project.featured ? "h-64 md:h-80" : "h-48"
        } w-full`}
      >
        {!project.image ? (
          <Image
            src={"https://placehold.co/400x200/png?text=?"}
            alt={project.title}
            fill
            className="object-cover"
          />
        ) : (
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className="object-cover"
          />
        )}
      </div>
      <CardHeader>
        <CardTitle className="font-mono">{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {project.github && (
          <Button variant="outline" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              {codeTranslation}
            </a>
          </Button>
        )}
        {project.demo && (
          <Button size="sm" asChild>
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              {demoTranslation}
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  </motion.div>
)

export default function Projects() {
  const [activeTab, setActiveTab] = useState("personal")
  const t = useTranslations("projects")

  const workProjects: Project[] = [
    {
      title: t("workProjects.rapidoWebsite.title"),
      description: t("workProjects.rapidoWebsite.description"),
      tags: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Tanstack Query",
        "Mux",
        "shadcn/ui",
        "React Hook Forms",
        "zod",
      ],
      github: null,
      demo: "https://rapidoinfoshop.com",
      image: rpd.src,
      featured: true,
    },
    {
      title: t("workProjects.raiChatbot.title"),
      description: t("workProjects.raiChatbot.description"),
      tags: ["Python", "FastAPI", "Twilio", "LangChain", "GPT-4o mini"],
      github: null,
      demo: "https://api.whatsapp.com/send?phone=558235300071&text=Ol%C3%A1",
      image: rai.src,
      featured: false,
    },
    {
      title: t("workProjects.comingSoon.title"),
      description: t("workProjects.comingSoon.description"),
      tags: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Tanstack Query",
        "shadcn/ui",
        "Mux",
        "React Hook Forms",
        "zod",
      ],
      github: null,
      demo: null,
      image: null,
      featured: false,
    },
  ]

  const personalProjects: Project[] = [
    {
      title: t("personalProjects.portfolio.title"),
      description: t("personalProjects.portfolio.description"),
      tags: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "React Hook Form",
        "zod",
        "shadcn/ui",
      ],
      github: "https://github.com/hsm-gustavo/portfolio",
      demo: "#",
      image: portfolio.src,
      featured: true,
    },
    {
      title: t("personalProjects.monaAI.title"),
      description: t("personalProjects.monaAI.description"),
      tags: [
        "Next.js",
        "TypeScript",
        "TailwindCSS",
        "Tanstack Query",
        "shadcn/ui",
        "React Hook Forms",
        "zustand",
        "Docker",
      ],
      github: "https://github.com/hsm-gustavo/mona-ai-front",
      demo: null,
      image: mona.src,
      featured: false,
    },
    {
      title: t("personalProjects.dots.title"),
      description: t("personalProjects.dots.description"),
      tags: ["Linux", "ArchLinux", "Hyprland", "waybar", "swww", "GTK CSS"],
      github: "https://github.com/hsm-gustavo/dots",
      demo: null,
      image: dots.src,
      featured: false,
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

  return (
    <section id="projects" className="py-20 flex items-center justify-center">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-mono">{t("title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <Tabs
            defaultValue="personal"
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="flex justify-center mb-8">
              <div className="flex flex-wrap gap-2 justify-center max-w-md w-full bg-muted rounded-lg p-[3px]">
                <Button
                  variant={activeTab === "personal" ? "default" : "ghost"}
                  className="font-mono flex-1"
                  onClick={() => setActiveTab("personal")}
                >
                  {t("tabs.personal")}
                </Button>
                <Button
                  variant={activeTab === "work" ? "default" : "ghost"}
                  className="font-mono flex-1"
                  onClick={() => setActiveTab("work")}
                >
                  {t("tabs.work")}
                </Button>
              </div>
            </div>

            <TabsContent value="personal">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {personalProjects.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                    fadeIn={fadeIn}
                    codeTranslation={t("buttons.code")}
                    demoTranslation={t("buttons.demo")}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="work">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {workProjects.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                    fadeIn={fadeIn}
                    codeTranslation={t("buttons.code")}
                    demoTranslation={t("buttons.demo")}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
