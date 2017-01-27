// Conjugate-PT
// @author Anthony Liu <igliu@mit.edu>
// @version 0.0.0

// dependencies
var fs = require('fs');
var request = require('request');

// config
var endpoint = 'http://www.conjuga-me.net/en/verbo-';

// check arguments
if (process.argv.length < 4) {
  return console.log(
    'Usage: node conjugatept.js IN_FILE OUT_FILE'
  );
}

// get arguments
var inFile = process.argv[2];
var outFile = process.argv[3];

// load the words
var inputFileContents = fs.readFileSync(inFile, 'UTF-8');
var words = inputFileContents.split('\n').slice(0, -1);

console.log(words);
