import { useBoundStore } from '../stores/index'
import { loginService, registerService, validateTokenService } from '../services/auth.service'
import type { LoginInput, RegisterInput } from '../interfaces/auth.interface'

export const useAuth = () => {
  const signIn = useBoundStore((state) => state.signIn)
  const signOut = useBoundStore((state) => state.signOut)

  const status = useBoundStore((state) => state.status)

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

  const handleValidateToken = async () => {

    const token = window.localStorage.getItem('token')

    if (!token) throw new Error('Whitout token')

    try {
      const { new_access_token: newToken } = await validateTokenService(token)

      window.localStorage.setItem('token', newToken)

      // todo: change by real user returned
      signIn({
        name: 'Gaspar',
        email: 'test@gmail.com',
        id: 'dflsljf',
        role: 'USER'
      })

      console.log('Token renew', token)
    } catch (error) {
      console.log('Token error')
      signOut()
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleValidateToken,
    status
  }
}