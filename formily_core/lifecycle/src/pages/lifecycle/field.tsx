import {
    createForm,
    onFieldChange,
    onFieldInit,
    onFieldInputValueChange,
    onFieldMount,
    onFieldUnmount,
    onFieldValueChange,
} from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';
import { sleep } from '@/utils';

export default () => {
    const form = useMemo(() => {
        return createForm({
            effects() {
                //createField的时候自动触发
                onFieldInit('name', (field) => {
                    console.log('字段[name]初始化');
                });

                //onMount的时候手动触发
                onFieldMount('name', (field) => {
                    console.log('字段[name] mount');
                });

                //onUnMount的时候手动触发
                onFieldUnmount('name', (field) => {
                    console.log('字段[name] unmount');
                });

                //onChange的时候自动触发，默认就是只有value变化的时候触发
                //注意，在首次createField也会自动触发
                onFieldChange('name', (field) => {
                    console.log('字段[name] change');
                });

                //onChange的时候自动触发，默认就是只有value变化的时候触发
                //注意，在首次createField也会自动触发，即使是非value的属性
                onFieldChange('name', 'componentProps', (field) => {
                    console.log('字段[name] comonentProps change');
                });

                //onValueChange的时候自动触发，只有value变化的时候触发
                //注意，首次不会自动触发
                onFieldValueChange('name', (field) => {
                    console.log('字段[name] value change');
                });

                //onInput的时候手动触发，这个注意与onFieldValueChange的不同
                onFieldInputValueChange('name', (field) => {
                    console.log('字段[name] value input change');
                });
            },
        });
    }, []);

    return (
        <div>
            <button
                onClick={async () => {
                    //触发onFieldInit，首次会触发onFieldChange
                    console.log('createField');
                    let field = form.createField({ name: 'name' });

                    //触发onFieldMount
                    await sleep(100);
                    console.log('onMount');
                    field.onMount();

                    //触发onFieldChange
                    await sleep(100);
                    console.log('set componentProps');
                    field.componentProps = { size: 10 };

                    //触发onFieldChange与onFieldValueChange
                    await sleep(100);
                    console.log('set value');
                    field.value = 10;

                    //触发onFieldChange与onFieldValueChange,onFieldInputValueChange
                    await sleep(100);
                    console.log('set input');
                    field.onInput('cat');

                    //触发onUnmount
                    await sleep(100);
                    console.log('set onUnmount');
                    field.onUnmount();
                }}
            >
                触发field的生命周期
            </button>
        </div>
    );
};
