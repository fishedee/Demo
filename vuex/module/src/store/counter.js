const delay = (timeout)=>{
	return new Promise((resolve,reject)=>{
		setTimeout(resolve,timeout);
	});
}

export default {
	namespaced: true,
	
	state:{
		count:0
	},
	mutations:{
		decrement(state){
			state.count--
		},
		increment(state){
			state.count++
		}
	},
	actions:{
		_asyncAny({commit,state,dispatch},payload){
			let action = ""
			let amount = 0;
			if( payload.amount > 0 ){
				action = "increment"
				amount = payload.amount
			}else{
				action = "decrement"
				amount = -payload.amount
			}
			for( let i = 0 ;i != amount ; i ++ ){
				commit(action)
			}
		},
		async asyncInc({commit,state,dispatch},payload){
			console.log(payload);
			if( state.count > 10 ){
				await delay(1000)
			}
			dispatch('_asyncAny',payload)
		}
	}
}

