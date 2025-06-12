import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, MeshStandardMaterial } from 'three'
import { usePlanetTextures, createPlanetMaterial } from '../utils/textureLoader'

interface PlanetProps {
  name: string
  size: number
  distance: number
  color: string
  speed: number
  inclination: number
  phase: number
}

export default function Planet({ name, size, distance, color, speed, inclination, phase }: PlanetProps) {
  const meshRef = useRef<Mesh>(null)
  const { diffuseMap, normalMap, specularMap } = usePlanetTextures(name)

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Rotate the planet
      meshRef.current.rotation.y += delta * 0.5

      // Orbit around the sun
      const time = Date.now() * 0.001 * speed
      const x = Math.cos(time + phase) * distance
      const z = Math.sin(time + phase) * distance
      const y = Math.sin(time + phase) * distance * inclination

      meshRef.current.position.set(x, y, z)
    }
  })

  // Create material with textures or fallback to basic material
  const material = diffuseMap
    ? createPlanetMaterial(diffuseMap, normalMap, specularMap, {
        metalness: 0.1,
        roughness: 0.8,
        normalScale: 1
      })
    : new MeshStandardMaterial({
        color,
        metalness: 0.1,
        roughness: 0.8
      })

  return (
    <mesh ref={meshRef} material={material} castShadow receiveShadow>
      <sphereGeometry args={[size, 64, 64]} />
    </mesh>
  )
} 