import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View, StatusBar, Button, Dimensions, SafeAreaView, Switch, TouchableOpacity, ScrollView } from 'react-native'
import { AntDesign, Feather } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext, LocalizationContext } from '../../../../components/context'
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window')
const General = () => {
    const { t, locale, setLocale } = React.useContext(LocalizationContext);
    const { toggleTheme } = React.useContext(ThemeContext);

    const theme = useTheme();
    var colorScheme
    if (theme.dark) {
        colorScheme = 'dark';
    } else {
        colorScheme = 'light';
    }
    const [isDark, setIsDark] = useState(colorScheme === 'light' ? false : true);
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;




    const navigation = useNavigation();
    const [toggleSaveSorting, setToggleSaveSorting] = useState(false)
    const [toggleMatureContent, setToggleMatureContent] = useState(false)
    const [toggleInfinityReading, setToggleInfinityReading] = useState(false)
    const [toggleLightCheckBox, setToggleLightCheckBox] = useState(false)
    const [toggleDarkCheckBox, setToggleDarkCheckBox] = useState(false)
    const [toggleSystemCheckBox, setToggleSystemCheckBox] = useState(false)
    const [toggleHKCheckBox, setToggleHKCheckBox] = useState(false)
    const [toggleENCheckBox, setToggleENCheckBox] = useState(false)

    const SaveInfo = () => {
        //save data to local Storage...
        navigation.goBack()
    }
    const fetchData = async () => {
        const SaveSortingOptions = await AsyncStorage.getItem('@SaveSortingOptions')
        const MatureContentFilter = await AsyncStorage.getItem('@MatureContentFilter')
        const InfinityReadingMode = await AsyncStorage.getItem('@InfinityReadingMode')
        const SystemAppearanceTheme = await AsyncStorage.getItem('@SystemAppearanceTheme')
        const SystemLanguage = await AsyncStorage.getItem('@SystemLanguage')
        if (SystemLanguage == "EN") {
            setToggleENCheckBox(true)
        }
        if (SystemLanguage == "HK") {
            setToggleHKCheckBox(true)
        }
        if (SaveSortingOptions == "true") {
            setToggleSaveSorting(true)
        } else {
            setToggleSaveSorting(false)
        }
        if (MatureContentFilter == "true") {
            setToggleMatureContent(true)
        } else {
            setToggleMatureContent(false)
        }
        if (InfinityReadingMode == "true") {
            setToggleInfinityReading(true)
        } else {
            setToggleInfinityReading(false)
        }
        if (SystemAppearanceTheme == "light") {
            setToggleLightCheckBox(true)
            setToggleDarkCheckBox(false)
            setToggleSystemCheckBox(false)
        } else if (SystemAppearanceTheme == "dark") {
            setToggleLightCheckBox(false)
            setToggleDarkCheckBox(true)
            setToggleSystemCheckBox(false)
        } else if (SystemAppearanceTheme == "system") {
            setToggleLightCheckBox(false)
            setToggleDarkCheckBox(false)
            setToggleSystemCheckBox(true)
        }
    }
    fetchData()
    const renderPage = () => {
        return (
            <SafeAreaView style={themeContainerStyle}>
                <ScrollView>
                    <View style={{

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
                        }]}>{t('MorePage.general')}</Text>


                    </View>
                    <View>
                        <View>
                            <Text style={themeTextStyle}>{t('MorePage.series')}</Text>
                            <View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={themeTextStyle}>{t('MorePage.SaveSortingOptions')}</Text>
                                    </View>
                                    <Switch
                                        onValueChange={() => {
                                            setToggleSaveSorting(!toggleSaveSorting);
                                            if (toggleSaveSorting) {
                                                try {
                                                    AsyncStorage.setItem('@SaveSortingOptions', "false")
                                                } catch (e) {
                                                    // saving error
                                                }
                                            } else {
                                                try {
                                                    AsyncStorage.setItem('@SaveSortingOptions', "true")
                                                } catch (e) {
                                                    // saving error
                                                }
                                            }
                                        }}
                                        value={toggleSaveSorting}
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                    />
                                </View>
                                <Text style={[themeTextStyle, { padding: 15, top: -15 }]}>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={themeTextStyle}>{t('MorePage.episode')}</Text>
                            <View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Feather name="eye-off" size={24} color="white" style={{ paddingRight: 8, textAlignVertical: "center" }} />
                                        <Text style={themeTextStyle}>{t('MorePage.matureContentFilter')}</Text>
                                    </View>
                                    <Switch
                                        onValueChange={() => {
                                            setToggleMatureContent(!toggleMatureContent);
                                            if (toggleMatureContent) {
                                                try {
                                                    AsyncStorage.setItem('@MatureContentFilter', "false")
                                                } catch (e) {
                                                    // saving error
                                                }
                                            } else {
                                                try {
                                                    AsyncStorage.setItem('@MatureContentFilter', "true")
                                                } catch (e) {
                                                    // saving error
                                                }
                                            }
                                        }}
                                        value={toggleMatureContent}
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                    />
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                                    <View style={{ flexDirection: "row" }}>
                                        <Text style={themeTextStyle}>{t('MorePage.infinityReadingMode')}</Text>
                                    </View>
                                    <Switch
                                        onValueChange={() => {
                                            setToggleInfinityReading(!toggleInfinityReading);
                                            if (toggleInfinityReading) {
                                                try {
                                                    AsyncStorage.setItem('@InfinityReadingMode', "false")
                                                } catch (e) {
                                                    // saving error
                                                }
                                            } else {
                                                try {
                                                    AsyncStorage.setItem('@InfinityReadingMode', "true")
                                                } catch (e) {
                                                    // saving error
                                                }
                                            }
                                        }}
                                        value={toggleInfinityReading}
                                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                                        thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                                        ios_backgroundColor="#3e3e3e"
                                    />
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={themeTextStyle}>{t('MorePage.display')}</Text>
                            <View>
                                <View style={{ justifyContent: "space-between", padding: 10, width: width }}>
                                    <Text style={themeTextStyle}>{t('MorePage.systemAppearance')}</Text>
                                    <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
                                        <Text style={themeTextStyle}>{t('MorePage.lightTheme')}</Text>
                                        <CheckBox
                                            tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                                            tintColor={"#C4C4C4"}
                                            onTintColor={"#FCAE24"}
                                            disabled={toggleLightCheckBox}
                                            value={toggleLightCheckBox}
                                            onValueChange={() => {
                                                setToggleLightCheckBox(!toggleLightCheckBox);
                                                setToggleDarkCheckBox(false);
                                                setToggleSystemCheckBox(false);
                                                AsyncStorage.setItem('@SystemAppearanceTheme', "light")
                                                toggleTheme("light")
                                            }}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
                                        <Text style={themeTextStyle}>{t('MorePage.darkTheme')}</Text>
                                        <CheckBox
                                            tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                                            tintColor={"#C4C4C4"}
                                            onTintColor={"#FCAE24"}
                                            disabled={toggleDarkCheckBox}
                                            value={toggleDarkCheckBox}
                                            onValueChange={() => {
                                                setToggleDarkCheckBox(!toggleDarkCheckBox);
                                                setToggleLightCheckBox(false);
                                                setToggleSystemCheckBox(false);
                                                AsyncStorage.setItem('@SystemAppearanceTheme', "dark")
                                                toggleTheme("dark")
                                            }}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
                                        <Text style={themeTextStyle}>{t('MorePage.systemTheme')}</Text>
                                        <CheckBox
                                            tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                                            tintColor={"#C4C4C4"}
                                            onTintColor={"#FCAE24"}
                                            disabled={toggleSystemCheckBox}
                                            value={toggleSystemCheckBox}
                                            onValueChange={() => {
                                                setToggleSystemCheckBox(!toggleSystemCheckBox);
                                                setToggleLightCheckBox(false);
                                                setToggleDarkCheckBox(false);
                                                AsyncStorage.setItem('@SystemAppearanceTheme', "system")
                                                toggleTheme("system")
                                            }}
                                        />
                                    </View>
                                    <Text style={themeTextStyle}>Language</Text>
                                    <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
                                        <Text style={themeTextStyle}>English</Text>
                                        <CheckBox
                                            tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                                            tintColor={"#C4C4C4"}
                                            onTintColor={"#FCAE24"}
                                            disabled={false}
                                            value={toggleENCheckBox}
                                            onValueChange={() => {
                                                setToggleHKCheckBox(false);
                                                setToggleENCheckBox(true);
                                                AsyncStorage.setItem('@SystemLanguage', "EN")
                                                setLocale('EN')
                                            }}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row", padding: 20, justifyContent: "space-between" }}>
                                        <Text style={themeTextStyle}>中文</Text>
                                        <CheckBox
                                            tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                                            tintColor={"#C4C4C4"}
                                            onTintColor={"#FCAE24"}
                                            disabled={false}
                                            value={toggleHKCheckBox}
                                            onValueChange={() => {
                                                setToggleHKCheckBox(true);
                                                setToggleENCheckBox(false);

                                                AsyncStorage.setItem('@SystemLanguage', "HK")
                                                setLocale('HK')
                                            }}
                                        />
                                    </View>
                                    <View>

                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingBottom: 100 }}></View>
                </ScrollView>
            </SafeAreaView>
        )
    }
    return (
        renderPage()
    )
}

export default General

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
