let localStorage = {};
export default {
	set: (key,value)=>{
		localStorage[key] = value;
	},
	get:(key)=>{
		return localStorage[key];
	},
	clear:()=>{
		localStorage = {};
	}
}