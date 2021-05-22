import React from 'react';
import { View } from 'react-native';

import { CardViewProps } from './CardView.d';
import { styles } from './CardView.style';

export const CardView = ({ style, ...props }: CardViewProps) => (
  <View style={[styles.container, style]} {...props} />
);
