import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
const TshirtsScreen = () => {
    const navigation = useNavigation();
    return (
        <View>
            <Text>TshirtsScreen</Text>
        </View>
    )
}

export default TshirtsScreen

const styles = StyleSheet.create({})
