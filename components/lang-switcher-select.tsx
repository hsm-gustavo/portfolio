"use client"

import { Globe } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { useTransition, type ReactNode } from "react"
import { usePathname, useRouter } from "@/i18n/navigation"
import { useParams } from "next/navigation"
import { Locale } from "next-intl"

// from https://github.com/amannn/next-intl/blob/main/examples/example-app-router/src/components/LocaleSwitcherSelect.tsx

interface LanguageSwitcherSelectProps {
  children: ReactNode
  defaultValue: string
  label: string
}

export default function LanguageSwitcherSelect({
  children,
  defaultValue,
  label,
}: LanguageSwitcherSelectProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(value: string) {
    const nextLocale = value as Locale
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      )
    })
  }

  return (
    <Select
      defaultValue={defaultValue}
      disabled={isPending}
      onValueChange={onSelectChange}
    >
      <SelectTrigger>
        <SelectValue>
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{label}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </Select>
  )
}
