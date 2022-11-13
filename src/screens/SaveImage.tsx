import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { addImageData } from '../store/slices/imageSlice';
import { SCREEN } from '../navigation/constants';
import Text, { FontWeights, TextAlign } from '../components/typography/Text';
import { COLORS } from '../shared/constants';
import { screenContainer } from '../shared/baseStyle';
import Iconm from '../components/ui/Iconm';

interface ISaveImage {
  navigation: NavigationProp<any, any>;
}

function SaveImage({ navigation }: ISaveImage): JSX.Element {
  const dispatch = useTypedDispatch();
  const { imageData } = useTypedSelector(state => state.imageReducer);

  function onSelectImagePress() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      dispatch(addImageData(image));
    });
  }

  return (
    <ScrollView contentContainerStyle={screenContainer}>
      <Text align={TextAlign.Justify}>
        On this screen you can upload and save your images.
      </Text>
      <View style={styles.uploadBlock}>
        <TouchableOpacity
          style={styles.uploadImageArea}
          onPress={onSelectImagePress}>
          <Iconm name="download" color={COLORS.gray} size={30} />
        </TouchableOpacity>
      </View>
      {imageData && imageData.length > 0 && (
        <View style={styles.savedImagesContainer}>
          <Text weight={FontWeights.Bold} size={20} align={TextAlign.Center}>
            Your saved images are shown below.
          </Text>
          <View style={styles.savedImagesBlock}>
            {imageData.map(image => (
              <TouchableOpacity
                style={styles.imageItem}
                onPress={() =>
                  navigation.navigate(SCREEN.ImageDetails, {
                    imageDetails: image,
                  })
                }
                key={image.modificationDate}>
                <Image
                  source={{
                    uri: image.path,
                  }}
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
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
    marginTop: 15,
  },
  uploadImageArea: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.gray,
    borderStyle: 'dashed',
  },
  savedImagesContainer: {
    width: '100%',
    marginTop: 20,
  },
  savedImagesBlock: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  imageItem: {
    width: '45%',
    margin: 5,
  },
  imageStyle: {
    height: 150,
    borderRadius: 10,
  },
});

export default SaveImage;
