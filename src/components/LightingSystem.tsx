import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { PointLight, SpotLight, AmbientLight, Vector3, ShaderMaterial, AdditiveBlending, ShaderMaterialParameters } from 'three'
import { useHelper } from '@react-three/drei'

// Custom shader for light rays
const lightRayShader = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform vec3 sunPosition;
    varying vec2 vUv;
    varying vec3 vPosition;
    
    void main() {
      vec3 rayDir = normalize(vPosition - sunPosition);
      float intensity = pow(max(0.0, dot(rayDir, vec3(0.0, 1.0, 0.0))), 2.0);
      
      // Add some noise to the rays
      float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
      intensity *= 0.8 + 0.2 * noise;
      
      // Animate the rays
      intensity *= 0.5 + 0.5 * sin(time * 0.5 + vUv.x * 10.0);
      
      vec3 color = vec3(1.0, 0.8, 0.4) * intensity;
      gl_FragColor = vec4(color, intensity * 0.3);
    }
  `
}

interface LightingSystemProps {
  sunPosition: Vector3
  intensity?: number
}

export default function LightingSystem({ sunPosition, intensity = 2 }: LightingSystemProps) {
  const sunLightRef = useRef<PointLight>(null)
  const spotLightRef = useRef<SpotLight>(null)
  const ambientLightRef = useRef<AmbientLight>(null)
  const time = useRef(0)

  // Create shader material for light rays
  const rayMaterial = useMemo(() => {
    const materialParams: ShaderMaterialParameters = {
      uniforms: {
        time: { value: 0 },
        sunPosition: { value: sunPosition }
      },
      vertexShader: lightRayShader.vertexShader,
      fragmentShader: lightRayShader.fragmentShader,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false
    }
    return new ShaderMaterial(materialParams)
  }, [sunPosition])

  useFrame((_, delta) => {
    time.current += delta

    // Update shader uniforms
    if (rayMaterial.uniforms) {
      rayMaterial.uniforms.time.value = time.current
    }

    // Animate sun light intensity
    if (sunLightRef.current) {
      const pulse = Math.sin(time.current * 0.5) * 0.1 + 0.9
      sunLightRef.current.intensity = intensity * pulse
    }

    // Update spot light to follow sun
    if (spotLightRef.current) {
      spotLightRef.current.position.copy(sunPosition)
    }
  })

  return (
    <group>
      {/* Main sun light */}
      <pointLight
        ref={sunLightRef}
        position={sunPosition}
        intensity={intensity}
        color="#FFD700"
        distance={150}
        decay={2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={150}
        shadow-camera-near={0.1}
      />

      {/* Spot light for focused illumination */}
      <spotLight
        ref={spotLightRef}
        position={sunPosition}
        intensity={intensity * 0.5}
        angle={Math.PI / 4}
        penumbra={0.5}
        decay={2}
        distance={100}
        color="#FFD700"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Ambient light for space */}
      <ambientLight
        ref={ambientLightRef}
        intensity={0.1}
        color="#000033"
      />

      {/* Light rays effect */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[50, 32, 32]} />
        <primitive object={rayMaterial} attach="material" />
      </mesh>
    </group>
  )
} 