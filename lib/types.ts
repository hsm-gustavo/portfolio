export interface GitHubData {
  repositories: {
    totalCount: number
  }
  starredRepositories: {
    totalCount: number
  }
  contributionsCollection: {
    contributionCalendar: {
      totalContributions: number
      weeks: Array<{
        contributionDays: Array<{
          contributionCount: number
          date: string
        }>
      }>
    }
  }
  createdAt: string
}

export interface ContributionCalendar {
  totalContributions: number
  weeks: Array<{
    contributionDays: Array<{
      contributionCount: number
      date: string
    }>
  }>
}

export interface GitHubCalendarProps {
  contributionData?: ContributionCalendar
}