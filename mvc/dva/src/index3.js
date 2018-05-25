import dva from 'dva';
import React from 'react';
import {put} from 'redux-saga/effects';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

const app = new dva({
	onError: (error) => {
		error.preventDefault()
		console.log(error.message);
    }
});
app.model({
	namespace:'author',
	state:{
		name:'fish',
		sex:'man',
		age:17,
	},
	reducers:{
		onBirthDay(state,action){
			return {
				age:state.age+1
			}
		}
	},
	effects:{
		*doBirthDay(state,{call}){
			throw new Error('oh my god!');
		},
		*waitNextBirthDay(state,{call}){
			yield call(delay,100)
			yield *put.resolve({
				type:'author/doBirthDay'
			})
			console.log('Happy BirthDay!');
		}
	}
})

app.router(()=><div/>);
app.start('#root');
app._store.dispatch({
	type: 'author/waitNextBirthDay',
})
