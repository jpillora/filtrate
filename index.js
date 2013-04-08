var _ = require('lodash');

//publics
var filtrate = {};

filtrate.fn = function(fn, patterns) {
  return filtrate.method(null, fn, patterns);
};

filtrate.method = function(parent, name, patterns) {

  var method = null;

  if(parent && _.isString(name))
    method = parent[name];
  else if(_.isFunction(name))
    method = name;

  if(!method) throw "errorrr";

  var filter = function() {

    var result = checkArray(arguments, patterns, 'args');

    //check result
    if(_.isString(result))
      throw "Validation Error: " + result;

    if(parent && result && result.redirect)
      parent[result.redirect].apply(this, arguments);
    else
      method.apply(this, arguments);
  };

  if(parent) parent[name] = filter;
  return filter;
};

//privates
var check = function(pattern, val, path) {

  var type = extractType(pattern),
      result = null;

  //pattern checks
  if(_.isPlainObject(type))
    if(_.isPlainObject(val))
      result = checkObject(type, val, path);
    else
      result = "is not an object";
  else if(_.isArray(type))
    if(_.isPlainObject(val))
      result = checkArray(type, val, path);
    else
      result = "is not an array";
  else if(type === Number && !_.isNumber(val))
    result = "is not a number";
  else if(type === Boolean && !_.isBoolean(val))
    result = "is not a bool";
  else if(type === Array && !_.isArray(val))
    result = "is not an array";

  //success
  return result;
};

var checkObject = function(pattern, obj, path) {

  var keys = _.keys(pattern),
      k = null,
      result = null;
  for(var i = 0; i < keys.length; i++) {
    k = keys[i];
    result = check(pattern[k], obj[k], k);
    if(result !== null)
      return result;
  }
  return null;
};

var checkArray = function(patterns, array, path) {
  for(var i = 0; i < patterns.length; i++) {
    result = check(patterns[i], array[i], path +'['+i+']');
    if(result) break;
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

var fail = function(pattern, msg) {

};

module.exports = filtrate;




