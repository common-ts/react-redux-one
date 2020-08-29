export interface ReduxCallback<T> {
  execute: (obj: T) => void;
  formatData?: (obj: T) => T;
  handleError: (response: any) => void;
}
