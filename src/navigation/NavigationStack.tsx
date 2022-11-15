import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import AppDrawerContent from './AppDrawerContent';
import { SCREEN, NAVIGATION_STACK } from './constants';
import { NavigationProp } from '@react-navigation/native';
import { COLORS } from '../shared/constants';
import { useTypedSelector } from '../hooks/redux';
import Iconm from '../components/ui/Iconm';
import Home from '../screens/Home';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import SecretPhrase from '../screens/SecretPhrase';
import SaveImage from '../screens/SaveImage';
import SaveFile from '../screens/SaveFile';
import ImageDetails from '../screens/ImageDetails';

const Drawer = createDrawerNavigator();
const MainStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={SCREEN.SecretPhrase}
      drawerContent={props => <AppDrawerContent {...props} />}>
      <Drawer.Screen name={NAVIGATION_STACK.Main} component={MainStackNavigation} />
    </Drawer.Navigator>
  );
}

const MainStackOptions = (navigation: NavigationProp<any, any>) => {
  const onBackButtonPress = () => {
    navigation.goBack();
    navigation.reset({
      index: 0,
      routes: [{ name: SCREEN.Home }],
    });
  };

  // console.log('navigation:', navigation);

  return {
    headerTitle: () => null,
    headerLeft: () => (
      <TouchableOpacity onPress={onBackButtonPress}>
        <Iconm name="back" color={COLORS.darkblue} size={20} />
      </TouchableOpacity>
    ),
    headerStyle: {
      backgroundColor: COLORS.white,
    },
    headerBackVisible: false,
    animation: 'none',
  };
};


function MainStackNavigation({ navigation }: { navigation: NavigationProp<any, any>; }) {
  const { secretPhrase } = useTypedSelector(state => state.mainReducer)
  return (
    <MainStack.Navigator>
      <MainStack.Group screenOptions={{
        headerShown: false,
      }}>
        {/*ToDo: hide drawer on the screen */}
        {!secretPhrase && (
          <MainStack.Screen name={SCREEN.SecretPhrase} component={SecretPhrase} />
        )}
        <MainStack.Screen name={SCREEN.Home} component={Home} />
      </MainStack.Group>
      <MainStack.Group screenOptions={MainStackOptions(navigation) as NativeStackNavigationOptions}>
        <MainStack.Screen name={SCREEN.SaveImage} component={SaveImage} />
        <MainStack.Screen name={SCREEN.ImageDetails} component={ImageDetails} />
        <MainStack.Screen name={SCREEN.SaveFile} component={SaveFile} />
      </MainStack.Group>
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
