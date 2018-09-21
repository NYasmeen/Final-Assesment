
 var over = [0.1, 3.2, 3.4, 4.6, 10, 14.5, 20]
 var run = [20,40,55,67,100,122,150]


index = findIndex(over,process.argv[2])
if (index == -1){
    console.log( "Element not found")
}else{
    console.log(run[index])
}


var over = [0.1, 3.2, 3.4, 4.6, 10, 14.5, 20]
var run = [20,40,55,67,100,122,150]
var x=1

function search(over){

var x  = Math.floor(over.length/2)
if(over.length){console.log(over.length);
}
if(process.argv[2]==over[x]){
   return run[x];
}else if (process.argv[2]>over[x]){
    over = over.slice(x+1,over.length)
    return search(over)
}else{
    over = over.slice(0,x-1);
    return search(over)

}
}

result = search(over)
console.log(result)