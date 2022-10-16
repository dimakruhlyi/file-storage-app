import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addImageData } from '../store/slices/imageSlice';
import { SCREEN } from '../navigation/constants';
import Button from '../components/ui/Button';
import Text, { FontWeights, TextAlign } from '../components/typography/Text';
import { COLORS } from '../shared/constants';
import { screenContainer } from '../shared/baseStyle';
import Iconm from '../components/ui/Iconm';

interface ISaveImage {
    navigation: NavigationProp<any, any>;
}



function SaveImage({ navigation }: ISaveImage): JSX.Element {
    const dispatch = useDispatch();
    const { imageData } = useSelector((state: RootState) => state.imageReducer);

    function onSelectImagePress() {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            console.log('image:', image);
            dispatch(addImageData(image));
        });
    }

    return (
        <ScrollView contentContainerStyle={screenContainer}>
            <Text align={TextAlign.Justify}>On this screen you can upload and save your images.</Text>
            <View style={styles.uploadBlock}>
                <TouchableOpacity style={styles.uploadImageArea} onPress={onSelectImagePress}>
                    <Iconm name="download" color={COLORS.gray} size={30} />
                </TouchableOpacity>
            </View>
            {imageData && imageData.length > 0 && (
                <View style={{ width: '100%', marginTop: 20 }}>
                    <Text weight={FontWeights.Bold} size={20} align={TextAlign.Center}>Your saved images are shown below.</Text>
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                        {imageData.map(image => (
                            <Image
                                source={{
                                    uri: image.path
                                }}
                                style={{ width: '45%', height: 150, borderRadius: 10, margin: 5 }}
                                key={image.modificationDate}
                            />
                        ))}
                    </View>
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    uploadBlock: {
        width: '100%',
        marginTop: 15
    },
    uploadImageArea: {
        width: '100%',
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.gray,
        borderStyle: 'dashed'
    }
});

export default SaveImage;