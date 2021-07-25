import { ArrayField, Field } from '@formily/core';
import { RecursionField, useField, useFieldSchema } from '@formily/react';
import { observer } from '@formily/reactive-react';
import React, { ReactNode, useContext } from 'react';
import { ReactElement } from 'react';

type PropsType = Field & {
    children: (index: number) => ReactElement;
};
export default observer((props: PropsType) => {
    const field = useField<ArrayField>();
    const fieldSchema = useFieldSchema();
    //https://github.com/alibaba/formily/blob/formily_next/packages/react/src/components/RecursionField.tsx
    //https://github.com/alibaba/formily/blob/formily_next/packages/react/src/components/ReactiveField.tsx
    //RecursionField在渲染VoidField与ObjectField的时候，会将name字段传递给它们properties的Field的RecursionField的objectName+name。也各个Field的BasePath字段。
    //换句话说，RecursionField会自动覆盖本Field以及各个子Field下的basePath
    //RecursionField的name字段是必填的，basePath字段是选填的
    //而且，RecursionField自身还有basePath字段，它们的优先级是，优先使用RecursionField的basePath字段，否则就使用parentField.address字段。结果为XBasePath字段。
    //默认情况下，RecursionField渲染自身与子节点，这时候自身basePath被强行指定XBasePath，name字段就是为props.name字段，子节点通过ReactiveField来触发renderProperties，传入第一个参数是ObjectField或者VoidField本身，会自行继承父级的address作为basePath
    //当RecursionField使用onlyRenderProperties的时候，自身缺少节点，子节点被直接指定basePath为(XBasePath+name字段)。
    //无论如何，RecursionField总是保证以下：
    //* 自身为XBasePath+RecursionField的name字段
    //* 子节点为XBasePath+RecursionField的name字段+子节点自身的name字段
    return (
        <div
            style={{
                border: '2px solid rgb(186 203 255)',
            }}
        >
            <div style={{ padding: '10px' }}>
                {field.value?.map((item, index) => {
                    return (
                        <div key={index}>
                            <div>
                                <RecursionField
                                    name={index}
                                    schema={fieldSchema.items!}
                                />
                            </div>
                            <button
                                onClick={() => {
                                    field.remove(index);
                                }}
                            >
                                删除
                            </button>
                        </div>
                    );
                })}
            </div>
            <button
                onClick={() => {
                    field.push({});
                }}
            >
                添加一行
            </button>
        </div>
    );
});
