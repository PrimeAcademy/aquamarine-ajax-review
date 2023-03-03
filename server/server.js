// New npm project set-up
// https://github.com/PrimeAcademy/aquamarine-syllabus/blob/main/lecture-notes/week-07-node-express-ajax/new-project-steps.md

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 5000;

// server our static files from public folder
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

// start listening
app.listen(PORT, () => {
    console.log('server running on port', PORT);
});

// ROUTES
let guesses = {
  player1: {
    history: [], // will  hold guesses
    lastGuess: '',
  },
  player2: {
    history: [],
    lastGuess: '',
  },
};

// GET
app.get('/guesses', (req, res) => {
    // respond/send data....
    res.send(guesses);
});

// POST
app.post('/addGuesses', (req, res) => {
    const theNumber = 10;
  // data will be put on req.body
  console.log('in post', req.body);
  let p1Guess = Number(req.body.p1Guess);
  let p2Guess = Number(req.body.p2Guess);

  // check if the guesses were right
  if(p1Guess === theNumber) {
    // guessed it!
    guesses.player1.lastGuess = 'correct';
  } else if(p1Guess < theNumber) {
    // too low
    guesses.player1.lastGuess = 'low';
  } else {
    // too high
    guesses.player1.lastGuess = 'high';
  }

  // store the guesses
  guesses.player1.history.push(req.body.p1Guess);


  if (p2Guess === theNumber) {
    // guessed it!
    guesses.player2.lastGuess = 'correct';
  } else if (p2Guess < theNumber) {
    // too low
    guesses.player2.lastGuess = 'low';
  } else {
    // too high
    guesses.player2.lastGuess = 'high';
  }

  // store the guesses
  guesses.player2.history.push(req.body.p2Guess);

  // respond
  res.sendStatus(201);
});

