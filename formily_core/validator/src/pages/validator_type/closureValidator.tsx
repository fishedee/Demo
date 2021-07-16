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
                    field.setValidator((value) => {
                        if (value != '123') {
                            return '非123格式';
                        }
                        return '';
                    });

                    //模拟用户输入，错误输入
                    field.onInput('897');
                    await sleep(500);
                    console.log(field.feedbacks, field.errors);

                    //模拟用户输入，正确输入
                    field.onInput('123');
                    await sleep(500);
                    console.log(field.feedbacks, field.errors);
                }}
            >
                自定义闭包的校验方式，123格式
            </button>

            <button
                onClick={async () => {
                    console.log('create Field');
                    //我们使用自定义的校验器，并且设置只有blur的时候才触发校验
                    let field = form.createField({
                        name: 'name2',
                    });
                    field.setValidator({
                        triggerType: 'onFocus',
                        validator: (value) => {
                            if (value != '123') {
                                return '输入的字符串不是123';
                            }
                            return '';
                        },
                    });

                    //模拟用户输入，错误输入
                    field.value = '897';
                    field.onFocus();
                    await sleep(500);
                    console.log(field.feedbacks, field.errors);

                    //模拟用户输入，正确输入
                    field.value = '123';
                    field.onFocus();
                    await sleep(500);
                    console.log(field.feedbacks, field.errors);
                }}
            >
                自定义闭包的校验方式，123格式，带triggerType
            </button>
        </div>
    );
};
