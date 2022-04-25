import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      UMI_ENV: 'dev',
      BASE_URL: 'http://localhost:7001',
      TIMEOUT: 1000 * 60 * 30,
    },
  },
});
