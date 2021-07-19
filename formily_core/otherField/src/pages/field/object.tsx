import {
    createForm,
    onFieldChange,
    onFieldInputValueChange,
    onFieldMount,
} from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';
import { sleep } from '@/utils';

export default () => {
    const form = useMemo(() => {
        return createForm({
            effects() {
                onFieldInputValueChange('person', () => {
                    console.log('Field [items] onInput');
                });
            },
        });
    }, []);

    return (
        <div>
            <button
                onClick={async () => {
                    console.log('create Field');
                    //createObjectField
                    let field = form.createObjectField({ name: 'person' });

                    //push操作会触发onInuput
                    field.addProperty('name', 'fish');
                    field.addProperty('age', 123);
                    field.addProperty('sex', 'male');

                    //通过path，我们可以获取到下一级的field
                    let fieldItem = form.createField({
                        name: 'person.name',
                    });
                    console.log(fieldItem.value);

                    //通过path，我们可以获取到下一级的field
                    let fieldItem2 = form.createField({
                        name: 'person.age',
                        value: 123,
                    });
                    console.log(fieldItem2.value);

                    //这个field没有addProperty进去，所以是undefined的
                    let fieldItem3 = form.createField({
                        name: 'person.qq',
                    });
                    console.log(fieldItem3.value);

                    //bashPath的用法，实际取的字段是person.sex
                    let fieldItem4 = form.createField({
                        name: 'sex',
                        basePath: 'person',
                    });
                    console.log(fieldItem4.value);
                }}
            >
                ObjectField
            </button>
        </div>
    );
};
