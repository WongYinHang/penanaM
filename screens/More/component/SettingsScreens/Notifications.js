import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Pressable, Dimensions, SafeAreaView, Switch, TouchableOpacity } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { LocalizationContext } from '../../../../components/context'
const { width, height } = Dimensions.get('window')
const Notifications = () => {
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
    const [toggleNew, setToggleNew] = useState(false)
    const [toggleWait, setToggleWait] = useState(false)
    const [togglePersonlized, setTogglePersonlized] = useState(false)
    const [toggleGifts, setToggleGifts] = useState(false)
    const [toggleMessages, setToggleMessages] = useState(false)
    const [toggleActivity, setToggleActivity] = useState(false)
    useEffect(() => {
        //get data from local Storage...
        setToggleNew(true)
        setToggleWait(false)
        setTogglePersonlized(false)
        setToggleGifts(false)
        setToggleMessages(false)
        setToggleActivity(true)
    }, [])
    const SaveInfo = () => {
        //save data to local Storage...
        navigation.goBack()
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
                }]}>{t('MorePage.notification')}</Text>
                <TouchableOpacity onPress={() => { SaveInfo() }}>
                    <Text style={[themeTextStyle, {


                        paddingRight: 10,
                        borderTopColor: "black",
                        height: 50,
                        borderTopWidth: 1,
                        borderBottomColor: "black",
                        borderBottomWidth: 1,
                        textAlignVertical: "center"
                    }]}>{t('MorePage.save')}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={themeTextStyle}>{t('MorePage.library')}</Text>

                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                        <View style={{ flexDirection: "row" }}>

                            <Text style={themeTextStyle}>{t('MorePage.newEpisode')}</Text>
                        </View>
                        <Switch
                            onValueChange={() => setToggleNew(!toggleNew)}
                            value={toggleNew}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"

                        />

                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                        <View style={{ flexDirection: "row" }}>

                            <Text style={themeTextStyle}>{t('MorePage.waitTimerReminders')}</Text>
                        </View>
                        <Switch
                            onValueChange={() => setToggleWait(!toggleWait)}
                            value={toggleWait}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"

                        />

                    </View>
                </View>
            </View>
            <View>
                <Text style={themeTextStyle}>{t('MorePage.content')}</Text>

                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                        <View style={{ flexDirection: "row" }}>

                            <Text style={themeTextStyle}>{t('MorePage.personlizedRecommendations')}</Text>
                        </View>
                        <Switch
                            onValueChange={() => setTogglePersonlized(!togglePersonlized)}
                            value={togglePersonlized}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"

                        />

                    </View>

                </View>
            </View>
            <View>
                <Text style={themeTextStyle}>{t('MorePage.inbox')}</Text>

                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                        <View style={{ flexDirection: "row" }}>

                            <Text style={themeTextStyle}>{t('MorePage.gifts')}</Text>
                        </View>
                        <Switch
                            onValueChange={() => setToggleGifts(!toggleGifts)}
                            value={toggleGifts}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"

                        />

                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                        <View style={{ flexDirection: "row" }}>

                            <Text style={themeTextStyle}>{t('MorePage.messages')}</Text>
                        </View>
                        <Switch
                            onValueChange={() => setToggleMessages(!toggleMessages)}
                            value={toggleMessages}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"

                        />

                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                        <View style={{ flexDirection: "row" }}>

                            <Text style={themeTextStyle}>{t('MorePage.activity')}</Text>
                        </View>
                        <Switch
                            onValueChange={() => setToggleActivity(!toggleActivity)}
                            value={toggleActivity}
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"

                        />

                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Notifications

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
