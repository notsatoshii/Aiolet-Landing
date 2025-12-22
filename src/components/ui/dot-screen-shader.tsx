import { useRef, useEffect, useCallback } from 'react'

interface DotScreenShaderProps {
  dotColor?: string
  bgColor?: string
  gridSize?: number
  dotOpacity?: number
}

export const DotScreenShader = ({
  dotColor = '#22d3ee',
  bgColor = '#09090b',
  gridSize = 60,
  dotOpacity = 0.08
}: DotScreenShaderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 }
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const dot = hexToRgb(dotColor)
    const bg = hexToRgb(bgColor)

    // Smooth mouse following
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1

    // Clear with background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)

    const cellSize = Math.max(width, height) / gridSize
    const cols = Math.ceil(width / cellSize) + 1
    const rows = Math.ceil(height / cellSize) + 1

    timeRef.current += 0.016

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * cellSize + cellSize / 2
        const y = j * cellSize + cellSize / 2

        // Distance from center of screen
        const centerX = width * 0.7
        const centerY = height * 1.1
        const distFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
        const maxDist = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
        const normalizedDist = distFromCenter / maxDist

        // Mouse influence
        const distFromMouse = Math.sqrt(
          Math.pow(x - mouseRef.current.x, 2) + 
          Math.pow(y - mouseRef.current.y, 2)
        )
        const mouseInfluence = Math.max(0, 1 - distFromMouse / 200)

        // Animated wave
        const wave = Math.sin(timeRef.current * 2 + normalizedDist * 10) * 0.3 + 0.7

        // Calculate dot size
        const baseSize = Math.min(normalizedDist * normalizedDist * cellSize * 0.4, cellSize * 0.35)
        const size = baseSize * (1 + mouseInfluence * 0.5) * wave

        // Calculate opacity
        const screenMask = 1 - (y / height) * 0.5
        const circleMask = Math.min(1, normalizedDist * 1.5)
        const opacity = dotOpacity * screenMask * circleMask * (1 + mouseInfluence * 3)

        if (size > 0.5 && opacity > 0.001) {
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${dot.r}, ${dot.g}, ${dot.b}, ${opacity})`
          ctx.fill()
        }
      }
    }

    animationRef.current = requestAnimationFrame(draw)
  }, [dotColor, bgColor, gridSize, dotOpacity])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    const handleMouseMove = (e: MouseEvent) => {
      const dpr = window.devicePixelRatio || 1
      mouseRef.current.targetX = e.clientX * dpr
      mouseRef.current.targetY = e.clientY * dpr
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove)
    
    animationRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  )
}

export default DotScreenShader
