type ValidatorFunctionType = (text: any) => string;

const BuiltInValidator = {
    required: (text: any): string => {
        if (text === undefined || text === '' || text === null) {
            return '请输入';
        } else {
            return '';
        }
    },
    number: (text: any): string => {
        if (/^\d+$/.test(text)) {
            return '';
        } else {
            return '请输入整数';
        }
    },
    string: (text: any): string => {
        if (typeof text == 'string') {
            return '';
        } else {
            return '请输入字符串';
        }
    },
    notEmpty: (data: any): string => {
        if (typeof data == 'object' &&
            data instanceof Array &&
            data.length != 0) {
            return '';
        } else {
            return '不能为空';
        }
    },
    notNull: (data: any): string => {
        if (typeof data == 'object' &&
            data != null) {
            return '';
        } else {
            return '不能为Null';
        }
    },
};

type ValidatorType = keyof typeof BuiltInValidator | ValidatorFunctionType;


type PropertySchemaType = {
    [K in string]: FieldSchema;
};

class FieldSchema {
    private checkers: ValidatorType[] = [];

    public constructor(...checkers: ValidatorType[]) {
        this.checkers = checkers;
    }

    public validateSelf(data: any): string {
        let result = [];
        for (let i in this.checkers) {
            let singleChecker = this.checkers[i];
            let singleCheckResult = '';
            if (typeof singleChecker == 'string') {
                singleCheckResult = BuiltInValidator[singleChecker](data);
            } else {
                singleCheckResult = singleChecker(data);
            }
            if (singleCheckResult != '') {
                result.push(singleCheckResult);
            }
        }
        return result.join("，");
    }

    public validate(data: any): string {
        return this.validateSelf(data);
    }

    public getItemSchema(): FieldSchema {
        throw new Error('不支持的getItemSchema');
    }

    public getPropertySchema(): PropertySchemaType {
        throw new Error("不支持的getPropertySchema ");
    }
}


class NormalSchema extends FieldSchema {
    public constructor(...checkers: ValidatorType[]) {
        super(...checkers);
    }
}

class ArraySchema extends FieldSchema {

    private itemSchema: FieldSchema;

    public constructor(itemSchema: FieldSchema, ...checkers: ValidatorType[]) {
        super(...checkers);
        this.itemSchema = itemSchema;
    }

    public validate(data: any): string {
        let superCheck = super.validate(data);
        if (superCheck != '') {
            return superCheck;
        }
        if (typeof data == 'undefined' || data == null) {
            return '';
        }
        if (typeof data != 'object' && data instanceof Array == false) {
            return '请输入数组';
        }
        for (let i in data) {
            let single = data[i];
            let itemCheck = this.itemSchema.validate(single);
            if (itemCheck != '') {
                return "->[" + i + "] " + itemCheck;
            }
        }
        return "";
    }

    public getItemSchema(): FieldSchema {
        return this.itemSchema;
    }
}


class ObjectSchema extends FieldSchema {

    private itemSchema: PropertySchemaType = {};

    public constructor(itemSchema: PropertySchemaType, ...checkers: ValidatorType[]) {
        super(...checkers);
        this.itemSchema = itemSchema;
    }

    public validate(data: any): string {
        let superCheck = super.validate(data);
        if (superCheck != '') {
            return superCheck;
        }
        if (typeof data == 'undefined' || data == null) {
            return '';
        }
        if (typeof data != 'object') {
            return '请输入对象';
        }
        for (let i in this.itemSchema) {
            let value = data[i];
            let propertySchema = this.itemSchema[i];
            let itemCheck = propertySchema.validate(value);
            if (itemCheck != '') {
                return "->(" + i + ") " + itemCheck;
            }
        }
        return "";
    }

    public getPropertySchema(): PropertySchemaType {
        return this.itemSchema;
    }
}

export {
    FieldSchema,
    NormalSchema,
    ArraySchema,
    ObjectSchema,
}