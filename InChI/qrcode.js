var qr = require('qr-image');

exports.generate = function (text, callback) {
    
    var qr_svg = qr.image(text, { type: 'svg', ec_level: 'H' });
    var result = "";
    
    qr_svg.on('data', function (data) {
        result += data.toString('utf8');
    });
    
    qr_svg.on('end', function () {
        callback(result);
    });
};