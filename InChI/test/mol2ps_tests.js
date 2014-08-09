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

describe('mol2ps external dependency', function () {
    
    it('should execute successfully', function (done) {
        
        loadFile('fixtures/benzine.mol', function (mol_definition) {
            
            var mol2ps = require('../mol2ps');
            
            mol2ps.obtain_svg(mol_definition, function (error, svg_text) {
                
                assert.equal(error, null);
                
                assert.equal(svg_text.substring(0, 5), "<?xml");
               
                done();
            });
        });
    });
})