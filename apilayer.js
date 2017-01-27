var request = require('request');
var jsdom = require('jsdom');

function conjugatePt(endpoint, word, callback) {
  var url = endpoint + encodeURIComponent(word);
  request({url: url, encoding: 'latin1'}, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      jsdom.env(
        body,
        ['http://code.jquery.com/jquery.js'],
        function(err, window) {
          if (err) {
            return callback(err);
          } else {
            var $ = window.$;
            var output = $('.output');
            var present = [];
            var perfectPreterite = [];
            output.each(function(i) {
              var conjugation = extractWord(output[i].innerHTML);
              if (i < 18) {
                if (i % 3 === 0) {
                  present.push(conjugation);
                } else if (i % 3 === 1) {
                  perfectPreterite.push(conjugation);
                }
              }
            });

            callback(false, {
              'present': present,
              'perfectPreterite': perfectPreterite
            });
          }
        }
      );
    } else {
      callback({error: err, statusCode: res.statusCode});
    }
  });
}

function extractWord(str) {
  if (str.indexOf('<') !== -1) {
    str = str.split(/(<|>)/)[4];
  }

  str = str.split(' / ')[0];

  return str;
}

module.exports = function(endpoint) {
  return {
    conjugatePt: function(word, callback) {
      return conjugatePt(endpoint, word, callback)
    }
  };
}
