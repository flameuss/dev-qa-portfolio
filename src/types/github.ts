// GitHub API Response Types

export interface GitHubUser {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string | null
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: 'User' | 'Organization'
  site_admin: boolean
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  hireable: boolean | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface Repository {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: {
    login: string
    id: number
    avatar_url: string
    html_url: string
    type: string
  }
  html_url: string
  description: string | null
  fork: boolean
  url: string
  archive_url: string
  assignees_url: string
  blobs_url: string
  branches_url: string
  collaborators_url: string
  comments_url: string
  commits_url: string
  compare_url: string
  contents_url: string
  contributors_url: string
  deployments_url: string
  downloads_url: string
  events_url: string
  forks_url: string
  git_commits_url: string
  git_refs_url: string
  git_tags_url: string
  git_url: string
  issue_comment_url: string
  issue_events_url: string
  issues_url: string
  keys_url: string
  labels_url: string
  languages_url: string
  merges_url: string
  milestones_url: string
  notifications_url: string
  pulls_url: string
  releases_url: string
  ssh_url: string
  stargazers_url: string
  statuses_url: string
  subscribers_url: string
  subscription_url: string
  tags_url: string
  teams_url: string
  trees_url: string
  clone_url: string
  mirror_url: string | null
  hooks_url: string
  svn_url: string
  homepage: string | null
  language: string | null
  forks_count: number
  stargazers_count: number
  watchers_count: number
  size: number
  default_branch: string
  open_issues_count: number
  is_template: boolean
  topics: string[]
  has_issues: boolean
  has_projects: boolean
  has_wiki: boolean
  has_pages: boolean
  has_downloads: boolean
  archived: boolean
  disabled: boolean
  visibility: 'public' | 'private'
  pushed_at: string | null
  created_at: string
  updated_at: string
  permissions?: {
    admin: boolean
    maintain: boolean
    push: boolean
    triage: boolean
    pull: boolean
  }
  allow_rebase_merge: boolean
  template_repository: Repository | null
  temp_clone_token: string | null
  allow_squash_merge: boolean
  allow_auto_merge: boolean
  delete_branch_on_merge: boolean
  allow_merge_commit: boolean
  subscribers_count?: number
  network_count?: number
  license: {
    key: string
    name: string
    spdx_id: string
    url: string
    node_id: string
  } | null
}

export interface LanguageStats {
  [language: string]: number
}

export interface Commit {
  sha: string
  node_id: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    committer: {
      name: string
      email: string
      date: string
    }
    message: string
    tree: {
      sha: string
      url: string
    }
    url: string
    comment_count: number
    verification: {
      verified: boolean
      reason: string
      signature: string | null
      payload: string | null
    }
  }
  url: string
  html_url: string
  comments_url: string
  author: {
    login: string
    id: number
    avatar_url: string
    html_url: string
    type: string
  } | null
  committer: {
    login: string
    id: number
    avatar_url: string
    html_url: string
    type: string
  } | null
  parents: {
    sha: string
    url: string
    html_url: string
  }[]
}

export interface GitHubContributor {
  login: string
  id: number
  avatar_url: string
  html_url: string
  contributions: number
  type: string
}

export interface GitHubRelease {
  id: number
  tag_name: string
  target_commitish: string
  name: string | null
  body: string | null
  draft: boolean
  prerelease: boolean
  created_at: string
  published_at: string | null
  author: {
    login: string
    id: number
    avatar_url: string
    html_url: string
  }
  assets: GitHubAsset[]
  tarball_url: string
  zipball_url: string
  html_url: string
}

export interface GitHubAsset {
  id: number
  name: string
  label: string | null
  content_type: string
  state: 'uploaded'
  size: number
  download_count: number
  created_at: string
  updated_at: string
  browser_download_url: string
}

// Custom Portfolio Types

export interface ProjectCard {
  id: number
  title: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl: string
  imageUrl?: string
  featured: boolean
  status: 'active' | 'archived' | 'in-progress'
  stars: number
  forks: number
  language: string | null
  lastUpdate: string
  topics: string[]
}

export interface TechStack {
  category: 'Frontend' | 'Backend' | 'Testing' | 'DevOps' | 'Database' | 'Mobile' | 'Other'
  technologies: {
    name: string
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
    yearsOfExperience: number
    icon?: string
    color?: string
    usage: number // bytes of code written in this technology
  }[]
}

export interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  totalCommits: number
  contributionStreak: number
  languageDistribution: {
    [language: string]: {
      bytes: number
      percentage: number
      color: string
    }
  }
  activityLevel: 'Low' | 'Medium' | 'High' | 'Very High'
  recentActivity: {
    date: string
    type: 'commit' | 'pr' | 'issue' | 'release'
    repository: string
    message: string
  }[]
}

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4 // GitHub's contribution levels
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface ContributionCalendar {
  totalContributions: number
  weeks: ContributionWeek[]
}

// API Error Types
export interface GitHubError {
  message: string
  documentation_url?: string
  errors?: {
    resource: string
    field: string
    code: string
  }[]
}

export interface RateLimitInfo {
  limit: number
  remaining: number
  reset: number
  used: number
  resource: string
}

// Hook Return Types
export interface UseGitHubUserResult {
  user: GitHubUser | undefined
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

export interface UseGitHubRepositoriesResult {
  repositories: Repository[]
  isLoading: boolean
  error: Error | null
  refetch: () => void
  hasNextPage: boolean
  fetchNextPage: () => void
}

export interface UseGitHubStatsResult {
  stats: GitHubStats | undefined
  isLoading: boolean
  error: Error | null
  refetch: () => void
}