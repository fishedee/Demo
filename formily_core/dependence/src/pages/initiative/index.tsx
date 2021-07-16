import { createForm, onFieldChange, onFieldMount } from '@formily/core';
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
                //主动联动，对A数据主动倾听，然后设置B数据
                //对count数据倾听，然后设置total数据
                //首次createField(count) 会自动触发
                onFieldChange('count', (field) => {
                    console.log('Field[count] change');
                    const count = (field as Field).value;
                    const price = field.query('.price').value();
                    form.setFieldState('total', (state) => {
                        state.value = count * price;
                    });
                });

                //主动联动
                //对price数据倾听，然后设置total数据
                //首次createField(price) 会自动触发
                onFieldChange('price', (field) => {
                    console.log('Field[price] change');
                    const count = (field as Field).value;
                    const price = field.query('.count').value();
                    form.setFieldState('total', (state) => {
                        state.value = count * price;
                    });
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
                主动联动
            </button>
        </div>
    );
};
