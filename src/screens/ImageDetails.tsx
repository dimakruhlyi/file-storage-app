import React from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { removeImage } from '../store/slices/imageSlice';
import Button, { ButtonTypes } from '../components/ui/Button';
import BottomContainer from '../components/BottomContainer';
import Text from '../components/typography/Text';
import { COLORS } from '../shared/constants';
import { screenContainer } from '../shared/baseStyle';
import { getImageName, formatBytes, formatDate } from '../settings/utils';

interface IImageDetails {
  navigation: NavigationProp<any, any>;
  route: any;
}

const windowWidth = Dimensions.get('window').width;

function ImageDetails({ navigation, route }: IImageDetails): JSX.Element {
  const dispatch = useDispatch();
  const { imageDetails } = route.params;

  function onRemovePressed() {
    dispatch(removeImage(imageDetails.modificationDate));
    navigation.goBack();
  }

  return (
    <ScrollView
      contentContainerStyle={[screenContainer, styles.screenAlignment]}>
      <View>
        <Image
          source={{
            uri: imageDetails.path,
          }}
          style={[styles.imageStyle, { height: imageDetails.height }]}
        />
        <View style={{ marginTop: 10 }}>
          <Text color={COLORS.darkblue} style={{ marginVertical: 5 }}>
            Name:{' '}
            <Text color={COLORS.primary}>{getImageName(imageDetails)}</Text>
          </Text>
          <Text color={COLORS.darkblue} style={{ marginVertical: 5 }}>
            Type: <Text color={COLORS.primary}>{imageDetails.mime}</Text>
          </Text>
          <Text color={COLORS.darkblue} style={{ marginVertical: 5 }}>
            Resolution:{' '}
            <Text
              color={
                COLORS.primary
              }>{`${imageDetails.width}x${imageDetails.height}`}</Text>
          </Text>
          <Text color={COLORS.darkblue} style={{ marginVertical: 5 }}>
            Size:{' '}
            <Text color={COLORS.primary}>{formatBytes(imageDetails.size)}</Text>
          </Text>
          <Text color={COLORS.darkblue} style={{ marginVertical: 5 }}>
            Modification date:{' '}
            <Text color={COLORS.primary}>
              {formatDate(new Date(+imageDetails.modificationDate))}
            </Text>
          </Text>
        </View>
      </View>
      <BottomContainer>
        <Button
          label="Remove item"
          onPress={onRemovePressed}
          type={ButtonTypes.Error}
          style={{ alignSelf: 'center' }}
        />
      </BottomContainer>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenAlignment: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  imageStyle: {
    width: windowWidth * 0.9,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default ImageDetails;
