import { getTranslations } from "next-intl/server"
import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "Gustavo Malaquias Portfolio"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
    const locale = (await params).locale

    const t = await getTranslations({locale, namespace: "layout"})

    const title = t("title")
    const subtitle =
      locale === "pt-BR"
        ? "Desenvolvedor Fullstack Aspirante"
        : "Aspiring Fullstack Developer"

    const technologies = ["Next.js", "TypeScript", "Tailwind CSS"]

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#09090b",
            color: "white",
            padding: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
            }}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="#FFF"
                strokeWidth="3"
                fill="black"
              />
              <path
                d="M50 100 L100 50 L150 100 L100 150 Z"
                fill="none"
                stroke="#FFF"
                strokeWidth="3"
              />
              <path
                d="M70 100 L100 70 L130 100 L100 130 Z"
                fill="#FFF"
                stroke="#FFF"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                fontSize: "60px",
                fontWeight: "bold",
                margin: "0",
                color: "white",
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: "30px",
                margin: "10px 0 0 0",
                color: "#a1a1aa",
              }}
            >
              {subtitle}
            </p>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {technologies.map((tech) => (
              <div
                key={tech}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 16px",
                  backgroundColor: "#18181b",
                  borderRadius: "9999px",
                  fontSize: "18px",
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      ),
      {
        ...size,
      }
    )
}
