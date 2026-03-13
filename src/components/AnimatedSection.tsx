import { ReactNode, useEffect, useRef, useState } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  animation?: 'fade-up' | 'slide-up' | 'fade-in' | 'slide-left' | 'slide-right'
  delay?: number
  className?: string
  threshold?: number
}

export const AnimatedSection = ({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
  threshold = 0.1
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

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
      { threshold }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold])

  const getAnimationClass = () => {
    const baseClass = 'transition-all duration-700 ease-out'

    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return `${baseClass} opacity-0 translate-y-10`
        case 'slide-up':
          return `${baseClass} opacity-0 translate-y-20`
        case 'fade-in':
          return `${baseClass} opacity-0`
        case 'slide-left':
          return `${baseClass} opacity-0 translate-x-10`
        case 'slide-right':
          return `${baseClass} opacity-0 -translate-x-10`
        default:
          return `${baseClass} opacity-0 translate-y-10`
      }
    }

    return `${baseClass} opacity-100 translate-y-0 translate-x-0`
  }

  return (
    <div ref={elementRef} className={`${getAnimationClass()} ${className}`}>
      {children}
    </div>
  )
}
