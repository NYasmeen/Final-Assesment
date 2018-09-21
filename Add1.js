var A=12349;

function lastdigit(A){
const B=A;
 while (A>=10){
  A=A%10
  }
if (A == 9){
console.log(B-9);
}else {
  console.log(B+1);
}

}

lastdigit(A);
