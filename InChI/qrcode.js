var util = require('util');
var qr = require('qr-image');
var dom_js = require('dom-js');

exports.generate = function (text, blockSize, callback) {
    
    var qr_svg = qr.image(text, { type: 'svg', ec_level: 'H' });
    var result = "";
    
    qr_svg.on('data', function (data) {
        result += data.toString('utf8');
    });
    
    qr_svg.on('end', function () {
        
        var domjs = new dom_js.DomJS();
        
        domjs.parse(result, function (err, dom) {
            
            var viewBox = dom.attributes.viewBox.match(/(\d+) (\d+) (\d+) (\d+)/);
            var width = parseInt(viewBox[3]);
            var height = parseInt(viewBox[4]);
            
            var logoWidth = 16;
            var logoHeight = 16;
            
            dom.attributes["xmlns:xlink"] = "http://www.w3.org/1999/xlink";
            
            dom.attributes.width = (width * blockSize) + "px";
            dom.attributes.height = (height * blockSize) + "px";
            
            dom.children.push(new dom_js.Element("image", {
                x: ((width / 2) - (logoWidth / 2)) + "px",
                y: ((height / 2) - (logoHeight / 2)) + "px",
                width: logoWidth + "px",
                height: logoHeight + "px",
                "xlink:href": "/images/inchi64x64.png"
            }));

            callback(dom.toXml());
        });
    });
};