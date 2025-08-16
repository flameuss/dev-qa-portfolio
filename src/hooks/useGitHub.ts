import { useState, useEffect, useCallback } from 'react'
import { GitHubService } from '@services/github'

export function useGitHubStats() {
  const [stats, setStats] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchStats = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await GitHubService.getUserStats()
      setStats(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  return { data: stats, isLoading, error, refetch: fetchStats }
}

export function usePinnedRepositories() {
  const [repos, setRepos] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchPinnedRepos = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await GitHubService.getPinnedRepositories()
      setRepos(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPinnedRepos()
  }, [fetchPinnedRepos])

  return { data: repos, isLoading, error, refetch: fetchPinnedRepos }
}

export function useRepositoryLanguages(owner: string, repo: string, enabled = true) {
  const [languages, setLanguages] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchLanguages = useCallback(async () => {
    if (!enabled || !owner || !repo) return
    setIsLoading(true)
    setError(null)
    try {
      const data = await GitHubService.getRepositoryLanguages(owner, repo)
      setLanguages(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [owner, repo, enabled])

  useEffect(() => {
    fetchLanguages()
  }, [fetchLanguages])

  return { data: languages, isLoading, error, refetch: fetchLanguages }
}

export function useRepositoryCommits(owner: string, repo: string, enabled = true) {
  const [commits, setCommits] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchCommits = useCallback(async () => {
    if (!enabled || !owner || !repo) return
    setIsLoading(true)
    setError(null)
    try {
      const data = await GitHubService.getRepositoryCommits(owner, repo)
      setCommits(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [owner, repo, enabled])

  useEffect(() => {
    fetchCommits()
  }, [fetchCommits])

  return { data: commits, isLoading, error, refetch: fetchCommits }
}

export function useContributionActivity() {
  const [activity, setActivity] = useState<any[]>( [])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchActivity = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await GitHubService.getContributionActivity()
      setActivity(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchActivity()
  }, [fetchActivity])

  return { data: activity, isLoading, error, refetch: fetchActivity }
}