"use client"
import { motion } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  SiCss3,
  SiDocker,
  SiGit,
  SiGnubash,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "@icons-pack/react-simple-icons"

export default function Skills() {
  const skillCategories = [
    {
      id: "languages",
      name: "Languages",
      skills: [
        { name: "Python", icon: <SiPython className="w-12 h-12" /> },
        { name: "JavaScript", icon: <SiJavascript className="w-12 h-12" /> },
        { name: "TypeScript", icon: <SiTypescript className="w-12 h-12" /> },
        { name: "HTML", icon: <SiHtml5 className="w-12 h-12" /> },
        { name: "CSS", icon: <SiCss3 className="w-12 h-12" /> },
        { name: "Bash", icon: <SiGnubash className="w-12 h-12" /> },
      ],
    },
    {
      id: "frameworks",
      name: "Frameworks",
      skills: [
        { name: "React", icon: <SiReact className="w-12 h-12" /> },
        { name: "Next.js", icon: <SiNextdotjs className="w-12 h-12" /> },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="w-12 h-12" /> },
      ],
    },
    {
      id: "tools",
      name: "Tools & Platforms",
      skills: [
        { name: "Linux", icon: <SiLinux className="w-12 h-12" /> },
        { name: "PostgreSQL", icon: <SiPostgresql className="w-12 h-12" /> },
        { name: "Git", icon: <SiGit className="w-12 h-12" /> },
        { name: "Docker", icon: <SiDocker className="w-12 h-12" /> },
      ],
    },
  ]

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.05 * index, duration: 0.5 },
    }),
  }

  return (
    <section id="skills" className="py-20 flex items-center justify-center">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 font-mono">Skills & Tools</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="languages" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              {skillCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="font-mono"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {skillCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      custom={index}
                      variants={fadeIn}
                      initial="initial"
                      whileInView="animate"
                      viewport={{ once: true }}
                    >
                      <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <div className="w-12 h-12 mb-4 relative">
                            {skill.icon}
                          </div>
                          <span className="font-medium">{skill.name}</span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}
