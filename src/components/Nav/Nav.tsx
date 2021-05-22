import React from 'react';
import {
  Platform,
  Image,
  View,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Colors } from '~/src/themes';

export const ArrowBackLeft = props => {
  return (
    <SafeAreaView style={{ ...props.style }}>
      <View style={{ height: 64, marginTop: Platform.OS === 'ios' ? -16 : 24 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <TouchableOpacity onPress={props.onPress}>
            <Image
              style={{
                width: 24,
                height: 24,
                marginLeft: 16,
                tintColor: Colors.PRIMARY,
              }}
              source={require('~/src/assets/images/arrow_back.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
