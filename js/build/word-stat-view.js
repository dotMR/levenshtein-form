var React = require('react');

var WordStatView = React.createClass({
    displayName: 'word-stat',

    propTypes: {
        stat: React.PropTypes.shape({
            word: React.PropTypes.string,
            getSimilar: React.PropTypes.func,
            getCount: React.PropTypes.func
        }),
    },

    render: function() {
        var similarWords = '-';
        if(this.props.stat.getSimilar().length > 0) {
            similarWords = this.props.stat.getSimilar().join(', ');
        }

        return (
            React.createElement("li", {className: "collection-item avatar word"}, 
                React.createElement("span", {className: "title"},  this.props.stat.getWord() ), 
                React.createElement("p", null,  similarWords ), 
                React.createElement("span", {className: "secondary-content"},  this.props.stat.getCount() )
            )
        );
    }
});

module.exports = WordStatView;