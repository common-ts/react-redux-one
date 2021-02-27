import {ReduxCallback} from './ReduxCallback';

export interface ReduxModel<T, K> {
  parameter: T;
  ctx?: any;
  callback: ReduxCallback<K>;
}
