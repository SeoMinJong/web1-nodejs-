// 실행되는 nodejs의 경로[0], 실행하고 있는 파일의 경로[1], 입력값[2...]
var arg = process.argv[2];

console.log('A');
console.log('B');
if(arg==1){
    console.log('C1');
}
else{
    console.log('C2')
};
console.log('D');