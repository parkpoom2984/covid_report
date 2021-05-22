import { Platform as RNPlatform } from 'react-native';

export const isIOS = RNPlatform.OS === 'ios';
export const isAndroid = RNPlatform.OS === 'android';

export const Platform = {
  isIOS,
  isAndroid,
  ...RNPlatform,
};

export default Platform;
