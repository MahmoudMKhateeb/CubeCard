import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cubecard.app',
  appName: 'CubeCard',
  webDir: 'dist/modern-angular-website',
  server: {
    androidScheme: 'https'
  }
};

export default config;