var fs = require('fs');

var FileReader = {
    init: function(filepath, callback) {
        if (!callback) {
            throw Error("callback is required!");
        }

        var _buffer = "";
        var inputStream = fs.createReadStream(filepath);

        inputStream.on('data', function(data) {
            _buffer += data;
        });

        inputStream.on('end', function() {
            callback(_buffer);
        });
    }
};

module.exports = FileReader;