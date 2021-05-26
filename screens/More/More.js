import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import MoreContent from './component/MoreContent'
const More = ({ navigation }) => {
    var colorScheme = useColorScheme();
    return (
        <MoreContent theme={colorScheme} navigation={navigation} />
    )
}

export default More


