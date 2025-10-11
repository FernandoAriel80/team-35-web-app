import { useBoundStore } from '../stores/index'

export const useAuth = () => {

  const login = useBoundStore((state) => state.signIn)


  const signIn = () => {

    // login()
    // call service
  }

  return {

  }
}
