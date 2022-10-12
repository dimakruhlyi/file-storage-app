import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { SCREEN } from '../navigation/constants';
import { addSecretPhrase } from '../store/slices/mainSlice';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Text from '../components/typography/Text';
import { COLORS } from '../shared/constants';

interface ISecretPhrase {
    navigation: any;
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
        navigation.navigate(SCREEN.Home, {
            isSecretCreateFlow: true,
        });
    }

    function onError(errors: any) {
        console.log('errors:', errors);
    }

    return (
        <View style={styles.screenContainer}>
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
                <TouchableOpacity onPress={() => navigation.navigate(SCREEN.Home, {
                    isSecretCreateFlow: true,
                })}><Text color={COLORS.darkblue}>Skip</Text></TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    screenContainer: {
        paddingHorizontal: 20,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    formWrapper: {
        width: '100%',
        padding: 15,
    }
});

export default SecretPhrase;