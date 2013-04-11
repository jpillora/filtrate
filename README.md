filtrate
========

Function argument type checking for Node.js

`npm install filtrate`

### Method Usage

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

``` js
var bar = filtrate.fn(
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
filtrate.compare(String, "Test"); //true
filtrate.compare(String, 42);     //false
filtrate.compare([String, Number],   ["Test", 42]); //true
filtrate.compare([String, Function], ["Test", 42]); //false
filtrate.compare(
  { a:String, b:Function },
  { a:"Test", b:Object.keys }); //true
filtrate.compare(
  { a:String, b:Function },
  { a:"Test", b:42 }); //false
```

### API

#### filtrate(`parent`, `methodName`, `patterns`);

`parent` (`Object`) - Parent object containing the method

`methodName` (`String`) - Name of the method

`patterns` (`Patterns Object`) - Patterns to match against (see below)

returns *undefined*

#### filtrate(`function`, `patterns`);

`function` (`Function`) - The function to be filtered

`patterns` (`Patterns Object`) - Patterns to match against (see below)

returns *filtered function*

#### filtrate.compare(`input`, `patterns`);

`input` (`Function`) - An object to match

`patterns` (`Patterns Object`) - Patterns to match against (see below)

returns *true* or *false*


### Patterns Object

The pattern object can be recursively defined as:

```
  pattern =
    true        
    false       
    String       
    Boolean             
    Function                   
    Array                      
    Object                     
    [pattern, ...]             
    {key: pattern, ... }
```

`true` is a truthy comparison

`false` is a falsy comparison

`String`
       
`Boolean`
             
`Function`
                   
`Array`
                      
`Object` are all essentially `typeof` comparisons

`[]` does a recursive comparison of these types listed

`{}` does a recursive comparison of these types listed (also matches key names)














