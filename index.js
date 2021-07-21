var a = 5;
function test1(){
a++;
console.log(a);
}
let func = test1;
func();
function test2(){
    a--;
    console.log(a);
}
test1();
test2();