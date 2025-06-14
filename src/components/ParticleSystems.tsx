import { useRef, useMemo, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { BufferGeometry, BufferAttribute, Points, Vector3, Color, PointsMaterial } from 'three'
import { particleTextures, particleSizes, particleCounts } from '../utils/particleTextures'

interface ParticleSystemsProps {
  saturnPosition: Vector3
  saturnSpeed: number
  time: number
}

export default function ParticleSystems({ saturnPosition, saturnSpeed, time }: ParticleSystemsProps) {
  const asteroidBeltRef = useRef<Points>(null)
  const saturnRingsRef = useRef<Points>(null)
  const spaceDustRef = useRef<Points>(null)

  // Create asteroid belt particles
  const asteroidBeltGeometry = useMemo(() => {
    const geometry = new BufferGeometry()
    const positions = new Float32Array(particleCounts.asteroidBelt * 3)
    const sizes = new Float32Array(particleCounts.asteroidBelt)
    const colors = new Float32Array(particleCounts.asteroidBelt * 3)

    for (let i = 0; i < particleCounts.asteroidBelt; i++) {
      const i3 = i * 3
      const radius = 28 + Math.random() * 4 // Between Mars and Jupiter
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * 0.2 // Slight inclination

      positions[i3] = radius * Math.cos(theta) * Math.cos(phi)
      positions[i3 + 1] = radius * Math.sin(phi)
      positions[i3 + 2] = radius * Math.sin(theta) * Math.cos(phi)

      sizes[i] = Math.random() * (particleSizes.asteroid.max - particleSizes.asteroid.min) + particleSizes.asteroid.min

      const color = new Color()
      color.setHSL(0.1, 0.3, 0.3 + Math.random() * 0.2)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.setAttribute('size', new BufferAttribute(sizes, 1))
    geometry.setAttribute('color', new BufferAttribute(colors, 3))

    return geometry
  }, [])

  // Create Saturn's rings particles
  const saturnRingsGeometry = useMemo(() => {
    const geometry = new BufferGeometry()
    const positions = new Float32Array(particleCounts.saturnRings * 3)
    const sizes = new Float32Array(particleCounts.saturnRings)
    const colors = new Float32Array(particleCounts.saturnRings * 3)

    for (let i = 0; i < particleCounts.saturnRings; i++) {
      const i3 = i * 3
      const radius = 3 + Math.random() * 2 // Ring radius
      const theta = Math.random() * Math.PI * 2
      const height = (Math.random() - 0.5) * 0.05 // Thinner ring for better appearance

      // Position rings relative to Saturn's center
      positions[i3] = radius * Math.cos(theta)
      positions[i3 + 1] = height
      positions[i3 + 2] = radius * Math.sin(theta)

      sizes[i] = Math.random() * (particleSizes.ring.max - particleSizes.ring.min) + particleSizes.ring.min

      const color = new Color()
      color.setHSL(0.1, 0.4, 0.6 + Math.random() * 0.2)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.setAttribute('size', new BufferAttribute(sizes, 1))
    geometry.setAttribute('color', new BufferAttribute(colors, 3))

    return geometry
  }, [])

  // Create space dust particles
  const spaceDustGeometry = useMemo(() => {
    const geometry = new BufferGeometry()
    const positions = new Float32Array(particleCounts.spaceDust * 3)
    const sizes = new Float32Array(particleCounts.spaceDust)
    const colors = new Float32Array(particleCounts.spaceDust * 3)

    for (let i = 0; i < particleCounts.spaceDust; i++) {
      const i3 = i * 3
      const radius = Math.random() * 100
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      sizes[i] = Math.random() * (particleSizes.dust.max - particleSizes.dust.min) + particleSizes.dust.min

      const color = new Color()
      color.setHSL(0.6, 0.3, 0.3 + Math.random() * 0.2)
      colors[i3] = color.r
      colors[i3 + 1] = color.g
      colors[i3 + 2] = color.b
    }

    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.setAttribute('size', new BufferAttribute(sizes, 1))
    geometry.setAttribute('color', new BufferAttribute(colors, 3))

    return geometry
  }, [])

  // Update Saturn's rings position and rotation
  const updateSaturnRings = useCallback(() => {
    if (saturnRingsRef.current) {
      // Update position to match Saturn
      saturnRingsRef.current.position.copy(saturnPosition)
      // Update rotation to match orbital speed
      saturnRingsRef.current.rotation.y = time * saturnSpeed
    }
  }, [saturnPosition, saturnSpeed, time])

  useFrame((_, delta) => {
    if (asteroidBeltRef.current) {
      // Match asteroid belt rotation with planets
      asteroidBeltRef.current.rotation.y += delta * 0.034 // Match Saturn's speed
    }
    
    // Update Saturn's rings
    updateSaturnRings()
    
    if (spaceDustRef.current) {
      // Keep space dust rotation slow
      spaceDustRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group>
      {/* Asteroid Belt */}
      <points ref={asteroidBeltRef}>
        <primitive object={asteroidBeltGeometry} />
        <pointsMaterial
          map={particleTextures.asteroid}
          size={2}
          transparent
          blending={1}
          depthWrite={false}
          vertexColors
          sizeAttenuation={true}
        />
      </points>

      {/* Saturn's Rings */}
      <points ref={saturnRingsRef} position={saturnPosition}>
        <primitive object={saturnRingsGeometry} />
        <pointsMaterial
          map={particleTextures.ring}
          size={2}
          transparent
          blending={1}
          depthWrite={false}
          vertexColors
          sizeAttenuation={true}
        />
      </points>

      {/* Space Dust */}
      <points ref={spaceDustRef}>
        <primitive object={spaceDustGeometry} />
        <pointsMaterial
          map={particleTextures.dust}
          size={1.5}
          transparent
          blending={1}
          depthWrite={false}
          vertexColors
          sizeAttenuation={true}
        />
      </points>
    </group>
  )
} 