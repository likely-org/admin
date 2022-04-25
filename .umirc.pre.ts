import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env': {
      UMI_ENV: 'pre',
      BASE_URL: 'http://wont-org.cn:7001',
      TIMEOUT: 10 * 1000,
    },
  },
});
