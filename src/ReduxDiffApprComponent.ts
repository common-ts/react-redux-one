import * as React from 'react';
import {BaseDiffApprComponent, BaseDiffState, DiffModel} from 'react-onex';
import {buildId, Metadata} from 'react-onex';
import {HistoryProps} from 'react-onex';
import {clone} from 'reflectx';
import {DiffApprDispatchProps} from './DiffApprDispatchProps';

interface InternalDiffState<T, ID> {
  diffModel?: DiffModel<T, ID>;
}

export type DiffApprPropsType<T, ID> = InternalDiffState<T, ID> & DiffApprDispatchProps<T, ID> & HistoryProps;

export class ReduxDiffApprComponent<T, ID, W extends DiffApprPropsType<T, ID>, I extends BaseDiffState> extends BaseDiffApprComponent<T, ID, W, I> {
  constructor(props, metadata: Metadata) {
    super(props, metadata);
    this.approve = this.approve.bind(this);
    this.reject = this.reject.bind(this);
    this.formatDiffModel = this.formatDiffModel.bind(this);
    this.showDiff = this.showDiff.bind(this);
    this.formatFields = this.formatFields.bind(this);
    this.ref = React.createRef();
  }
  protected ref: any;

  componentDidMount() {
    this.form = this.ref.current;
    const id = buildId<ID>(this.keys, this.props);
    this.load(id);
  }

  protected showDiff(model: DiffModel<T, ID>) {
    if (!model) {
      this.handleNotFound();
    } else {
      const props: any = this.props;
      const f = this.form;
      const formName = f.name;
      if (props.props.setGlobalState) {
        props.props.setGlobalState({[formName]: model});
        this.format();
      }
    }
  }

  formatDiffModel(obj: DiffModel<T, ID>): DiffModel<T, ID> {
    if (!obj) {
      return obj;
    }
    const obj2 = clone(obj);
    if (!obj2.origin) {
      obj2.origin = {};
    } else {
      if (typeof obj2.origin === 'string') {
        obj2.origin = JSON.parse(obj2.origin);
      }
      if (typeof obj2.origin === 'object' && !Array.isArray(obj2.origin)) {
        obj2.origin = this.formatFields(obj2.origin);
      }
    }
    if (!obj2.value) {
      obj2.value = {};
    } else {
      if (typeof obj2.value === 'string') {
        obj2.value = JSON.parse(obj2.value);
      }
      if (typeof obj2.value === 'object' && !Array.isArray(obj2.value)) {
        obj2.value = this.formatFields(obj2.value);
      }
    }
    return obj2;
  }

  formatFields(value: T): T {
    return value;
  }

  load(_id: ID): void {
    const id: any = _id;
    if (id && id !== '') {
      this.id = _id;
      this.props.diff({parameter: id, callback: { execute: this.showDiff, handleError: this.handleError, formatData: this.formatDiffModel }});
    }
  }

  approve(event: any): void {
    event.preventDefault();
    const id = this.id;
    this.props.approve({parameter: id, callback: { execute: this.postApprove, handleError: this.handleError }});
  }

  reject(event: any): void {
    event.preventDefault();
    const id = this.id;
    this.props.reject({parameter: id, callback: { execute: this.postReject, handleError: this.handleError }});
  }
}
