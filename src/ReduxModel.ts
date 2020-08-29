import {ReduxCallback} from './ReduxCallback';

export interface ReduxModel<T, K> {
  parameter: T;
  callback: ReduxCallback<K>;
}
