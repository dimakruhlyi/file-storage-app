import React, { useState } from 'react';
import { View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import appTheme from './src/shared/appTheme';
import { SCREEN } from './src/navigation/constants';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import Home from './src/screens/Home';

const Drawer = createDrawerNavigator();
const AuthStack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer theme={appTheme}>
      {false ? (
        <Drawer.Navigator>
          <Drawer.Screen name={SCREEN.Home} component={Home} />
        </Drawer.Navigator>
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Group screenOptions={{
            headerShown: false
          }}>
            <AuthStack.Screen name={SCREEN.SignIn} component={SignIn} />
            <AuthStack.Screen name={SCREEN.SignUp} component={SignUp} />
          </AuthStack.Group>
        </AuthStack.Navigator>
      )}

    </NavigationContainer>

  );
};

export default App;
