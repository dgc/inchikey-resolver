var qrcode = require('qrcode');

exports.show = function (req, res) {
    
    qrcode.generate(req.params.inchikey, function (svg) {
        res.contentType('image/svg+xml');
        res.send(svg);
    });
};