import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { COLORS } from '../shared/constants';
import Text, { TextAlign } from './typography/Text';
import { useDispatch } from 'react-redux';
import { removeFile } from '../store/slices/fileSlice';
import Iconm from './ui/Iconm';
import { getFileImage } from '../settings/fileTypes';

interface IDocumentItem {
  name: string | null;
  type: string | null;
  onFilePress: () => void;
}

function DocumentItem(props: IDocumentItem): JSX.Element {
  const { name, type, onFilePress } = props;
  const dispatch = useDispatch();

  function onRemovePress(): void {
    dispatch(removeFile(name!));
  }

  return (
    <TouchableOpacity onPress={onFilePress} style={styles.documentContainer}>
      <TouchableOpacity
        style={styles.removeFileControl}
        onPress={onRemovePress}>
        <Iconm name="close" size={16} color={COLORS.darkgray} />
      </TouchableOpacity>
      <Image source={getFileImage(type!)} style={styles.imageStyle} />
      <Text size={16} align={TextAlign.Center} style={{ marginTop: 5 }}>
        {name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  documentContainer: {
    padding: 5,
    width: 100,
    alignItems: 'center',
  },
  imageStyle: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
  removeFileControl: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 2,
  },
});

export default DocumentItem;
