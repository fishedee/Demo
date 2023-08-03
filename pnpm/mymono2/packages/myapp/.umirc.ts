import { defineConfig } from "umi";
import path from 'path';

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
  ],
  alias: {
    'mylib': path.resolve(__dirname, '../mylib/dist'),
},
  npmClient: 'pnpm',
  mfsu:false,
});
