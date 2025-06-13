import { Object3D } from 'three'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any
      pointLight: any
      mesh: any
      sphereGeometry: any
      meshStandardMaterial: any
      group: any
      line: any
      lineBasicMaterial: any
      lineGeometry: any
    }
  }
} 