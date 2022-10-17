import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Text, { TextAlign } from '../typography/Text';
import { COLORS } from '../../shared/constants';

interface IButton {
    label: string;
    disabled?: boolean;
    type?: ButtonTypes;
    style?: object;
    onPress: () => void;
}

export enum ButtonTypes {
    Default = 'default',
    Error = 'error'
}

function Button({
    label,
    disabled = false,
    type = ButtonTypes.Default,
    style,
    onPress,
}: IButton): JSX.Element {

    function getStylesByType() {
        let backgroundColor = '';
        let textColor = '';

        switch (type) {
            case ButtonTypes.Default:
                backgroundColor = COLORS.darkblue;
                textColor = COLORS.white;
                break;
            case ButtonTypes.Error:
                backgroundColor = COLORS.white;
                textColor = COLORS.error;
                break;
        }

        return { backgroundColor, textColor };
    }


    return (
        <TouchableOpacity
            disabled={disabled}
            style={[style, { backgroundColor: getStylesByType().backgroundColor }, styles.baseButtonStyles]}
            onPress={onPress}>
            <Text color={getStylesByType().textColor} align={TextAlign.Center}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    baseButtonStyles: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
});

export default Button;
