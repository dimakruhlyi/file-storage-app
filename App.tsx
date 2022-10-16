import React, { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider, useDispatch } from 'react-redux';
import { store } from './src/store';
import { addSecretPhrase } from './src/store/slices/mainSlice';
import appTheme from './src/shared/appTheme';
import { AuthContext, AuthProvider } from './src/context/AuthProvider';
import { AuthNavigation, DrawerNavigation } from './src/navigation/NavigationStack';
import { COLORS } from './src/shared/constants';


const App = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState<boolean>(true);
  const [isAppLoading, setIsAppLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getSecretPhrase();
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  async function getSecretPhrase() {
    const secretPhrase = await AsyncStorage.getItem('secretPhrase');
    dispatch(addSecretPhrase(secretPhrase || ''));
    setIsAppLoading(false);
  }

  function onAuthStateChanged(user: any) {
    console.log('user:', user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  if (initializing) return null;

  return (
    <NavigationContainer theme={appTheme}>
      {isAppLoading ?
        (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={COLORS.darkblue} />
          </View>
        )
        : user ? (
          <DrawerNavigation />
        ) : (
          <AuthNavigation />
        )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default () => (
  <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
);
