export type JsonSchema =
    | {
          type: 'object';
          title?: string;
          name?: string;
          required?: boolean;
          format?: string;
          properties?: {
              [name in string]: JsonSchema;
          };
          'x-component': string;
          'x-component-props': any;
          'x-decorator': string;
          'x-decorator-props': any;
      }
    | {
          type: 'array';
          title?: string;
          name?: string;
          required?: boolean;
          format?: string;
          items?: JsonSchema;
          properties?: {
              [name in string]: JsonSchema;
          };
          'x-component': string;
          'x-component-props': any;
          'x-decorator': string;
          'x-decorator-props': any;
      }
    | {
          type: 'number';
          title?: string;
          name?: string;
          required?: boolean;
          format?: string;
          'x-component': string;
          'x-component-props': any;
          'x-decorator': string;
          'x-decorator-props': any;
      }
    | {
          type: 'string';
          title?: string;
          name?: string;
          required?: boolean;
          format?: string;
          'x-component': string;
          'x-component-props': any;
          'x-decorator': string;
          'x-decorator-props': any;
      };
