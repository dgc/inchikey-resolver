var path = require('path');
var qrcode = require(path.resolve(__dirname, '..', 'qrcode'));

exports.show = function (req, res) {
    qrcode.generate(req.params.inchikey, 4, function (svg) {
        res.render('product.jade', { title: 'Express', qrcode: svg });
    });
};