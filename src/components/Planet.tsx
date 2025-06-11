import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface PlanetProps {
  name: string
  size: number
  distance: number
  color: string
  speed: number
  inclination: number
  phase: number
  texture?: string
}

export default function Planet({ name, size, distance, color, speed, inclination, phase }: PlanetProps) {
  const groupRef = useRef<Group>(null)
  const meshRef = useRef<Mesh>(null)
  const time = useRef(0)
  const [showMessage, setShowMessage] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useFrame((_, delta) => {
    if (groupRef.current && meshRef.current) {
      // Update orbital position with phase offset
      time.current += delta * speed
      const x = Math.cos(time.current + phase) * distance
      const z = Math.sin(time.current + phase) * distance
      
      // Apply orbital inclination
      const y = Math.sin(time.current + phase) * Math.sin(inclination) * distance
      
      // Update planet position
      groupRef.current.position.set(x, y, z)
      
      // Rotate planet on its axis
      meshRef.current.rotation.y += delta * 2

      // Scale effect when hovered
      if (isHovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1)
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
      }
    }
  })

  const handleClick = () => {
    setShowMessage(true)
    // Hide message after 3 seconds
    setTimeout(() => setShowMessage(false), 3000)
  }

  return (
    <group ref={groupRef}>
      <mesh 
        ref={meshRef} 
        onClick={handleClick}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          color={color}
          metalness={0.2}
          roughness={0.8}
          emissive={color}
          emissiveIntensity={isHovered ? 0.4 : 0.2}
        />
        <pointLight
          position={[0, 0, 0]}
          intensity={0.5}
          color={color}
          distance={size * 3}
        />
      </mesh>
      {showMessage && (
        <Text
          position={[0, size + 1, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {`Hello from ${name}!`}
        </Text>
      )}
    </group>
  )
} 