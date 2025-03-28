"use client"

import Image from "next/image"
import { Link } from "@/i18n/navigation"
import logo from "@/public/logo.svg"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ModeToggle } from "./mode-toggle"
import { useTranslations } from "next-intl"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations("navigation")

  useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { name: t("about"), href: "#about" },
    { name: t("skills"), href: "#skills" },
    { name: t("github"), href: "#github" },
    { name: t("projects"), href: "#projects" },
    { name: t("contact"), href: "#contact" },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={"/"} className="flex items-center">
          <div className="relative h-10 w-10 mr-2">
            <Image
              src={logo.src}
              alt="Gustavo Malaquias Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="font-mono text-xl font-bold hidden sm:inline-block">
            hsm-gustavo
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <ModeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size={"icon"} aria-label="Open Menu">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <SheetHeader className="mb-6">
                <SheetTitle className="font-mono">Navigation</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 ml-5">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link
                      href={link.href}
                      className="flex py-2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src={logo.src}
                      alt="Gustavo Malaquias Logo"
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                    <span className="text-sm font-mono">hsm-gustavo</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
