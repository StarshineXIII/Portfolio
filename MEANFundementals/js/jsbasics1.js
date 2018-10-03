var x=[];
x.push('coding','dojo','rocks');
x.pop();
console.log(X);

const y =[];
console.log(y);
y.push(88);
console.log(y);

var z=[9,10,6,5,-1,20,13,2];
function print(){
    console.log(z);
}
print (z);
z.pop();
print(z);

var names=['Kadie', 'Joe', 'Fritz', 'Pierre', 'Alphonso'];
function print(){
    console.log(names.length);
}
print(names);
for(var i=0; i<=names.length; i++){
    if (names[i] <=5){
        console.log(names[i]);
    }
}

var names=['Kadie', 'Joe', 'Fritz', 'Pierre', 'Alphonso'];
function print(){
    for(var i=0; i<=5; i++){
        if(names[i].length==5){
            console.log(names[i]);
        }
    }
}
print(names);

var str='hello world';
function yell(){
    console.log(str.toUpperCase());
}
yell(str);