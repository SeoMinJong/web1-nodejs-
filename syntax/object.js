var members = ['a','b','c'];
console.log(members[0]);

var i = 0;
while(i<members.length){
    console.log('array loop',members[i]);
    i+=1;
};

var roles = {
    'pergrammer':'a',
    'desginer':'b',
    'manager':'c'
};


for(var name in roles){
    console.log('object :',name, 'value :',roles[name]);
}