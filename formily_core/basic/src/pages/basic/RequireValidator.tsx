export default function () {
    return function (data: any): string {
        if (typeof data === 'string') {
            return data == '' ? '缺少参数' : '';
        } else if (typeof data === 'undefined') {
            return '缺少参数';
        } else {
            return '';
        }
    };
}
