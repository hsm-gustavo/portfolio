import { GITHUB_KEY } from "@/lib/constants"
import { unstable_cache } from "next/cache"
import { NextResponse } from "next/server"

const GITHUB_GRAPHQL_QUERY = `
    query {
      viewer {
        repositories(first: 100, ownerAffiliations: OWNER) {
          totalCount
        }
        starredRepositories {
          totalCount
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
        createdAt
      }
    }
  `

async function fetchGithubData() {
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_KEY}`,
    },
    body: JSON.stringify({ query: GITHUB_GRAPHQL_QUERY }),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch data from GitHub")
  }

  const { data } = await response.json()
  return data.viewer
}

const cachedFetchGitHubData = unstable_cache(fetchGithubData, ["githubData"], {
  revalidate: 3600
})

export async function GET() {
  try {
    const data = await cachedFetchGitHubData()
    return NextResponse.json(data)
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({error: error.message}, { status: 500})
    return NextResponse.json({error: "An unknown error occured while trying to fetch GitHub data"}, {status: 500})
  }
}
