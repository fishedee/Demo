import {
    createForm,
    onFieldChange,
    onFieldInputValueChange,
} from '@formily/core';
import { useMemo } from 'react';

export default () => {
    const form = useMemo(() => {
        return createForm({
            effects: () => {
                onFieldInputValueChange('person.fish', (field) => {
                    //注意，没有点号
                    console.log(field.path + '.name');
                    console.log(form.query(field.path + '.name').value());
                });
            },
        });
    }, []);
    return (
        <div>
            <button
                onClick={() => {
                    let ageField = form.createObjectField({
                        name: 'person.fish',
                    });
                    ageField.addProperty('name', 'fish');
                    ageField.addProperty('age', 123);
                }}
            >
                选择子级的path
            </button>
        </div>
    );
};
