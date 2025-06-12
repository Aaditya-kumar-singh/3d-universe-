import { TextureLoader } from 'three'
import { useLoader } from '@react-three/fiber'
import { MeshStandardMaterial, Vector2 } from 'three'

// Cache for loaded textures
const textureCache: { [key: string]: any } = {}

// NASA texture URLs
const TEXTURE_URLS = {
  Mercury: {
    diffuse: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/mercury.jpg',
    normal: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/mercury_normal.jpg',
    specular: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/mercury_specular.jpg'
  },
  Venus: {
    diffuse: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/venus.jpg',
    normal: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/venus_normal.jpg',
    specular: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/venus_specular.jpg'
  },
  Earth: {
    diffuse: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth.jpg',
    normal: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal.jpg',
    specular: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular.jpg'
  },
  Mars: {
    diffuse: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/mars.jpg',
    normal: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/mars_normal.jpg',
    specular: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/mars_specular.jpg'
  },
  Jupiter: {
    diffuse: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/jupiter.jpg',
    normal: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/jupiter_normal.jpg',
    specular: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/jupiter_specular.jpg'
  },
  Saturn: {
    diffuse: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/saturn.jpg',
    normal: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/saturn_normal.jpg',
    specular: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/saturn_specular.jpg'
  },
  Uranus: {
    diffuse: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/uranus.jpg',
    normal: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/uranus_normal.jpg',
    specular: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/uranus_specular.jpg'
  },
  Neptune: {
    diffuse: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/neptune.jpg',
    normal: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/neptune_normal.jpg',
    specular: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/neptune_specular.jpg'
  }
}

// Custom hook to load textures with caching
export function usePlanetTextures(planetName: string) {
  const urls = TEXTURE_URLS[planetName as keyof typeof TEXTURE_URLS]
  
  if (!urls) {
    console.warn(`No textures found for planet: ${planetName}`)
    return {
      diffuseMap: null,
      normalMap: null,
      specularMap: null
    }
  }

  try {
    const diffuseMap = useLoader(TextureLoader, urls.diffuse)
    const normalMap = useLoader(TextureLoader, urls.normal)
    const specularMap = useLoader(TextureLoader, urls.specular)

    // Cache the textures
    textureCache[`${planetName}_diffuse`] = diffuseMap
    textureCache[`${planetName}_normal`] = normalMap
    textureCache[`${planetName}_specular`] = specularMap

    return {
      diffuseMap,
      normalMap,
      specularMap
    }
  } catch (error) {
    console.error(`Error loading textures for ${planetName}:`, error)
    return {
      diffuseMap: null,
      normalMap: null,
      specularMap: null
    }
  }
}

// Function to create a material using the loaded textures
export function createPlanetMaterial(
  diffuseMap: any,
  normalMap: any,
  specularMap: any,
  options: {
    metalness?: number
    roughness?: number
    normalScale?: number
  } = {}
) {
  const material = new MeshStandardMaterial({
    map: diffuseMap,
    normalMap: normalMap,
    normalScale: new Vector2(options.normalScale || 1, options.normalScale || 1),
    metalness: options.metalness || 0.1,
    roughness: options.roughness || 0.8,
    envMapIntensity: 1.0
  })

  if (specularMap) {
    material.envMap = specularMap
    material.envMapIntensity = 0.5
  }

  return material
} 