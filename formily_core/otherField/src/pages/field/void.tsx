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
                onFieldChange('layout', () => {
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
                    //createVoidField
                    //void field是布局和装饰用的组件，没有value的，也没有onInput，也没有validator，其他的属性基本都有
                    let field = form.createVoidField({ name: 'layout' });

                    field.setComponentProps({ size: 10 });

                    //可以通过query的语法，来查询节点，这里返回了{size:10}的值
                    console.log(form.query('layout').take().componentProps);

                    console.log('void field son!');
                    let field2 = form.createField({ name: 'layout.name' });
                    field2.value = 20;
                    field2.setComponentProps({ width: 30 });

                    //VoidField的路径，在query的时候，可以不省略
                    console.log(
                        form.query('layout.name').take().componentProps,
                    );
                    let field3 = form.query('layout.name').take() as Field;
                    console.log(field3.value);

                    //VoidField的路径，在query的时候，也可以省略
                    console.log(form.query('name').take().componentProps);
                    let field4 = form.query('name').take() as Field;
                    console.log(field4.value);

                    //但是，直接取value的话，必须省略，这里的API设计有点奇怪
                    console.log(form.query('name').value());
                }}
            >
                VoidField
            </button>
        </div>
    );
};
