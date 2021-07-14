import { observer } from '@formily/reactive-react';
import { FieldContext } from './Context';
import { useContext } from 'react';

// FormItem UI组件
export default observer(({ children }) => {
    const field = useContext(FieldContext);
    const decoratorProps = field.decoratorProps as any;
    let style = {};
    if (decoratorProps.style) {
        style = decoratorProps.style;
    }
    return (
        <div>
            <div style={{ height: 20, ...style }}>{field.title}:</div>
            {children}
            <div style={{ height: 20, fontSize: 12, color: 'red' }}>
                {field.errors.join(',')}
            </div>
        </div>
    );
});
