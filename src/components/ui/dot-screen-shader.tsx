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
  gridSize = 50,
  dotOpacity = 0.15
}: DotScreenShaderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 })
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 34, g: 211, b: 238 }
  }

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const dot = hexToRgb(dotColor)

    // Smooth mouse following
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08

    // Clear with background
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)

    const cellSize = Math.min(width, height) / gridSize
    const cols = Math.ceil(width / cellSize) + 1
    const rows = Math.ceil(height / cellSize) + 1

    timeRef.current += 0.012

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = i * cellSize + cellSize / 2
        const y = j * cellSize + cellSize / 2

        // Distance from bottom-right area (creates gradient from there)
        const centerX = width * 0.8
        const centerY = height * 0.9
        const distFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2))
        const maxDist = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) * 0.8
        const normalizedDist = Math.min(distFromCenter / maxDist, 1)

        // Mouse influence - bigger radius
        const distFromMouse = Math.sqrt(
          Math.pow(x - mouseRef.current.x, 2) + 
          Math.pow(y - mouseRef.current.y, 2)
        )
        const mouseRadius = 250
        const mouseInfluence = Math.max(0, 1 - distFromMouse / mouseRadius)

        // Animated wave - slower and subtler
        const wave = Math.sin(timeRef.current * 1.5 + normalizedDist * 8) * 0.2 + 0.8

        // Calculate dot size - uniform base with variation from distance
        const baseSize = cellSize * 0.12 + normalizedDist * cellSize * 0.15
        const size = Math.max(1, baseSize * (1 + mouseInfluence * 0.8) * wave)

        // Calculate opacity - visible across more of the screen
        const edgeFade = Math.min(
          x / (width * 0.1),
          (width - x) / (width * 0.1),
          y / (height * 0.1),
          (height - y) / (height * 0.1),
          1
        )
        const distanceFade = 0.3 + normalizedDist * 0.7
        const opacity = dotOpacity * edgeFade * distanceFade * wave * (1 + mouseInfluence * 4)

        if (size > 0.3) {
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${dot.r}, ${dot.g}, ${dot.b}, ${Math.min(opacity, 0.6)})`
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
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
    }

    const handleMouseMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
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
      style={{ zIndex: 0 }}
    />
  )
}

export default DotScreenShader
