declare global {
    interface String {
        convertSheep(): string
    }
}

String.prototype.convertSheep = function (this: string) {
    return '【' + this + '】'
}

export default {}
