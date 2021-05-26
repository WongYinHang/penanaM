import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image, SafeAreaView, Dimensions, TouchableOpacity, TextInput, Button } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { dummyImage } from '../../../data/Data'
let userIcon = dummyImage;
let PointsIcon = dummyImage;
const { width, height } = Dimensions.get('window')
const PromoCodeScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    var colorScheme
    if (theme.dark) {
        colorScheme = 'dark';
    } else {
        colorScheme = 'light';
    }
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    return (
        <SafeAreaView style={themeContainerStyle}>

            <View style={{
                marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                height: 60,
                display: 'flex',
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                width: width
            }}>
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={[themeContainerStyle, { height: 50 }]}>
                    <AntDesign name="arrowleft" size={24}

                        style={[themeTextStyle, {

                            borderTopColor: "black",
                            borderTopWidth: 1,
                            borderBottomColor: "black",
                            borderBottomWidth: 1,
                            height: 50,
                            paddingLeft: 10,
                            textAlignVertical: "center"
                        }]} />
                </TouchableOpacity>
                <Text style={[themeTextStyle, {

                    flex: 1,
                    paddingLeft: 20,
                    fontSize: 18,
                    borderTopColor: "black",
                    height: 50,
                    borderTopWidth: 1,
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    textAlignVertical: "center"
                }]}>Promo code</Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", borderBottomColor: "gray", borderBottomWidth: 1 }}>
                <Image source={userIcon} style={{ width: 60, height: 60, margin: 20, borderRadius: 50 }} />
                <View style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-start"
                }}>
                    <Text style={themeTextStyle}>User Name</Text>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>

                        <Text style={themeTextStyle}>
                            <Image source={PointsIcon} style={{ width: 10, height: 10, }} />
                        User Points
                    </Text>

                    </View>

                </View>

            </View>

            <View style={{ display: "flex", flex: 1, borderBottomColor: "gray", borderBottomWidth: 1 }}>





                <View style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: 'center'
                }}>
                    <View style={{

                        alignItems: 'center'
                    }}>
                        <TextInput style={[styles.input, themeTextStyle]}
                            placeholder="Placeholder"
                            keyboardType="numeric" />
                        <Button

                            title="Submit"
                        />
                    </View>


                </View>









            </View>




        </SafeAreaView>
    )
}

export default PromoCodeScreen

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        width: width * 0.9,

    },
    lightContainer: {
        backgroundColor: 'white',

        height: height
    },
    darkContainer: {
        backgroundColor: '#303030',

        height: height
    },
    lightThemeText: {
        color: 'black',

    },
    darkThemeText: {
        color: 'white',

    },
})

