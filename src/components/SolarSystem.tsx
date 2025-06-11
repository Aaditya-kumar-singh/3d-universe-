import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, PointLight, MeshStandardMaterial } from 'three'
import Planet from './Planet'
import Orbit from './Orbit'

// Updated planet colors and names
const PLANET_DATA = [
  {
    name: 'Mercury',
    size: 0.8,
    distance: 10,
    speed: 3.1, // Fastest orbit
    color: '#1a1a1a', // Mercury: really dark
    inclination: 0.034 // ~7 degrees
  },
  {
    name: 'Venus',
    size: 1.2,
    distance: 16,
    speed: 1.6,
    color: '#e6e6e6', // Venus: light gray
    inclination: 0.009 // ~3.4 degrees
  },
  {
    name: 'Earth',
    size: 1.5,
    distance: 22,
    speed: 1,
    color: '#2f6a69', // Earth: teal/greenish
    inclination: 0 // Reference plane
  },
  {
    name: 'Mars',
    size: 1.2,
    distance: 28,
    speed: 0.53,
    color: '#993d00', // Mars: reddish brown
    inclination: 0.032 // ~5.7 degrees
  },
  {
    name: 'Jupiter',
    size: 3,
    distance: 36,
    speed: 0.084,
    color: '#b07f35', // Jupiter: brownish
    inclination: 0.022 // ~1.3 degrees
  },
  {
    name: 'Saturn',
    size: 2.5,
    distance: 44,
    speed: 0.034,
    color: '#b08f36', // Saturn: yellowish brown
    inclination: 0.043 // ~2.5 degrees
  },
  {
    name: 'Uranus',
    size: 2,
    distance: 52,
    speed: 0.012,
    color: '#5580aa', // Uranus: blue-gray
    inclination: 0.013 // ~0.8 degrees
  },
  {
    name: 'Neptune',
    size: 2,
    distance: 60,
    speed: 0.006,
    color: '#366896', // Neptune: deep blue
    inclination: 0.030 // ~1.8 degrees
  }
]

export default function SolarSystem() {
  const sunRef = useRef<Mesh>(null)
  const sunLightRef = useRef<PointLight>(null)
  const time = useRef(0)

  useFrame((state, delta) => {
    if (sunRef.current && sunLightRef.current) {
      // Rotate sun
      sunRef.current.rotation.y += delta * 0.2

      // Pulsating light effect
      time.current += delta
      const pulse = Math.sin(time.current * 2) * 0.2 + 1.8 // Oscillate between 1.6 and 2.0
      sunLightRef.current.intensity = pulse

      // Subtle color variation
      const hue = (Math.sin(time.current * 0.5) * 0.05 + 0.1) // Oscillate around yellow
      const material = sunRef.current.material as MeshStandardMaterial
      material.emissive.setHSL(hue, 1, 0.5)
    }
  })

  return (
    <group>
      {/* Sun */}
      <mesh ref={sunRef} position={[0, 0, 0]}>
        <sphereGeometry args={[4, 64, 64]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={1.5}
          metalness={0.4}
          roughness={0.6}
        />
        <pointLight
          ref={sunLightRef}
          position={[0, 0, 0]}
          intensity={2}
          color="#FFD700"
          distance={150}
        />
        {/* Sun's corona/glow */}
        <mesh>
          <sphereGeometry args={[4.5, 64, 64]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.2}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[5, 64, 64]} />
          <meshBasicMaterial
            color="#FFD700"
            transparent
            opacity={0.1}
          />
        </mesh>
      </mesh>

      {/* Planets */}
      {PLANET_DATA.map((planet) => (
        <group key={planet.name}>
          <Orbit radius={planet.distance} />
          <Planet
            name={planet.name}
            size={planet.size}
            distance={planet.distance}
            color={planet.color}
            speed={planet.speed}
            inclination={planet.inclination}
          />
        </group>
      ))}
    </group>
  )
} 