var filtrate = require('../');

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
} catch(e) {
  console.log(e.message);
}
