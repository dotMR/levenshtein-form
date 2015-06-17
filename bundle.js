(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var TextAnalyzer = require('text-analyzer');

function onDOMContentLoaded() {
    document.getElementById('analyzeText').addEventListener('click', analyzeText);
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

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
},{"text-analyzer":3}],2:[function(require,module,exports){
var LevenshteinTools = {

    areWordsSimilar: function(a, b) {
        var lengthDiff = Math.abs(a.length - b.length);
        if (lengthDiff <= 1) {

            // assume a is longer than b
            var main = a;
            var sub = b;

            // validate lengths
            if (b.length > a.length) {
               main = b;
               sub = a;
            }

            if (main.indexOf(sub) != -1) {
                return true;
            }

            var replacements = 0;
            for (var i=0;i<main.length;i++) {
                if (main.charAt(i) != sub.charAt(i)) {
                    replacements = replacements + 1;

                    if (replacements > 1) {
                        return false;
                    }
                }
            }

            return true;
        }

        return false;
    }
};

module.exports = LevenshteinTools;
},{}],3:[function(require,module,exports){
var LDTools = require('levenshtein-tools')
var WordStat = require('word-stat');

function TextAnalyzer(input) {
    this.keys = [];
    this.stats = [];

    // sanitize input
    var s = input.replace(/[^A-Z-a-z-_0-9 ]/g, '');
    var words = s.split(' ');

    var self = this;
    words.forEach( function(current) {
        self.analyze(current);
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

        if (LDTools.areWordsSimilar(word, current.getWord())) {
            return current;
        }
    }

    return null;
}

TextAnalyzer.prototype.getStats = function() {
    return this.stats;
}

module.exports = TextAnalyzer;
},{"levenshtein-tools":2,"word-stat":4}],4:[function(require,module,exports){
function WordStat(word) {
    this.word_ = word;
    this.occurrences_ = 1;
    this.similar_ = [];
}

WordStat.prototype.addSimilar = function(word) {
    this.similar_.push(word);
}

WordStat.prototype.addExactMatch = function() {
    this.occurrences_ = this.occurrences_ + 1;
}

WordStat.prototype.getCount = function() {
    return this.occurrences_;
}

WordStat.prototype.getSimilar = function() {
    return this.similar_;
}

WordStat.prototype.getWord = function() {
    return this.word_;
}

WordStat.prototype.hasSimilar = function() {
    return (this.similar_.length > 0);
}

WordStat.prototype.prettyPrint = function() {
    var print = this.getWord() + ' (' + this.getCount() + ')';
    if (this.hasSimilar()) {
        print = print + ' (' + this.getSimilar().join(', ') + ')';
    }

    return print;
}

module.exports = WordStat;
},{}]},{},[1]);
