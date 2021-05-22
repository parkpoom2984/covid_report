import { StackActions, NavigationActions } from 'react-navigation';
import stores from '~/src/stores';

export function route(routeName: any, params = {}) {
  let { navigate } = stores.navigation.navigation;
  navigate(routeName, { ...params });
}

export function replaceRoute(routeArray: any, index: any) {
  let { reset } = stores.navigation.navigation;
  const newRoutes = routeArray.map((_route: any) =>
    NavigationActions.navigate({ routeName: _route.routeName }),
  );
  reset(newRoutes, index);
}

export function dispatch(routeName: any, params = {}, key = false) {
  let { _dispatch } = stores.navigation.navigation;
  let resetAction: any;
  if (!key) {
    resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName, params })],
    });
  } else {
    resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName, params })],
    });
  }

  _dispatch(resetAction);
}

export function goBack() {
  stores.navigation.navigation.goBack(null);
}

export function getRouteName() {
  return stores.navigation.navigation;
}
