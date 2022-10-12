import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Text, { TextAlign } from '../components/typography/Text';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { setVerifiedSecret } from '../store/slices/mainSlice';
import SecretVerifyModal from '../components/SecretVerifyModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../shared/constants';

interface IHome {
    route: any,
}

type SecretVerifyInput = {
    secretVerify: string,
};

function Home({ route }: IHome): JSX.Element {
    const isSecretCreateFlow = route.params?.isSecretCreateFlow;
    const { secretPhrase, isSecretVerified } = useSelector((state: RootState) => state.mainReducer);
    const { control, handleSubmit, formState: { errors } } = useForm<SecretVerifyInput>();
    const [isSecretWrong, setIsSecretWrong] = useState<boolean>(false);
    const dispatch = useDispatch();
    const showSecretVerifyModal = !isSecretCreateFlow && secretPhrase && !isSecretVerified;

    //AsyncStorage.setItem('secretPhrase', '');

    function onSecretVerify(data: SecretVerifyInput) {
        if (secretPhrase === data.secretVerify.trim()) {
            console.log('matches');
            setIsSecretWrong(false);
            dispatch(setVerifiedSecret(true));
        } else {
            setIsSecretWrong(true);
        }
    }

    return (
        <View>
            <Text >HOME screen</Text>
            {showSecretVerifyModal && (
                <SecretVerifyModal isVisible={!isSecretVerified}>
                    <View style={styles.formWrapper}>
                        <Text color={COLORS.darkgray} align={TextAlign.Center}>Please enter the secret phrase for your account.</Text>
                        <View style={{ marginTop: 15 }} >
                            <Controller control={control} render={() => (
                                <Input name="secretVerify" control={control} error={isSecretWrong ? "Wrong secret phrase" : ""} />
                            )}
                                name="secretVerify"
                                rules={{ required: true }}
                            />
                            <Button label="Continue" onPress={handleSubmit(onSecretVerify)} style={{ marginTop: 15 }} />
                        </View>

                    </View>
                </SecretVerifyModal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    formWrapper: {
        width: '100%',
        padding: 15,
    }
});

export default Home;