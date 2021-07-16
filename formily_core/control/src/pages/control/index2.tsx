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

//这个例子中，字段级同步也失败了，不知道为什么
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
            //这称为，字段级的响应式表单受控
            effects: () => {
                onFieldReact('age', (field) => {
                    let field2 = field as Field;
                    field2.value = obs.name;
                });
            },
        });
    }, []);

    return (
        <div>
            <button
                onClick={async () => {
                    let field = form.createField({ name: 'age' });

                    obs.name = '123';
                    await sleep(100);
                    console.log('field value:', field.value);

                    field.value = '789';
                    await sleep(100);
                    console.log('obs value:', obs.name);
                }}
            >
                createForm的字段同步
            </button>
        </div>
    );
};
