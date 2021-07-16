import {
    createForm,
    onFieldChange,
    onFieldInputValueChange,
    onFieldValueChange,
} from '@formily/core';
import { useMemo } from 'react';

export default () => {
    const form = useMemo(() => {
        return createForm({
            effects: () => {
                onFieldValueChange('person.name', (field) => {
                    console.log(field.parent.path.toString());
                    //注意，两个点号
                    console.log(field.query('..').value());
                });
            },
        });
    }, []);
    return (
        <div>
            <button
                onClick={() => {
                    let ageField = form.createObjectField({
                        name: 'person',
                    });
                    ageField.addProperty('name', 'fish');
                    ageField.addProperty('age', 123);

                    let field = form.createField({ name: 'person.name' });
                    field.setValue('cat');
                }}
            >
                选择父级的path
            </button>
        </div>
    );
};
