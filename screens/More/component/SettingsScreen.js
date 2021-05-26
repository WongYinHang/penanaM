import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, SafeAreaView, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { dummyImage } from '../../../data/Data'
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { AntDesign } from '@expo/vector-icons';
import { LocalizationContext, AuthContext } from '../../../components/context'

const { width, height } = Dimensions.get('window')

let PointsIcon = dummyImage;
const SettingsScreen = () => {
    const navigation = useNavigation();
    const { t } = React.useContext(LocalizationContext);
    const { toggleLogin, checkLoggedIn } = React.useContext(AuthContext);
    const theme = useTheme();
    var colorScheme
    if (theme.dark) {
        colorScheme = 'dark';
    } else {
        colorScheme = 'light';
    }

    const [loggedIn, setLoggedIn] = useState(checkLoggedIn())
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

    const navigator = (navigationPage) => {
        navigation.navigate(navigationPage);
    }
    const handleUrlAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('https://www.penana.com/');
    }
    const handleLogOut = () => {
        toggleLogin(false)
        setLoggedIn(false)

    }
    const handleLogIn = () => {
        toggleLogin(true)
        setLoggedIn(true)
        navigator("LoginScreen")
    }
    const LogInOut = () => {

        if (loggedIn) {
            return (
                <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 15, flexDirection: "row", flexWrap: 'wrap', width: width }}
                    onPress={() => handleLogOut()}>
                    <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                    <Text style={themeTextStyle}>{t('MorePage.logout')}</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 15, flexDirection: "row", flexWrap: 'wrap', width: width }}
                    onPress={() => handleLogIn()}>
                    <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                    <Text style={themeTextStyle}>{t('MorePage.login')}</Text>
                </TouchableOpacity>
            )

        }
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
                }]}>{t('MorePage.settings')}</Text>
            </View>


            <ScrollView >



                <View>
                    <Text style={themeTextStyle}>{t('MorePage.account')}</Text>
                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 15, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => { navigator("EditProfile") }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.editProfile')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 15, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => { navigator("TransactionHistory") }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.transactionHistory')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 15, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => { navigator("FavoriteGenres") }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.favoriteGenres')}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={themeTextStyle}>{t('MorePage.options')}</Text>
                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 15, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => { navigator("General") }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.general')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 15, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => { navigator("Notifications") }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.notification')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 15, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => { navigator("Downloads") }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.downloads')}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={themeTextStyle}>Penana</Text>
                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 15, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => handleUrlAsync()}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.rateUs')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 15, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => handleUrlAsync()}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.giveUsFeedback')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 15, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => handleUrlAsync()}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.termsGuidelinesPolicies')}</Text>
                    </TouchableOpacity>

                    {LogInOut()}
                </View>


                <View style={{ paddingBottom: 100 }}></View>
            </ScrollView>




        </SafeAreaView>
    )
}

export default SettingsScreen

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
