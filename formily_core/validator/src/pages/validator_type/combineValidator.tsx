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
                    field.setValidator([
                        { required: true },
                        { format: 'email' },
                        {
                            triggerType: 'onInput',
                            validator: (value) => {
                                let str = value as string;
                                if (str.startsWith('fish@') == false) {
                                    return '只支持fish的发件人';
                                }
                                return '';
                            },
                        },
                    ]);

                    //直接设置value
                    field.onInput('');
                    await sleep(500);
                    //2个错误，非必填，不是fish开头
                    console.log(field.feedbacks, field.errors);

                    //直接设置value
                    field.onInput('fish@123');
                    await sleep(500);
                    //1个错误，非email格式
                    console.log(field.feedbacks, field.errors);

                    //直接设置value
                    field.onInput('123@163.com');
                    await sleep(500);
                    //1个错误，非fish开头
                    console.log(field.feedbacks, field.errors);
                }}
            >
                组合多种方式的校验
            </button>
        </div>
    );
};
