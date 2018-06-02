import add from './add';

const delay = (timeout)=>{
	return new Promise((resolve,reject)=>{
		setTimeout(resolve,timeout);
	})
}

async function go(){
	await delay(1000);
	let result = add(3,4);
	console.log(result);
}
go();