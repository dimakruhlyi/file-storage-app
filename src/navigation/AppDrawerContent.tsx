import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthProvider';
import Text, { FontWeights, TextAlign } from '../components/typography/Text';
import { COLORS } from '../shared/constants';


function AppDrawerContent() {
    const { logout } = useContext(AuthContext);

    return (
        <View style={styles.drawerContainer}>
            <TouchableOpacity onPress={logout}>
                <Text weight={FontWeights.Bold} color={COLORS.black} align={TextAlign.Center}>Log out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        padding: 10,
        flex: 1,
        justifyContent: 'flex-end'
    }
});

export default AppDrawerContent;