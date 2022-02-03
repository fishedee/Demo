function compileCode(src: string) {
        src = `with (exposeObj) { ${src} }`
        return new Function('exposeObj', src)
}

function proxyObj(originObj: any) {
        let exposeObj = new Proxy(originObj, {
                has: (target, key) => {
                        if (["console", "Math", "Date"].indexOf(String(key)) >= 0) {
                                return target[key]
                        }
                        if (!target.hasOwnProperty(key)) {
                                throw new Error(`Illegal operation for key ${String(key)}`)
                        }
                        return target[key]
                },
        })
        return exposeObj
}

function createSandbox(src: string, obj: any) {
        try {

                let proxy = proxyObj(obj)
                compileCode(src).call(proxy, proxy) //绑定this 防止this访问window
        } catch (e) {
                if (e instanceof SyntaxError) {
                        console.error(src);
                        throw new Error("代码语法错误");
                } else {
                        throw e;
                }
        }
}

export default createSandbox;