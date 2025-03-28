import { getPathname } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { BASE_URL } from "@/lib/constants"
import { MetadataRoute } from "next"
import { Locale } from "next-intl"

type Href = Parameters<typeof getPathname>[0]["href"]

export default function sitemap(): MetadataRoute.Sitemap {
  return [...getEntries("/")]
}

function getEntries(href: Href) {
  return routing.locales.map((locale) => ({
    url: getUrl(href, locale),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((loc) => [loc, getUrl(href, loc)])
      ),
    },
  }))
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href })
  return BASE_URL + pathname
}
