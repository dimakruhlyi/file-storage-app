import React, { useContext } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Text from '../components/typography/Text';
import TextModal from '../components/TextModal';
import { COLORS } from '../shared/constants';
import { SCREEN } from '../navigation/constants';
import { AuthContext } from '../context/AuthProvider';
import {
  getFormValidationMessage,
  EMAIL_PATTERN,
} from '../settings/formValidation';

interface ISignIn {
  navigation: NavigationProp<any, any>;
}

type SignInFormInputs = {
  login: string;
  password: string;
};

function SignIn({ navigation }: ISignIn): JSX.Element {
  const { control, handleSubmit } = useForm<SignInFormInputs>();
  const { login, authError, setAuthError } = useContext(AuthContext);

  function onSubmit(data: SignInFormInputs) {
    login(data.login, data.password);
  }

  return (
    <ScrollView contentContainerStyle={styles.signInContainer}>
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
        <View style={styles.infoBlock}>
          <Text size={18} color={COLORS.darkgray}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate(SCREEN.SignUp)}>
            <Text color={COLORS.darkblue}>Sign up</Text>
          </TouchableOpacity>
        </View>
        <Button
          label="Sign in"
          onPress={handleSubmit(onSubmit)}
          style={{ marginTop: 15 }}
        />
      </View>
      <TextModal
        title="Login error"
        description={authError.toString()}
        isVisible={!!authError}
        onVisibilityChange={setAuthError}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  signInContainer: {
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

export default SignIn;
