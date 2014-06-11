var filtrate = require('../');

//function usage
var bar = filtrate(
  [Number, {}, String],
  function(num, obj, str) {
    console.log('bar', num, obj, str);
  }
);

bar(21, {a: 42}, "Test"); // executes foo.fn
try {
  bar(21, [{},42], "Test"); // throws "arguments[1] is not a plain object (got: [ {}, 42 ])"
} catch(e) {
  console.log(e.message);
}
