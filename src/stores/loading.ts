import { observable, action } from 'mobx';

export interface ILoadingStore {
  disable: boolean;
  isLoading: boolean;
  disableLoading(): void;
  startLoading(): void;
  stopLoading(): void;
}

export default class LoadingStore implements ILoadingStore {
  @observable disable = false;

  @observable isLoading = false;

  @action disableLoading() {
    this.disable = true;
  }

  @action startLoading() {
    this.isLoading = true;
  }

  @action stopLoading() {
    this.disable = false;
    this.isLoading = false;
  }
}
