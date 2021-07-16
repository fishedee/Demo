import { createForm, onFieldChange, onFieldMount } from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';
import { sleep } from '@/utils';

export default () => {
    const form = useMemo(() => {
        return createForm({
            effects() {
                onFieldChange('name', (field, form) => {
                    //当Field是VoidField的时候，没有value
                    let field2 = field as Field;
                    console.log('field : [name] value = ', field2.value);
                });
            },
        });
    }, []);

    return (
        <div>
            <button
                onClick={async () => {
                    console.log('create Field');
                    //初始化的时候，值为undefined
                    let field = form.createField({ name: 'name' });

                    //设置了一次value
                    await sleep(1000);
                    field.setValue('1');

                    //后续再触发initialValues，依然会触发设置value
                    await sleep(1000);
                    form.setInitialValues({
                        name: '2',
                    });
                }}
            >
                点击，初始化name的value值
            </button>
        </div>
    );
};
