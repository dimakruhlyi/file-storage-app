import React from 'react';
import { View } from 'react-native';
import Iconm from './src/components/ui/Iconm';
import Text, { FontWeights } from './src/components/typography/Text';

const App = () => {
  return (
    <View>
      <Text size={25} color="#ccc" weight={FontWeights.Light} >Storage Android app1</Text>
      <Iconm name="eye" color="red" size={30} />
    </View>
  );
};

export default App;
