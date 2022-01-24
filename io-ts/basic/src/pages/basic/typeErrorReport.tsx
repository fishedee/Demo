import * as t from 'io-ts';
import { isRight } from 'fp-ts/Either';

//自带的错误报告器
import { PathReporter } from 'io-ts/PathReporter';
import { pipe } from 'fp-ts/function';
import { fold } from 'fp-ts/Either';

//自定义的错误报告期
function getErrorPaths<A>(v: t.Validation<A>): Array<string> {
    return pipe(
        v,
        fold(
            (errors) =>
                errors.map(
                    (error) =>
                        `path:[${error.context
                            .map(({ key }) => key)
                            .join('.')}]，valueType:${typeof error.value}`,
                ),
            () => ['no errors'],
        ),
    );
}

export default () => {
    const go = () => {
        //使用组合的方式来定义一个类型
        const userType = t.type({
            userId: t.number,
            name: t.string,
        });

        const countryType = t.type({
            //联合类型
            name: t.union([t.string, t.undefined]),
            //数组类型
            people: t.array(userType),
            //映射类型
            peopleMap: t.record(t.string, userType),
        });

        //编译时的类型提示也是正确的
        type MM = t.TypeOf<typeof countryType>;

        //报错
        const validation = countryType.decode({
            name: 'China',
            people: [
                {
                    userId: 10001,
                    name: 'fish1',
                },
                {
                    userId: 10002,
                    name: 'fish2',
                },
            ],
            //缺少peopleMap参数
        });
        console.log(PathReporter.report(validation));
        console.log(getErrorPaths(validation));
        /*
        输出如下：
        "Invalid value undefined supplied to : { name: (string | undefined), people: Array<{ userId: number, name: string }>, peopleMap: { [K in string]: { userId: number, name: string } } }/peopleMap: { [K in string]: { userId: number, name: string } }"
        */
        /*
        ['path:[.peopleMap]，valueType:undefined']
        */

        //报错2
        const validation2 = countryType.decode({
            people: [
                {
                    userId: 10001,
                },
                {
                    userId: 10002,
                    name: 'fish2',
                },
            ],
            peopleMap: {
                fish1: {
                    name: 123,
                    userId: 123,
                },
            },
        });
        console.log(PathReporter.report(validation2));
        console.log(getErrorPaths(validation2));
        /*
        ""Invalid value undefined supplied to : { name: (string | undefined), people: Array<{ userId: number, name: string }>, peopleMap: { [K in string]: { userId: number, name: string } } }/people: Array<{ userId: number, name: string }>/0: { userId: number, name: string }/name: string""
        */
        /*
       ['path:[.people.0.name]，valueType:undefined', 'path:[.peopleMap.fish1.name]，valueType:number']
       */
    };
    return (
        <div>
            <button onClick={go}>点我</button>
        </div>
    );
};
