var number = [1, 300, 12, 51, 6, 8];
var i = 0;
var total = 0;
while(number.length > i){
    console.log(number[i]);
    total += number[i];
    i += 1;
};

console.log('total : '+total);