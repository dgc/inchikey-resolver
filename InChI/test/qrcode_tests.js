var assert = require('assert');
var should = require('should');
var path = require('path');
var qrcode = require('../qrcode');

describe('QR code generator', function () {
    it('generates an SVG file', function (done) {
        qrcode.generate("Hello World", 4, function (svg) {
            svg.substring(0, 5).should.eql("<svg ");
            done();
        });
    });
})