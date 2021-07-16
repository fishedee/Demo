import {
    createForm,
    onFormInit,
    onFormInputChange,
    onFormMount,
    onFormUnmount,
    onFormValuesChange,
} from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';
import { sleep } from '@/utils';

export default () => {
    const form = useMemo(() => {
        return createForm({
            effects() {
                //createForm的时候触发
                onFormInit(() => {
                    console.log('表单初始化');
                });

                //onMount的时候手动触发
                onFormMount(() => {
                    console.log('表单 mount');
                });

                //onUnMount的时候手动触发
                onFormUnmount(() => {
                    console.log('表单 unmount');
                });

                //onChange的时候自动触发，默认就是只有value变化的时候触发
                //注意，首次不会触发
                onFormValuesChange(() => {
                    console.log('form value change');
                });

                //onInput的时候手动触发，这个注意与onFieldValueChange的不同
                onFormInputChange(() => {
                    console.log('form value input change');
                });
            },
        });
    }, []);

    return (
        <div>
            <button
                onClick={async () => {
                    //触发onFieldInit
                    console.log('createField');
                    let field = form.createField({ name: 'name' });

                    //触发form.onMount
                    await sleep(100);
                    console.log('onMount');
                    form.onMount();

                    //不会触发onFormValuesChange
                    await sleep(100);
                    console.log('set componentProps');
                    field.componentProps = { size: 10 };

                    //触发onFormValuesChange
                    await sleep(100);
                    console.log('set value');
                    field.value = 10;

                    //触发onFormInputChange与onFormValuesChange
                    await sleep(100);
                    console.log('set input');
                    field.onInput('cat');

                    //触发onUnmount
                    await sleep(100);
                    console.log('set onUnmount');
                    form.onUnmount();
                }}
            >
                触发form的生命周期
            </button>
        </div>
    );
};
