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
                <WordStatView
                    key={ stat.getWord() }
                    stat={ stat }/>
            );
        });

        return (
            <ul id="resultsList" className="collection">
                { items }
            </ul>
        );
    }
});

module.exports = WordList;