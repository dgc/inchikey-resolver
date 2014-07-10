var assert = require('assert');
var path = require('path');
var fs = require('fs');
var _ = require('underscore');

function loadFile(filename, callback) {

    fs.readFile(path.resolve(__dirname, filename), function (err, data) {

        if (err)
            throw err;

        callback(data.toString('utf8'));
    });
}

describe('inchi external dependency', function () {

    it('should execute successfully', function (done) {

        loadFile('fixtures/benzine.mol', function (mol_definition) {

            var inchi = require('../inchi');

            inchi.obtain_inchi_string_and_key(mol_definition, function (error, inchi_string, inchi_key) {

                assert.equal(error, null);

                inchi_string.should.eql("1S/C6H6/c1-2-4-6-5-3-1/h1-6H");
                inchi_key.should.eql("UHOVQNZJYSORNB-UHFFFAOYSA-N");

                done();
            });
        });
    });
})