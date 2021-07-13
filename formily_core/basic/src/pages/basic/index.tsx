import { observable } from "@formily/reactive"
import { observer } from "@formily/reactive-react"
import { FormProvider ,Field,FieldType} from "./Context"
import Input from './Input'
import InputDigit from './InputDigit'
import FormItem from './FormItem';

const data = observable({
    name:{
        title:"名字",
        value:"",
        errors:[],
        visible:true,
        component:Input,
        componentProps:{},
        decorator:FormItem,
        decoratorProps:{},
        onInput:function(e:any){
            data.name.value = e.target.value
        }
    },
    age:{
        title:"年龄",
        value:undefined,
        errors:[],
        visible:true,
        component:InputDigit,
        componentProps:{},
        decorator:FormItem,
        decoratorProps:{},
        onInput:function(e:any){
            data.age.value = e.target.value
        }
    }
})

export default ()=>{
    return (
        <FormProvider form={data}>
            <Field
                name="name"
            />
            <Field
                name="age"
            />
        </FormProvider>
    );
}