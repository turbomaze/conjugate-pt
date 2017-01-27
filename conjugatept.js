// Conjugate-PT
// @author Anthony Liu <igliu@mit.edu>
// @version 0.0.0

// dependencies
var fs = require('fs');
var endpoint = 'http://www.conjuga-me.net/en/verbo-';
var apilayer = require('./apilayer')(endpoint)

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
var words = require('./' + inFile);

// load up the conjugations
var out = {};
var numWordsConjugated = 0;
words.map(function(word) {
  apilayer.conjugatePt(word, function(err, conjugation) {
    numWordsConjugated += 1;

    if (err) {
      return console.log(
        'Could not conjugate "' + word + '".'
      );
    }

    out[word] = conjugation;

    // when all of the words have been conjugated
    if (numWordsConjugated === words.length) {
      fs.writeFileSync(outFile, JSON.stringify(out, true, 2));
    }
  });
});
