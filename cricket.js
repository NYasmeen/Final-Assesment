

var over = [0.1, 3.2, 3.4, 4.6, 10, 14.5, 20]
var run = [20,40,55,67,100,122,150]


function search(over){

 var x  = Math.floor(over.length/2)

if(process.argv[2]==over[x]){
   return console.log(run[x]);
   
}else if (process.argv[2]>over[x]){
    over = over.slice(x+1,over.length)
    run = run.slice(x+1,run.length);
    search(over)


}else{
    over = over.slice(0,x);
    run = run.slice(0,x);
    search(over)
}
}

result = search(over)

