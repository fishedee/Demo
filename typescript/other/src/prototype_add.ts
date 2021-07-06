// 即使没有导入prototype_declaration也没有问题
import './prototype_declaration'

function testPrototype() {
    const a = '123'
    const b = a.convertSheep()
    console.log(b)
}

export default testPrototype
