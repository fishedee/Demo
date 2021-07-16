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

    return (
        <div>
            <button
                onClick={async () => {
                    console.log('create Field');
                    //createArrayField
                    let field = form.createArrayField({ name: 'items' });

                    //push操作会触发onInuput
                    field.push(undefined);
                    field.push(undefined);

                    //可以通过value获取到数组的值
                    console.log(field.value.length);

                    //通过path，我们可以获取到下一级的field
                    let fieldItem = form.createField({
                        name: 'items.0',
                        value: 'hello',
                    });
                    console.log(fieldItem.value);

                    //通过path，我们可以获取到下一级的field
                    let fieldItem2 = form.createField({
                        name: 'items.1',
                        value: 123,
                    });
                    console.log(fieldItem2.value);

                    //这个field没有push进去，所以是undefined的
                    let fieldItem3 = form.createField({
                        name: 'items.2',
                    });
                    console.log(fieldItem3.value);
                }}
            >
                ArrayField，可以通过push一个undefined来让后续来配置格式
            </button>
        </div>
    );
};
