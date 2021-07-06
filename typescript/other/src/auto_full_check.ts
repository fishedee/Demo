type Animal = 'dog' | 'cat' | 'fish'

function getAnimalOrdal(input: Animal): number {
    // 这样写不好，会漏掉fish的常量
    let number = 0
    if (input === 'dog') {
        number = 1
    } else if (input === 'cat') {
        number = 2
    }
    return number
}

function getAnimalOrdal2(input: Animal): number {
    // 这样写是最好的，漏掉一个情况，都会报错
    switch (input) {
        case 'dog':
            return 1
        case 'cat':
            return 2
        case 'fish':
            return 3
    }
}

function testFullCheck() {
    getAnimalOrdal('dog')
    getAnimalOrdal2('cat')
}

export default testFullCheck
