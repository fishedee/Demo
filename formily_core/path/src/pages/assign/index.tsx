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
                    //解构赋值，将两个字段合并在一起操作
                    let nameField = form.createField({
                        name: 'name',
                    });
                    let ageField = form.createField({
                        name: 'age',
                    });

                    console.log('setValuesIn');
                    //同时赋值多个字段
                    form.setValuesIn('[name,age]', ['fish', 123]);
                    console.log(form.getValuesIn('[name,age]'));
                    console.log(form.getValuesIn('name'));
                    console.log(form.getValuesIn('age'));
                }}
            >
                解构赋值
            </button>
        </div>
    );
};
