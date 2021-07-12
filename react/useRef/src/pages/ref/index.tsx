import { useEffect } from 'react';
import { useRef } from 'react';
import { memo, useState, useCallback } from 'react';

export default function CounterPage() {
    let myRef = useRef<HTMLDivElement>(null);
    useEffect(function () {
        myRef.current?.setAttribute(
            'style',
            'color:red; border: 1px solid blue;',
        );
    }, []);
    return (
        <div ref={myRef}>
            <div>你好</div>
        </div>
    );
}
