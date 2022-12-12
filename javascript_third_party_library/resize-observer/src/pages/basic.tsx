import { Button } from 'antd';

import { MutableRefObject, useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

type Size = { width: number; height: number };

function useResizeObserver(target: MutableRefObject<any>, handler: (size: Size) => void) {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const { clientWidth, clientHeight } = entry.target;
        handler({
          width: clientWidth,
          height: clientHeight,
        });
      });
    });
    resizeObserver.observe(target.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
}

export default function IndexPage() {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const divRef = useRef<HTMLDivElement>(null);
  useResizeObserver(divRef, (size) => {
    console.log('newSize', size);
    setSize(size);
  });
  return (
    <div ref={divRef} style={{
      width: '100%',
      height: '100vh',
      padding: '10px',
      background: 'yellow',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: "center",
      alignItems: 'center',
    }}>
      <div>{`width:${size.width}`}</div>
      <div>{`height:${size.height}`}</div>
    </div>
  );
}
