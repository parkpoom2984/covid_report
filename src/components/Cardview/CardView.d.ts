import { Ref } from 'react';
import { ViewProperties } from 'react-native';

export interface CardViewProps extends ViewProperties {
  ref?: Ref<any>;
  children?;
}
