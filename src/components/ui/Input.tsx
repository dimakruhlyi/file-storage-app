import React, { useState, ChangeEvent } from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Text from '../typography/Text';
import { COLORS, FONT_FAMILIES } from '../../shared/constants';
import Iconm from './Iconm';

interface ITextInput {
  label?: string;
  value: string;
  style?: object;
  showContentVisibilityControl?: boolean;
  onFocus?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
}

function Input({
  label,
  value,
  style,
  showContentVisibilityControl = true,
  onFocus,
  onBlur,
  ...rest
}: ITextInput): JSX.Element {
  const [contentVisible, setContentVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  const onInputFocus = (e: ChangeEvent<HTMLInputElement>) => {
    setFocused(true);
    if (onFocus && typeof onFocus === 'function') {
      onFocus(e);
    }
  };

  const onInputBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setFocused(false);
    if (onBlur && typeof onBlur === 'function') {
      onBlur(e);
    }
  };

  return (
    <View>
      {label && (
        <Text size={15} color={COLORS.darkgray} style={styles.label}>
          {label}
        </Text>
      )}
      <View style={[styles.inputHolder, focused && styles.inputHolderFocused]}>
        <TextInput
          style={[styles.input, style]}
          value={value}
          secureTextEntry={showContentVisibilityControl && !contentVisible}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          {...rest}
        />
        {showContentVisibilityControl && (
          <TouchableOpacity
            style={styles.passwordControl}
            onPress={() => setContentVisible(!contentVisible)}>
            <Iconm
              name={contentVisible ? 'invisible' : 'eye'}
              size={20}
              color={COLORS.black}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 5,
  },
  input: {
    height: 40,
    paddingLeft: 20,
    fontFamily: FONT_FAMILIES.RobotoRegular,
    ...(Platform.OS === 'android' && {
      paddingVertical: 0,
      lineHeight: 40,
    }),
    fontSize: 18,
    flex: 1,
    color: COLORS.darkgray,
  },
  inputHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: COLORS.darkgray,
    borderRadius: 35,
  },
  inputHolderFocused: {
    borderColor: COLORS.error,
  },
  passwordControl: {
    padding: 5,
    position: 'absolute',
    right: 10,
  },
});

export default Input;
