import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SCREEN, NAVIGATION_STACK } from '../navigation/constants';
import { addSecretPhrase } from '../store/slices/mainSlice';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Text from '../components/typography/Text';
import { COLORS } from '../shared/constants';
import { screenContainer } from '../shared/baseStyle';

interface ISecretPhrase {
    navigation: NavigationProp<any, any>;
}

type SecretPhraseInput = {
    secretPhrase: string,
};

function SecretPhrase({ navigation }: ISecretPhrase): JSX.Element {
    const { control, handleSubmit, formState: { errors } } = useForm<SecretPhraseInput>();
    const dispatch = useDispatch();

    async function onSubmit(data: SecretPhraseInput) {
        await AsyncStorage.setItem('secretPhrase', data.secretPhrase);
        dispatch(addSecretPhrase(data.secretPhrase));
        onNavigateHome();
    }

    function onNavigateHome() {
        navigation.navigate(NAVIGATION_STACK.Main, {
            screen: SCREEN.Home,
            params: {
                isSecretCreateFlow: true,
            }
        });
    }

    function onError(errors: any) {
        console.log('errors:', errors);
    }

    return (
        <View style={screenContainer}>
            <Text color={COLORS.primary}>Please create the secret phrase for your account.</Text>
            <View style={styles.formWrapper}>
                <Controller control={control} render={() => (
                    <Input name="secretPhrase" control={control} />
                )}
                    name="secretPhrase"
                    rules={{ required: true }}
                />
                <Button label="Continue" onPress={handleSubmit(onSubmit, onError)} style={{ marginTop: 15 }} />
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text color={COLORS.black}>or</Text>
                <TouchableOpacity onPress={onNavigateHome}><Text color={COLORS.darkblue}>Skip</Text></TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    formWrapper: {
        width: '100%',
        padding: 15,
    }
});

export default SecretPhrase;