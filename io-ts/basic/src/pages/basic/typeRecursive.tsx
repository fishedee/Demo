import * as t from 'io-ts';
import { isRight } from 'fp-ts/Either';

export default () => {
    const go = () => {
        //递归类型需要先声明TS类型才能使用
        interface Category {
            name: string;
            categories: Array<Category>;
        }

        const CategoryType: t.Type<Category> = t.recursion('Category', () =>
            t.type({
                name: t.string,
                categories: t.array(CategoryType),
            }),
        );

        //使用decode的方式来校验类型，这个会返回false
        const validation = CategoryType.decode({
            name: 'fish',
            categories: [
                {
                    name: 'fish2',
                    categories: [],
                },
                {
                    name: 'fish3',
                    categories: [
                        {
                            name: 'cat4',
                            categories: [],
                        },
                        {
                            name: 'cat5',
                            categories: [],
                        },
                    ],
                },
            ],
        });
        console.log(isRight(validation));
    };
    return (
        <div>
            <button onClick={go}>点我</button>
        </div>
    );
};
