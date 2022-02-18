import { useEffect } from "react";
import clone from 'clone';
import { or } from "fp-ts/lib/Predicate";

const Page: React.FC<any> = (props) => {
    const data = [
        {
            a: 3,
            b: 4,
            c: [1, 2]
        },
    ];
    type dataType = typeof data;
    const clone1 = (e: dataType) => {
        //clone默认就支持循环引用的对象
        return clone(e);
    }
    const clone2 = (e: dataType) => {
        //使用JSON深拷贝的方式，效率第一点，循环引用也不支持
        let j2 = JSON.stringify(e);
        return JSON.parse(j2);
    }
    const cloneTest = (cloneWork: (a: dataType) => dataType) => {
        let origin = data;
        let after = cloneWork(origin);
        after[0].c = [34];
        after.push({
            a: 5,
            b: 6,
            c: [],
        });
        console.log("origin", origin);
        console.log("after", after);
    }
    useEffect(() => {
        cloneTest(clone1);
        cloneTest(clone2);
    });
    return (
        <div>{'Clone测试'}</div>
    );
}

export default Page;