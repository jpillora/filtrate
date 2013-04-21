var filtrate = require('../');

//method usage
var foo = {
    fn: function() { console.log('foo', arguments); }
};

filtrate(foo, 'fn', [Number, Boolean]);

foo.fn(42, true);     // executes foo.fn
foo.fn(42, 'string'); // throws

//function usage
var bar = filtrate(
  function() {
    console.log('bar', arguments);
  },
  [Number, {}, String]
);

bar(21, {a: 42}, "Test"); // executes foo.fn
bar(21, [a, 42], "Test"); // throws
