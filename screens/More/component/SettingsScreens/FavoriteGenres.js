import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Pressable, Dimensions, SafeAreaView, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalizationContext } from '../../../../components/context'
const { width, height } = Dimensions.get('window')
const FavoriteGenres = () => {
    const theme = useTheme();
    const { t, locale, setLocale } = React.useContext(LocalizationContext);
    var colorScheme
    if (theme.dark) {
        colorScheme = 'dark';
    } else {
        colorScheme = 'light';
    }
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const navigation = useNavigation();

    const [toggleActionCheckBox, setToggleActionCheckBox] = useState(false)
    const [toggleXX1CheckBox, setToggleXX1CheckBox] = useState(false)
    const [toggleXX2CheckBox, setToggleXX2CheckBox] = useState(false)
    const [toggleXX3CheckBox, setToggleXX3CheckBox] = useState(false)
    const [toggleXX4CheckBox, setToggleXX4CheckBox] = useState(false)
    const [toggleXX5CheckBox, setToggleXX5CheckBox] = useState(false)
    const [toggleXX6CheckBox, setToggleXX6CheckBox] = useState(false)
    const [toggleXX7CheckBox, setToggleXX7CheckBox] = useState(false)
    const [toggleXX8CheckBox, setToggleXX8CheckBox] = useState(false)

    useEffect(() => {
        //fetch data

        fetchData()


    }, [])







    const fetchData = async () => {
        const ActionCheckBox = await AsyncStorage.getItem('@FavoriteAction')
        const XX1CheckBox = await AsyncStorage.getItem('@FavoriteXX1')
        const XX2CheckBox = await AsyncStorage.getItem('@FavoriteXX2')
        const XX3CheckBox = await AsyncStorage.getItem('@FavoriteXX3')
        const XX4CheckBox = await AsyncStorage.getItem('@FavoriteXX4')
        const XX5CheckBox = await AsyncStorage.getItem('@FavoriteXX5')
        const XX6CheckBox = await AsyncStorage.getItem('@FavoriteXX6')
        const XX7CheckBox = await AsyncStorage.getItem('@FavoriteXX7')
        const XX8CheckBox = await AsyncStorage.getItem('@FavoriteXX8')

        if (ActionCheckBox == "true") {
            setToggleActionCheckBox(true)
        } else {
            setToggleActionCheckBox(false)
        }
        if (XX1CheckBox == "true") {
            setToggleXX1CheckBox(true)
        } else {
            setToggleXX1CheckBox(false)
        }
        if (XX2CheckBox == "true") {
            setToggleXX2CheckBox(true)
        } else {
            setToggleXX2CheckBox(false)
        }
        if (XX3CheckBox == "true") {
            setToggleXX3CheckBox(true)
        } else {
            setToggleXX3CheckBox(false)
        }
        if (XX4CheckBox == "true") {
            setToggleXX4CheckBox(true)
        } else {
            setToggleXX4CheckBox(false)
        }
        if (XX5CheckBox == "true") {
            setToggleXX5CheckBox(true)
        } else {
            setToggleXX5CheckBox(false)
        }
        if (XX6CheckBox == "true") {
            setToggleXX6CheckBox(true)
        } else {
            setToggleXX6CheckBox(false)
        }
        if (XX7CheckBox == "true") {
            setToggleXX7CheckBox(true)
        } else {
            setToggleXX7CheckBox(false)
        }
        if (XX8CheckBox == "true") {
            setToggleXX8CheckBox(true)
        } else {
            setToggleXX8CheckBox(false)
        }

    }
    const SaveInfo = () => {

        //Upload info...
        //navigation.goBack()
    }
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
                }]}>{t('MorePage.favoriteGenres')}</Text>

            </View>
            <ScrollView>
                <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
                    <Text style={themeTextStyle}>Action</Text>
                    <CheckBox
                        tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                        tintColor={"#C4C4C4"}
                        onTintColor={"#FCAE24"}
                        disabled={false}
                        value={toggleActionCheckBox}
                        onValueChange={(newValue) => {
                            setToggleActionCheckBox(newValue);
                            if (toggleActionCheckBox) {
                                try {
                                    AsyncStorage.setItem('@FavoriteAction', "false")
                                } catch (e) {
                                    // saving error
                                }
                            } else {
                                try {
                                    AsyncStorage.setItem('@FavoriteAction', "true")
                                } catch (e) {
                                    // saving error
                                }
                            }
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
                    <Text style={themeTextStyle}>XX1</Text>
                    <CheckBox
                        tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                        tintColor={"#C4C4C4"}
                        onTintColor={"#FCAE24"}
                        disabled={false}
                        value={toggleXX1CheckBox}
                        onValueChange={(newValue) => {
                            setToggleXX1CheckBox(newValue);
                            if (toggleXX1CheckBox) {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX1', "false")
                                } catch (e) {
                                    // saving error
                                }
                            } else {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX1', "true")
                                } catch (e) {
                                    // saving error
                                }
                            }
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
                    <Text style={themeTextStyle}>XX2</Text>
                    <CheckBox
                        tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                        tintColor={"#C4C4C4"}
                        onTintColor={"#FCAE24"}
                        disabled={false}
                        value={toggleXX2CheckBox}
                        onValueChange={(newValue) => {
                            setToggleXX2CheckBox(newValue);
                            if (toggleXX2CheckBox) {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX2', "false")
                                } catch (e) {
                                    // saving error
                                }
                            } else {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX2', "true")
                                } catch (e) {
                                    // saving error
                                }
                            }
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
                    <Text style={themeTextStyle}>XX3</Text>
                    <CheckBox
                        tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                        tintColor={"#C4C4C4"}
                        onTintColor={"#FCAE24"}
                        disabled={false}
                        value={toggleXX3CheckBox}
                        onValueChange={(newValue) => {
                            setToggleXX3CheckBox(newValue);
                            if (toggleXX3CheckBox) {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX3', "false")
                                } catch (e) {
                                    // saving error
                                }
                            } else {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX3', "true")
                                } catch (e) {
                                    // saving error
                                }
                            }
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
                    <Text style={themeTextStyle}>XX4</Text>
                    <CheckBox
                        tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                        tintColor={"#C4C4C4"}
                        onTintColor={"#FCAE24"}
                        disabled={false}
                        value={toggleXX4CheckBox}
                        onValueChange={(newValue) => {
                            setToggleXX4CheckBox(newValue);
                            if (toggleXX4CheckBox) {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX4', "false")
                                } catch (e) {
                                    // saving error
                                }
                            } else {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX4', "true")
                                } catch (e) {
                                    // saving error
                                }
                            }
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
                    <Text style={themeTextStyle}>XX5</Text>
                    <CheckBox
                        tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                        tintColor={"#C4C4C4"}
                        onTintColor={"#FCAE24"}
                        disabled={false}
                        value={toggleXX5CheckBox}
                        onValueChange={(newValue) => {
                            setToggleXX5CheckBox(newValue);
                            if (toggleXX5CheckBox) {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX5', "false")
                                } catch (e) {
                                    // saving error
                                }
                            } else {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX5', "true")
                                } catch (e) {
                                    // saving error
                                }
                            }
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
                    <Text style={themeTextStyle}>XX6</Text>
                    <CheckBox
                        tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                        tintColor={"#C4C4C4"}
                        onTintColor={"#FCAE24"}
                        disabled={false}
                        value={toggleXX6CheckBox}
                        onValueChange={(newValue) => {
                            setToggleXX6CheckBox(newValue);
                            if (toggleXX6CheckBox) {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX6', "false")
                                } catch (e) {
                                    // saving error
                                }
                            } else {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX6', "true")
                                } catch (e) {
                                    // saving error
                                }
                            }
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
                    <Text style={themeTextStyle}>XX7</Text>
                    <CheckBox
                        tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                        tintColor={"#C4C4C4"}
                        onTintColor={"#FCAE24"}
                        disabled={false}
                        value={toggleXX7CheckBox}
                        onValueChange={(newValue) => {
                            setToggleXX7CheckBox(newValue);
                            if (toggleXX7CheckBox) {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX7', "false")
                                } catch (e) {
                                    // saving error
                                }
                            } else {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX7', "true")
                                } catch (e) {
                                    // saving error
                                }
                            }
                        }}
                    />
                </View>
                <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
                    <Text style={themeTextStyle}>XX8</Text>
                    <CheckBox
                        tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                        tintColor={"#C4C4C4"}
                        onTintColor={"#FCAE24"}
                        disabled={false}
                        value={toggleXX8CheckBox}
                        onValueChange={(newValue) => {
                            setToggleXX8CheckBox(newValue);
                            if (toggleXX8CheckBox) {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX8', "false")
                                } catch (e) {
                                    // saving error
                                }
                            } else {
                                try {
                                    AsyncStorage.setItem('@FavoriteXX8', "true")
                                } catch (e) {
                                    // saving error
                                }
                            }
                        }}
                    />
                </View>




            </ScrollView>
        </SafeAreaView>
    )
}

export default FavoriteGenres

const styles = StyleSheet.create({
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
