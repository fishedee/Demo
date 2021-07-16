import { createForm, onFieldChange } from '@formily/core';
import { useMemo } from 'react';

export default () => {
    const form = useMemo(() => {
        return createForm({
            effects: () => {
                onFieldChange('person.age', (field) => {
                    //注意有一个点号
                    console.log(field.query('.name').value());
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
                }}
            >
                选择同级的path
            </button>
        </div>
    );
};
