import { createForm, onFieldChange, onFieldMount } from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';
export default () => {
    const form = useMemo(() => {
        return createForm({
            values: {
                where: {
                    data: [
                        {
                            title: 'parent 1',
                            children: [
                                {
                                    title: 'parent 1-1',
                                    children: [
                                        {
                                            title: 'sss',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            },
        });
    }, []);

    return (
        <div>
            <button
                onClick={async () => {
                    console.log('create Field');
                    let field = form.createField({ name: 'where.data' });
                    console.log(JSON.stringify(field.value));

                    let field2 = form.createField({
                        name: 'where.data.0.children.0',
                    });
                    console.log(JSON.stringify(field2.value));

                    let field3 = form.createField({ name: 'where.data' });
                    console.log(JSON.stringify(field3.value));
                }}
            >
                点击，更改[fish]field的值
            </button>
        </div>
    );
};
