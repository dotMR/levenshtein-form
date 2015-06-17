'use strict';

var TextAnalyzer = require('text-analyzer');

function onDOMContentLoaded() {
    document.getElementById('analyzeText').addEventListener('click', analyzeText);
    document.getElementById('reset').addEventListener('click', reset);
}

function analyzeText(event) {
    event.preventDefault();
    var input = document.getElementById('sourceText');

    if (input.value) {
        var analyzer = new TextAnalyzer(input.value);

        var list = document.getElementById('resultsList');
        var wordStats = analyzer.getStats();
        wordStats.forEach( function(stat) {
            var elem = document.createElement('li');
            var txtValue = document.createTextNode(stat.prettyPrint());
            elem.appendChild(txtValue);
            list.appendChild(elem);
        });
    }
}

function reset(event) {
   event.preventDefault();
   // TODO
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);