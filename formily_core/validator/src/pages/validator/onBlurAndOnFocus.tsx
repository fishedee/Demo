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
                    field.setValidator({
                        triggerType: 'onBlur',
                        validator: (value) => {
                            console.log('value:', value);
                            if (value != '123') {
                                return '输入的字符串不是123';
                            }
                            return '';
                        },
                    });

                    //直接设置value
                    field.onInput('f');
                    await sleep(500);
                    //field.errors依然为空数组，因为triggerType为onBlur
                    console.log(field.feedbacks, field.errors);

                    //模拟控件blur
                    field.onBlur();
                    await sleep(500);
                    //field.errors现在不是为空数组了，因为blur的时候触发了校验
                    //它的值为1个元素的数组
                    console.log(field.feedbacks, field.errors);
                }}
            >
                onBlur触发校验
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
                            console.log('value:', value);
                            if (value != '123') {
                                return '输入的字符串不是123';
                            }
                            return '';
                        },
                    });

                    //直接设置value
                    field.onInput('f');
                    await sleep(500);
                    //field.errors依然为空数组，因为triggerType为onBlur
                    console.log(field.feedbacks, field.errors);

                    //模拟控件focus
                    field.onFocus();
                    await sleep(500);
                    //field.errors现在不是为空数组了，因为blur的时候触发了校验
                    //它的值为1个元素的数组
                    console.log(field.feedbacks, field.errors);
                }}
            >
                onFocus触发校验
            </button>
        </div>
    );
};
