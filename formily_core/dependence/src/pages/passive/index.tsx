import {
    createForm,
    onFieldChange,
    onFieldMount,
    onFieldReact,
} from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';
import { sleep } from '@/utils';

export default () => {
    const form = useMemo(() => {
        return createForm({
            initialValues: {
                count: 10,
                price: 1,
                total: 0,
            },
            effects() {
                //被动联动，指定A数据受到B或者C数据的影响，当B数据或者C数据变化的时候，要自动触发
                //利用Reactive的能力，core库是自动收集依赖的，不需要显式指定依赖哪些数据，当依赖变化时，自动触发重新计算
                //首次createField(total) 会自动触发
                onFieldReact('total', (field) => {
                    console.log('total recompute');
                    const count = field.query('.count').value();
                    const price = field.query('.price').value();
                    const myField = field as Field;
                    myField.value = count * price;
                });
            },
        });
    }, []);

    return (
        <div>
            <button
                onClick={async () => {
                    let countField = form.createField({ name: 'count' });
                    let priceField = form.createField({ name: 'price' });
                    //只有totalField创建了以后，form的setFieldState才会生效
                    let totalField = form.createField({ name: 'total' });

                    //虽然初始值为0，但是这里已经被自动计算为10
                    let total = form.getValuesIn('total');
                    console.log(total);

                    //更改count的数值，total也会更新
                    countField.value = 20;
                    let total2 = form.getValuesIn('total');
                    console.log(total2);

                    //更改price的数值，total也会更新
                    priceField.value = 2;
                    let total3 = form.getValuesIn('total');
                    console.log(total3);
                }}
            >
                被动联动
            </button>
        </div>
    );
};
