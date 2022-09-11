import React from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Text from '../components/typography/Text';

interface ISignIn {

}

function SignIn({ }: ISignIn): JSX.Element {
    return (
        <View>
            <Text >Sign IN screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default SignIn;