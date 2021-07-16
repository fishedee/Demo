import { createForm, onFieldChange, onFieldMount } from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';
import { sleep } from '@/utils';

export default () => {
    const form = useMemo(() => {
        return createForm({
            effects() {},
        });
    }, []);

    return (
        <div>
            <button
                onClick={async () => {
                    console.log('create Field');
                    //createField的时候就会触发onFieldChange，包括value与component
                    let field = form.createField({ name: 'name' });

                    //模拟用户输入
                    field.onInput('fish');
                    console.log(field.value);

                    //使用display为none，会导致value被清空为undefined
                    await sleep(1000);
                    field.display = 'none';
                    console.log(field.value);
                }}
            >
                点击，更改[name]的display为none
            </button>

            <button
                onClick={async () => {
                    console.log('create Field');
                    //createField的时候就会触发onFieldChange，包括value与component
                    let field = form.createField({ name: 'name2' });

                    //模拟用户输入
                    field.onInput('cat');
                    console.log(field.value);

                    //使用display为hidden，value依然不会被清空
                    await sleep(1000);
                    field.display = 'hidden';
                    console.log(field.value);
                }}
            >
                点击，更改[name2]的display为hidden
            </button>
        </div>
    );
};
