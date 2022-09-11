import React from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Text from '../components/typography/Text';

interface ISignUp {

}

function SignUp({ }: ISignUp): JSX.Element {
    return (
        <View>
            <Text >Sign UP screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default SignUp;