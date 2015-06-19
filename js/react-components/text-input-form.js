var React = require('react');

var TextInputForm = React.createClass({
    displayName: 'text-input-form',

    propTypes: {
        onTextSubmit: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {
            buttonEnabed: false,
            caseSensitive: true,
            sourceText: '',
            textInvalid: false
        };
    },

    onTextChange_: function(event) {
        var value = event.target.value;
        var buttonEnabed = false;

        if (value) {
            buttonEnabed = true;
        }

        this.setState({
            buttonEnabed: buttonEnabed,
            sourceText: event.target.value,
            textInvalid: false
        });
    },

    onCaseChange_: function(event) {
        var buttonEnabed = false;
        if (this.state.sourceText) {
            buttonEnabed = true;
        }

        this.setState({
            buttonEnabed: buttonEnabed,
            caseSensitive: !this.state.caseSensitive
        });
    },

    handleClearClick_: function(event) {
        event.preventDefault();

        this.setState({
            buttonEnabed: false,
            sourceText: "",
            textInvalid: false
        });

        this.props.onTextSubmit("", this.state.caseSensitive);
    },

    handleSubmitClick_: function(event) {
        event.preventDefault();

        if (!this.state.sourceText && this.state.buttonEnabed) {
            this.invalidateForm_();
        } else {
            this.props.onTextSubmit(this.state.sourceText, this.state.caseSensitive);
            this.setState({
                buttonEnabed: false
            });
        }
    },

    invalidateForm_: function() {
        this.setState({
            buttonEnabed: false,
            textInvalid: true
        });
    },

    getSubmitButtonClasses_: function() {
        var classes = "btn waves-effect waves-light";
        if (!this.state.buttonEnabed) {
            classes = classes.concat(' disabled');
        }

        return classes;
    },

    getTextAreaClasses_: function() {
        var classes = "materialize-textarea";
        if (this.state.textInvalid) {
            classes = classes.concat(' invalid');
        }

        return classes;
    },

    render: function() {
        return (
            <form>
                <div className="input-field">
                    <textarea
                        id="sourceText"
                        className={ this.getTextAreaClasses_() }
                        onChange={ this.onTextChange_ }
                        value={ this.state.sourceText }/>
                </div>
                <div className="form-controls">
                    <div className="switch">
                        <label>
                            <input
                                id="caseSensitive"
                                checked={ this.state.caseSensitive }
                                type="checkbox"
                                onChange={ this.onCaseChange_ }/>
                            <span className="lever"></span>Case Sensitive
                        </label>
                    </div>
                    <div>
                        <a
                            className="waves-effect waves-teal btn-flat"
                            onClick={ this.handleClearClick_ }>CLEAR</a>
                        <button
                            id="analyzeText"
                            className={ this.getSubmitButtonClasses_() }
                            name="action"
                            type="submit"
                            onClick={ this.handleSubmitClick_ }>ANALYZE</button>
                    </div>
                </div>
            </form>
        );
    }
});

module.exports = TextInputForm;