var path = require('path');
//var util = require('util');
var _ = require('underscore');

var suppliers = require('../store').obtain('suppliers');

exports.index = function (req, res) {
    res.render('suppliers.jade', {
        breadcrumbs: [
            ['Home', '/'],
            'Suppliers'
        ]
    });
}

exports.show = function (req, res) {
    
    var supplier = suppliers.findById(req.params.supplier);

    if (supplier) {
        
        res.render('supplier.jade', {
            supplier: supplier,
            breadcrumbs: [
                ['Home', '/'],
                ['Suppliers', '/suppliers'],
                supplier.name
            ]
        });

    } else {
        
        res.statusCode = 404;
        res.send();
    }
};