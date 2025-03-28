"use client"

import { useLocale } from "next-intl"
import { useTranslations } from "next-intl"
import LanguageSwitcherSelect from "./lang-switcher-select"
import { routing } from "@/i18n/routing"
import { SelectItem } from "./ui/select"

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher")
  const locale = useLocale()

  return (
    <LanguageSwitcherSelect
      defaultValue={locale}
      label={t("label")}
    >
      {routing.locales.map((loc) => (
        <SelectItem key={loc} value={loc}>
          {t("locale", { locale: loc.replace("-", "_") })}
        </SelectItem>
      ))}
    </LanguageSwitcherSelect>
  )
}
