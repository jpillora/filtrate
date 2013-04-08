var filtrate = require('../');

var foo = {
    fn: function() { console.log(arguments); }
};

filtrate.method(foo, 'fn', [Number, Boolean]);

console.log("test filtrate.method")
foo.fn(42, true);
// foo.fn(21, {});



console.log("test filtrate.fn")
var bar = function() { console.log(arguments); };

bar = filtrate.fn(bar, [Number, Object, String]);

bar(21, false, "Test");