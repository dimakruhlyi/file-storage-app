import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { NavigationProp } from '@react-navigation/native';
import { AuthContext } from '../context/AuthProvider';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Text, { FontWeights, TextAlign } from '../components/typography/Text';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { setVerifiedSecret } from '../store/slices/mainSlice';
import SecretVerifyModal from '../components/SecretVerifyModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../shared/constants';
import { SCREEN } from '../navigation/constants';
import { screenContainer } from '../shared/baseStyle';

interface IHome {
    route: any,
    navigation: NavigationProp<any, any>;
}

type SecretVerifyInput = {
    secretVerify: string,
};

function Home({ route, navigation }: IHome): JSX.Element {
    const isSecretCreateFlow = route.params?.isSecretCreateFlow;
    const { secretPhrase, isSecretVerified } = useSelector((state: RootState) => state.mainReducer);
    const { user } = useContext(AuthContext);
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

    function onSaveImagePress() {
        navigation.navigate(SCREEN.SaveImage);
    }

    function onSaveFilePress() {
        navigation.navigate(SCREEN.SaveFile);
    }

    return (
        <View style={screenContainer}>
            <View>
                <Text align={TextAlign.Center} weight={FontWeights.Bold}>Welcome dear, {user?.displayName || 'User'}!</Text>
                <Text align={TextAlign.Justify}>Here you can upload and save your images, videos and different files. To get started choose an option below.</Text>
                <Button label="Save image" onPress={onSaveImagePress} style={{ marginTop: 15 }} />
                <Button label="Save file" onPress={onSaveFilePress} style={{ marginTop: 15 }} />
            </View>
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