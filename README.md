filtrate
========

Function argument and JSON schema type checking for Node.js

```
npm install filtrate
```

### Usage

Wrap a function

``` js
var bar = filtrate(
  [Number, {}, String],
  function() {
    console.log('bar', arguments);
  }
);

bar(21, {a: 42}, "Test"); // executes foo.fn
bar(21, [a, 42], "Test"); // throws!
```

Modify an object method

``` js
var foo = {
  fn: function() { 
    console.log('foo', arguments);
  }
};

filtrate(foo, 'fn', [Number, Boolean]);

foo.fn(42, true);     // executes foo.fn
foo.fn(42, 'string'); // throws!
```

Compare a pattern against a value

``` js
filtrate.compare(String, "Test"); //true
filtrate.compare(String, 42);     //false
filtrate.compare([String, Number],   ["Test", 42]); //true
filtrate.compare([String, Function], ["Test", 42]); //false
filtrate.compare(
  { a:String, b:Function },
  { a:"Test", b:Object.keys }); //false
filtrate.compare(
  { a:String, b:Function },
  { a:"Test", b:42 }); //false
```

Compare a pattern against a value with a helpful message

``` js
filtrate.check([String, Number],   ["Test", 42]); //null
filtrate.check([String, Function], ["Test", 42]); //"Filtrate Error: input[1] is not a function (got: 42)"
```

### API

#### filtrate(`patterns`, `function`);

  Wrap a function

  `patterns` (`Patterns Object`) - Patterns to match against (see below)

  `function` (`Function`) - The function to be filtered

  returns *filtered function*

#### filtrate(`object`, `methodName`, `patterns`);

  Modify object method

  `object` (`Object`) - Parent object containing the method

  `methodName` (`String`) - Name of the method

  `patterns` (`Patterns Object`) - Patterns to match against (see below)

  returns *`undefined`*

#### filtrate.compare(`patterns`, `input`);

  Pattern match, boolean result

  `input` (`Function`) - An object to match

  `patterns` (`Patterns Object`) - Patterns to match against (see below)

  returns `true`/`false`


#### filtrate.check(`patterns`, `input`);
  
  Pattern match, string result

---

### Patterns Object

A `patterns` object is recursively defined as:

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
    undefined ||               
    [patterns, ...] ||             
    {key: patterns, ... }
```

`true` is a truthy comparison

`false` is a falsy comparison

`String`, `Number`, `Boolean`, `Function`, `Array` and `Object` are all essentially `typeof` comparisons

`undefined` skips comparison

`[]` does a recursive comparison of these types listed

`{}` does a recursive comparison of these types listed (also matches key names)














