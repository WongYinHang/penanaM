import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image, SafeAreaView, Dimensions } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { dummyImage } from '../../../data/Data'
import { LocalizationContext } from '../../../components/context'
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window')
let PointsIcon = dummyImage;
const Library = () => {
    const navigation = useNavigation();
    const navigator = (navigationPage, props) => {
        navigation.navigate(navigationPage, props);

    }
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
    return (
        <SafeAreaView style={{ flex: 1, height: height }, themeContainerStyle}>

            <View style={{

                innerText: "white", marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                height: 40,
                display: 'flex',
                justifyContent: "center"
            }}>
                <Text style={themeTextStyle}>{t('LibraryPage.library')}</Text>
            </View>
            <View style={{ display: "flex", flexDirection: "row", borderBottomColor: "gray", borderBottomWidth: 1 }}>


                <View style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: 10,
                    alignItems: "flex-start"
                }}>
                    <TouchableOpacity style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        margin: 5,
                        flexDirection: "row",
                        width: width
                    }}
                        onPress={() => { navigator("Recent") }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>{t('LibraryPage.recent')}</Text>
                    </TouchableOpacity>
                    <View style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: 5,
                        flexDirection: "row",
                        flexWrap: 'wrap'
                    }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>

                            {t('LibraryPage.subscribed')}</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: 5,
                        flexDirection: "row",
                        flexWrap: 'wrap'
                    }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>

                            {t('LibraryPage.freeEpisodes')}</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: 5,
                        flexDirection: "row",

                    }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>

                            {t('LibraryPage.waitForFree')}</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: 5,
                        flexDirection: "row",

                    }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>

                            {t('LibraryPage.comments')}</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: 5,
                        flexDirection: "row",

                    }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>

                            {t('LibraryPage.liked')}</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: 5,
                        flexDirection: "row",

                    }}>
                        <Image source={PointsIcon} style={{ width: 30, height: 30, marginRight: 15 }} />
                        <Text style={themeTextStyle}>

                            {t('LibraryPage.downloaded')}</Text>
                    </View>
                </View>


            </View>

        </SafeAreaView>
    )
}

export default Library

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
