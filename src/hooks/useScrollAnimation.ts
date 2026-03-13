import { useEffect, useRef, useState } from 'react'

interface AnimationOptions {
  threshold?: number
  rootMargin?: string
}

export const useScrollAnimation = (options: AnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = '0px' } = options
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin])

  return { elementRef, isVisible }
}
