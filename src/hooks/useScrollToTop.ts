import { useEffect } from 'react'

export const useScrollToTop = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0)
  }, [])
}
