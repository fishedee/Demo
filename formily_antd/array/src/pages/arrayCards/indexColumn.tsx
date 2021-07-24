import React from 'react';
import {
    FormItem,
    Input,
    ArrayCards,
    FormButtonGroup,
    Submit,
} from '@formily/antd';
import {
    createForm,
    onFieldInputValueChange,
    onFieldValueChange,
} from '@formily/core';
import { FormProvider, createSchemaField, FormConsumer } from '@formily/react';

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        ArrayCards,
    },
});

const form = createForm({
    effects: () => {},
});

export default () => {
    //当加入了Index列以后，我们发现，各个子条目的标题是由title与Index列组合起来的
    //我们来看了Index列的源代码https://github.com/alibaba/formily/blob/formily_next/packages/antd/src/array-cards/index.tsx
    //https://github.com/alibaba/formily/blob/formily_next/packages/antd/src/array-base/index.tsx#L122
    /*
    const title = (
        <span>
            <RecursionField
            schema={items}
            name={index}
            filterProperties={(schema) => {
                if (!isIndexComponent(schema)) return false
                return true
            }}
            onlyRenderProperties
            />
            {props.title || field.title}
        </span>
    )
    * Index列使用RecursionField，的onlyRenderProperties和filterProperties来只渲染items schema的x-component含有Index字符串的列
    * 这是因为Content列已经占用了ObjectField的index的那么，Index列不能再用一个ObjectField来包围它。
    * 那么现在问题就是在Index列没有了ObjectField的包围，它怎么知道自己在哪一行？

    <ArrayBase.Item key={index} index={index}>
        <Card
        {...props}
        onChange={() => {}}
        className={cls(`${prefixCls}-item`, props.className)}
        title={title}
        extra={extra}
        >
        {content}
        </Card>
    </ArrayBase.Item>

    从源代码可以看到，title是跟props.title以及Index列的实现有关
    
    ArrayBase.Item = ({ children, ...props }) => {
        return <ItemContext.Provider value={props}>{children}</ItemContext.Provider>
    }

    const ItemContext = createContext<IArrayBaseItemProps>(null)

    const useIndex = (index?: number) => {
        const ctx = useContext(ItemContext)
        return ctx ? ctx.index : index
    }

    ArrayBase.Index = (props) => {
        const index = useIndex()
        return <span {...props}>#{index + 1}.</span>
    }

    Index列的实现如上，答案是，Cards实现中，每行数据都用ArrayBase.Item创造一个Context包围住它，然后Index列的实现中使用useIndex来获取当前在哪一行的这个信息

    所以，title的数据的既有Index的部分，也有ArrayCards.props.title的部分
    很可惜，ItemContext没有暴露出来，所以，没有办法修改这部分代码
     */
    return (
        <FormProvider form={form}>
            <SchemaField>
                <SchemaField.Array
                    name="array"
                    maxItems={3}
                    x-component="ArrayCards"
                    x-component-props={{ title: '属性' }}
                >
                    <SchemaField.Object>
                        <SchemaField.Void x-component="ArrayCards.Index" />
                        <SchemaField.String
                            name="input"
                            x-decorator="FormItem"
                            title="输入框"
                            required
                            x-component="Input"
                        />
                        <SchemaField.Void x-component="ArrayCards.Remove" />
                        <SchemaField.Void x-component="ArrayCards.MoveUp" />
                        <SchemaField.Void x-component="ArrayCards.MoveDown" />
                    </SchemaField.Object>
                    <SchemaField.Void
                        x-component="ArrayCards.Addition"
                        x-reactions={{
                            //被动联动
                            dependencies: ['array'],
                            fulfill: {
                                state: {
                                    visible: '{{$deps[0].length<3}}',
                                },
                            },
                        }}
                        title="添加条目"
                    />
                </SchemaField.Array>
            </SchemaField>
            <FormButtonGroup>
                <Submit onSubmit={console.log}>提交</Submit>
            </FormButtonGroup>
            <FormConsumer>
                {(form) => {
                    return <div>{JSON.stringify(form.values)}</div>;
                }}
            </FormConsumer>
        </FormProvider>
    );
    /*

    我们可以进一步推导出来，Operation列的MoveUp，MoveDown，Remove也是类似的实现，但是它们不仅需要哪一行，还需要知道在哪个Array

    return (
        <ArrayBase>
        {renderEmpty()}
        {renderItems()}
        {renderAddition()}
        </ArrayBase>
    )

    ArrayCards的实现中，包围都被一个ArrayBase包围住了

    export const ArrayBase: ComposedArrayBase = (props) => {
        const field = useField<ArrayField>()
        const schema = useFieldSchema()
        return (
            <ArrayBaseContext.Provider value={{ field, schema, props }}>
            {props.children}
            </ArrayBaseContext.Provider>
        )
    }

    ArrayBase的实现中，拿出了当前的field与schema作为context，传递下去

    const ArrayBaseContext = createContext<IArrayBaseContext>(null)

    const useArray = () => {
        return useContext(ArrayBaseContext)
    }

    ArrayBase.Remove = React.forwardRef((props, ref) => {
        const index = useIndex(props.index)
        const array = useArray()
        const prefixCls = usePrefixCls('formily-array-base')
        if (!array) return null
        if (array.field?.pattern !== 'editable') return null
        return (
            <DeleteOutlined
            {...props}
            className={cls(`${prefixCls}-remove`, props.className)}
            ref={ref}
            onClick={(e) => {
                if (array.props?.disabled) return
                e.stopPropagation()
                array.field?.remove?.(index)
                array.props?.onRemove?.(index)
                if (props.onClick) {
                    props.onClick(e)
                }
            }}
            />
        )
    })

    那么Remove的实现就简单了，通过useArray拿出当前在哪个array，通过useIndex拿出当前在哪个index，onClick的时候，执行array的remove就可以了
     */
};
