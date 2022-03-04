import { ArraySchema, FieldSchema, ObjectSchema } from "./FormSchema";

let globalId = 10001;

const getIdName = (key: string | number) => {
    return '_' + key + '_id';
};

const getFeedbackName = (key: string | number) => {
    return '_' + key + '_feedback';
};

type ValidateResult = {
    shouldRefresh: boolean;
};

type ValidateAllResult = {
    isValid: boolean;
    message: string;
};

class FormChecker {

    private schema: FieldSchema;

    public constructor(schema: FieldSchema) {
        this.schema = schema;
    }

    public getId<T, K extends keyof T>(target: T, key: K): number {
        const current = target as any;
        const keyName = getIdName(key as string);
        let idValue = current[keyName];
        if (idValue == undefined) {
            idValue = globalId++;
            current[keyName] = idValue;
        }
        return idValue;
    }

    public refreshId<T, K extends keyof T>(target: T, key: K): number {
        const current = target as any;
        const keyName = getIdName(key as string);
        const idValue = globalId++;
        current[keyName] = idValue;
        return idValue;
    }

    public getFeedbackStatus<T, K extends keyof T>(
        target: T,
        key: K,
    ): 'error' | undefined {
        const current = target as any;
        const keyName = getFeedbackName(key as string);
        let feedbackValue = current[keyName];
        if (feedbackValue == undefined || feedbackValue == '') {
            return undefined;
        } else {
            return 'error';
        }
    }

    public getFeedbackText<T, K extends keyof T>(target: T, key: K): string {
        const current = target as any;
        const keyName = getFeedbackName(key as string);
        let feedbackValue = current[keyName];
        if (feedbackValue == undefined || feedbackValue == '') {
            return '';
        } else {
            return feedbackValue as string;
        }
    }

    public clearValidate<T, K extends keyof T>(target: T, key: K): ValidateResult {
        //获取旧feedBack
        let oldFeedBack = this.getFeedbackText(target, key);

        //赋值新feedback
        let current = target as any;
        const keyName = getFeedbackName(key as string);
        current[keyName] = undefined;

        //返回
        if (oldFeedBack == '') {
            return { shouldRefresh: false };
        } else {
            return { shouldRefresh: true };
        }
    }

    public validate<T, K extends keyof T>(
        target: T,
        key: K,
    ): ValidateResult & ValidateAllResult {
        //获取旧feedBack
        let oldFeedBack = this.getFeedbackText(target, key);

        //计算newFeedBack
        let current = target as any;
        let propertySchemaAll = this.schema.getPropertySchema();
        let propertySchema = propertySchemaAll[key as any];
        if (!propertySchema) {
            throw new Error("不存在的属性 " + key);
        }
        let newFeedBack = propertySchema.validateSelf(current[key]);

        //赋值newFeedBack
        const keyName = getFeedbackName(key as string);
        current[keyName] = newFeedBack;

        //返回是否该刷新
        if (oldFeedBack != newFeedBack) {
            return {
                shouldRefresh: true,
                isValid: newFeedBack == '',
                message: newFeedBack,
            };
        } else {
            return {
                shouldRefresh: false,
                isValid: newFeedBack == '',
                message: newFeedBack,
            };
        }
    }

    public clearAllValidate<T>(target: T) {
        if (this.schema instanceof ArraySchema) {
            let itemChecker = new FormChecker(this.schema.getItemSchema());
            if (typeof target == 'object' && target instanceof Array == true) {
                for (let i in target) {
                    itemChecker.clearAllValidate(target[i]);
                }
            }
        } else if (this.schema instanceof ObjectSchema) {
            let propertySchemaAll = this.schema.getPropertySchema();
            if (typeof target == 'object' && target instanceof Array == false) {
                for (let key in propertySchemaAll) {
                    let itemChecker = new FormChecker(propertySchemaAll[key]);
                    const keyName = getFeedbackName(key as string);
                    (target as any)[keyName] = undefined;

                    //子清除
                    itemChecker.clearAllValidate((target as any)[key])
                }
            }
        }
    }

    public validateAll<T>(target: T): ValidateAllResult {
        if (this.schema instanceof ArraySchema) {
            let itemChecker = new FormChecker(this.schema.getItemSchema());
            if (typeof target == 'object' && target instanceof Array == true) {
                let firstFail: ValidateAllResult = {
                    isValid: true,
                    message: '',
                }
                for (let i in target) {
                    let single = itemChecker.validateAll(target[i]);
                    if (single.isValid == false && firstFail.isValid == true) {
                        firstFail = {
                            isValid: false,
                            message: '->[' + i + "] " + single.message,
                        };
                    }
                }
                return firstFail;
            }
        } else if (this.schema instanceof ObjectSchema) {
            let propertySchemaAll = this.schema.getPropertySchema();
            if (typeof target == 'object' && target instanceof Array == false) {
                let firstFail: ValidateAllResult = {
                    isValid: true,
                    message: '',
                }
                for (let key in propertySchemaAll) {
                    //校验自身字段
                    let single: ValidateAllResult = this.validate(target, key as any);
                    if (single.isValid == false && firstFail.isValid == true) {
                        firstFail = {
                            isValid: false,
                            message: '->(' + key + ") " + single.message,
                        };
                    }

                    //校验子字段
                    let childSchema = propertySchemaAll[key];
                    let childChecker = new FormChecker(childSchema);
                    single = childChecker.validateAll((target as any)[key]);
                    if (single.isValid == false && firstFail.isValid == true) {
                        firstFail = {
                            isValid: false,
                            message: '->(' + key + ") " + single.message,
                        };
                    }
                }
                return firstFail;
            }
        }
        return {
            isValid: true,
            message: '',
        }
    }
};

export default FormChecker;