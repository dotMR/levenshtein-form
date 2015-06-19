'use strict';

function onDOMContentLoaded() {
    var controller = React.createElement(Controller, {});
    React.render(controller, document.getElementById('root'));
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);