import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text, { FontWeights, TextAlign } from './typography/Text';
import Modal from './ui/Modal';

interface ITextModal {
  title: string;
  description: string;
  isVisible: boolean;
  onVisibilityChange: (data: boolean) => void;
}

function TextModal(props: ITextModal): JSX.Element {
  const { title, description, isVisible, onVisibilityChange } = props;

  return (
    <Modal isVisible={isVisible} onVisibilityChange={onVisibilityChange}>
      <View style={styles.modalContainer}>
        <Text size={20} weight={FontWeights.Bold} align={TextAlign.Center}>
          {title}
        </Text>
        <Text align={TextAlign.Center} style={{ marginTop: 10 }}>
          {description}
        </Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default TextModal;
