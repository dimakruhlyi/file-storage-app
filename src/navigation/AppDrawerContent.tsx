import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthProvider';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import Text, { FontWeights, TextAlign } from '../components/typography/Text';
import { COLORS } from '../shared/constants';
import { DRAWER_SCREEN_LIST } from './constants';
import Iconm from '../components/ui/Iconm';


function AppDrawerContent({ navigation }: DrawerContentComponentProps) {
    const { logout } = useContext(AuthContext);

    return (
        <View style={styles.drawerContainer}>
            <View>
                {DRAWER_SCREEN_LIST.map((item, index) => (
                    <TouchableOpacity onPress={() => navigation.navigate(item.value)} key={index} style={{ paddingVertical: 5 }}>
                        <Text weight={FontWeights.Bold} color={COLORS.darkgray}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TouchableOpacity onPress={logout} style={styles.logoutBlock}>
                <Text weight={FontWeights.Bold} color={COLORS.gray} align={TextAlign.Center}>Log out</Text>
                <Iconm name="exit" color={COLORS.gray} size={15} style={styles.logoutIcon} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        flex: 1,
        justifyContent: 'space-between'
    },
    logoutBlock: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    logoutIcon: {
        marginTop: 5,
        marginLeft: 5
    }
});

export default AppDrawerContent;