import { defineConfig } from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    hash: true,
    fastRefresh: {},
    scripts: [{ src: '/lodop.js' }],
});
