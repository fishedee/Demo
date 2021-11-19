import { defineConfig } from 'umi';

export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    history: {
        type: 'hash',
    },

    fastRefresh: {},
    externals: {
        LODOP: 'window.LODOP',
    },
    scripts: [{ src: '/lodop.js' }],
});
