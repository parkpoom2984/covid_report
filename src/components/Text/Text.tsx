import React, { Component } from 'react';
import ReactNative from 'react-native';

import { TextProps } from './Text.d';
import { styles } from './Text.styles';

export class Text extends Component<TextProps, any> {
  ids: {
    text?: ReactNative.Text;
  } = {};

  setNativeProps(nativeProps) {
    this.ids.text!.setNativeProps(nativeProps);
  }

  render() {
    let { style, ...props } = this.props;

    return (
      <ReactNative.Text
        allowFontScaling={false}
        style={[styles, style]}
        {...props}
        ref={(view: any) => (this.ids.text = view || undefined)}
      />
    );
  }
}
