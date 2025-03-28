import About from "@/components/about"
import Contact from "@/components/contact"
import { Footer } from "@/components/footer"
import GitHubStats from "@/components/github-stats"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import { BASE_URL } from "@/lib/constants"
import { GitHubData } from "@/lib/types"

export const dynamic = "force-dynamic"

export default async function Home() {
  const response = await fetch(`${BASE_URL}/api/github`)
  const githubData: GitHubData = await response.json()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <GitHubStats githubData={githubData} />
        <Projects />
        <Contact />
      </main>
      <Footer/>
    </div>
  )
}
