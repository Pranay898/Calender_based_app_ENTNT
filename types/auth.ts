export type UserRole = 'admin' | 'user'

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

