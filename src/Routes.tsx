import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { ArrowBackLeft } from '~/src/components/Nav/Nav';

import Home from '~/src/scene/Home';
import Countries from '~/src/scene/Countries';

import { goBack } from '~/src/common/navigate';

const navigationOptions = {
  drawerLockMode: 'locked-open',
  headerMode: 'screen',
};

const Routes = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: (): any => ({ header: null }),
    },
    Countries: {
      screen: Countries,
      navigationOptions: (): any => ({
        ...navigationOptions,
        headerTransparent: true,
        headerTitle: () => null,
        headerLeft: () => (
          <ArrowBackLeft
            onPress={() => {
              goBack();
            }}
          />
        ),
      }),
    },
  },
  {
    initialRouteName: 'Home',
  },
);
const App: any = createAppContainer(Routes);
export default App;
