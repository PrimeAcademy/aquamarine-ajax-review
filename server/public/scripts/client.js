$(document).ready(handleReady);

function handleReady() {
  console.log("jquery is loaded!");
  // event handler/listener
  $('#submitGuesses').on('click', addGuesses);

  getGuesses();
}

function addGuesses() {
  // get  values  from inputs
  let guess = {
    p1Guess: $('#p1Guess').val(),
    p2Guess: $('#p2Guess').val(),
  }

  console.log('guesses', guess);
  // ajax to server
  $.ajax({
    method: 'POST',
    url: '/addGuesses',
    data: guess, // must be an object
  })
    .then((response) => {
      console.log('post finished');
      // update our data
      getGuesses();
    });

  // deal with response
}

function getGuesses() {
  $.ajax({
    url: '/guesses',
    method: 'GET'
  })
    .then((response) => {
      console.log('guesses data: ', response);
      // update the DOM
      render(response)
    })
}

function render(response) {
  // empty the container
  $()
  // append, looping
}