import axios, { AxiosResponse } from 'axios'
import { GitHubUser, Repository, LanguageStats, Commit } from '@/types/github'

// GitHub API Configuration
const GITHUB_API_BASE = 'https://api.github.com'
const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'flameuss'
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN

// Create axios instance with default config
const githubApi = axios.create({
  baseURL: GITHUB_API_BASE,
  timeout: 10000,
  headers: {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` }),
  },
})

// Request interceptor for rate limiting
githubApi.interceptors.request.use((config) => {
  console.log(`🔥 GitHub API Request: ${config.method?.toUpperCase()} ${config.url}`)
  return config
})

// Response interceptor for error handling
githubApi.interceptors.response.use(
  (response) => {
    const remaining = response.headers['x-ratelimit-remaining']
    const _resetTime = response.headers['x-ratelimit-reset']
    
    if (remaining && parseInt(remaining) < 10) {
      console.warn(`⚠️ GitHub API rate limit warning: ${remaining} requests remaining`)
    }
    
    return response
  },
  (error) => {
    if (error.response?.status === 403) {
      const resetTime = error.response.headers['x-ratelimit-reset']
      const resetDate = new Date(parseInt(resetTime) * 1000)
      
      throw new Error(
        `GitHub API rate limit exceeded. Reset at: ${resetDate.toLocaleTimeString()}`
      )
    }
    
    if (error.response?.status === 404) {
      throw new Error('GitHub resource not found')
    }
    
    throw new Error(error.message || 'GitHub API request failed')
  }
)

export class GitHubService {
  /**
   * Get user profile information
   */
  static async getUser(): Promise<GitHubUser> {
    try {
      const response: AxiosResponse<GitHubUser> = await githubApi.get(`/users/${GITHUB_USERNAME}`)
      return response.data
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  }

  /**
   * Get user repositories with optional filters
   */
  static async getRepositories(options: {
    sort?: 'created' | 'updated' | 'pushed' | 'full_name'
    direction?: 'asc' | 'desc'
    per_page?: number
    type?: 'owner' | 'public' | 'private'
  } = {}): Promise<Repository[]> {
    try {
      const params = {
        sort: options.sort || 'updated',
        direction: options.direction || 'desc',
        per_page: options.per_page || 50,
        type: options.type || 'owner',
      }

      const response: AxiosResponse<Repository[]> = await githubApi.get(
        `/users/${GITHUB_USERNAME}/repos`,
        { params }
      )

      // Filter out forks and private repos for public portfolio
      return response.data.filter(repo => 
        !repo.fork && 
        !repo.private && 
        repo.name !== GITHUB_USERNAME // Exclude profile readme repo
      )
    } catch (error) {
      console.error('Error fetching repositories:', error)
      throw error
    }
  }

  /**
   * Get languages used in a repository
   */
  static async getRepositoryLanguages(owner: string, repo: string): Promise<LanguageStats> {
    try {
      const response: AxiosResponse<LanguageStats> = await githubApi.get(
        `/repos/${owner}/${repo}/languages`
      )
      return response.data
    } catch (error) {
      console.error(`Error fetching languages for ${repo}:`, error)
      return {}
    }
  }

  /**
   * Get recent commits from a repository
   */
  static async getRepositoryCommits(
    owner: string, 
    repo: string, 
    limit: number = 5
  ): Promise<Commit[]> {
    try {
      const response: AxiosResponse<Commit[]> = await githubApi.get(
        `/repos/${owner}/${repo}/commits`,
        { params: { per_page: limit } }
      )
      return response.data
    } catch (error) {
      console.error(`Error fetching commits for ${repo}:`, error)
      return []
    }
  }

  /**
   * Get repository README content
   */
  static async getRepositoryReadme(owner: string, repo: string): Promise<string | null> {
    try {
      const response = await githubApi.get(`/repos/${owner}/${repo}/readme`, {
        headers: { 'Accept': 'application/vnd.github.raw' }
      })
      return response.data
    } catch (error) {
      console.error(`Error fetching README for ${repo}:`, error)
      return null
    }
  }

  /**
   * Get user statistics (calculated from repositories)
   */
  static async getUserStats(): Promise<{
    totalRepos: number
    totalStars: number
    totalForks: number
    totalCommits: number
    languages: Record<string, number>
    recentActivity: Date
  }> {
    try {
      const repos = await this.getRepositories()
      
      let totalStars = 0
      let totalForks = 0
      let recentActivity = new Date(0)
      const languages: Record<string, number> = {}

      // Calculate stats from repositories
      for (const repo of repos) {
        totalStars += repo.stargazers_count
        totalForks += repo.forks_count
        
        if (new Date(repo.updated_at) > recentActivity) {
          recentActivity = new Date(repo.updated_at)
        }

        // Get languages for each repository
        try {
          const repoLanguages = await this.getRepositoryLanguages(repo.owner.login, repo.name)
          Object.entries(repoLanguages).forEach(([lang, bytes]) => {
            languages[lang] = (languages[lang] || 0) + bytes
          })
        } catch (error) {
          // Continue if language fetch fails for a repo
          console.warn(`Failed to fetch languages for ${repo.name}`)
        }
      }

      // Estimate total commits (this is approximate since GitHub API doesn't provide total)
      const totalCommits = repos.length * 10 // Rough estimate

      return {
        totalRepos: repos.length,
        totalStars,
        totalForks,
        totalCommits,
        languages,
        recentActivity,
      }
    } catch (error) {
      console.error('Error calculating user stats:', error)
      throw error
    }
  }

  /**
   * Get pinned repositories (using GraphQL-like approach with topics)
   */
  static async getPinnedRepositories(): Promise<Repository[]> {
    try {
      const allRepos = await this.getRepositories({ sort: 'updated', per_page: 20 })
      
      // Filter for "featured" repositories based on criteria
      return allRepos
        .filter(repo => 
          repo.stargazers_count > 0 || 
          repo.topics.includes('featured') ||
          repo.topics.includes('portfolio') ||
          repo.description?.toLowerCase().includes('portfolio')
        )
        .slice(0, 6) // Limit to 6 pinned repos
    } catch (error) {
      console.error('Error fetching pinned repositories:', error)
      throw error
    }
  }

  /**
   * Search repositories by topic or technology
   */
  static async searchRepositoriesByTopic(topic: string): Promise<Repository[]> {
    try {
      const allRepos = await this.getRepositories()
      return allRepos.filter(repo => 
        repo.topics.includes(topic.toLowerCase()) ||
        repo.language?.toLowerCase() === topic.toLowerCase() ||
        repo.description?.toLowerCase().includes(topic.toLowerCase())
      )
    } catch (error) {
      console.error(`Error searching repositories by topic "${topic}":`, error)
      return []
    }
  }

  /**
   * Get contribution activity (simplified version)
   */
  static async getContributionActivity(): Promise<{ date: string; count: number }[]> {
    try {
      const repos = await this.getRepositories({ per_page: 10 })
      const activity: { date: string; count: number }[] = []
      
      // This is a simplified version - for real contribution data,
      // you'd need GitHub GraphQL API or scrape the contribution graph
      for (const repo of repos) {
        const commits = await this.getRepositoryCommits(repo.owner.login, repo.name, 10)
        
        commits.forEach(commit => {
          const date = commit.commit.author.date.split('T')[0]
          const existing = activity.find(a => a.date === date)
          
          if (existing) {
            existing.count++
          } else {
            activity.push({ date, count: 1 })
          }
        })
      }
      
      return activity.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch (error) {
      console.error('Error fetching contribution activity:', error)
      return []
    }
  }
}

// Cache utilities for better performance
export const cacheKeys = {
  user: ['github', 'user'],
  repositories: ['github', 'repositories'],
  userStats: ['github', 'user-stats'],
  pinnedRepos: ['github', 'pinned-repositories'],
  repoLanguages: (owner: string, repo: string) => ['github', 'languages', owner, repo],
  repoCommits: (owner: string, repo: string) => ['github', 'commits', owner, repo],
  contributionActivity: ['github', 'contribution-activity'],
} as const

export default GitHubService