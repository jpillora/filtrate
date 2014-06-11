var filtrate = require('../');

//programmatic usage

filtrate(
  { a: String, b: Number, c: Boolean },
  { a: 'str' , b: 42    , c: false   }
);
//returns null

filtrate(
  { a: String, b: Number, c: Boolean },
  { a: false , b: '42'  , c: true    }
);
//returns "Filtrate Error: undefined.a is not a string (got: false)"


//method usage
var foo = {
  baz: function(num, bool) {
    console.log('foo.baz', num, bool);
  }
};

filtrate(foo, 'baz', [Number, Boolean]);

foo.baz(42, true);     // executes foo.baz
try {
foo.baz(42, 'string'); // throws "Filtrate Error: baz: arguments[1] is not a bool (got: 'string')"
} catch(e) {}

//function usage
var bar = filtrate(
  [Number, {}, String],
  function(num, obj, str) {
    console.log('bar', num, obj, str);
  }
);

bar(21, {a: 42}, "Test"); // executes foo.fn
try {
bar(21, [{},42], "Test"); // throws "Filtrate Error: arguments[1] is not a plain object (got: [ {}, 42 ])"
} catch(e) {}
