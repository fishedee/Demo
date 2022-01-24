import * as t from 'io-ts';
import { isRight } from 'fp-ts/Either';

export default () => {
    const go = () => {
        //使用组合的方式来定义一个类型
        const userType = t.type({
            userId: t.number,
            name: t.string,
        });

        //使用decode的方式来校验类型，这个会返回false
        const validation = userType.decode({ userId: 22 });
        console.log(isRight(validation));

        //使用decode的方式来校验类型，这个会返回true
        const validation2 = userType.decode({ userId: 123, name: '789' });
        console.log(isRight(validation2));
        if (validation2._tag == 'Right') {
            console.log('ok', validation2.right);
        }

        //将io-ts类型转换为ts类型
        //我们得到了一个编译时的类型定义，避免将一个类型定义写2次
        type UserType = t.TypeOf<typeof userType>;

        const mm: UserType = {
            userId: 123,
            name: 'u89',
        };
        console.log(mm);
    };
    return (
        <div>
            <button onClick={go}>点我</button>
        </div>
    );
};
