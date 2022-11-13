import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { AuthContext } from '../context/AuthProvider';
import Button from '../components/ui/Button';
import Text, { FontWeights, TextAlign } from '../components/typography/Text';
import { useTypedSelector } from '../hooks/redux';
import SecretVerifyModal from '../components/SecretVerifyModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCREEN } from '../navigation/constants';
import { screenContainer } from '../shared/baseStyle';

interface IHome {
    route: any,
    navigation: NavigationProp<any, any>;
}



function Home({ route, navigation }: IHome): JSX.Element {
    const isSecretCreateFlow = route.params?.isSecretCreateFlow;
    const { secretPhrase, isSecretVerified } = useTypedSelector(state => state.mainReducer);
    const { user } = useContext(AuthContext);
    const showSecretVerifyModal = !isSecretCreateFlow && secretPhrase && !isSecretVerified;

    //AsyncStorage.setItem('secretPhrase', '');

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
                <SecretVerifyModal isVisible={!isSecretVerified} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
   
});

export default Home;