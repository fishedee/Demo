import { createContext, useState, useContext } from 'react';

type ManualRefreshType = {
    manualRefresh: () => void;
}

function useManualRefresh() {
    const [state, setState] = useState(0);
    const manualRefresh = () => {
        setState((v) => v + 1);
    }
    return { manualRefresh };
}

export {
    useManualRefresh
}