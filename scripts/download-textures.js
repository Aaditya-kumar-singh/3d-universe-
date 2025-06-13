import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEXTURE_URLS = {
  mercury: {
    diffuse: 'https://solarsystem.nasa.gov/system/resources/detail_files/2393_mercury_1k.jpg',
    normal: 'https://solarsystem.nasa.gov/system/resources/detail_files/2394_mercury_normal_1k.jpg',
    specular: 'https://solarsystem.nasa.gov/system/resources/detail_files/2395_mercury_specular_1k.jpg'
  },
  venus: {
    diffuse: 'https://solarsystem.nasa.gov/system/resources/detail_files/2396_venus_1k.jpg',
    normal: 'https://solarsystem.nasa.gov/system/resources/detail_files/2397_venus_normal_1k.jpg',
    specular: 'https://solarsystem.nasa.gov/system/resources/detail_files/2398_venus_specular_1k.jpg'
  },
  earth: {
    diffuse: 'https://solarsystem.nasa.gov/system/resources/detail_files/2399_earth_1k.jpg',
    normal: 'https://solarsystem.nasa.gov/system/resources/detail_files/2400_earth_normal_1k.jpg',
    specular: 'https://solarsystem.nasa.gov/system/resources/detail_files/2401_earth_specular_1k.jpg'
  },
  mars: {
    diffuse: 'https://solarsystem.nasa.gov/system/resources/detail_files/2402_mars_1k.jpg',
    normal: 'https://solarsystem.nasa.gov/system/resources/detail_files/2403_mars_normal_1k.jpg',
    specular: 'https://solarsystem.nasa.gov/system/resources/detail_files/2404_mars_specular_1k.jpg'
  },
  jupiter: {
    diffuse: 'https://solarsystem.nasa.gov/system/resources/detail_files/2405_jupiter_1k.jpg',
    normal: 'https://solarsystem.nasa.gov/system/resources/detail_files/2406_jupiter_normal_1k.jpg',
    specular: 'https://solarsystem.nasa.gov/system/resources/detail_files/2407_jupiter_specular_1k.jpg'
  },
  saturn: {
    diffuse: 'https://solarsystem.nasa.gov/system/resources/detail_files/2408_saturn_1k.jpg',
    normal: 'https://solarsystem.nasa.gov/system/resources/detail_files/2409_saturn_normal_1k.jpg',
    specular: 'https://solarsystem.nasa.gov/system/resources/detail_files/2410_saturn_specular_1k.jpg'
  },
  uranus: {
    diffuse: 'https://solarsystem.nasa.gov/system/resources/detail_files/2411_uranus_1k.jpg',
    normal: 'https://solarsystem.nasa.gov/system/resources/detail_files/2412_uranus_normal_1k.jpg',
    specular: 'https://solarsystem.nasa.gov/system/resources/detail_files/2413_uranus_specular_1k.jpg'
  },
  neptune: {
    diffuse: 'https://solarsystem.nasa.gov/system/resources/detail_files/2414_neptune_1k.jpg',
    normal: 'https://solarsystem.nasa.gov/system/resources/detail_files/2415_neptune_normal_1k.jpg',
    specular: 'https://solarsystem.nasa.gov/system/resources/detail_files/2416_neptune_specular_1k.jpg'
  }
};

const downloadFile = (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

const downloadAllTextures = async () => {
  const baseDir = path.join(__dirname, '../public/textures/planets');
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  for (const [planet, textures] of Object.entries(TEXTURE_URLS)) {
    for (const [type, url] of Object.entries(textures)) {
      const filepath = path.join(baseDir, `${planet}_${type}.jpg`);
      try {
        await downloadFile(url, filepath);
      } catch (error) {
        console.error(`Failed to download ${planet} ${type} texture:`, error);
      }
    }
  }
};

downloadAllTextures().then(() => {
  console.log('All textures downloaded successfully!');
}).catch((error) => {
  console.error('Error downloading textures:', error);
}); 