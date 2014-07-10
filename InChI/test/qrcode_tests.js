var assert = require('assert');
var qrcode = require('../qrcode');

describe('QR code generator', function () {
    it('generates an SVG file', function (done) {
        qrcode.generate("Hello World", 4, function (svg) {
            svg.substring(0, 5).should.eql("<svg ");
            done();
        });
    });
})