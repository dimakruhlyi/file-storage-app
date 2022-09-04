import React from "react";
import { Text as RNText } from 'react-native';
import { COLORS, FONT_FAMILIES } from '../../shared/constants';

interface IText {
    size?: number,
    align?: TextAlign,
    color?: string,
    weight?: FontWeights,
    children: React.ReactNode,
    uppercase?: string,
    style?: object,
}

export enum FontWeights {
    Light = '300',
    Regular = '400',
    Bold = '700',
}

export enum TextAlign {
    Auto = 'auto',
    Center = 'center',
    Justify = 'justify',
    Left = 'left',
    Right = 'right',
}

const fontFamily = {
    300: FONT_FAMILIES.RobotoLight,
    400: FONT_FAMILIES.RobotoRegular,
    700: FONT_FAMILIES.RobotoBold
};

function Text({
    size = 18,
    align = TextAlign.Left,
    color = COLORS.darkgray,
    weight = FontWeights.Regular,
    uppercase,
    style,
    children,
    ...rest
}: IText) {

    return (
        <RNText
            style={{
                fontFamily: fontFamily[weight],
                fontSize: size,
                color: color,
                textAlign: align,
                ...(uppercase && { textTransform: 'uppercase' }),
                ...style,
            }}
            {...rest}>
            {children}
        </RNText>
    );

}

export default Text;