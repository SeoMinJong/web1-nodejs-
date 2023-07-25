// var i = if(ture){console.log(1)};
// var w = while(true){console.log};

// 함수는 객체가 될 수 있음
var f = function f1(){
    console.log(1+1);
    console.log(2+2);
};

//f();

var a = [f];
a[0]();

var o = {
    func:f
};

o.func();