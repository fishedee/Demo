import {
    createForm,
    onFieldChange,
    onFieldMount,
    registerValidateRules,
} from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';
import { sleep } from '@/utils';

registerValidateRules({
    GlobalPropertyFormat(value) {
        if (!value) return '';
        return value !== '123' ? '错误了❎' : '';
    },
});
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
                    let field = form.createField({
                        name: 'age',
                        validator: {
                            required: true, //必填项
                            GlobalPropertyFormat: true, //自定义的format
                        },
                    });

                    //模拟用户输入，错误输入
                    field.onInput('137');
                    //校验过程是异步的，所以需要一个await
                    await sleep(100);
                    //field.errors为不为空
                    console.log(field.feedbacks, field.errors);

                    //模拟用户输入，正确输入
                    field.onInput('123');
                    //校验过程是异步的，所以需要一个await
                    await sleep(100);
                    //field.errors为为空
                    console.log(field.feedbacks, field.errors);
                }}
            >
                validator的自定义属性方式校验，123格式
            </button>
        </div>
    );
};
