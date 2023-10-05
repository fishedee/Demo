import {Switch,Route,Redirect} from 'redva/router';
import dynamic from 'redva/dynamic';
import React from 'react';
import UserRouter from '@/pages/User/router';

let router = [
	{
		name:"登录",
		path:"/login",
		component:'Layout/Login',
	},
	{
		name:"404页面",
		path:"/404",
		component:'Layout/NotFound',
	},
	{
		name:"首页",
		path:"/",
		component:'Layout/Home',
		children:[{
				name:"首页跳转",
				path:"/",
				component:'Layout/HomeRedirct',
			},
			...UserRouter,
		]
	}
];

let routerComponent = null;

function analyseComponent(app,router){
	if( router.wrapperComponent ){
		return;
	}
	router.wrapperComponent = dynamic({
      app: app,
      component: async () => {
        let raw = await import(`../pages/`+router.component);
        const Component = raw.default || raw;
        let ChildrenComponent;
        if( router.children && router.children.length != 0 ){
        	if( !router.childrenComponent ){
        		router.childrenComponent = getRouterComponent(app,router.children);
        	}
        	ChildrenComponent = router.childrenComponent;
        }else{
        	ChildrenComponent = null;
        }
        return (props)=>{
        	return React.createElement(Component,props,ChildrenComponent);
        };
      },
    });
    return;
}

function getRouterComponent(app,router){
	for( let i = 0 ; i != router.length ;i ++ ){
		analyseComponent(app,router[i]);
	}
	return (
		<Switch>
			{router.map((singleRouter)=>{
				const hasChildren = singleRouter.children && singleRouter.children.length != 0;
				return (<Route exact={!hasChildren} path={singleRouter.path} key={singleRouter.path} component={singleRouter.wrapperComponent}/>);
			})}
			<Redirect to="/404" key={"redirect_404__"}/>
		</Switch>
	);
}

export default function getRouter(app){
	if( routerComponent ){
		return routerComponent;
	}
	routerComponent = getRouterComponent(app,router);
	return routerComponent;
}

let nameMapper = {};

function resetPath(url){
	const urlSeg = url.split('/');
	let newSeg = [];
	for( const i in urlSeg ){
		if( urlSeg[i] != ''){
			newSeg.push(urlSeg[i]);
		}
	}
	return '/'+newSeg.join("/");
}

function calNameMapper(router){
	let result = {};
	for( let i in router ){
		const singleRouter = router[i];
		result[singleRouter.path] = singleRouter.name;
		if( singleRouter.children ){
			let childResult = calNameMapper(singleRouter.children);
			for( let j in childResult ){
				result[j] = childResult[j];
			}
		}
	}
	return result;
}

nameMapper = calNameMapper(router);

export function getRouterName(path){
	path = resetPath(path);
	if( nameMapper[path] ){
		return nameMapper[path];
	}else{
		return "";
	}
}