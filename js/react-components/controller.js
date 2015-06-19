var React = require('react');
var TextAnalyzer = require('./../component/text-analyzer');
var TextInputForm = require('./text-input-form');
var WordList = require('./word-list');

var Controller = React.createClass({
    displayName: 'controller',

    getInitialState: function() {
        return {
            wordStats: [],
        };
    },

    handleExampleClick_: function(event) {
        event.preventDefault();
    },

    handleTextSubmit_: function(text, caseSensitive) {
        var analyzer = new TextAnalyzer(text, 1, caseSensitive);

        var sorted = analyzer.getStats().sort( function(a,b) {
            if (a.getCount() == b.getCount()) {

                if (a.getSimilar().length == b.getSimilar().length) {
                    return 0;
                }

                if (a.getSimilar().length > b.getSimilar().length) {
                    return -1;
                }

                return 1;
            }

            if (a.getCount() > b.getCount()) {
                return -1;
            }

            return 1;
        });

        this.setState( {
            wordStats: sorted
        });
    },

    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s7">
                        <h3 className="header">Levenshtein Form</h3>
                    </div>
                    <div className="col s12">
                        <p>This utility analyzes the provided text and creates a list of distinct words and counts the number of occurences of the word. Similar words displayed but not counted. A word is deemed similar to an already found word if the <a href='https://en.wikipedia.org/wiki/Levenshtein_distance'>Levenshtein distance</a> between the words is not larger than 1.</p>
                    </div>
                    <div className="col s7">
                        <div className="card">
                            <div className="card-content">
                                <span>INPUT</span>
                                <TextInputForm onTextSubmit={ this.handleTextSubmit_ }/>
                            </div>
                        </div>
                    </div>
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <span>RESULTS</span>
                                <WordList wordStats={ this.state.wordStats }/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Controller;


