import React, { useState } from 'react';
import {
    TextInput,
    View,
    StyleSheet,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { useController, Control } from 'react-hook-form';
import Text from '../typography/Text';
import { COLORS, FONT_FAMILIES } from '../../shared/constants';
import Iconm from './Iconm';

interface ITextInput {
    label?: string;
    name: string;
    style?: object;
    showContentVisibilityControl?: boolean;
    error?: string;
    control?: Control<any, any>,
}

function Input({
    label,
    name,
    style,
    showContentVisibilityControl = false,
    error,
    control,
    ...rest
}: ITextInput): JSX.Element {
    const [contentVisible, setContentVisible] = useState(false);
    const [focused, setFocused] = useState(false);
    const { field } = useController({
        control,
        defaultValue: '',
        name
    });

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
                    value={field.value}
                    secureTextEntry={showContentVisibilityControl && !contentVisible}
                    onChangeText={field.onChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
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
            {error && (
                <Text size={15} color={COLORS.error}>{error}</Text>
            )}
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
        borderColor: COLORS.primary,
    },
    passwordControl: {
        padding: 5,
        position: 'absolute',
        right: 10,
    },
});

export default Input;
