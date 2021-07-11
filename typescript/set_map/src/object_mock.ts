type User = {
    id: number
    name: string
}
type UserMap = {
    [key in number]: User
}

function TestObjectMockMap1() {
    const data: UserMap = {}

    // key指定了为number类型，以下这句报错
    /*
    data.fish = {
        id: 1,
        name: 'fish',
    }
    */

    console.log('object mock test....')

    data[1] = {
        id: 1,
        name: 'fish',
    }

    data[2] = {
        id: 2,
        name: 'cat',
    }

    console.log(data[1])
    console.log(data.hasOwnProperty(1))
    console.log(data.hasOwnProperty(12))
}

/*
//你不用创建一个以对象为key的map
type UserMap2 = {
    [key in User]: number
}
*/

function TestObjectMockMap2() {
    console.log('nothing happen')
}

export default function TestObjectMockMap() {
    TestObjectMockMap1()
    TestObjectMockMap2()
}
