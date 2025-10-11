import { useBoundStore } from '../stores/index'
import { loginService, registerService } from '../services/auth.service'
import type { LoginInput, RegisterInput } from '../interfaces/auth.interface'

export const useAuth = () => {
  const signIn = useBoundStore((state) => state.signIn)

  const handleRegister = async (data: RegisterInput) => {

    try {
      const { user, access_token: token } = await registerService(data)

      signIn(user)
      window.localStorage.setItem('token', token)


    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async (data: LoginInput) => {

    try {
      const { user, access_token: token } = await loginService(data)

      signIn(user)
      window.localStorage.setItem('token', token)

    } catch (error) {
      console.log(error)
    }
  }

  return {
    handleRegister,
    handleLogin
  }
}