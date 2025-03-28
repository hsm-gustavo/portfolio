import { NextIntlClientProvider, hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { Geist_Mono, Geist } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/lib/providers"
import { Toaster } from "@/components/ui/sonner"
import { getTranslations, setRequestLocale } from "next-intl/server"

// on https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/app/layout.tsx

interface Props {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export async function generateMetadata(props: Omit<Props, "children">) {
  const {locale} = await props.params

  const t = await getTranslations({locale, namespace: "layout"})

  return {
    title: t("title"),
    description: t("description")
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  let { locale } = await params
  locale = locale.replace("_", "-")
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistMono.variable} ${geistSans.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider>
          <ThemeProvider
            attribute={"class"}
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
