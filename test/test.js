'use strict';

var TextAnalyzer = require('text-analyzer');

var reader = require('file-reader');
reader.init('test-input.txt', processData);

function parseBase10(s) {
    return parseInt(s, 10);
}

function processData(input) {
    var lines = input.split('\n');
    var numTests = parseBase10(lines.shift());

    for (var t=0;t<numTests;t++) {
        analyzeText(lines.shift());
    }
}

function analyzeText(input) {
    var analyzer = new TextAnalyzer(input);

    console.log(input);
    var results = analyzer.getStats();
    results.forEach( function(stat) {
        var word = stat.getWord();
        var count = stat.getCount();
        var print = word + ' (' + count + ')';

        if (stat.hasSimilar()) {
            print = print + ' (' + stat.similar.join(', ') + ')';
        }
        console.log(print);
    });
    console.log('');
}