import {
    createForm,
    onFieldChange,
    onFieldInputValueChange,
    onFieldValueChange,
} from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';

export default () => {
    const form = useMemo(() => {
        return createForm({
            effects: () => {
                onFieldChange('name', (field) => {
                    let field2 = field as Field;
                    console.log(
                        'Field [' + field.path + '] change ' + field2.value,
                    );
                });

                onFieldChange('age', (field) => {
                    let field2 = field as Field;
                    console.log(
                        'Field [' + field.path + '] change ' + field2.value,
                    );
                });
            },
        });
    }, []);
    return (
        <div>
            <button
                onClick={() => {
                    //这样是不行的，不能在创建field的时候要解构表达式
                    let combineField = form.createField({
                        name: '[name,age]',
                    });

                    console.log('setValuesIn');
                    //同时赋值多个字段
                    form.setValuesIn('[name,age]', ['fish', 123]);
                    console.log(form.getValuesIn('[name,age]'));
                }}
            >
                解构赋值2
            </button>
        </div>
    );
};
