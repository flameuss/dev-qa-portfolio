import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react'
import { GitHubService } from '@services/github'
import type { GitHubUser, Repository } from '@/types/github'

interface GitHubContextValue {
  user: GitHubUser | undefined
  repositories: Repository[]
  isLoadingUser: boolean
  isLoadingRepos: boolean
  userError: Error | null
  reposError: Error | null
  refetchUser: () => void
  refetchRepos: () => void
}

const GitHubContext = createContext<GitHubContextValue | undefined>(undefined)

interface GitHubProviderProps {
  children: ReactNode
}

export function GitHubProvider({ children }: GitHubProviderProps) {
  const [user, setUser] = useState<GitHubUser | undefined>(undefined)
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [isLoadingRepos, setIsLoadingRepos] = useState(true)
  const [userError, setUserError] = useState<Error | null>(null)
  const [reposError, setReposError] = useState<Error | null>(null)

  const fetchUser = useCallback(async () => {
    setIsLoadingUser(true)
    setUserError(null)
    try {
      const userData = await GitHubService.getUser()
      setUser(userData)
    } catch (error) {
      setUserError(error as Error)
    } finally {
      setIsLoadingUser(false)
    }
  }, [])

  const fetchRepos = useCallback(async () => {
    setIsLoadingRepos(true)
    setReposError(null)
    try {
      const reposData = await GitHubService.getRepositories()
      setRepositories(reposData)
    } catch (error) {
      setReposError(error as Error)
    } finally {
      setIsLoadingRepos(false)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  useEffect(() => {
    if (user) {
      fetchRepos()
    }
  }, [user, fetchRepos])

  const value: GitHubContextValue = {
    user,
    repositories,
    isLoadingUser,
    isLoadingRepos,
    userError,
    reposError,
    refetchUser: fetchUser,
    refetchRepos: fetchRepos,
  }

  return (
    <GitHubContext.Provider value={value}>
      {children}
    </GitHubContext.Provider>
  )
}

export function useGitHub() {
  const context = useContext(GitHubContext)
  
  if (context === undefined) {
    throw new Error('useGitHub must be used within a GitHubProvider')
  }
  
  return context
}

// Individual hooks for specific data
export function useGitHubUser() {
  const { user, isLoadingUser, userError, refetchUser } = useGitHub()
  return {
    user,
    isLoading: isLoadingUser,
    error: userError,
    refetch: refetchUser,
  }
}

export function useGitHubRepositories() {
  const { repositories, isLoadingRepos, reposError, refetchRepos } = useGitHub()
  return {
    repositories,
    isLoading: isLoadingRepos,
    error: reposError,
    refetch: refetchRepos,
  }
}