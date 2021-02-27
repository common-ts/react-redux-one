import {readOnly} from 'form-util';
import * as React from 'react';
import {BaseEditComponent, initForm, LoadingService, Locale, ResourceService, UIService} from 'react-onex';
import {buildId, Metadata} from 'react-onex';
import {HistoryProps} from 'react-onex';
import {BaseSearchComponent} from 'react-onex';
import {buildFromUrl} from 'react-onex';
import {SearchState} from 'react-onex';
import {optimizeSearchModel, SearchModel} from 'search-utilities';
import {EditDispatchProps} from './EditDispatchProps';
import {SearchDispatchProps} from './SearchDispatchProps';

export abstract class ReduxEditComponent<T, ID, W extends (EditDispatchProps<T, ID> & HistoryProps), I> extends BaseEditComponent<T, W, I>  {
  constructor(props, metadata: Metadata,
      resourceService: ResourceService,
      ui: UIService,
      showMessage: (msg: string) => void,
      showError: (m: string, title?: string, detail?: string, callback?: () => void) => void,
      confirm: (m2: string, header: string, yesCallback?: () => void, btnLeftText?: string, btnRightText?: string, noCallback?: () => void) => void,
      getLocale?: () => Locale,
      loading?: LoadingService,
      patchable?: boolean, backOnSaveSuccess?: boolean) {
    super(props, metadata, resourceService, ui, showMessage, showError, confirm, getLocale, loading, patchable, backOnSaveSuccess);

    this.getLocale = this.getLocale.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.showMessage = this.showMessage.bind(this);

    this.load = this.load.bind(this);
    this.save = this.save.bind(this);
    this.getModel = this.getModel.bind(this);
    this.showModel = this.showModel.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.ref = React.createRef();
  }
  ref: any;
  componentDidMount() {
    this.form = initForm(this.ref.current, this.ui.initMaterial);
    const id = buildId<ID>(this.keys, this.props);
    this.load(id);
  }
  componentWillUnmount() {
    if (this.props[this.getModelName()]) {
      const props: any = this.props;
      const setGlobalState = props.props.setGlobalState;
      if (this.form) {
        const formName: string = this.form.name;
        setGlobalState(formName);
      }
    }
  }
  load(_id: ID) {
    const id: any = _id;
    if (id != null && id !== '') {
      this.newMode = false;
      this.props.load({parameter: id, callback: { execute: this.showModel, handleError: this.handleError }});
    } else {
      // Call service state
      const obj = this.createModel();
      this.resetState(true, obj, null);
    }
  }
  protected save(parameter: T, body?: any, isBack?: boolean) {
    this.running = true;
    if (this.loading) {
      this.loading.showLoading();
    }
    const ctx: any = {};
    if (!this.newMode) {
      if (this.patchable === true && body && Object.keys(body).length > 0) {
        this.props.patch({parameter: body, ctx, callback: { execute: this.postSave, handleError: this.handleError }});
      } else {
        this.props.update({parameter, ctx, callback: { execute: this.postSave, handleError: this.handleError }});
      }
    } else {
      this.props.insert({parameter, ctx, callback: { execute: this.postSave, handleError: this.handleError }});
    }
  }
  getModel(): T {
    return this.props[this.getModelName()];
  }
  showModel(model: T) {
    const props: any = this.props;
    this.orginalModel = model;
    const f = this.form;
    props.setGlobalState({[f.name]: model});
    setTimeout(() => {
      if (this.editable === false) {
        readOnly(f);
      }
    }, 100);
  }
}


export type SearchPropsType<T, S extends SearchModel> = SearchDispatchProps<T, S> & HistoryProps;

export class ReduxSearchComponent<T, S extends SearchModel, W extends SearchPropsType<T, S>, I extends SearchState<T>> extends BaseSearchComponent<T, S, W, I> {
  constructor(props,
    resourceService: ResourceService,
    ui: UIService,
    showMessage: (msg: string) => void,
    showError: (m: string, header?: string, detail?: string, callback?: () => void) => void,
    getLocale?: () => Locale,
    loading?: LoadingService,
    autoSearch?: boolean,
    listFormId: string = null
  ) {
    super(props, resourceService, ui, showMessage, showError, getLocale, loading, listFormId);
    if (autoSearch === false) {
      this.autoSearch = autoSearch;
    }
    this.search = this.search.bind(this);
    this.getSearchModel = this.getSearchModel.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);
    this.ref = React.createRef();
  }
  ref: any;
  protected autoSearch = true;
  componentDidMount() {
    this.form = initForm(this.ref.current, this.ui.initMaterial);
    const s = this.mergeSearchModel(buildFromUrl());
    this.load(s, this.autoSearch);
  }
  componentWillUnmount() {
    const props: any = this.props;
    const setGlobalState = props.props.setGlobalState;
    const f = this.getSearchForm();
    if (f) {
      const formName: string = f.name;
      // Remove current props when unmount
      setGlobalState(formName);
    }
  }

  search(searchModel: S) {
    this.props.search({ searchModel, callback: {showResults: this.showResults, handleError: this.handleError}});
  }
  getSearchModel(): S {
    let i = 0;
    const f = this.getSearchForm();
    const objState = {};
    if (f) {
      for (i = 0; i < f.length; i++) {
        const name = f[i].name;
        if (name) {
          objState[name] = '';
          if (this.state[name]) {
            objState[name] = this.state[name];
          }
        }
      }
    }
    const obj: any = objState ? objState : {};
    const obj3 = optimizeSearchModel(obj, this, this.getDisplayFields());
    obj3.excluding = this.excluding;
    return obj3;
  }
}
