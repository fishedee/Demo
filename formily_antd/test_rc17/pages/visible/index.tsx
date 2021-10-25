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
import { useEffect, useMemo } from "react";

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
  const form = useMemo(() => {
    return createForm({
      values: {
        detail: {} as any,
      },
      effects: () => {
        onFieldChange("detail.type", (f) => {
          //初次type启动时，以及ajax数据返回后type的变化
          const typeField = f as Field;
          const typeValue = typeField.value;
          refreshTableColumn(typeValue);
        });
      },
    });
  }, []);
  const refreshTableColumn = (typeValue: string) => {
    form.setFieldState("detail.selectItems", (state) => {
      if (typeValue == "COMBO") {
        state.visible = true;
      } else {
        state.visible = false;
      }
    });
  };
  useEffect(() => {
    setTimeout(() => {
      //模拟ajax请求
      form.values.detail = {
        type: "COMBO",
        selectItems: [
          {
            amount: "123",
          },
          {
            amount: "456",
          },
        ],
      };
    }, 2000);
  }, []);
  const subItemSchema = (
    <SchemaField.Array
      name="selectItems"
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
          x-component="Table.Column"
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
      <SchemaField.Object name="detail">
        <SchemaField.String
          name="type"
          title="类型"
          enum={[
            { label: "普通物料", value: "NORMAL" },
            { label: "属性物料", value: "PROPERTY" },
            { label: "选项物料", value: "SELECT" },
            { label: "组合物料", value: "COMBO" },
          ]}
          required={true}
          x-decorator="FormItem"
          x-component="Select"
          x-component-props={{}}
        />
        {subItemSchema}
      </SchemaField.Object>
    </SchemaField>
  );
  return (
    <Form form={form} feedbackLayout={"terse"}>
      {formSchema}
      <FormButtonGroup gutter={10}>
        <Submit onSubmit={() => {}}>提交</Submit>
        <Reset>重置</Reset>
      </FormButtonGroup>
    </Form>
  );
});

export default UsetDetail;
