var babel = require("babel-core");
const { readdirSync , writeFileSync } = require('fs');
const { join } = require('path');

const cwd = __dirname

function getSrc(){
	const files = readdirSync(join(cwd, 'src'));
	return files;
}

function transform(file){
	const srcFile = join(cwd, 'src',file)
	const destFile = join(cwd, 'es',file)
	const data = babel.transformFileSync(srcFile,{
		presets:[
			['env',{modules:false}]
		],
		babelrc:false,
	})
	writeFileSync(destFile,data.code,'utf-8');
}

const src = getSrc();
for( const i in src ){
	transform(src[i])
}