import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SCREEN } from '../navigation/constants';
import { addSecretPhrase } from '../store/slices/mainSlice';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Text from '../components/typography/Text';
import { COLORS } from '../shared/constants';

interface IHome {

}

type SecretPhraseInput = {
    secretPhrase: string,
};

function SecretPhrase({ }: IHome): JSX.Element {
    const { control, handleSubmit, formState: { errors } } = useForm<SecretPhraseInput>();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    async function onSubmit(data: SecretPhraseInput) {
        await AsyncStorage.setItem('secretPhrase', data.secretPhrase);
        dispatch(addSecretPhrase(data.secretPhrase));
        navigation.navigate(SCREEN.Home as never);
    }

    function onError(errors: any) {
        console.log('errors:', errors);
    }

    return (
        <View style={styles.screenContainer}>
            <Text color={COLORS.primary}>Please enter the secret phrase for your account.</Text>
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
                <TouchableOpacity onPress={() => navigation.navigate(SCREEN.Home as never)}><Text color={COLORS.darkblue}>Skip</Text></TouchableOpacity>
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