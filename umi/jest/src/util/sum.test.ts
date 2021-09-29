import functions  from './sum';

test('sum(2 + 2) 等于 4', () => {
  expect(functions.sum(2, 2)).toBe(4);
})

test('对象的深度比较，用toEqual', () => {
    expect(functions.getAuthor()).toEqual(functions.getAuthor());
})

test('对象的引用比较，用toBe', () => {
    expect(functions.getAuthor()).not.toBe(functions.getAuthor());
})

test('异常检查', () => {
    function getIntArrayWrapFn() {
      functions.getIntArray(3.3);
    }
    expect(getIntArrayWrapFn).toThrow('"getIntArray"只接受整数类型的参数');
})

test('异步检查', async () => {
    //异步检查中需要这一句，否则可能因为await 没有返回而漏掉测试
    expect.assertions(1);
    let userId = await functions.fetchUser();
    expect(userId).toEqual(10001)
})

test('含有异常的异步检查', async () => {
    //注释下面这一句以后，会将测试错误掩盖掉
    //expect.assertions(1);
    try{
        let userId = await functions.fetchUserNoneReturn();
        expect(userId).toEqual(10001)
    }catch(e){
        console.log(e);
    }
})