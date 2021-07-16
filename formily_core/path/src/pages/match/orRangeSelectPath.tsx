import { createForm, onFieldChange } from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';

export default () => {
    const form = useMemo(() => {
        return createForm({
            effects: () => {
                //同时匹配，person的age或者name字段
                //下标从0开始
                onFieldChange('persons.*[1:2]', (field) => {
                    //注意有一个点号
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
                    let personsField = form.createArrayField({
                        name: 'persons',
                    });
                    personsField.push('1');
                    personsField.push('2');
                    personsField.push('3');
                    personsField.push('4');

                    for (var i = 0; i != 5; i++) {
                        let person = form.createArrayField({
                            name: 'persons.' + i,
                        });
                        person.value = 'MM' + person.value;
                    }
                }}
            >
                选择一段range的path
            </button>
        </div>
    );
};
