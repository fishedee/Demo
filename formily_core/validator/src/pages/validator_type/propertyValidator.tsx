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
                            minimum: 5, //最小值为5
                        },
                    });

                    //模拟用户输入，错误输入
                    field.onInput(1);
                    //校验过程是异步的，所以需要一个await
                    await sleep(100);
                    //field.errors为不为空
                    console.log(field.feedbacks, field.errors);

                    //模拟用户输入，正确输入
                    field.onInput(7);
                    //校验过程是异步的，所以需要一个await
                    await sleep(100);
                    //field.errors为为空
                    console.log(field.feedbacks, field.errors);
                }}
            >
                validator的属性方式校验，minimum，最小值
            </button>

            <button
                onClick={async () => {
                    console.log('create Field');
                    let field = form.createField({
                        name: 'name',
                        validator: {
                            required: true, //必填项
                            min: 5, //字符串长度最小为5
                        },
                    });

                    //模拟用户输入，错误输入
                    field.onInput('abc');
                    //校验过程是异步的，所以需要一个await
                    await sleep(100);
                    //field.errors为不为空
                    console.log(field.feedbacks, field.errors);

                    //模拟用户输入，正确输入
                    field.onInput('abcdef');
                    //校验过程是异步的，所以需要一个await
                    await sleep(100);
                    //field.errors为为空
                    console.log(field.feedbacks, field.errors);
                }}
            >
                validator的属性方式校验，min，最小字符串长度
            </button>
        </div>
    );
};
