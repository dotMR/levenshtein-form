var React = require('react');
var WordStatView = require('./word-stat-view');

var WordList = React.createClass({
    displayName: 'word-stat-list',

    propTypes: {
        wordStats: React.PropTypes.array,
    },

    render: function() {
        var items = this.props.wordStats.map( function(stat) {
            return (
                React.createElement(WordStatView, {
                    key:  stat.getWord(), 
                    stat:  stat })
            );
        });

        return (
            React.createElement("ul", {id: "resultsList", className: "collection"}, 
                 items 
            )
        );
    }
});

module.exports = WordList;