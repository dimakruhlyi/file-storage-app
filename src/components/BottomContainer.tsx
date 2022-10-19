import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface IBottomContainer {
  children: ReactNode;
}

function BottomContainer(props: IBottomContainer): JSX.Element {
  const { children } = props;
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default BottomContainer;