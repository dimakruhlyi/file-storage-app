import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Text from '../components/typography/Text';
import { COLORS } from '../shared/constants';
import { SCREEN } from '../navigation/constants';
import { AuthContext } from '../context/AuthProvider';
import {
  EMAIL_PATTERN,
  getFormValidationMessage,
} from '../settings/formValidation';
import TextModal from '../components/TextModal';

interface ISignUp {
  navigation: NavigationProp<any, any>;
}

type SignUpFormInputs = {
  login: string;
  userName: string;
  password: string;
  repeatPassword: string;
};

function SignUp({ navigation }: ISignUp): JSX.Element {
  const { control, handleSubmit, getValues } = useForm<SignUpFormInputs>();
  const { register, authError, setAuthError } = useContext(AuthContext);

  function onSubmit(data: SignUpFormInputs) {
    register(data.login, data.password, data.userName);
  }

  return (
    <ScrollView contentContainerStyle={styles.signUpContainer}>
      <View style={styles.formWrapper}>
        <Controller
          control={control}
          render={({ fieldState: { error } }) => (
            <Input
              name="login"
              label="Login*"
              control={control}
              error={error?.message || getFormValidationMessage(error?.type)}
            />
          )}
          name="login"
          rules={{
            required: true,
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Wrong Email format',
            },
          }}
        />
        <Controller
          control={control}
          render={({ fieldState: { error } }) => (
            <Input
              name="userName"
              label="Your Name*"
              error={error?.message || getFormValidationMessage(error?.type)}
              control={control}
            />
          )}
          name="userName"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ fieldState: { error } }) => (
            <Input
              name="password"
              label="Password*"
              showContentVisibilityControl={true}
              error={error?.message || getFormValidationMessage(error?.type)}
              control={control}
            />
          )}
          name="password"
          rules={{
            required: true,
            minLength: 3,
          }}
        />
        <Controller
          control={control}
          render={({ fieldState: { error } }) => (
            <Input
              name="repeatPassword"
              label="Repeat password*"
              showContentVisibilityControl={true}
              error={error?.message || getFormValidationMessage(error?.type)}
              control={control}
            />
          )}
          name="repeatPassword"
          rules={{
            required: true,
            validate: value =>
              value === getValues('password') || 'Password not matches',
          }}
        />
        <View style={styles.infoBlock}>
          <Text size={18} color={COLORS.darkgray}>
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(SCREEN.SignIn)}>
            <Text color={COLORS.darkblue}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <Button
          label="Sign up"
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 15 }}
        />
      </View>
      <TextModal
        title="Sign Up error"
        description={authError.toString()}
        isVisible={!!authError}
        onVisibilityChange={setAuthError}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  signUpContainer: {
    paddingHorizontal: 20,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBlock: {
    alignItems: 'center',
    marginTop: 5,
  },
  formWrapper: {
    width: '100%',
  },
});

export default SignUp;
