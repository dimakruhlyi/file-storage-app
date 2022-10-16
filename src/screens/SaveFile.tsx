import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { SCREEN } from '../navigation/constants';
import { addSecretPhrase } from '../store/slices/mainSlice';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Text from '../components/typography/Text';
import { COLORS } from '../shared/constants';
import { screenContainer } from '../shared/baseStyle';

interface ISaveFile {
    navigation: NavigationProp<any, any>;
}



function SaveFile({ navigation }: ISaveFile): JSX.Element {
    const dispatch = useDispatch();

    return (
        <View style={screenContainer}>
            <Text color={COLORS.primary}>SaveFile screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default SaveFile;