var _ = require('lodash'),
    util = require('util');

//privates
function checkObject(pattern, obj, path) {
  var keys = _.keys(pattern),
      k = null,
      result = null;
  for(var i = 0; result === null && i < keys.length; i++) {
    k = keys[i];
    result = check(pattern[k], obj[k], path+'.'+k);
  }
  return result;
}

function checkArray(patterns, array, path) {
  var result = null;
  for(var i = 0; result === null && i < patterns.length; i++) {
    result = check(patterns[i], array[i], path +'['+i+']');
  }
  return result;
}

function extractType(pattern) {
  if(_.isPlainObject(pattern) && pattern.type) {
    var t = pattern.type;
    delete pattern.type;
    return t;
  }
  return pattern;
}

function check(pattern, val, path) {

  var type = pattern;// extractType(pattern),
  var result = null;

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
    if(_.isPlainObject(val)) {
      result = checkObject(type, val, path);
      if(result) return result;
    } else
      result = "is not a plain object";
  else if(_.isArray(type))
    if(_.isArray(val) || _.isArguments(val)) {
      result = checkArray(type, val, path);
      if(result) return result;
    } else
      result = "is not an array";

  if(result)
    return util.format("Filtrate Error: %s %s (got: %s)", path, result, util.inspect(val, false, 1));

  //success
  return null;
}

//public
function compare(pattern, val) {
  return !check(pattern, val, 'input');
}

function filtrate() {

  var method, name, parent, patterns;
  //filtrate self !
  if(compare([true, Function], arguments)) {
    patterns = arguments[0];
    method = arguments[1];
  } else if(compare([Object, String, true], arguments)) {
    parent = arguments[0];
    name = arguments[1];
    patterns = arguments[2];
    method = parent[name];
    if(!method)
      throw new Error("Method missing");
  } else if(arguments.length === 2) {
    return compare(arguments[0], arguments[1]);
  } else {
    throw new Error("Invalid arguments: "+util.inspect(arguments));
  }

  var path = (parent ? name+': ' : '') + 'arguments';

  function filter() {
    var err = check(patterns, arguments, path);
    if(err)
      throw new TypeError(err);
    return method.apply(this, arguments);
  }

  if(parent) parent[name] = filter;
  return filter;
}

filtrate.compare = compare;
module.exports = filtrate;




