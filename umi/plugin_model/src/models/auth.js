import { useState, useCallback } from 'react'

export default function useAuthModel() {
  const [user, setUser] = useState(null)

  const signin = useCallback((account, password) => {
        setTimeout(()=>{
            setUser(100);
        },100)
  }, [])

  const signout = useCallback(() => {
    setTimeout(()=>{
        setUser(null);
    },100)
  }, [])

  return {
    user,
    signin,
    signout
  }
}