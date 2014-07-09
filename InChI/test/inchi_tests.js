var assert = require('assert');
var path = require('path');

describe('inchi external dependency', function () {

    it('should execute successfully', function (done) {

        var exec = require('child_process').exec;

        exec(path.resolve('inchi', 'inchi-1.exe'), function callback(error, stdout, stderr) {
            assert.equal(error, null);
            done();
        });
    })
})
