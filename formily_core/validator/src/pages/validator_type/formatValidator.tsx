import { createForm, onFieldChange, onFieldMount } from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';
import { sleep } from '@/utils';

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
                            format: 'phone', //格式必须为电话格式
                        },
                    });

                    //模拟用户输入，错误输入
                    field.onInput('137');
                    //校验过程是异步的，所以需要一个await
                    await sleep(100);
                    //field.errors为不为空
                    console.log(field.feedbacks, field.errors);

                    //模拟用户输入，正确输入
                    field.onInput('13712345678');
                    //校验过程是异步的，所以需要一个await
                    await sleep(100);
                    //field.errors为空
                    console.log(field.feedbacks, field.errors);
                }}
            >
                validator的format方式校验，phone格式
            </button>

            <button
                onClick={async () => {
                    console.log('create Field');
                    let field = form.createField({
                        name: 'name',
                        validator: {
                            required: true, //必填项
                            format: 'email', //格式必须为url格式
                        },
                    });

                    //模拟用户输入，错误输入
                    field.onInput('abc');
                    //校验过程是异步的，所以需要一个await
                    await sleep(100);
                    //field.errors为不为空
                    console.log(field.feedbacks, field.errors);

                    //模拟用户输入，正确输入
                    field.onInput('abc@qq.com');
                    //校验过程是异步的，所以需要一个await
                    await sleep(100);
                    //field.errors为空
                    console.log(field.feedbacks, field.errors);
                }}
            >
                validator的format方式校验，email格式
            </button>
        </div>
    );
};
