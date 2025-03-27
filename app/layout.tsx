import type { Metadata } from "next"
import { Geist_Mono, Geist } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/lib/providers"
import { Toaster } from "@/components/ui/sonner"

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Gustavo Malaquias | Developer",
  description:
    "Personal portfolio of Gustavo Malaquias, an aspiring fullstack developer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${geistSans.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster/>
      </body>
    </html>
  )
}
