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
                    //我们使用自定义的校验器，并且设置只有blur的时候才触发校验
                    let field = form.createField({
                        name: 'name',
                    });
                    field.setValidator(async (value) => {
                        await sleep(1000);
                        if (value != '123') {
                            return '非123格式';
                        }
                        return '';
                    });

                    //模拟用户输入，错误输入
                    field.onInput('897');
                    await sleep(1500);
                    console.log(field.feedbacks, field.errors);

                    //模拟用户输入，正确输入
                    field.onInput('123');
                    await sleep(1500);
                    console.log(field.feedbacks, field.errors);
                }}
            >
                自定义闭包的异步校验方式，支持返回的是Promise的对象
            </button>
        </div>
    );
};
