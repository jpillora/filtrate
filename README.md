filtrate
========

Function argument type checking for Node.js

`npm install filtrate`

### Method Usage

Adds a filter function in-place

``` js
var foo = {
  fn: function() { 
    console.log('foo', arguments);
  }
};

filtrate(foo, 'fn', [Number, Boolean]);

foo.fn(42, true);     // executes foo.fn
foo.fn(42, 'string'); // throws
```

### Function Usage

Returns a filter function

``` js
var bar = filtrate(
  function() {
    console.log('bar', arguments);
  },
  [Number, {}, String]
);

bar(21, {a: 42}, "Test"); // executes foo.fn
bar(21, [a, 42], "Test"); // throws
```

### Compare Usage

``` js
filtrate.compare(String, "Test"); //null
filtrate.compare(String, 42);     //"Filtrate Error: input is not a string (got: 42)"
filtrate.compare([String, Number],   ["Test", 42]); //null
filtrate.compare([String, Function], ["Test", 42]); //"Filtrate Error: input[1] is not a function (got: 42)"
filtrate.compare(
  { a:String, b:Function },
  { a:"Test", b:Object.keys }); //null
filtrate.compare(
  { a:String, b:Function },
  { a:"Test", b:42 }); //"Filtrate Error: input.b is not a function (got: 42)"
```

### API

#### filtrate(`parent`, `methodName`, `patterns`);

`parent` (`Object`) - Parent object containing the method

`methodName` (`String`) - Name of the method

`patterns` (`Patterns Object`) - Patterns to match against (see below)

returns *`undefined`*

#### filtrate(`function`, `patterns`);

`function` (`Function`) - The function to be filtered

`patterns` (`Patterns Object`) - Patterns to match against (see below)

returns *filtered function*

#### filtrate.compare(`input`, `patterns`);

Pattern match, boolean result

`input` (`Function`) - An object to match

`patterns` (`Patterns Object`) - Patterns to match against (see below)

returns *null* or *string error message*


### Patterns Object

The patterns object can be recursively defined as:

```
  patterns =
    true      ||      
    false     ||    
    String    ||
    Number    ||
    Boolean   ||          
    Function  ||                
    Array     ||               
    Object    ||               
    [patterns, ...] ||             
    {key: patterns, ... }
```

`true` is a truthy comparison

`false` is a falsy comparison

`String` and

`Number` and
       
`Boolean` and
             
`Function` and
                   
`Array` and
                      
`Object` are all essentially `typeof` comparisons

`[]` does a recursive comparison of these types listed

`{}` does a recursive comparison of these types listed (also matches key names)














