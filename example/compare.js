var filtrate = require('../');
var result;

//compare (boolean result)

result = filtrate(
  { a: String, b: Number, c: Boolean },
  { a: 'str' , b: 42    , c: false   }
);

console.log(result);

result = filtrate(
  { a: String, b: Number, c: Boolean },
  { a: false , b: '42'  , c: true    }
);

console.log(result);


