"use strict";
var __extends = (this && this.__extends) || (function (){
  var extendStatics=function(d, b){
    extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b){ d.__proto__ = b; }) ||
      function (d, b){ for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
  };
  return function (d, b){
    extendStatics(d, b);
    function __(){ this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
Object.defineProperty(exports,"__esModule",{value:true});
var React = require("react");
var react_onex_1 = require("react-onex");
var react_onex_2 = require("react-onex");
var reflectx_1 = require("reflectx");
var ReduxDiffApprComponent = (function (_super){
  __extends(ReduxDiffApprComponent, _super);
  function ReduxDiffApprComponent(props, metadata){
    var _this = _super.call(this, props, metadata) || this;
    _this.approve = _this.approve.bind(_this);
    _this.reject = _this.reject.bind(_this);
    _this.formatDiffModel = _this.formatDiffModel.bind(_this);
    _this.showDiff = _this.showDiff.bind(_this);
    _this.formatFields = _this.formatFields.bind(_this);
    _this.ref = React.createRef();
    return _this;
  }
  ReduxDiffApprComponent.prototype.componentDidMount=function(){
    this.form = this.ref.current;
    var id = react_onex_2.buildId(this.keys, this.props);
    this.load(id);
  };
  ReduxDiffApprComponent.prototype.showDiff=function(model){
    var _a;
    if (!model){
      this.handleNotFound();
    }
    else {
      var props = this.props;
      var f = this.form;
      var formName = f.name;
      if (props.props.setGlobalState){
        props.props.setGlobalState((_a = {}, _a[formName] = model, _a));
        this.format();
      }
    }
  };
  ReduxDiffApprComponent.prototype.formatDiffModel=function(obj){
    if (!obj){
      return obj;
    }
    var obj2 = reflectx_1.clone(obj);
    if (!obj2.origin){
      obj2.origin = {};
    }
    else {
      if (typeof obj2.origin === 'string'){
        obj2.origin = JSON.parse(obj2.origin);
      }
      if (typeof obj2.origin === 'object' && !Array.isArray(obj2.origin)){
        obj2.origin = this.formatFields(obj2.origin);
      }
    }
    if (!obj2.value){
      obj2.value = {};
    }
    else {
      if (typeof obj2.value === 'string'){
        obj2.value = JSON.parse(obj2.value);
      }
      if (typeof obj2.value === 'object' && !Array.isArray(obj2.value)){
        obj2.value = this.formatFields(obj2.value);
      }
    }
    return obj2;
  };
  ReduxDiffApprComponent.prototype.formatFields=function(value){
    return value;
  };
  ReduxDiffApprComponent.prototype.load=function(_id){
    var id = _id;
    if (id && id !== ''){
      this.id = _id;
      this.props.diff({ parameter: id, callback: { execute: this.showDiff, handleError: this.handleError, formatData: this.formatDiffModel } });
    }
  };
  ReduxDiffApprComponent.prototype.approve=function(event){
    event.preventDefault();
    var id = this.id;
    this.props.approve({ parameter: id, callback: { execute: this.postApprove, handleError: this.handleError } });
  };
  ReduxDiffApprComponent.prototype.reject=function(event){
    event.preventDefault();
    var id = this.id;
    this.props.reject({ parameter: id, callback: { execute: this.postReject, handleError: this.handleError } });
  };
  return ReduxDiffApprComponent;
}(react_onex_1.BaseDiffApprComponent));
exports.ReduxDiffApprComponent = ReduxDiffApprComponent;
