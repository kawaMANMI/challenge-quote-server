// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
const express = require("express");
const lodash = require('lodash');
const cors = require('cors');
const app = express();

//load the quotes JSON
const Quotes = require("./quotes.json");

// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", function (request, response) {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes", (req, res) => {
  res.json(Quotes);
});

app.get("/quotes/random", (req, res) => {
  // res.json(pickFromArray(Quotes));
  res.json(lodash.sample(Quotes));
});

app.get("/quotes/search", (req, res) => {
  // res.json(
  //   Quotes.filter(
  //     (elmQuote) =>
  //       elmQuote["quote"].toLowerCase().includes(req.params.term) ||
  //       elmQuote["author"].toLowerCase().includes(req.params.term)
  //   )
  // );
//This example can be done using either parametrs or qurey 
// console.log(req.query.term)
// console.log(req.query.key)

  res.json(
    Quotes.filter(
      (elmQuote) =>
        elmQuote["quote"].toLowerCase().includes(req.query.term) ||
        elmQuote["author"].toLowerCase().includes(req.query.term)
    )
  );
});
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
function pickFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// const PORT=process.env.PORT || 5000;
//Start our server so that it listens for HTTP requests!
// const listener = app.listen(PORT, function() {
//   console.log("Your app is listening on port " + PORT);
// });

app.use(cors());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
