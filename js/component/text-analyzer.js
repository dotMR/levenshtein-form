var LevenshteinTools = require('./levenshtein-tools')
var WordStat = require('./word-stat');

function TextAnalyzer(input, distance, caseSensitive) {
    // config case sensitive search
    this.caseSensitive = caseSensitive;

    // edit distance
    this.editDistance = distance;

    // cache of words
    this.keys = [];

    // array of word metadata
    this.stats = [];

    // sanitize input
    var s = input.replace(/\n/g, ' ');
    s = s.replace(/[^A-Z-a-z-_0-9]/g, ' ').trim();

    if (!this.caseSensitive) {
        s = s.toLowerCase();
    }

    var words = s.split(' ');
    var self = this;
    words.forEach( function(current) {
        if (current) {
            self.analyze(current);
        }
    });
}

TextAnalyzer.prototype.analyze = function(word) {
    var same = this.findExact(word);
    if (same) {
        same.addExactMatch();
        return;
    }

    var similar = this.findSimilar(word);
    if (similar) {
        similar.addSimilar(word);
        return;
    }

    var unique = new WordStat(word);
    this.keys.push(word);
    this.stats.push(unique);
}

TextAnalyzer.prototype.findExact = function(word) {
    var index = this.keys.indexOf(word);
    if (index != -1) {
        return this.stats[index];
    }

    return null;
}

TextAnalyzer.prototype.findSimilar = function(word) {
    for (var j=0;j<this.stats.length;j++) {
        var current = this.stats[j];

        if (LevenshteinTools.areWordsSimilar(word, current.getWord(), this.editDistance)) {
            return current;
        }
    }

    return null;
}

TextAnalyzer.prototype.getStats = function() {
    return this.stats;
}

module.exports = TextAnalyzer;