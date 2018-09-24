console.log('Client-side code running');
function mybutton(test){
  
  console.log('button was clicked');
  fetch('/like', {method: 'POST', headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },body:JSON.stringify({
    idea: test
  }) }, )
  .then(function(response) {
    if(response.ok) {
      console.log(test);
      console.log('click was recorded');
      location.reload()
    }
    throw new Error('Request failed.');
  })
  .catch(function(error) {
    console.log(error);
  });
}

   
