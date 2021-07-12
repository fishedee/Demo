import { useReducer } from 'react';
import { useState } from 'react';

type CounterAction = {
    type: 'inc' | 'dec';
};
export default function CounterPage() {
    let [counter, dispatch] = useReducer(function (
        state: number,
        action: CounterAction,
    ) {
        if (action.type == 'inc') {
            return state + 1;
        } else if (action.type == 'dec') {
            return state - 1;
        }
        return state;
    },
    0);
    return (
        <div>
            <div>当前的counter为：{counter}</div>
            <button
                onClick={() => {
                    dispatch({ type: 'inc' });
                }}
            >
                加
            </button>
            <button
                onClick={() => {
                    dispatch({ type: 'dec' });
                }}
            >
                减
            </button>
        </div>
    );
}
