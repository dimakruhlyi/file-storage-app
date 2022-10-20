import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Input from '../components/ui/Input';
import Text, { TextAlign } from './typography/Text';
import Button from './ui/Button';
import Modal from './ui/Modal';

interface IFilePasswordModal {
  isVisible: boolean;
  labelText: string;
  isPasswordWrong?: boolean;
  onVisibilityChange: (value: boolean) => void;
  onFormSubmit: (data: FilePasswordInput) => void;
}

export type FilePasswordInput = {
  filePassword: string;
};

function FilePasswordModal({
  isVisible,
  labelText,
  isPasswordWrong = false,
  onVisibilityChange,
  onFormSubmit,
}: IFilePasswordModal): JSX.Element {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilePasswordInput>();

  return (
    <Modal isVisible={isVisible} onVisibilityChange={onVisibilityChange}>
      <View style={{ padding: 20 }}>
        <Text>{labelText}</Text>
        <View style={{ marginTop: 15 }}>
          <Controller
            control={control}
            render={() => (
              <Input
                name="filePassword"
                showContentVisibilityControl={true}
                control={control}
                error={isPasswordWrong ? 'Your password is wrong' : ''}
              />
            )}
            name="filePassword"
            rules={{ required: false }}
          />
          <Button
            label="Continue"
            onPress={handleSubmit(data => {
              onFormSubmit(data);
              reset({
                filePassword: '',
              });
            })}
            style={{ marginTop: 15 }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});

export default FilePasswordModal;
