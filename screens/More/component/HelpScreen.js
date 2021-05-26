import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { dummyImage } from '../../../data/Data'
import { useNavigation } from '@react-navigation/native';
let userIcon = dummyImage;
let PointsIcon = dummyImage;
const { width, height } = Dimensions.get('window')
const HelpScreen = () => {
    const navigation = useNavigation();
    const theme = useTheme();
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
                }]}>Help</Text>
            </View>
            <SearchBar
                placeholder="Type Here..."


            />

            <View style={{ borderBottomColor: "gray", borderBottomWidth: 1 }}>




                <TouchableOpacity style={{


                    alignItems: 'center'
                }}>
                    <Text style={[themeTextStyle, { padding: 50 }]}>Q1</Text>


                </TouchableOpacity>

                <TouchableOpacity style={{


                    alignItems: 'center'
                }}>
                    <Text style={[themeTextStyle, { padding: 50 }]}>Q2</Text>


                </TouchableOpacity>

                <TouchableOpacity style={{



                    alignItems: 'center'
                }}>
                    <Text style={[themeTextStyle, { padding: 50 }]}>Q3</Text>


                </TouchableOpacity>







            </View>




        </SafeAreaView>
    )
}

export default HelpScreen

const styles = StyleSheet.create({
    lightContainer: {
        backgroundColor: 'white',

        height: height,
    },
    darkContainer: {
        backgroundColor: '#303030',

        height: height,
    },
    lightThemeText: {
        color: 'black',
        lineHeight: 30,
        fontSize: 15
    },
    darkThemeText: {
        color: 'white',
        lineHeight: 30,
        fontSize: 15
    },
})
