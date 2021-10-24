// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/fish/Project/Demo/formily_antd/test_rc17/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/basic/test1",
    "exact": true,
    "component": require('@/pages/basic/test1.tsx').default
  },
  {
    "path": "/basic/test2",
    "exact": true,
    "component": require('@/pages/basic/test2.tsx').default
  },
  {
    "path": "/basic/test3",
    "exact": true,
    "component": require('@/pages/basic/test3.tsx').default
  },
  {
    "path": "/basic/test4",
    "exact": true,
    "component": require('@/pages/basic/test4.tsx').default
  },
  {
    "path": "/basic/test5",
    "exact": true,
    "component": require('@/pages/basic/test5.tsx').default
  },
  {
    "path": "/basic/test6",
    "exact": true,
    "component": require('@/pages/basic/test6.tsx').default
  },
  {
    "path": "/basic/test7",
    "exact": true,
    "component": require('@/pages/basic/test7.tsx').default
  },
  {
    "path": "/basic/test8",
    "exact": true,
    "component": require('@/pages/basic/test8.tsx').default
  },
  {
    "path": "/",
    "exact": true,
    "component": require('@/pages/index.tsx').default
  },
  {
    "path": "/terse",
    "exact": true,
    "component": require('@/pages/terse/index.tsx').default
  },
  {
    "path": "/tree/MyTree2",
    "exact": true,
    "component": require('@/pages/tree/MyTree2.tsx').default
  },
  {
    "path": "/tree/test1",
    "exact": true,
    "component": require('@/pages/tree/test1.tsx').default
  },
  {
    "path": "/tree/test2",
    "exact": true,
    "component": require('@/pages/tree/test2.tsx').default
  },
  {
    "path": "/treeSelect/basic",
    "exact": true,
    "component": require('@/pages/treeSelect/basic.tsx').default
  },
  {
    "path": "/treeSelect/multiply",
    "exact": true,
    "component": require('@/pages/treeSelect/multiply.tsx').default
  },
  {
    "path": "/treeSelect/tree",
    "exact": true,
    "component": require('@/pages/treeSelect/tree.tsx').default
  },
  {
    "path": "/treeSelect/tree2",
    "exact": true,
    "component": require('@/pages/treeSelect/tree2.tsx').default
  },
  {
    "path": "/visible",
    "exact": true,
    "component": require('@/pages/visible/index.tsx').default
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
