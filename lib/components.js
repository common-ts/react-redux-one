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
var form_util_1 = require("form-util");
var React = require("react");
var react_onex_1 = require("react-onex");
var react_onex_2 = require("react-onex");
var react_onex_3 = require("react-onex");
var react_onex_4 = require("react-onex");
var search_utilities_1 = require("search-utilities");
var uione_1 = require("uione");
var ReduxEditComponent = (function (_super){
  __extends(ReduxEditComponent, _super);
  function ReduxEditComponent(props, metadata, patchable, backOnSaveSuccess){
    var _this = _super.call(this, props, metadata, patchable, backOnSaveSuccess) || this;
    _this.load = _this.load.bind(_this);
    _this.save = _this.save.bind(_this);
    _this.getModel = _this.getModel.bind(_this);
    _this.showModel = _this.showModel.bind(_this);
    _this.componentDidMount = _this.componentDidMount.bind(_this);
    _this.componentWillUnmount = _this.componentWillUnmount.bind(_this);
    _this.ref = React.createRef();
    return _this;
  }
  ReduxEditComponent.prototype.componentDidMount=function(){
    this.form = uione_1.initForm(this.ref.current, uione_1.initMaterial);
    var id = react_onex_2.buildId(this.keys, this.props);
    this.load(id);
  };
  ReduxEditComponent.prototype.componentWillUnmount=function(){
    if (this.props[this.getModelName()]){
      var props = this.props;
      var setGlobalState = props.props.setGlobalState;
      if (this.form){
        var formName = this.form.name;
        setGlobalState(formName);
      }
    }
  };
  ReduxEditComponent.prototype.load=function(_id){
    var id = _id;
    if (id != null && id !== ''){
      this.newMode = false;
      this.props.load({ parameter: id, callback: { execute: this.showModel, handleError: this.handleError } });
    }
    else {
      var obj = this.createModel();
      this.resetState(true, obj, null);
    }
  };
  ReduxEditComponent.prototype.save=function(parameter, body, isBack){
    this.running = true;
    uione_1.storage.loading().hideLoading();
    if (this.newMode === false){
      if (this.patchable === true && body && Object.keys(body).length > 0){
        this.props.patch({ parameter: body, callback: { execute: this.postSave, handleError: this.handleError } });
      }
      else {
        this.props.update({ parameter: parameter, callback: { execute: this.postSave, handleError: this.handleError } });
      }
    }
    else {
      this.props.insert({ parameter: parameter, callback: { execute: this.postSave, handleError: this.handleError } });
    }
  };
  ReduxEditComponent.prototype.getModel=function(){
    return this.props[this.getModelName()];
  };
  ReduxEditComponent.prototype.showModel=function(model){
    var _a;
    var _this = this;
    var props = this.props;
    this.orginalModel = model;
    var f = this.form;
    props.setGlobalState((_a = {}, _a[f.name] = model, _a));
    setTimeout(function (){
      if (_this.editable === false){
        form_util_1.readOnly(f);
      }
    }, 100);
  };
  return ReduxEditComponent;
}(react_onex_1.BaseEditComponent));
exports.ReduxEditComponent = ReduxEditComponent;
var ReduxSearchComponent = (function (_super){
  __extends(ReduxSearchComponent, _super);
  function ReduxSearchComponent(props, listFormId, service){
    if (listFormId === void 0){ listFormId = null; }
    if (service === void 0){ service = null; }
    var _this = _super.call(this, props, listFormId) || this;
    _this.service = service;
    _this.search = _this.search.bind(_this);
    _this.getSearchModel = _this.getSearchModel.bind(_this);
    _this.componentDidMount = _this.componentDidMount.bind(_this);
    _this.componentWillUnmount = _this.componentWillUnmount.bind(_this);
    _this.ref = React.createRef();
    return _this;
  }
  ReduxSearchComponent.prototype.componentDidMount=function(){
    this.form = uione_1.initForm(this.ref.current, uione_1.initMaterial);
    var s = this.mergeSearchModel(react_onex_4.buildFromUrl());
    this.load(s, uione_1.storage.autoSearch);
  };
  ReduxSearchComponent.prototype.componentWillUnmount=function(){
    var props = this.props;
    var setGlobalState = props.props.setGlobalState;
    var f = this.getSearchForm();
    if (f){
      var formName = f.name;
      setGlobalState(formName);
    }
  };
  ReduxSearchComponent.prototype.search=function(searchModel){
    this.props.search({ searchModel: searchModel, callback: { showResults: this.showResults, handleError: this.handleError } });
  };
  ReduxSearchComponent.prototype.getSearchModel=function(){
    var i = 0;
    var f = this.getSearchForm();
    var objState = {};
    if (f){
      for (i = 0; i < f.length; i++){
        var name_1 = f[i].name;
        if (name_1){
          objState[name_1] = '';
          if (this.state[name_1]){
            objState[name_1] = this.state[name_1];
          }
        }
      }
    }
    var obj = objState ? objState : {};
    var obj3 = search_utilities_1.optimizeSearchModel(obj, this, this.getDisplayFields());
    obj3.excluding = this.excluding;
    return obj3;
  };
  return ReduxSearchComponent;
}(react_onex_3.BaseSearchComponent));
exports.ReduxSearchComponent = ReduxSearchComponent;
