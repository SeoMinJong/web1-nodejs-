var fs = require('fs');

console.log('A');
// 비동기적인 함수로 파일을 읽어오는 것이 아래 로그보다 우선순위가 밀려 늦게 출력됨
fs.readFile('./syntax/sample.txt', 'utf-8', function(err, result){
    console.log(result)
});
console.log('C');