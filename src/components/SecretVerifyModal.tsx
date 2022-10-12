import React from 'react';
import { Modal as RNModal, StyleSheet, TouchableOpacity } from 'react-native';
import Iconm from './ui/Iconm';
import { COLORS } from '../shared/constants';

interface ISecretVerifyModal {
    isVisible: boolean;
    children: React.ReactNode;
}

function SecretVerifyModal({
    isVisible,
    children,
}: ISecretVerifyModal): JSX.Element {
    return (
        <RNModal animationType="fade" transparent visible={isVisible}>
            <TouchableOpacity
                activeOpacity={1}
                style={styles.centeredView}
                disabled>
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.modalView}
                    onPress={e => e.stopPropagation()}>
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
});

export default SecretVerifyModal;
