import {
    createForm,
    onFieldChange,
    onFieldMount,
    onFieldReact,
} from '@formily/core';
import { useMemo } from 'react';
import { sleep } from '@/utils';
import { autorun, observable } from '@formily/reactive';
import { Field } from '@formily/core/esm/models';

//注意，这里的实验core库版本要在2.0.0-beta.79以后。在78版本以前的试过不行
export default () => {
    const obs = useMemo(() => {
        let result = observable({
            name: 'kk',
        });
        autorun(() => {
            console.log('autorun:', result.name);
        });
        return result;
    }, []);
    const form = useMemo(() => {
        return createForm({
            //将可观察数据，在createForm的时候，就注入value中，两者就能保持同步
            //这称为，响应式表单受控
            //可以做双向同步
            values: obs, //需要整个结构到复制过去
            effects: () => {},
        });
    }, []);

    return (
        <div>
            <button
                onClick={async () => {
                    let field = form.createField({ name: 'name' });

                    obs.name = '123';
                    await sleep(100);
                    //这里field value变为123
                    console.log('field value:', field.value);

                    field.value = '789';
                    await sleep(100);
                    //这里obs value也变为789
                    console.log('obs value:', obs.name);
                }}
            >
                createForm的双向整个表单同步
            </button>
        </div>
    );
};
