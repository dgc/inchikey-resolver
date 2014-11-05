var path = require('path');
var qrcode = require(path.resolve(__dirname, '..', 'qrcode'));
var formidable = require('formidable')
var util = require('util');
var fs = require('fs');
var _ = require('underscore');
var inchi = require('../inchi');
var mol2ps = require('../mol2ps');

var products = require('../store').obtain('products');
var suppliers = require('../store').obtain('suppliers');

exports.show = function (req, res) {
    
    var product = products.findById(req.params.inchikey);
    
    if (product) {
        
        qrcode.generate(req.params.inchikey, 4, function (svg) {
            
            mol2ps.obtain_svg(product.definition, function (mol2ps_error, mol2ps_output) {

                var supplier;
                
                if (product.supplier != undefined)
                    supplier = suppliers.findById(product.supplier);

                res.render('product.jade', {
                    title: 'Express',
                    breadcrumbs: [
                    ['Home', '/'],
                    ['Chemical Entities', '/products'],
                    req.params.inchikey
                ],
                    qrcode: svg,
                    diagram: mol2ps_output,
                    entity: product,
                    supplier: supplier,
                    inchikey: product.id,
                    inchi: product.inchi,
                });
            });
        });

    } else {
        
        res.statusCode = 404;
        res.send();
    }
};

exports.create = function (req, res) {
    
    var form = new formidable.IncomingForm();
    
    form.multiples = true;
    
    form.parse(req, function (err, fields, files) {
        
        if (Array.isArray(files.file)) {
            files = files.file;
        } else {
            files = [files.file];
        }
        
        _.each(files, function (file) {
            fs.readFile(file.path, function (err, data) {
                
                var definition = data.toString('utf8');
                
                inchi.obtain_inchi_string_and_key(definition, function (error, inchi_string, inchi_key) {
                    
                    products.add({
                        id: inchi_key,
                        supplier: req.param('supplier', undefined),
                        inchi: inchi_string,
                        definition: definition
                    });
                    
                    res.statusCode = 303;
                    res.header('Location', '/entities/' + inchi_key);
                    res.send();
                });
            });
        });
    });
}