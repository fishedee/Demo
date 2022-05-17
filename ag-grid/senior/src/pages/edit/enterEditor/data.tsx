function getData() {
    let data = [
        { age: 14, name: 'fish' },
        { age: 123, name: 'cat' },
        { age: 78, name: 'dog' },
        { age: 21, name: 'sheep' },
        { age: 56, name: 'goat' },
        { age: 123, name: 'cow' },

        { age: 14, name: 'fish' },
        { age: 123, name: 'cat' },
        { age: 78, name: 'dog' },
        { age: 21, name: 'sheep' },
        { age: 56, name: 'goat' },
        { age: 123, name: 'cow' },

        { age: 14, name: 'fish' },
        { age: 123, name: 'cat' },
        { age: 78, name: 'dog' },
        { age: 21, name: 'sheep' },
        { age: 56, name: 'goat' },
        { age: 123, name: 'cow' },

        { age: 14, name: 'fish' },
        { age: 123, name: 'cat' },
        { age: 78, name: 'dog' },
        { age: 21, name: 'sheep' },
        { age: 56, name: 'goat' },
        { age: 123, name: 'cow' },

        { age: 14, name: 'fish' },
        { age: 123, name: 'cat' },
        { age: 78, name: 'dog' },
        { age: 21, name: 'sheep' },
        { age: 56, name: 'goat' },
        { age: 123, name: 'cow' },

        { age: 14, name: 'fish' },
        { age: 123, name: 'cat' },
        { age: 78, name: 'dog' },
        { age: 21, name: 'sheep' },
        { age: 56, name: 'goat' },
        { age: 123, name: 'cow' },

        { age: 14, name: 'fish' },
        { age: 123, name: 'cat' },
        { age: 78, name: 'dog' },
        { age: 21, name: 'sheep' },
        { age: 56, name: 'goat' },
        { age: 123, name: 'cow' },

        { age: 14, name: 'fish' },
        { age: 123, name: 'cat' },
        { age: 78, name: 'dog' },
        { age: 21, name: 'sheep' },
        { age: 56, name: 'goat' },
        { age: 123, name: 'cow' },

        { age: 14, name: 'fish' },
        { age: 123, name: 'cat' },
        { age: 78, name: 'dog' },
        { age: 21, name: 'sheep' },
        { age: 56, name: 'goat' },
        { age: 123, name: 'cow' },
    ];

    for (let i in data) {
        let single = data[i] as any;
        single.id = i;
    }
    return data;
}

export default getData;