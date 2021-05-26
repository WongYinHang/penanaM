import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { dummyImage } from '../../../data/Data'
import { LocalizationContext, AuthContext } from '../../../components/context'
const { width, height } = Dimensions.get('window')
let userIcon = dummyImage;
let PointsIcon = dummyImage;



const MoreContent = () => {
    const { t } = React.useContext(LocalizationContext);
    const { checkLoggedIn } = React.useContext(AuthContext);
    const handleUrlAsync = async () => {
        let result = await WebBrowser.openBrowserAsync('https://www.penana.com/');
    }

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


    const navigation = useNavigation();
    const navigator = (navigationPage) => {
        navigation.navigate(navigationPage);
    }
    var loggedIn = false;
    const userState = () => {
        if (checkLoggedIn()) {
            return (
                <View style={{ display: "flex", flexDirection: "row", borderBottomColor: "gray", borderBottomWidth: 1 }}>
                    <Image source={userIcon} style={{ width: 60, height: 60, margin: 20, borderRadius: 50 }} />
                    <View style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start"
                    }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: width - 150 }}>
                            <Text style={themeTextStyle}>User Name</Text>


                        </View>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>

                            <Text style={themeTextStyle}>
                                <Image source={PointsIcon} style={{ width: 10, height: 10, }} />
                            User Points
                        </Text>

                        </View>

                    </View>

                </View>
            )
        } else {
            return (
                <View style={{ display: "flex", flexDirection: "row", borderBottomColor: "gray", borderBottomWidth: 1 }}>
                    <Image source={userIcon} style={{ width: 60, height: 60, margin: 20, borderRadius: 50, backgroundColor: "gray" }} />
                    <View style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "flex-start"
                    }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: width - 150 }}>
                            <Text style={themeTextStyle}>Guest</Text>


                        </View>


                    </View>

                </View>
            )
        }
    }
    return (

        <SafeAreaView style={themeContainerStyle}>

            <View style={{

                innerText: "white", marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                height: 40,
                display: 'flex',
                justifyContent: "center"
            }}>
                <Text style={themeTextStyle}>{t('MorePage.more')}</Text>
            </View>
            {userState()}

            <View style={{ display: "flex", flexDirection: "row", borderBottomColor: "gray", borderBottomWidth: 1 }}>


                <View style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: 10,
                    alignItems: "flex-start"
                }}>
                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 5, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => { navigator("PointsShopScreen") }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.pointShop')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 5, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => { navigator("FreePointScreen") }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.freePoint')}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 5, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => { navigator("PromoCodeScreen") }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.promoCode')}</Text>
                    </TouchableOpacity>
                </View>
            </View>


            <View style={{ display: "flex", flexDirection: "row", borderBottomColor: "gray", borderBottomWidth: 1 }}>
                <View style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: 10,
                    alignItems: "flex-start"
                }}>
                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 5, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => { navigator("PromotionsScreen") }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.promotions')}</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 5, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => { navigator("NewsScreen") }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.news')}</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 5, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => { navigator("TshirtsScreen") }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>T-shirts</Text>
                    </TouchableOpacity>
                </View>


            </View>
            <View style={{ display: "flex", flexDirection: "row", borderBottomColor: "gray", borderBottomWidth: 1 }}>
                <View style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: 10,
                    alignItems: "flex-start"
                }}>
                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 5, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => { navigator("SettingsScreen") }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.settings')}</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 5, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => handleUrlAsync()}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.publish')}</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 5, flexDirection: "row", flexWrap: 'wrap', width: width }}
                        onPress={() => { navigator("HelpScreen") }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('MorePage.help')}</Text>
                    </TouchableOpacity>
                </View>


            </View>

        </SafeAreaView>
    )
}

export default MoreContent

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
        lineHeight: 30,
        fontSize: 15
    },
    darkThemeText: {
        color: 'white',
        lineHeight: 30,
        fontSize: 15
    },
})
