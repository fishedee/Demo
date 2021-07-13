import { observer } from "@formily/reactive-react"
import {FieldContext} from './Context'
import {useContext} from 'react'

// FormItem UI组件
export default observer(({ children}) => {
    const field = useContext(FieldContext)
    return (
      <div>
        <div style={{ height: 20 }}>{field.title}:</div>
        {children}
        <div style={{ height: 20, fontSize: 12, color: 'red' }}>
          {field.errors.join(',')}
        </div>
      </div>
    )
})
  