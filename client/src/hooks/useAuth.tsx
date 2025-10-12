import { useBoundStore } from '../stores/index'
import { loginService, registerService, validateTokenService } from '../services/auth.service'
import type { LoginInput, RegisterInput } from '../interfaces/auth.interface'

export const useAuth = () => {
  const status = useBoundStore((state) => state.status)
  const user = useBoundStore((state) => state?.user)

  const signIn = useBoundStore((state) => state.signIn)
  const signOut = useBoundStore((state) => state.signOut)

  const handleRegister = async (data: RegisterInput) => {
    try {
      const { user, access_token: token } = await registerService(data)

      signIn(user)
      window.localStorage.setItem('token', token)
    } catch (error) {
      throw error
    }
  }

  const handleLogin = async (data: LoginInput) => {

    try {
      const { user, access_token: token } = await loginService(data)

      signIn(user)
      window.localStorage.setItem('token', token)

    } catch (error) {
      throw error
    }
  }

  const handleValidateToken = async () => {

    const token = window.localStorage.getItem('token')

    if (!token) {
      signOut()
      return
    }

    try {
      const { user, new_access_token: newToken } = await validateTokenService(token)

      window.localStorage.setItem('token', newToken)

      signIn(user)
    } catch (error) {
      signOut()
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('token')
    signOut()
  }

  return {
    handleRegister,
    handleLogin,
    handleValidateToken,
    status,
    isAuthenticated: status === 'AUTHENTICATED',
    user,
    handleLogout
  }
}