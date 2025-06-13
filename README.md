# Solar System 3D Visualization

A beautiful 3D visualization of our solar system built with React, Three.js, and TypeScript. This project creates an interactive 3D model of the solar system with accurate planet sizes, distances, and orbital speeds.

## Features

- Realistic 3D visualization of the solar system
- Accurate planet sizes and distances
- Orbital movements with correct speeds
- Interactive camera controls
- Beautiful lighting and particle effects
- Saturn's rings with proper synchronization
- Asteroid belt visualization
- Space dust and star background

## Technologies Used

- React
- Three.js
- TypeScript
- React Three Fiber
- React Three Drei

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/solar-system.git
cd solar-system
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Controls

- **Left Click + Drag**: Rotate the camera
- **Right Click + Drag**: Pan the camera
- **Scroll**: Zoom in/out
- **Space**: Reset camera position

## Project Structure

```
solar-system/
├── src/
│   ├── components/
│   │   ├── SolarSystem.tsx
│   │   ├── Planet.tsx
│   │   ├── Orbit.tsx
│   │   ├── LightingSystem.tsx
│   │   └── ParticleSystems.tsx
│   ├── utils/
│   │   ├── textureLoader.ts
│   │   └── particleTextures.ts
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── textures/
└── package.json
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Three.js community for the amazing 3D library
- React Three Fiber for the React bindings
- NASA for the planet textures and data 