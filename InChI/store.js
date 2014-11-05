// store.js

var _ = require('underscore');

exports.obtain = _.memoize(function obtain(store) {
    
    if (global.store_objects == undefined)
        global.store_objects = {};

    if (global.store_objects[store] == undefined) {
        
        var storeObject = {
            data: {},
            count: 0,
            nextID: 1
        };
        
        storeObject.findById = function (id) {
            return storeObject.data[id];
        }
        
        storeObject.add = function (data) {
            
            var id;
            
            if (data.id) {
                if (storeObject.data[id]) {
                    throw Error("Record identifier already exists: " + id);
                }
            }
            
            if (data.id) {
                id = data.id;
            } else {
                id = storeObject.nextID;
                storeObject.nextID++;
            }
            
            storedData = _.extend({ id: id }, data);
            
            storeObject.data[id] = storedData;
            storeObject.count = Object.keys(storeObject.data).length;
            
            return storedData;
        }
        
        storeObject.update = function (id, attributes) {
            
            if (storeObject.data[id] == undefined)
                throw Error("Unknown record: " + id);
            
            _.extend(storeObject.data[id], attributes);
        };
        
        storeObject.destroy = function (id) {
            delete storeObject.data[id];
            
            storeObject.count = Object.keys(storeObject.data).length;
        }

        global.store_objects[store] = storeObject;
    }
    
    return global.store_objects[store];
});