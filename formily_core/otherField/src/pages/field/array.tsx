import {
    createForm,
    onFieldChange,
    onFieldInputValueChange,
    onFieldMount,
} from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';
import { sleep } from '@/utils';

export default () => {
    const form = useMemo(() => {
        return createForm({
            effects() {
                onFieldInputValueChange('items', () => {
                    console.log('Field [items] onInput');
                });
            },
        });
    }, []);

    const form2 = useMemo(() => {
        return createForm({
            effects() {
                onFieldInputValueChange('items', () => {
                    console.log('Field [items] onInput');
                });
            },
        });
    }, []);

    const form3 = useMemo(() => {
        return createForm({
            effects() {
                onFieldInputValueChange('items', () => {
                    console.log('Field [items] onInput');
                });
            },
        });
    }, []);
    return (
        <div>
            <button
                onClick={async () => {
                    console.log('create Field');
                    //createArrayField
                    let field = form.createArrayField({ name: 'items' });

                    //push操作会触发onInuput
                    field.push('fish2');
                    field.push('cat2');

                    //可以通过value获取到数组的值
                    console.log(field.value.length);

                    //通过path，我们可以获取到下一级的field
                    let fieldItem = form.createField({ name: 'items.0' });
                    console.log(fieldItem.value);

                    //通过path，我们可以获取到下一级的field
                    let fieldItem2 = form.createField({ name: 'items.1' });
                    console.log(fieldItem2.value);

                    //这个field没有push进去，所以是undefined的
                    let fieldItem3 = form.createField({ name: 'items.2' });
                    console.log(fieldItem3.value);
                }}
            >
                ArrayField，通过官方ArrayField操作
            </button>

            <button
                onClick={async () => {
                    console.log('create Field');
                    //createArrayField
                    let field = form2.createArrayField({ name: 'items' });

                    //可以push数据，但是触发不了onInput
                    field.value.push('fish2');
                    field.value.push('cat2');

                    //可以通过value获取到数组的值
                    console.log(field.value.length);

                    //通过path，我们可以获取到下一级的field
                    let fieldItem = form2.createField({ name: 'items.0' });
                    console.log(fieldItem.value);

                    //通过path，我们可以获取到下一级的field
                    let fieldItem2 = form2.createField({ name: 'items.1' });
                    console.log(fieldItem2.value);

                    //这个field没有push进去，所以是undefined的
                    let fieldItem3 = form2.createField({ name: 'items.2' });
                    console.log(fieldItem3.value);
                }}
            >
                ArrayField，通过Field的value来操作，触发不了onInput，因此无法实现校验等操作
            </button>

            <button
                onClick={async () => {
                    console.log('create Field');
                    //createArrayField
                    let field = form3.createField({ name: 'items', value: [] });

                    //可以push数据，但是触发不了onInput
                    field.value.push('fish3');
                    field.value.push('cat3');

                    //可以通过value获取到数组的值
                    console.log(field.value.length);

                    //通过path，我们可以获取到下一级的field
                    let fieldItem = form3.createField({ name: 'items.0' });
                    console.log(fieldItem.value);

                    //通过path，我们可以获取到下一级的field
                    let fieldItem2 = form3.createField({ name: 'items.1' });
                    console.log(fieldItem2.value);

                    //这个field没有push进去，所以是undefined的
                    let fieldItem3 = form3.createField({ name: 'items.2' });
                    console.log(fieldItem3.value);
                }}
            >
                用普通的Field来模拟Array，，触发不了onInput，因此无法实现校验等操作，可以获取到path
            </button>
        </div>
    );
};
