var assert = require('assert');
var should = require('should');
var store = require(__dirname + '/../store');

describe('testStore', function () {

    it('should add a record', function (done) {

        var testStore = store.obtain("test");

        testStore.count.should.eql(0);
        testStore.add({ foo: 1 });
        testStore.count.should.eql(1);

        done();
    })

    it('should be able to update a supplier', function (done) {

        var testStore = store.obtain("test");

        var id = testStore.add({ name: "Test record", foo: "Bar" }).id;

        testStore.findById(id).should.eql({ name: "Test record", foo: "Bar", id: id });

        testStore.update(id, { foo: "Baz" });

        testStore.findById(id).should.eql({ name: "Test record", foo: "Baz", id: id });
        done();
    });

    it('should be able to testStore and retrieve a record', function (done) {

        var testStore = store.obtain("test");

        var id = testStore.add({ foo: "bar" }).id;

        testStore.findById(id).foo.should.eql("bar");
        done();
    });

    it('should be able to destroy a record', function (done) {

        var testStore = store.obtain("test");
        testStore.count.should.eql(0);

        var id = testStore.add({ name: "Test record" }).id;
        testStore.count.should.eql(1);

        testStore.findById(id).should.eql({ name: "Test record", id: id });

        testStore.destroy(id);
        testStore.count.should.eql(0);

        assert.equal(testStore.findById(id), undefined);
        done();
    });
})
