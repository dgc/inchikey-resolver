var path = require('path');
var exec = require('child_process').exec;

var inchi_bin_path = path.resolve(__dirname, 'inchi', 'inchi-1.exe');
var inchi_bin_args = "/STDIO /Key";

exports.obtain_inchi_string_and_key = function (definition, callback) {
    
    child = exec(inchi_bin_path + " " + inchi_bin_args, function (error, stdout, stderr) {

        var inchi;
        var inchi_key;

        if (error == null) {
            
            var inchi_match = stdout.match(/^InChI=.*$/m);
            var inchi_key_match = stdout.match(/^InChIKey=.*$/m);
            
            if (inchi_match)
                inchi = inchi_match[0].replace(/^InChI=/, '');
            
            if (inchi_key_match)
                inchi_key = inchi_key_match[0].replace(/^InChIKey=/, '');
        }
        
        callback(error, inchi, inchi_key);
    });
    
    child.stdin.write(definition);
    child.stdin.end();
}