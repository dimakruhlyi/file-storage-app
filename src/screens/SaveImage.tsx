import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { addImageData } from '../store/slices/imageSlice';
import { SCREEN } from '../navigation/constants';
import Text, { FontWeights, TextAlign } from '../components/typography/Text';
import { COLORS } from '../shared/constants';
import { screenContainer } from '../shared/baseStyle';
import Iconm from '../components/ui/Iconm';
import { API } from '../services/api.service';
import { v4 as uuidv4 } from 'uuid';

interface ISaveImage {
  navigation: NavigationProp<any, any>;
}

export type ImageType = ImageOrVideo & {
  id: string;
};

const v4options = {
  random: [
    0x10, 0x91, 0x56, 0xbe, 0xc4, 0xfb, 0xc1, 0xea, 0x71, 0xb4, 0xef, 0xe1, 0x67, 0x1c, 0x58, 0x36,
  ],
};

function SaveImage({ navigation }: ISaveImage): JSX.Element {
  const dispatch = useTypedDispatch();
  const { imageData } = useTypedSelector(state => state.imageReducer);
  const [images, setImages] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getImages();
  }, []);

  async function getImages() {
    try {
      setIsLoading(true);
      const images = await API.getImages('images');
      console.log('images GET:', images.data);
      setImages(images.data);
    } catch (err) {
      console.log('getImages error:', err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSelectImagePress() {
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    });
    console.log('+++++++++++image Picker:', JSON.stringify(image));
    try {
      setIsLoading(true);
      const respose = await API.addImage('images', { id: uuidv4(v4options), ...image });
      console.log('respose:', respose.data);
      setImages(prev => ([...prev, respose.data]))
      dispatch(addImageData(image));
    } catch (err) {
      console.log('onSelectImagePress error:', err);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
   
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
      {images && images.length > 0 && (
        <View style={styles.savedImagesContainer}>
          <Text weight={FontWeights.Bold} size={20} align={TextAlign.Center}>
            Your saved images are shown below.
          </Text>
          <View style={styles.savedImagesBlock}>
            {images.map(image => (
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
