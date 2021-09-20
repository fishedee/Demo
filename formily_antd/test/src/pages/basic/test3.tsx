import { createForm, onFieldChange, onFieldMount } from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';
export default () => {
    const form = useMemo(() => {
        return createForm({
            initialValues: {
                name: 'fish',
            },
            effects() {
                onFieldChange('name', (field, form) => {
                    const field2 = field as Field;
                    console.log(field2.value);
                });
            },
        });
    }, []);

    return (
        <div>
            <button
                onClick={async () => {
                    console.log('create Field');
                    let field = form.createField({ name: 'name' });

                    //手动触发field的onMount方法
                    console.log('mount');
                    field.onMount();

                    field.onInput(['123']);
                }}
            >
                点击，更改[fish]field的值
            </button>

            <button
                onClick={async () => {
                    console.log('create Field');
                    let field = form.createField({ name: 'name' });

                    //手动触发field的onMount方法
                    console.log('mount');
                    field.onMount();

                    field.onInput(undefined);
                }}
            >
                点击，更改[fish]field的值2
            </button>
        </div>
    );
};
