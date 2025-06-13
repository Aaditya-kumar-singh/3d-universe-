import { TextureLoader, CanvasTexture, Color } from 'three'

// Create a more asteroid-like texture
const createAsteroidTexture = (color: string = '#8C7853') => {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const context = canvas.getContext('2d')
  if (context) {
    // Create irregular shape
    context.beginPath()
    context.moveTo(32, 10)
    context.lineTo(50, 20)
    context.lineTo(55, 40)
    context.lineTo(45, 55)
    context.lineTo(25, 60)
    context.lineTo(10, 45)
    context.lineTo(15, 25)
    context.closePath()
    
    // Fill with base color
    context.fillStyle = color
    context.fill()
    
    // Add some texture/detail
    context.strokeStyle = '#6B5B45'
    context.lineWidth = 2
    context.stroke()
  }
  return new CanvasTexture(canvas)
}

// Create a dust particle texture
const createDustTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const context = canvas.getContext('2d')
  if (context) {
    context.beginPath()
    context.arc(32, 32, 15, 0, Math.PI * 2)
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 15)
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
    context.fillStyle = gradient
    context.fill()
  }
  return new CanvasTexture(canvas)
}

// Create particle textures
export const particleTextures = {
  asteroid: createAsteroidTexture('#8C7853'),
  dust: createDustTexture(),
  ring: createAsteroidTexture('#FAD5A5'),
  star: createDustTexture()
}

// Configure texture properties
Object.values(particleTextures).forEach(texture => {
  texture.needsUpdate = true
})

// Particle size ranges
export const particleSizes = {
  asteroid: { min: 0.2, max: 0.5 },
  dust: { min: 0.05, max: 0.15 },
  ring: { min: 0.3, max: 0.6 },
  star: { min: 0.1, max: 0.2 }
}

// Reduced particle count configurations
export const particleCounts = {
  asteroidBelt: 2000,    // Reduced from 5000
  saturnRings: 3000,     // Reduced from 10000
  spaceDust: 5000        // Reduced from 20000
} 