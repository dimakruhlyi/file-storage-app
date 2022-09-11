import React from 'react';
import { View, StyleSheet } from 'react-native';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Text from '../components/typography/Text';

interface IHome {

}

function Home({ }: IHome): JSX.Element {
    return (
        <View>
            <Text >HOME screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default Home;