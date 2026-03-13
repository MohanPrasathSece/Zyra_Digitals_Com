import { useState, useEffect } from 'react'

interface TypewriterProps {
  text: string
  speed?: number
  className?: string
  delay?: number
}

export const Typewriter = ({ 
  text, 
  speed = 100, 
  className = '', 
  delay = 0 
}: TypewriterProps) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [currentIndex, text, speed, delay])

  useEffect(() => {
    setDisplayText('')
    setCurrentIndex(0)
  }, [text])

  return (
    <span className={className}>
      {displayText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  )
}
