import { observable, action } from 'mobx';

class NavigationStore {
  @observable navigation = null;

  @action updateNavigation(navigation) {
    this.navigation = navigation;
  }
}

export default NavigationStore;
