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
            React.createElement("div", {className: "container"}, 
                React.createElement("div", {className: "row"}, 
                    React.createElement("div", {className: "col s7"}, 
                        React.createElement("h3", {className: "header"}, "Levenshtein Form")
                    ), 
                    React.createElement("div", {className: "col s12"}, 
                        React.createElement("p", null, "This utility analyzes the provided text and creates a list of distinct words and counts the number of occurences of the word. Similar words displayed but not counted. A word is deemed similar to an already found word if the ", React.createElement("a", {href: "https://en.wikipedia.org/wiki/Levenshtein_distance"}, "Levenshtein distance"), " between the words is not larger than 1.")
                    ), 
                    React.createElement("div", {className: "col s7"}, 
                        React.createElement("div", {className: "card"}, 
                            React.createElement("div", {className: "card-content"}, 
                                React.createElement("span", null, "INPUT"), 
                                React.createElement(TextInputForm, {onTextSubmit:  this.handleTextSubmit_})
                            )
                        )
                    ), 
                    React.createElement("div", {className: "col s5"}, 
                        React.createElement("div", {className: "card"}, 
                            React.createElement("div", {className: "card-content"}, 
                                React.createElement("span", null, "RESULTS"), 
                                React.createElement(WordList, {wordStats:  this.state.wordStats})
                            )
                        )
                    )
                )
            )
        );
    }
});

module.exports = Controller;


