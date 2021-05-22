/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useRef, useEffect } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { observer, inject } from 'mobx-react';
import Routes from '~/src/Routes';
import { Colors } from '~/src/themes';

const { width } = Dimensions.get('window');
const Root = observer(props => {
  const { loading, navigation } = props;
  const navigationRef = useRef<any>();

  useEffect(() => {
    navigation.updateNavigation(navigationRef.current._navigation);
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <Routes ref={navigationRef} />
      {loading.isLoading && (
        <View
          style={{
            flex: 1,
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.BLACK_TRANSPARENT,
          }}>
          <View
            style={{
              width: width / 3,
              height: width / 3,
              borderRadius: width / 3 / 2,
              overflow: 'hidden',
            }}>
            <Image
              source={require('~/src/assets/images/loading.gif')}
              style={{ width: width / 3, height: width / 3 }}
            />
          </View>
        </View>
      )}
    </View>
  );
});

export default inject('loading', 'navigation')(Root);
