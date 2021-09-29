const sleep = (time:number)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,time);
    })
}
const sleepNone = (time:number)=>{
    return new Promise((resolve,reject)=>{
        reject('Something Evil happen');
    })
}

export default {
    sum(a:number, b:number) {
      return a + b;
    },
    getAuthor() {
        return {
            name: 'LITANGHUI',
            age: 24,
        }
    },
    getIntArray(num:any) {
        if (!Number.isInteger(num)) {
          throw Error('"getIntArray"只接受整数类型的参数');
        }
    
        let result = [];
        for (let i = 0, len = num; i < len; i++) {
          result.push(i);
        }
        
        return result;
    },
    async fetchUser() {
        await sleep(100);
        return 10001;
    },
    async fetchUserNoneReturn() {
        await sleepNone(100);
        return 10001;
    }
  }