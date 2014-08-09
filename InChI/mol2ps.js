var path = require('path');
var exec = require('child_process').exec;

var mol2ps_bin_path = path.resolve('mol2ps', 'mol2ps.exe');
var mol2ps_bin_args = "--output=svg -";

exports.obtain_svg = function (definition, callback) {
    
    child = exec(mol2ps_bin_path + " " + mol2ps_bin_args, function (error, stdout, stderr) {
        callback(error, stdout);
    });
    
    child.stdin.write(definition);
    child.stdin.end();
}