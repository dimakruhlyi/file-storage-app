import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import AppDrawerContent from './AppDrawerContent';
import { SCREEN, NAVIGATION_STACK } from './constants';
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import SecretPhrase from '../screens/SecretPhrase';

const Drawer = createDrawerNavigator();
const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={NAVIGATION_STACK.Main}
      drawerContent={() => <AppDrawerContent />}>
      <Drawer.Screen name={NAVIGATION_STACK.Main} component={MainStackNavigation} options={{ drawerItemStyle: { display: 'none' } }} />
    </Drawer.Navigator>
  );
}


function MainStackNavigation() {
  const { secretPhrase } = useSelector((state: RootState) => state.mainReducer);
  return (
    <MainStack.Navigator initialRouteName={SCREEN.SecretPhrase}>
      <AuthStack.Group screenOptions={{
        headerShown: false
      }}>
        {/*TODO: hide drawer content on SecretPhrase screen */}
        {!secretPhrase && (
          <MainStack.Screen name={SCREEN.SecretPhrase} component={SecretPhrase} />
        )}
        <MainStack.Screen name={SCREEN.Home} component={Home} />
      </AuthStack.Group>

    </MainStack.Navigator>
  );
}

function AuthNavigation() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Group screenOptions={{
        headerShown: false
      }}>
        <AuthStack.Screen name={SCREEN.SignIn} component={SignIn} />
        <AuthStack.Screen name={SCREEN.SignUp} component={SignUp} />
      </AuthStack.Group>
    </AuthStack.Navigator>
  );
}

export { DrawerNavigation, AuthNavigation };
