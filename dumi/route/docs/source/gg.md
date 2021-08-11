---
title: 自定义页面名称gg
order: 2
nav:
  title: 自定义导航名称2
  order: 2
---


## gg

当同一个nav下的多个页面定义nav的时候，采取首个，这里的页面就没有采用

Demo:

```tsx
import React from 'react';
import { Foo } from 'route';

export default () => <Foo title="gg" />;
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
