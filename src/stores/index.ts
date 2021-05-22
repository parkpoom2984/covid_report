import LoadingStore from './loading';
import NavigationStore from './navigation';

const stores: any = {
  loading: new LoadingStore(),
  navigation: new NavigationStore(),
};

export default stores;
