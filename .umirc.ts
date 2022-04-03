import { defineConfig } from 'umi';
import { routes } from './src/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  cssModulesTypescriptLoader: {},
  cssLoader: {
    localsConvention: 'camelCase',
  },
  routes,
  fastRefresh: {},
  mfsu: {
    production: {},
  },
});
