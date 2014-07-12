var assert = require('assert');
var should = require('should');
var store = require(__dirname + '/../store');

describe('testStore', function () {
    
    it('should add a record', function (done) {
        
        var testStore = store.obtain("test1");
        
        testStore.count.should.eql(0);
        testStore.add({ foo: 1 });
        testStore.count.should.eql(1);
        
        done();
    });
    
    it('should store records with incremental identifiers', function (done) {
        
        var testStore = store.obtain("test2");
        
        testStore.add({ name: "Test record", foo: "Bar" }).id.should.eql(1);
        testStore.add({ name: "Test record", foo: "Bar" }).id.should.eql(2);
        testStore.add({ name: "Test record", foo: "Bar" }).id.should.eql(3);
        
        done();
    });
    
    it('should be able to update a supplier', function (done) {
        
        var testStore = store.obtain("test3");
        
        var id = testStore.add({ name: "Test record", foo: "Bar" }).id;
        
        testStore.findById(id).should.eql({ name: "Test record", foo: "Bar", id: id });
        
        testStore.update(id, { foo: "Baz" });
        
        testStore.findById(id).should.eql({ name: "Test record", foo: "Baz", id: id });
        done();
    });
    
    it('should be able to testStore and retrieve a record', function (done) {
        
        var testStore = store.obtain("test4");
        
        var id = testStore.add({ foo: "bar" }).id;
        
        testStore.findById(id).foo.should.eql("bar");
        done();
    });
    
    it('should be able to destroy a record', function (done) {
        
        var testStore = store.obtain("test5");
        testStore.count.should.eql(0);
        
        var id = testStore.add({ name: "Test record" }).id;
        testStore.count.should.eql(1);
        
        testStore.findById(id).should.eql({ name: "Test record", id: id });
        
        testStore.destroy(id);
        testStore.count.should.eql(0);
        
        assert.equal(testStore.findById(id), undefined);
        done();
    });

    it('should be able to create records with predefined identifiers', function (done) {

        var testStore = store.obtain("test6");
        
        testStore.add({ id: "abcd", foo: "bar" }).id;
        
        testStore.findById("abcd").foo.should.eql("bar");
        done();
    });

    it('should provide access to the same store when using the same name', function (done) {

        var store1 = store.obtain("test7");
        var store2 = store.obtain("test7");

        (store1 == store2).should.eql(true);
        done();
    });

    it('should provide distinct stores when using different names', function (done) {
        
        var store1 = store.obtain("test8");
        var store2 = store.obtain("test9");
        
        (store1 == store2).should.eql(false);
        done();
    });
})
