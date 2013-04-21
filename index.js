var _ = require('lodash'),
    util = require('util');

//publics
var filtrate = function() {

  var method, name, parent, patterns;
  //filtrate self !
  if(!filtrate.compare([Function, true], arguments)) {
    method = arguments[0];
    patterns = arguments[1];
  } else if(!filtrate.compare([Object, String, true], arguments)) {
    parent = arguments[0];
    name = arguments[1];
    patterns = arguments[2];
    method = parent[name];
  } else {
    throw "Invalid arguments";
  }

  if(!method)
    throw new Error("Method missing");

  var path = (parent ? name+': ' : '') + 'arguments';

  var filter = function() {
    check(patterns, arguments, path);
    return method.apply(this, arguments);
  };

  if(parent) parent[name] = filter;
  return filter;
};

filtrate.compare = function(pattern, val) {
  try {
    check(pattern, val, 'input');
  } catch(e) {
    return e;
  }
  return null;
};

//privates
var check = function(pattern, val, path) {

  var type = extractType(pattern),
      result = null;

  //pattern checks (fast first)
  if(type === true && !val)
    result = "is not truthy";
  else if(type === false && val)
    result = "is not falsy";
  else if(type === String && !_.isString(val))
    result = "is not a string";
  else if(type === Number && !_.isNumber(val))
    result = "is not a number";
  else if(type === Boolean && !_.isBoolean(val))
    result = "is not a bool";
  else if(type === Array && !_.isArray(val))
    result = "is not an array";
  else if(type === Function && !_.isFunction(val))
    result = "is not a function";
  else if(type === Object && !_.isObject(val))
      result = "is not an object";
  else if(_.isPlainObject(type))
    if(_.isPlainObject(val))
      result = checkObject(type, val, path);
    else
      result = "is not a plain object";
  else if(_.isArray(type))
    if(_.isArray(val) || _.isArguments(val))
      result = checkArray(type, val, path);
    else
      result = "is not an array";

  //throw on first error
  if(_.isString(result))
    throw "Filtrate Error: " +
          path + ' ' +
          result + ' (got: ' +
          util.inspect(val, false, 1) +
          ')';

  //success
  return result;
};

var checkObject = function(pattern, obj, path) {
  var keys = _.keys(pattern),
      k = null,
      result = null;
  for(var i = 0; i < keys.length; i++) {
    k = keys[i];
    result = check(pattern[k], obj[k], path+'.'+k);
    if(result !== null)
      return result;
  }
  return null;
};

var checkArray = function(patterns, array, path) {
  var result = null;
  for(var i = 0; i < patterns.length; i++) {
    result = check(patterns[i], array[i], path +'['+i+']');
    if(result !== null) break;
  }
  return result;
};

var extractType = function(pattern) {
  if(_.isPlainObject(pattern) && pattern.type) {
    var t = pattern.type;
    delete pattern.type;
    return t;
  }
  return pattern;
};

module.exports = filtrate;




