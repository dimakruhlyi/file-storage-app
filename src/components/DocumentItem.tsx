import React from 'react';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import Text, { TextAlign } from './typography/Text';

interface IDocumentItem {
  name: string | null;
  type: string | null;
  onFilePress: () => void;
}

function DocumentItem(props: IDocumentItem): JSX.Element {
  const { name, type, onFilePress } = props;
  return (
    <TouchableOpacity onPress={onFilePress} style={styles.documentContainer}>
      <Image
        source={require('../../assets/images/files/pdf.png')}
        style={styles.imageStyle}
      />
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
});

export default DocumentItem;
