"use client"

import { Button } from "@/components/ui/button"
import { SiGithub } from "@icons-pack/react-simple-icons"
import { ArrowDown, Mail } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"

export default function Hero() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-[0.03]"></div>
      <div className="container px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="font-mono text-4xl md:text-6xl">
            Hey there{" "}
            <span className="inline-block animate-wave origin-[70%_70%]">
              👋
            </span>
          </h1>
          <h2 className="font-medium text-2xl md:text-3xl mb-6">
            I&apos;m{" "}
            <span className="text-primary font-mono">Gustavo Malaquias</span>,
            <br />
            an aspiring fullstack developer
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Computer Science student at UFAL, passionate about web development
            and Linux customization
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button size={"lg"} onClick={scrollToContact}>Get in touch</Button>
            <Button variant={"outline"} size={"lg"} asChild>
              <Link href={"#about"}>
                Learn more <ArrowDown className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-row justify-center gap-6">
            <Button asChild size={"icon"} variant={"ghost"} aria-label="GitHub">
              <Link href={"https://github.com/hsm-gustavo"}>
                <SiGithub className="w-5 h-5" />
              </Link>
            </Button>

            <Button asChild size={"icon"} variant={"ghost"}>
              <Link
                href={"mailto:gustavo.hs.malaquias@gmail.com"}
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
