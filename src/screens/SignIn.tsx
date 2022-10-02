import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Text from '../components/typography/Text';
import { COLORS } from '../shared/constants';
import { SCREEN } from '../navigation/constants';
import { AuthContext } from '../context/AuthProvider';

interface ISignIn {
    navigation: NavigationProp<any, any>;
}

type SignInFormInputs = {
    login: string;
    password: string;
};

function SignIn({ navigation }: ISignIn): JSX.Element {
    const { control, handleSubmit, formState: { errors } } = useForm<SignInFormInputs>();
    const { login } = useContext(AuthContext);

    function onSubmit(data: SignInFormInputs) {
        login(data.login, data.password);
        console.log(JSON.stringify(data));
    }

    function onError(errors: any) {
        console.log('errors:', errors);
    }

    return (
        <ScrollView contentContainerStyle={styles.signInContainer}>
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
                <View style={styles.infoBlock}>
                    <Text size={18} color={COLORS.darkgray}>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate(SCREEN.SignUp)}><Text color={COLORS.darkblue}>Sign up</Text></TouchableOpacity>
                </View>
                <Button label="Sign in" onPress={handleSubmit(onSubmit, onError)} style={{ marginTop: 15 }} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    signInContainer: {
        paddingHorizontal: 20,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoBlock: {
        alignItems: 'center',
        marginTop: 5,
    },
    formWrapper: {
        width: '100%',
    }
});

export default SignIn;