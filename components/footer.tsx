import logo from "@/public/logo.svg"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-8 border-t flex items-center justify-center">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 flex items-center">
            <Image
              src={logo.src}
              alt="Gustavo Malaquias Logo"
              width={32}
              height={32}
              className="mr-2"
            />
            <p className="text-sm text-muted-foreground">
              © {currentYear} Gustavo Malaquias. All rights reserved.
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Built with Next.js, Tailwind CSS, and shadcn/ui</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
