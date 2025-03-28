import { NextIntlClientProvider, hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import { Geist_Mono, Geist } from "next/font/google"
import "../globals.css"
import { ThemeProvider } from "@/lib/providers"
import { Toaster } from "@/components/ui/sonner"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Metadata } from "next"
import { BASE_URL } from "@/lib/constants"
import { getPathname } from "@/i18n/navigation"

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
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata(
  props: Omit<Props, "children">
): Promise<Metadata> {
  const { locale } = await props.params

  const t = await getTranslations({ locale, namespace: "layout" })
  const homePath = getPathname({
    locale: locale,
    href: "/",
  })

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    description: t("description"),
    keywords: t("keywords").split(","),
    authors: [
      {
        name: "Gustavo Malaquias",
        url: "https://www.linkedin.com/in/gustavo-hs-malaquias",
      },
    ],
    creator: "Gustavo Malaquias",
    openGraph: {
      type: "website",
      locale: locale,
      alternateLocale: locale === "en" ? "pt-BR" : "en",
      url: homePath,
      title: t("title"),
      description: t("description"),
      siteName: t("title").split("|")[0].trim(),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${homePath}`,
      languages: {
        en: `${BASE_URL}/en`,
        br: `${BASE_URL}/br`,
      },
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  let { locale } = await params
  locale = locale.replace("_", "-")
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#09090b" />
        <meta name="theme-color" content="#09090b" />
      </head>
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
