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

const BuiltInValidator = {
    required: (text: any): string => {
        if (text == undefined || text == '' || text == null) {
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
};

type ValidatorFunctionType = (text: any) => string;

type ValidatorType = keyof typeof BuiltInValidator | ValidatorFunctionType;

const FormHelper = {
    getId<T, K extends keyof T>(target: T, key: K): number {
        const current = target as any;
        const keyName = getIdName(key as string);
        let idValue = current[keyName];
        if (idValue == undefined) {
            idValue = globalId++;
            current[keyName] = idValue;
        }
        return idValue;
    },

    refreshId<T, K extends keyof T>(target: T, key: K): number {
        const current = target as any;
        const keyName = getIdName(key as string);
        const idValue = globalId++;
        current[keyName] = idValue;
        return idValue;
    },

    getFeedbackStatus<T, K extends keyof T>(
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
    },

    getFeedbackText<T, K extends keyof T>(target: T, key: K): string {
        const current = target as any;
        const keyName = getFeedbackName(key as string);
        let feedbackValue = current[keyName];
        if (feedbackValue == undefined || feedbackValue == '') {
            return '';
        } else {
            return feedbackValue as string;
        }
    },

    clearValidate<T, K extends keyof T>(target: T, key: K): ValidateResult {
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
    },

    validate<T, K extends keyof T>(
        target: T,
        key: K,
        ...validator: ValidatorType[]
    ): ValidateResult {
        //获取旧feedBack
        let oldFeedBack = this.getFeedbackText(target, key);

        //计算newFeedBack
        let current = target as any;
        let currentValue = current[key];
        const validatorResult: string[] = [];
        for (let i in validator) {
            const singleResult = validator[i];
            let singleValidator: ValidatorFunctionType;
            if (typeof singleResult == 'function') {
                singleValidator = singleResult;
            } else {
                singleValidator = BuiltInValidator[singleResult];
            }
            let fieldResult = singleValidator(currentValue);
            if (fieldResult != '') {
                validatorResult.push(fieldResult);
            }
        }
        let newFeedBack = validatorResult.join('，');

        //赋值newFeedBack
        const keyName = getFeedbackName(key as string);
        current[keyName] = newFeedBack;

        //返回是否该刷新
        if (oldFeedBack != newFeedBack) {
            return {
                shouldRefresh: true,
            };
        } else {
            return {
                shouldRefresh: false,
            };
        }
    },

    isFormValid<T>(target: T): boolean {
        for (let key in target) {
            let current = target[key];
            let validResult: boolean;
            //校验当前节点
            if (typeof current == 'function') {
                continue;
            } else if (typeof current == 'object') {
                validResult = this.isFormValid(current);
            } else {
                const feedbackText = this.getFeedbackText(target, key);
                if (feedbackText == '') {
                    validResult = true;
                } else {
                    validResult = false;
                }
            }
            //提前结束
            if (validResult == false) {
                return false;
            }
        }
        return true;
    },
};

export default FormHelper;
