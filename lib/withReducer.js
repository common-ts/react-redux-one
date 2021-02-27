"use strict";
var __assign = (this && this.__assign)||function (){
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports,"__esModule",{value:true});
var prop_types_1 = require("prop-types");
var React = require("react");
var withReducer=function(reducer, key){ return function(WrappedComponent){
  var Extended=function(props, context) {
    context.store.injectReducer(key, reducer);
    return React.createElement(WrappedComponent, __assign({}, props));
  };
  Extended.contextTypes = {
    store: prop_types_1.object
  };
  return Extended;
}; };
exports.withReducer = withReducer;
