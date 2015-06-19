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
            <li className="collection-item avatar word">
                <span className="title">{ this.props.stat.getWord() }</span>
                <p>{ similarWords }</p>
                <span className="secondary-content">{ this.props.stat.getCount() }</span>
            </li>
        );
    }
});

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