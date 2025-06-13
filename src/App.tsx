import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Suspense } from 'react'
import SolarSystem from './components/SolarSystem'
import Attribution from './components/Attribution'

function App() {
  return (
    <div className="w-screen h-screen bg-black overflow-hidden">
      <Attribution />
      <Canvas
        camera={{
          position: [0, 30, 30],
          fov: 60,
          near: 0.1,
          far: 1000
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <SolarSystem />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
            minDistance={10}
            maxDistance={100}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
