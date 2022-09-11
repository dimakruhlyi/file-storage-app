import React from 'react';
import { Modal as RNModal, StyleSheet, TouchableOpacity } from 'react-native';
import Iconm from './Iconm';
import { COLORS } from '../../shared/constants';

interface IModal {
  isVisible: boolean;
  onVisibilityChange: (visible: boolean) => void;
  children: React.ReactNode;
}

function Modal({
  isVisible,
  onVisibilityChange,
  children,
}: IModal): JSX.Element {
  return (
    <RNModal animationType="fade" transparent visible={isVisible}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.centeredView}
        onPress={() => onVisibilityChange(!isVisible)}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalView}
          onPress={e => e.stopPropagation()}>
          <TouchableOpacity
            style={styles.closeModalControl}
            onPress={() => onVisibilityChange(!isVisible)}>
            <Iconm name="close" size={18} color={COLORS.darkgray} />
          </TouchableOpacity>
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeModalControl: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    padding: 5,
  },
});

export default Modal;
