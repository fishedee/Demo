import functions  from './sum';

beforeAll(()=>{
    console.log('beforeAll');
})
beforeEach(()=>{
    console.log('setUp');
})

describe('套餐走起',()=>{
    test('sum(2 + 2) 等于 4', () => {
        expect(functions.sum(2, 2)).toBe(4);
    })
    
    test('对象的深度比较，用toEqual', () => {
        expect(functions.getAuthor()).toEqual(functions.getAuthor());
    })
})

afterEach(()=>{
    console.log('tearDown');
})
afterAll(()=>{
    console.log('afterAll');
});