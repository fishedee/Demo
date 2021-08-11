
## Foo

这个文档是放在src/Foo目录下的，就在源代码的隔壁

以写文档的方式来直接写DEMO

Demo2:

```tsx
import React from 'react';
import { Foo } from 'basic';//以当前package.json的位置导入
import { useLocation } from 'umi';//可以读取umi的数据

console.log(useLocation);

export default () => <Foo title="First Demo" />;
```

More skills for writing demo: https://d.umijs.org/guide/basic#write-component-demo
