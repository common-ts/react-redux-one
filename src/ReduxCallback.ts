export interface ReduxCallback<T> {
  execute: (obj: T, ctx?: any) => void;
  formatData?: (obj: T) => T;
  handleError: (response: any) => void;
}
