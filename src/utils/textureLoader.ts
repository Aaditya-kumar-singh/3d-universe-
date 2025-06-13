import { TextureLoader, MeshStandardMaterial, Vector2, Color } from 'three'
import { useLoader } from '@react-three/fiber'

// Fallback colors for planets
const PLANET_COLORS = {
  mercury: '#8C7853',
  venus: '#FFC649',
  earth: '#6B93D6',
  mars: '#CD5C5C',
  jupiter: '#D8CA9D',
  saturn: '#FAD5A5',
  uranus: '#4FD0E7',
  neptune: '#4B70DD'
}

// Cache for loaded textures
const textureCache = new Map()

export function usePlanetTextures(planetName: string) {
  const basePath = '/textures/planets'
  const planetKey = planetName.toLowerCase()

  // Try to load textures from cache first
  const cachedTextures = textureCache.get(planetKey)
  if (cachedTextures) {
    return cachedTextures
  }

  // Load textures with error handling
  const loadTexture = (type: string) => {
    try {
      return useLoader(TextureLoader, `${basePath}/${planetKey}_${type}.jpg`)
    } catch (error) {
      console.warn(`Failed to load ${planetKey} ${type} texture:`, error)
      return null
    }
  }

  const diffuseMap = loadTexture('diffuse')
  const normalMap = loadTexture('normal')
  const specularMap = loadTexture('specular')

  // Store in cache
  const textures = { diffuseMap, normalMap, specularMap }
  textureCache.set(planetKey, textures)

  return textures
}

export function createPlanetMaterial(planetName: string) {
  const planetKey = planetName.toLowerCase()
  const textures = usePlanetTextures(planetName)
  const color = new Color(PLANET_COLORS[planetKey as keyof typeof PLANET_COLORS] || '#FFFFFF')

  return new MeshStandardMaterial({
    map: textures.diffuseMap || null,
    normalMap: textures.normalMap || null,
    normalScale: new Vector2(0.5, 0.5),
    roughnessMap: textures.specularMap || null,
    roughness: 0.8,
    metalness: 0.2,
    color: color
  })
} 