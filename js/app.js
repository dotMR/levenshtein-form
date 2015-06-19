'use strict';

var Controller  = require('./build/controller');
var React = require('react');

function onDOMContentLoaded() {
    var controller = React.createElement(Controller, {});
    React.render(controller, document.getElementById('root'));
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);