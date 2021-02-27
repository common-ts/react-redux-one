import {ResultInfo} from 'react-onex';
import {ReduxModel} from './ReduxModel';
import {ViewDispatchProps} from './ViewDispatchProps';

export interface EditDispatchProps<T, ID> extends ViewDispatchProps<T, ID> {
  update: (data: ReduxModel<T, number|ResultInfo<T>>) => void;
  patch?: (data: ReduxModel<T, number|ResultInfo<T>>) => void;
  insert: (data: ReduxModel<T, number|ResultInfo<T>>) => void;
}
