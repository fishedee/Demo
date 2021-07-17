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
                    //createField，并且设置required为true
                    let field = form.createField({
                        name: 'name',
                        required: true,
                    });

                    //模拟用户输入
                    field.onInput('f');
                    //校验过程是异步的，所以需要一个await
                    await sleep(100);
                    //field.errors为空数组
                    //feedbacks是空数组
                    console.log(field.feedbacks, field.errors);

                    //模拟用户输入
                    field.onInput('');
                    await sleep(100);
                    //field.errors为1个元素的数组，数据为"该字段是必填字段"
                    //feedbacks是3个元素的数组
                    /*
                    [{
                        code: "ValidateError"
                        messages: ["该字段是必填字段"]
                        triggerType: "onInput"
                        type: "error"
                    },
                    {
                        code: "ValidateSuccess"
                        messages: []
                        triggerType: "onInput"
                        type: "success"
                    },{
                        code: "ValidateWarning"
                        messages: []
                        triggerType: "onInput"
                        type: "warning"
                    }]
                     */

                    console.log(field.feedbacks, field.errors);
                }}
            >
                onInput触发校验，required的校验，校验的结果放在feedbacks上
            </button>

            <button
                onClick={async () => {
                    console.log('create Field');
                    //createField，并且设置required为true
                    let field = form.createField({
                        name: 'name2',
                        required: true,
                    });

                    //直接修改数据
                    field.value = 'f';
                    await sleep(100);
                    //field.errors为空数组
                    //feedbacks是空数组
                    console.log(field.feedbacks, field.errors);

                    //直接修改数据
                    field.value = '';
                    await sleep(100);
                    //errors依然为空，因为validator是基于onInput，onFocus或者onBlur来触发的，直接修改value是不会触发校验的
                    console.log(field.feedbacks, field.errors);
                }}
            >
                直接修改value是没有触发校验的
            </button>
        </div>
    );
};
