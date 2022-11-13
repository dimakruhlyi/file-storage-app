import React, { useState } from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Input from '../components/ui/Input';
import Text, { TextAlign } from './typography/Text';
import Button from './ui/Button';
import { COLORS } from '../shared/constants';
import { useTypedDispatch, useTypedSelector } from '../hooks/redux';
import { setVerifiedSecret } from '../store/slices/mainSlice';

interface ISecretVerifyModal {
  isVisible: boolean;
}

type SecretVerifyInput = {
  secretVerify: string;
};

function SecretVerifyModal({ isVisible }: ISecretVerifyModal): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SecretVerifyInput>();
  const { secretPhrase } = useTypedSelector(state => state.mainReducer);
  const [isSecretWrong, setIsSecretWrong] = useState<boolean>(false);
  const dispatch = useTypedDispatch();

  function onSecretVerify(data: SecretVerifyInput) {
    if (secretPhrase === data.secretVerify.trim()) {
      console.log('matches');
      setIsSecretWrong(false);
      dispatch(setVerifiedSecret(true));
    } else {
      setIsSecretWrong(true);
    }
  }

  return (
    <RNModal animationType="fade" transparent visible={isVisible}>
      <TouchableOpacity activeOpacity={1} style={styles.centeredView} disabled>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalView}
          onPress={e => e.stopPropagation()}>
          <View style={styles.formWrapper}>
            <Text color={COLORS.darkgray} align={TextAlign.Center}>
              Please enter the secret phrase for your account.
            </Text>
            <View style={{ marginTop: 15 }}>
              <Controller
                control={control}
                render={() => (
                  <Input
                    name="secretVerify"
                    control={control}
                    showContentVisibilityControl={true}
                    error={isSecretWrong ? 'Wrong secret phrase' : ''}
                  />
                )}
                name="secretVerify"
                rules={{ required: true }}
              />
              <Button
                label="Continue"
                onPress={handleSubmit(onSecretVerify)}
                style={{ marginTop: 15 }}
              />
            </View>
          </View>
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
  formWrapper: {
    width: '100%',
    padding: 15,
  },
});

export default SecretVerifyModal;
