import * as t from 'io-ts';
import { isRight } from 'fp-ts/Either';

export default () => {
    const go = () => {
        //定义一个t类型，输入为string，输出为string，检验的输入参数为unknown
        //Type<A, O, I>
        const string = new t.Type<string, string, unknown>(
            //类型名称
            //readonly name: string,
            'string',

            //运行时和编译时的类型判断
            //readonly is: (u: unknown) => u is A,
            (input: unknown): input is string => typeof input === 'string',

            //校验输入为I类型的时候，它是否满足A类型
            //readonly validate: (input: I, context: Context) => Either<Errors, A>,
            (input, context) =>
                typeof input === 'string'
                    ? t.success(input)
                    : t.failure(input, context),

            //encode，从输入类型A，运行时转换为输出类型O
            //readonly encode: (a: A) => O
            t.identity,
        );

        //decode，Type类型自带的一个方法，从任意的类型I，转换为输入类型A
        //decode(i: I): Either<Errors, A>
        console.log(
            isRight(string.decode('a string')), // true
        );
        console.log(
            string.decode('a string'), // 返回Either类型
        );
        console.log(
            isRight(string.decode(null)), // true
        );
        console.log(
            string.decode(null), // 返回Either类型
        );
    };
    return (
        <div>
            <button onClick={go}>点我</button>
        </div>
    );
};
