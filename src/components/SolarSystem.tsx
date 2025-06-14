import { useRef, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import { Environment } from '@react-three/drei'
import Planet from './Planet'
import Orbit from './Orbit'
import LightingSystem from './LightingSystem'
import ParticleSystems from './ParticleSystems'

// Updated planet colors, names, and unique phase for each
const PLANET_DATA = [
  {
    name: 'Mercury',
    size: 0.8,
    distance: 10,
    speed: 4.1,
    color: '#8C7853', // Grayish-brown with subtle warmth
    inclination: 0.034,
    phase: 0
  },
  {
    name: 'Venus',
    size: 1.2,
    distance: 16,
    speed: 1.6,
    color: '#FFC649', // Bright golden yellow
    inclination: 0.009,
    phase: Math.PI / 4
  },
  {
    name: 'Earth',
    size: 1.5,
    distance: 22,
    speed: 1,
    color: '#6B93D6', // Vibrant blue with slight saturation
    inclination: 0,
    phase: Math.PI / 2
  },
  {
    name: 'Mars',
    size: 1.2,
    distance: 28,
    speed: 0.53,
    color: '#CD5C5C', // Rusty red-orange
    inclination: 0.032,
    phase: (3 * Math.PI) / 4
  },
  {
    name: 'Jupiter',
    size: 3,
    distance: 36,
    speed: 0.084,
    color: '#D8CA9D', // Creamy beige with orange undertones
    inclination: 0.022,
    phase: Math.PI
  },
  {
    name: 'Saturn',
    size: 2.5,
    distance: 44,
    speed: 0.034,
    color: '#FAD5A5', // Pale golden yellow
    inclination: 0.043,
    phase: (5 * Math.PI) / 4
  },
  {
    name: 'Uranus',
    size: 2,
    distance: 52,
    speed: 0.012,
    color: '#4FD0E7', // Cyan-blue
    inclination: 0.013,
    phase: (3 * Math.PI) / 2
  },
  {
    name: 'Neptune',
    size: 2,
    distance: 60,
    speed: 0.006,
    color: '#4B70DD', // Deep blue
    inclination: 0.030,
    phase: (7 * Math.PI) / 4
  }
]

export default function SolarSystem() {
  const sunRef = useRef<Mesh>(null)
  const time = useRef(0)
  const sunPosition = new Vector3(0, 0, 0)
  
  // Get Saturn's data
  const saturnData = PLANET_DATA.find(planet => planet.name === 'Saturn')
  
  // Calculate Saturn's position
  const calculateSaturnPosition = useCallback(() => {
    if (!saturnData) return new Vector3(44, 0, 0)
    
    const angle = time.current * saturnData.speed + saturnData.phase
    const x = Math.cos(angle) * saturnData.distance
    const z = Math.sin(angle) * saturnData.distance
    const y = Math.sin(angle) * saturnData.distance * saturnData.inclination
    
    return new Vector3(x, y, z)
  }, [saturnData, time])

  useFrame((_, delta) => {
    if (sunRef.current) {
      // Rotate sun
      sunRef.current.rotation.y += delta * 0.2

      // Update time for animations
      time.current += delta
    }
  })

  // Find Saturn's speed from PLANET_DATA
  const saturnSpeed = saturnData?.speed || 0.034
  const saturnPosition = calculateSaturnPosition()

  return (
    <group>
      {/* Environment map for reflections */}
      <Environment preset="night" />

      {/* Lighting System */}
      <LightingSystem sunPosition={sunPosition} intensity={2} />

      {/* Particle Systems */}
      <ParticleSystems 
        saturnPosition={saturnPosition} 
        saturnSpeed={saturnSpeed}
        time={time.current}
      />

      {/* Sun */}
      <mesh ref={sunRef} position={sunPosition} castShadow>
        <sphereGeometry args={[4, 64, 64]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={1.5}
          metalness={0.4}
          roughness={0.6}
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
            phase={planet.phase}
          />
        </group>
      ))}
    </group>
  )
} 