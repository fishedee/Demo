const cnchar = require('cnchar-all');

function toCharArray(s){
    let result = [];
    for( var i = 0 ;i < s.length;){
        var singleLength = s.charCodeAt(i);
        if( singleLength <=255){
            result.push(s.substr(i,1));
            i += 1;
        }else{
            result.push(s.substr(i,1));
            i += 1;
        }
    }
    return result;
}

function toStrokeNumber(s){
    let result = [];
    for( var i = 0;i < s.length;i++){
        result.push(cnchar.stroke(s[i]));
    }
    return result;
}

let noArray = [4,9,10,12,14,19,20,22,27,34,40,42,43,44,46,40,42,43,44,46,54,59,60,62,64,69,70,74,76,79];

function isNo(s){
    for( let i = 0 ;i != noArray.length;i++){
        let single = noArray[i];
        if( single == s){
            return '凶';
        }
    }
    return '吉';
}
function toAnalyse(s){
    if( s.length != 3 ){
        throw new Error("只支持3个汉字的名字");
    }
    let first = s[0] +s[1];
    let second = s[1]+s[2];
    let all = first + s[2];
    let result = [
        isNo(first),
        isNo(second),
        isNo(all),
    ];
    return result;
}
const str = "abc";
const strArray = toCharArray(str);
const strokeNumber = toStrokeNumber(strArray);
const strokeResult = toAnalyse(strokeNumber);
console.log(strArray);
console.log(strokeNumber);
console.log(strokeResult);
