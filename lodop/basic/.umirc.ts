import { defineConfig } from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },

    fastRefresh: {},
    externals: {
        LODOP: 'window.LODOP',
    },
    scripts: [{ src: '/lodop.js' }],
});
