import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppDrawerContent from './AppDrawerContent';
import { SCREEN } from './constants';
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';

const Drawer = createDrawerNavigator();
const AuthStack = createNativeStackNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={() => <AppDrawerContent />}>
      <Drawer.Screen name={SCREEN.Home} component={Home} />
    </Drawer.Navigator>
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
