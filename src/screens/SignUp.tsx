import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Text from '../components/typography/Text';
import { COLORS } from '../shared/constants';
import { SCREEN } from '../navigation/constants';

interface ISignUp {
    navigation: NavigationProp<any, any>;
}

type SignUpFormInputs = {
    login: string;
    password: string;
    repeatPassword: string;
};

function SignUp({ navigation }: ISignUp): JSX.Element {
    const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormInputs>();

    function onSubmit(data: SignUpFormInputs) {
        console.log(JSON.stringify(data));
    }

    function onError(errors: any) {
        console.log('errors:', errors);
    }

    return (
        <ScrollView contentContainerStyle={styles.signUpContainer}>
            <View style={styles.formWrapper}>
                <Controller control={control} render={() => (
                    <Input name="login" label='Login' control={control} />
                )}
                    name="login"
                    rules={{ required: true }}
                />
                <Controller control={control} render={() => (
                    <Input name="password" label='Password' showContentVisibilityControl={true} control={control} />
                )}
                    name="password"
                    rules={{ required: true }}
                />
                <Controller control={control} render={() => (
                    <Input name="repeatPassword" label='Repeat password' showContentVisibilityControl={true} control={control} />
                )}
                    name="repeatPassword"
                    rules={{ required: true }}
                />
                <View style={styles.infoBlock}>
                    <Text size={18} color={COLORS.darkgray}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate(SCREEN.SignIn)}><Text color={COLORS.darkblue}>Sign in</Text></TouchableOpacity>
                </View>
                <Button label="Sign up" onPress={handleSubmit(onSubmit, onError)} style={{ marginTop: 15 }} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    signUpContainer: {
        paddingHorizontal: 20,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoBlock: {
        alignItems: 'center',
        marginTop: 5,
    },
    formWrapper: {
        width: '100%',
    }
});

export default SignUp;