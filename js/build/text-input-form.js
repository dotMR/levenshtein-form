var TextInputForm = React.createClass({
    displayName: 'text-input-form',

    propTypes: {
        onTextSubmit: React.PropTypes.func.isRequired
    },

    getInitialState: function() {
        return {
            caseSensitive: true,
            sourceText: '',
            textInvalid: false
        };
    },

    onTextChange_: function(event) {
        this.setState({
            sourceText: event.target.value,
            textInvalid: false
        });
    },

    onCaseChange_: function(event) {
        this.setState({
            caseSensitive: !this.state.caseSensitive
        });
    },

    handleSubmitClick_: function(event) {
        event.preventDefault();

        if (!this.state.sourceText) {
            this.invalidateForm_();
        } else {
            this.props.onTextSubmit(this.state.sourceText, this.state.caseSensitive);
        }
    },

    invalidateForm_: function() {
        this.setState({
            textInvalid: true
        });
    },

    getTextAreaClasses_: function() {
        var classes = "materialize-textarea";
        if(this.state.textInvalid) {
            classes = classes.concat(' invalid');
        }

        return classes;
    },

    render: function() {
        return (
            React.createElement("form", null, 
                React.createElement("div", {className: "input-field"}, 
                    React.createElement("textarea", {
                        id: "sourceText", 
                        className:  this.getTextAreaClasses_(), 
                        onChange:  this.onTextChange_, 
                        value:  this.state.sourceText})
                ), 
                React.createElement("div", {className: "form-controls"}, 
                    React.createElement("div", {className: "switch"}, 
                        React.createElement("label", null, 
                            React.createElement("input", {
                                id: "caseSensitive", 
                                checked:  this.state.caseSensitive, 
                                type: "checkbox", 
                                onChange:  this.onCaseChange_}), 
                            React.createElement("span", {className: "lever"}), "Case Sensitive"
                        )
                    ), 
                    React.createElement("div", null, 
                        React.createElement("button", {
                            id: "analyzeText", 
                            className: "btn waves-effect waves-light", 
                            name: "action", 
                            type: "submit", 
                            onClick:  this.handleSubmitClick_}, "ANALYZE")
                    )
                )
            )
        );
    }
});