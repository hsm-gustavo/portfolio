import { routing } from "@/i18n/routing";
import { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
    const t = await getTranslations({
        locale: routing.defaultLocale,
        namespace: "manifest"
    })

    return {
      name: t("name"),
      short_name: "Gustavo M.",
      description: t("description"),
      start_url: "/",
      display: "standalone",
      background_color: "#09090b",
      theme_color: "#09090b",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    }
}