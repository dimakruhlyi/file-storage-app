import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Text, { TextAlign } from '../typography/Text';
import { COLORS } from '../../shared/constants';

interface IButton {
    label: string;
    disabled?: boolean;
    style?: object;
    onPress: () => void;
}

function Button({
    label,
    disabled = false,
    style,
    onPress,
}: IButton): JSX.Element {
    return (
        <TouchableOpacity
            disabled={disabled}
            style={[style, styles.baseButtonStyles]}
            onPress={onPress}>
            <Text color={COLORS.white} align={TextAlign.Center}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    baseButtonStyles: {
        backgroundColor: COLORS.darkblue,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
});

export default Button;
