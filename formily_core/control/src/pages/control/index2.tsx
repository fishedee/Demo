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
            //将可观察数据，通过onFieldReact进行同步
            //这称为，响应式字段级受控
            //但是，这样只能做单向同步，从observable到form的字段，不能从form的字段同步到observable
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
                    //这里field value变为123
                    console.log('field value:', field.value);

                    field.value = '789';
                    await sleep(100);
                    //这里的obs value依然为旧值，123
                    console.log('obs value:', obs.name);
                }}
            >
                createForm的字段单向同步
            </button>
        </div>
    );
};
