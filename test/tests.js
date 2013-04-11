var assert = require("assert");
var filtrate = require("../");

//test maker
var makeTest = function(fn, expectedResult, expectedError) {
  return function() {
    var result = null;
    var error = null;

    try {
      result = fn();
    } catch(e) {
      error = e;
    }

    if(expectedResult)
      assert.equal(result, expectedResult);
    else
      assert.equal(error, 
        expectedError === null ? null :
          "Filtrate Error: " + expectedError
      );
  };
};

//helpers
describe('filtrate', function(){

  describe('1. plain function', function(){

    //mock object
    var fn = filtrate(function() {
      return 9;
    }, [Array, Number]);

    it('should pass', makeTest(
      function(){
        return fn([42], 21);
      }, 
      9, 
      null
    ));

    it('should fail I', makeTest(
      function(){
        return fn({}, 21);
      }, 
      null, 
      "arguments[0] is not an array (got: {})"
    ));

    it('should fail II', makeTest(
      function(){
        return fn([42], true);
      }, 
      null,
      "arguments[1] is not a number (got: true)"
    ));

  });

  describe('2. method', function(){

    //mock object
    var foo = {
          bar: function() {
            return 7;
          }
        };

    filtrate(foo, 'bar', [Number, Boolean]);

    it('should pass', makeTest(
      function(){
        return foo.bar(42, true);
      }, 
      7, 
      null
    ));

    it('should fail I', makeTest(
      function(){
        return foo.bar(false, true);
      },
      null, 
      "bar: arguments[0] is not a number (got: false)"
    ));

    it('should fail II', makeTest(
      function(){
        return foo.bar(42, 21);
      }, 
      null,
      "bar: arguments[1] is not a bool (got: 21)"
    ));

  });

  describe('3. object compare', function(){

    //mock object
    var fn = filtrate(function() {
              return 7;
             }, [
              {a:Number, b: { c: Boolean }}
             ]);

    it('should pass', makeTest(
      function(){
        return fn({a: 42, b: {c: true }});
      }, 
      7, 
      null
    ));

    it('should fail', makeTest(
      function(){
        return fn({a: 42, b: { c: 21} });
      }, 
      null,
      "arguments[0].b.c is not a bool (got: 21)"
    ));

  });

  describe('4. type checks', function(){

    var cmp = filtrate.compare;

    it('truthy/falsy', function() {

      var test = function(b) {
        assert.equal(b, cmp(b, 1));
        assert.equal(b, cmp(b, [1]));
        assert.equal(b, cmp(b, {a:1}));
        assert.equal(!b, cmp(b, 0));
        assert.equal(!b, cmp(b, undefined));
        assert.equal(!b, cmp(b, null));
      };
      test(true);
      test(false);
    });

    it('string', function() {
      assert.equal(true, cmp(String, '1'));
      assert.equal(false, cmp(String, 42));
    });

    it('number', function() {
      assert.equal(false, cmp(Number, '1'));
      assert.equal(true, cmp(Number, 42));
    });

    it('function', function() {
      assert.equal(true, cmp(Function, function() {}));
      assert.equal(true, cmp(Function, Object.keys));
    });

    it('object', function() {
      assert.equal(true, cmp(Object, {}));
      assert.equal(true, cmp(Object, []));
    });

    it('plain object', function() {
      assert.equal(true, cmp({}, {a:42}));
      assert.equal(false, cmp({}, []));
    });

  });





});