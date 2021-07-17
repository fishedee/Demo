import { createForm, onFieldChange, onFieldMount } from '@formily/core';
import { Field } from '@formily/core/esm/models';
import { useMemo } from 'react';
import { sleep } from '@/utils';

export default () => {
    const form = useMemo(() => {
        return createForm({
            initialValues: {
                name: 'fish',
            },
            effects() {
                onFieldMount('name', (field) => {
                    console.log('field : [name] mount!');
                });
                onFieldChange('name', (field, form) => {
                    //当Field是VoidField的时候，没有value
                    let field2 = field as Field;
                    console.log('field : [name] change!', field2.value);
                });
                onFieldChange('name', ['component'], (field, form) => {
                    console.log(
                        'field : [name] component change!',
                        field.component,
                    );
                });

                //测试已创建field，并初始初始化的字段，get操作，
                onFieldChange('name', (field, form) => {
                    //获取value的方法1，直接以本field为基点查找其他field
                    console.log(field.query('.age').value());

                    //获取value的方法2，query以后使用take转换为GeneralField
                    let ageField = field.query('.age').take() as Field;
                    console.log(ageField.value);

                    //获取value的方法3，通过form获取value，需要field在initialValues已经配置好了
                    console.log(form.values.age);

                    //获取value的方法4，通过form获取value
                    console.log(form.getValuesIn('age'));

                    //获取value的方法5，通过form获取value
                    console.log(form.getFieldState('age').value);
                });

                /*
                对于未创建field，并初始化的字段，要进行get操作的话
                field.query('xxx').value()，相当方便的相对位置查找
                field.query('xxx').take().value，相当方便的相对位置查找，可以获取多种属性
                form.getValuesIn，获取value，只能从顶层开始查找
                form.getFieldState()，获取多种属性，只能从顶层开始查找
                 */

                //测试对未创建field，以及还没初始化的字段，get操作，
                onFieldChange('name', (field, form) => {
                    //获取value的方法1，直接以本field为基点查找其他field
                    console.log(field.query('.age1').value());

                    //获取value的方法2，通过form获取value
                    console.log(form.getValuesIn('age2'));

                    //获取value的方法3，通过form获取value，需要field在initialValues已经配置好了
                    //但是当字段是深层嵌套的时候就会报错
                    console.log(form.values.age3);

                    //获取value的方法4，query以后使用take转换为GeneralField
                    //这个方法不行，因为ageField还没通过createField创建出来
                    //let ageField = field.query('.age4').take() as Field;
                    //console.log(ageField.value);

                    //获取value的方法5，通过form获取value
                    //这个方法也不行，因为ageField还没通过createField创建出来
                    //console.log(form.getFieldState('age5').value);
                });

                /*
                对于未创建field，以及还没初始化的字段，要进行get操作的话
                field.query('xxx').value()，相当方便的相对位置查找
                form.getValuesIn，获取value，只能从顶层开始查找
                 */

                //测试对未创建field，以及还没初始化的字段，set操作，
                onFieldChange('name', (field, form) => {
                    //设置value的方法1，直接以本field为基点查找其他field
                    //这个方法不行
                    //let field2 = field.query('.age1').take() as Field;
                    //field2.value = 10;

                    //设置value的方法2，通过form获取value
                    form.setValuesIn('age2', 11);

                    //设置value的方法3，通过form获取value
                    //但是当字段是深层嵌套的时候就会报错
                    form.values.age3 = 12;

                    //获取value的方法4，直接以本field为基点查找其他field
                    //如果字段找不到，setFieldState会将更新推入更新队列，直到字段出现再执行操作
                    form.setFieldState('age4', (state) => {
                        console.log('age4 set');
                        state.value = 13;
                        //这个方法可以设置field的其他属性
                        state.componentProps = { a: 3 };
                    });
                });

                /*
                对于未创建field，以及还没初始化的字段，要进行set操作的话
                form.setValuesIn，只设置value
                form.setFieldState，设置value，component等其他任意属性
                 */
            },
        });
    }, []);

    return (
        <div>
            <button
                onClick={async () => {
                    console.log('create Field');
                    //createField的时候就会触发onFieldChange，包括value与component
                    let ageField = form.createField({ name: 'age' });

                    console.log('create Field');
                    //createField的时候就会触发onFieldChange，包括value与component
                    let field = form.createField({ name: 'name' });

                    //手动触发field的onMount方法
                    console.log('mount');
                    field.onMount();

                    let setHasCrateFieldOfValue = async () => {
                        //手动更改field的value的方法
                        console.log('change value');
                        field.value = '123';

                        //手动更改field的value的方法2
                        await sleep(1000);
                        field.setValue('1234');

                        //手动更改field的value的方法3，通过form，需要有initalValue
                        await sleep(1000);
                        form.values.name = '12345';

                        //手动更改field的value的方法4，通过form
                        await sleep(1000);
                        form.setValuesIn('name', '123456');

                        //手动更改field的value的方法5
                        //这种方法会覆盖其他的字段，像setState一样与其他字段的原有值合并后一起更新
                        await sleep(1000);
                        form.setValues({
                            name: '1234567',
                            age: 11,
                        });

                        //手动更改field的value的方法6

                        form.setFieldState('name', (state) => {
                            state.value = '12345678';
                        });
                    };
                    await setHasCrateFieldOfValue();
                }}
            >
                点击，更改[fish]field的值
            </button>
        </div>
    );
};
