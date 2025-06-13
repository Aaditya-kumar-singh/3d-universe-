import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Vector3, Mesh } from 'three'
import { createPlanetMaterial } from '../utils/textureLoader'

interface PlanetProps {
  name: string
  size: number
  distance: number
  color: string
  speed: number
  inclination: number
  phase: number
}

export default function Planet({ name, size, distance, speed, inclination, phase }: PlanetProps) {
  const planetRef = useRef<Mesh>(null)
  const time = useRef(Date.now() * 0.001)

  useFrame((_, delta) => {
    if (planetRef.current) {
      // Update time
      time.current += delta

      // Calculate orbital position
      const angle = time.current * speed + phase
      const x = Math.cos(angle) * distance
      const z = Math.sin(angle) * distance
      const y = Math.sin(angle) * distance * inclination

      // Update position
      planetRef.current.position.set(x, y, z)

      // Rotate planet
      planetRef.current.rotation.y += delta * 0.5
    }
  })

  // Create material with textures
  const material = createPlanetMaterial(name)

  return (
    <mesh ref={planetRef} castShadow receiveShadow>
      <sphereGeometry args={[size, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
} 