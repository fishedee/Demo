import { createSchemaField, observer } from "@formily/react";
import { Button } from "antd";
import {
  Input,
  Select,
  FormItem,
  Submit,
  Form,
  Space,
  FormLayout,
  FormButtonGroup,
  Reset,
  NumberPicker,
  ArrayTable,
} from "@formily/antd";
import {
  Field,
  onFieldInputValueChange,
  onFieldChange,
  createForm,
} from "@formily/core";
import { useEffect, useMemo, useState } from "react";

const SchemaField = createSchemaField({
  components: {
    Input,
    Select,
    FormItem,
    FormLayout,
    Space,
    Button,
    Submit,
    ArrayTable,
    NumberPicker,
  },
});

const UsetDetail: React.FC<any> = observer((props) => {
  const [stateRefresh, setStateRefresh] = useState(1);

  const form = useMemo(() => {
    return createForm({
      values: {
        detail: {} as any,
      },
    });
  }, []);
  const clickMe = () => {
    const field1 = form.query("detail.items.0.amount").take();
    console.log("field1 ", field1);

    form.values.detail = {
      items: [
        {
          amount: "123",
        },
      ],
    };

    //只创建value的话，是拿不到这个Field的，只有这个Field被render出来才能拿到
    //const field2 = form.query("detail.items.0.amount").take();
    //console.log("field2 ", field2);

    //手动setState的方法并不能马上render页面
    setStateRefresh(stateRefresh + 1);
    console.log("go");

    //你需要用timeout来延迟设置，在render以后再触发后面的代码
    setTimeout(() => {
      const field2 = form.query("detail.items.0.amount").take();
      console.log("field2 ", field2);
    }, 100);

    //这个问题是Formily的弱点，因为Formily设置在field上的dataSource只能是首次有效
    //后续的都需要经过设置dataSource都需要经过formily的query再set的方法。
    //而formily的set方法又需要组件创建以后才能使用，组件的创建时需要等待React触发后创建的，这点Formily是无法控制的生命周期
    //这里只能寄望setTimeout之后，组件已经被React render出来了
    //form.setFieldState的方法能解决这个问题，有一定的其他使用风险。
  };
  console.log("pageRefresh");
  const subItemSchema = (
    <SchemaField.Array
      name="items"
      title="子物料"
      x-component="ArrayTable"
      x-component-props={{
        bordered: true,
      }}
      x-decorator="FormItem"
    >
      <SchemaField.Void>
        <SchemaField.Void
          name="AmountColumn"
          title="默认配量"
          x-component="ArrayTable.Column"
        >
          <SchemaField.String
            name="amount"
            default={1}
            x-component="NumberPicker"
            x-decorator="FormItem"
            required={true}
          />
        </SchemaField.Void>
      </SchemaField.Void>
    </SchemaField.Array>
  );
  const formSchema = (
    <SchemaField>
      <SchemaField.Object name="detail">{subItemSchema}</SchemaField.Object>
    </SchemaField>
  );
  return (
    <Form form={form} feedbackLayout={"terse"}>
      {formSchema}
      <Button onClick={clickMe}>{"点我"}</Button>
    </Form>
  );
});

export default UsetDetail;
