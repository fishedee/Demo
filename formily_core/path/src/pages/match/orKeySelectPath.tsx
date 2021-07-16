import { createForm, onFieldChange } from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';

export default () => {
    const form = useMemo(() => {
        return createForm({
            effects: () => {
                //同时匹配，person的age或者name字段
                onFieldChange('person.*(age,name)', (field) => {
                    //注意有一个点号
                    console.log('Field [' + field.path + '] change');
                    let field2 = field as Field;
                    console.log(field2.value);
                });
            },
        });
    }, []);
    return (
        <div>
            <button
                onClick={() => {
                    let ageField = form.createField({
                        name: 'person.age',
                        value: 123,
                    });
                    let nameField = form.createField({
                        name: 'person.name',
                        value: 'fish',
                    });

                    ageField.value = 12;
                    nameField.value = 'cat';
                }}
            >
                选择多个key的path
            </button>
        </div>
    );
};
