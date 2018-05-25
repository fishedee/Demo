import redva from 'redva';
import React from 'react';

const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));
const app = new redva({
	onError: (error) => {
		error.preventDefault();
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
	mutations:{
		onBirthDay(state,action){
			state.author.age += 1
		}
	},
	actions:{
		async doBirthDay(state,{dispatch}){
			throw new Error('oh my god!');
			await dispatch({
				type:'onBirthDay'
			})
		},
		async waitNextBirthDay(state,{dispatch}){
			await delay(100)
			await dispatch({
				type:'doBirthDay'
			})
			console.log('Happy BirthDay!');
		}
	}
})
app.router(()=><div/>);
app.start();
app._store.dispatch({
	type: 'author/waitNextBirthDay',
})