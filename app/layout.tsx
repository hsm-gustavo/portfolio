import { ReactNode } from "react"

// from github.com/amannn/next-intl/blob/main/examples/example-app-router/src/app/layout.tsx

type Props = {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return children
}
