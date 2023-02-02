import { MutableRefObject, useRef } from "react";

type InitFunction<T> = () => T;

function useDataRef<T>(initer: InitFunction<T>): MutableRefObject<T> {
    const isFirst = useRef<boolean>(true);
    const data = useRef<T>();
    if (isFirst.current == true) {
        data.current = initer();
        isFirst.current = false;
    }
    return data as MutableRefObject<T>;
}

export default useDataRef;