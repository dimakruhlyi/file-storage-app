import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import appTheme from './src/shared/appTheme';
import { AuthContext, AuthProvider, UserType } from './src/context/AuthProvider';
import { AuthNavigation, DrawerNavigation } from './src/navigation/NavigationStack';


const App = () => {
  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  function onAuthStateChanged(user: any) {
    console.log('user:', user);
    setUser(user as UserType);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer theme={appTheme}>
      {user ? (
        <DrawerNavigation />
      ) : (
        <AuthNavigation />
      )}
    </NavigationContainer>
  );
};

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);
