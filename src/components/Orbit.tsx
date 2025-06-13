import { useMemo } from 'react'
import { Line } from '@react-three/drei'
import * as THREE from 'three'

interface OrbitProps {
  radius: number
}

export default function Orbit({ radius }: OrbitProps) {
  const points = useMemo(() => {
    const points = []
    const segments = 128
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2
      points.push(new THREE.Vector3(
        Math.cos(theta) * radius,
        0,
        Math.sin(theta) * radius
      ))
    }
    return points
  }, [radius])

  return (
    <Line
      points={points}
      color="#ffffff"
      lineWidth={1}
      opacity={0.3}
      transparent
    />
  )
} 