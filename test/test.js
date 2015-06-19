'use strict';

var assert = require("assert");
var TextAnalyzer = require('./../js/component/text-analyzer');

// function analyzeText(input) {
//     var analyzer = new TextAnalyzer(input, 1, true);

//     console.log(input);
//     var results = analyzer.getStats();
//     results.forEach( function(stat) {
//         console.log(stat.prettyPrint());
//     });
//     console.log('');
// }

describe('Text Analyzer', function(){
    var input1 = "Word Words Wor word";
    describe(input1, function(){
        var analyzer = new TextAnalyzer(input1, 1, true);
        var stats = analyzer.getStats();

        it('should return 1 stat', function(){
            assert.equal(1, stats.length);
        })

        var stat = stats[0];

        describe('Stat returned', function(){
            it('should be Word', function(){
                assert.equal("Word", stat.getWord());
            })

            it('should have count of 1', function(){
                assert.equal(1, stat.getCount());
            })

            it('should have 3 similar words', function(){
                assert.equal(3, stat.getSimilar().length);
            })
        })
    });

    var input2 = "Samson Samso samson";
    describe(input2, function(){
        var analyzer = new TextAnalyzer(input2, 1, true);
        var stats = analyzer.getStats();

        it('should return 1 stat', function(){
            assert.equal(1, stats.length);
        })

        var stat = stats[0];

        describe('Stat returned', function(){
            it('should be Samson', function(){
                assert.equal("Samson", stat.getWord());
            })

            it('should have count of 1', function(){
                assert.equal(1, stat.getCount());
            })

            it('should have 2 similar words', function(){
                assert.equal(2, stat.getSimilar().length);
            })
        })
    });

    var input3 = "Wer wem wen wer\n\nWer wem wen wer.\n\nWer wem wen wer";

    describe("Wer wem wen wer x 3 - NOT case sensitive", function(){
        var analyzer = new TextAnalyzer(input3, 1, false);
        var stats = analyzer.getStats();

        it('should return 1 stat', function(){
            assert.equal(1, stats.length);
        })

        var stat = stats[0];
        describe('Stat returned', function(){
            it('should be wer', function(){
                assert.equal("wer", stat.getWord());
            })

            it('should have count of 6', function(){
                assert.equal(6, stat.getCount());
            })

            it('should have 6 similar words', function(){
                assert.equal(6, stat.getSimilar().length);
            })
        })
    })

    describe("Wer wem wen wer x 3 - case SENSITIVE", function(){
        var analyzer = new TextAnalyzer(input3, 1, true);
        var stats = analyzer.getStats();

        it('should return 2 stat', function(){
            assert.equal(2, stats.length);
        })

        var stat = stats[0];
        describe('Stat returned', function(){
            it('should be Wer', function(){
                assert.equal("Wer", stat.getWord());
            })

            it('should have count of 3', function(){
                assert.equal(3, stat.getCount());
            })

            it('should have 3 similar words', function(){
                assert.equal(3, stat.getSimilar().length);
            })
        })
    })
})
