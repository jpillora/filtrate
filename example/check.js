var filtrate = require('../');

console.log( filtrate.check([String, Number],   ["Test", 42]) ); //null

console.log( filtrate.check([String, Function], ["Test", 42]) ); //""