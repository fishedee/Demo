class Builder {
    private data: object | null = null
    private method: 'get' | 'post' | null = null
    private url: string | null = null
    public name: string

    constructor(name: string) {
        this.name = name
    }

    public setMethod(method: 'get' | 'post'): this {
        this.method = method
        return this
    }

    public setData(data: object): this {
        this.data = data
        return this
    }

    public setURL(url: string): this {
        this.url = url
        return this
    }

    public send() {
        console.log('send', this.method, this.url, this.data)
    }
}

type ClassConstructor<T> = new (...args: any[]) => T

function decorator<T extends ClassConstructor<{}>>(Constructor: T) {
    return class extends Constructor {
        constructor(...args: any[]) {
            super(...args)
        }

        go() {
            console.log('mm')
        }
    }
}

export default function testDecorator() {
    const builder = new Builder('mm')
    builder.setData({ a: 3 }).setMethod('get').setURL('www.baidu.com').send()

    const constructor = decorator(Builder)
    // 注意newData的类型为decorator的匿名class&Builder
    const newData = new constructor('mj')
    newData.go()
}
