import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Pressable, Dimensions, SafeAreaView, Image, TextInput, Switch, TouchableOpacity } from 'react-native'
import { AntDesign, Feather, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { dummyImage } from '../../../../data/Data'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LocalizationContext } from '../../../../components/context'
const { width, height } = Dimensions.get('window')
const EditProfile = () => {
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
    const themeBorderStyle = colorScheme === 'light' ? styles.lightBorder : styles.darkBorder;
    const navigation = useNavigation();
    const [DisplayName, setDisplayName] = useState("")
    const [Bio, setBio] = useState("")
    const [Website, setWebsite] = useState("")
    const [UserName, setUserName] = useState("")
    const [Email, setEmail] = useState("")
    const [DisplayNameCount, setDisplayNameCount] = useState(0)
    const [BioCount, setBioCount] = useState(0)
    const [UserNameCount, setUserNameCount] = useState(0)
    const [toggleHideSubCheckBox, setToggleHideSubCheckBox] = useState(false)
    useEffect(() => {
        fetchInfo();

    }, [])
    useEffect(() => {
        setDisplayNameCount(DisplayName.length)
        setBioCount(Bio.length)
        setUserNameCount(UserName.length)

    })
    const fetchInfo = async () => {
        //await ...

        setDisplayName("TestDisplayName")
        setBio("TestBio")
        setWebsite("Test.com")
        setUserName("TestUserName")
        setEmail("Test@email.com")
        const HideSubCheckBox = await AsyncStorage.getItem('@HideSub')
        if (HideSubCheckBox == "true") {
            setToggleHideSubCheckBox(true)
        } else {
            setToggleHideSubCheckBox(false)
        }


    }
    const handleDisplayName = (text) => {
        setDisplayName(text)
        setDisplayNameCount(text.length)
    }
    const handleBio = (text) => {
        setBio(text)
    }
    const handleWebsite = (text) => {
        setWebsite(text)
    }
    const handleUserName = (text) => {
        setUserName(text)
    }
    const handleEmail = (text) => {
        setEmail(text)
    }
    const SaveInfo = () => {
        getData();
        //Upload info...
        //navigation.goBack()
    }
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('@FavoriteAction')
            if (value !== null) {
                console.log(value);

            }
        } catch (e) {
            // error reading value
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
                }]}>{t('MorePage.editProfile')}</Text>
                <TouchableOpacity onPress={() => { SaveInfo() }}>
                    <Text style={[themeTextStyle, {


                        paddingRight: 10,
                        borderTopColor: "black",
                        height: 50,
                        borderTopWidth: 1,
                        borderBottomColor: "black",
                        borderBottomWidth: 1,
                        textAlignVertical: "center"
                    }]}>{t('MorePage.editProfile')}</Text>
                </TouchableOpacity>
            </View>
            <View style={{

                alignItems: "center"
            }}>
                <TouchableOpacity style={{}}>
                    <Image source={dummyImage} style={{ width: width / 3, height: width / 3, borderRadius: 90 }} />
                </TouchableOpacity>
            </View>
            <View>
                <View>
                    <Text style={themeTextStyle}>{t('MorePage.publicProfile')}</Text>
                    <View>
                        <View style={{ flexDirection: "row", padding: 10 }}>
                            <AntDesign name="idcard" size={24} style={[themeTextStyle, { paddingRight: 8, textAlignVertical: "center" }]} />
                            <TextInput
                                style={[themeTextStyle, themeBorderStyle, { borderBottomWidth: 1, flex: 1 }]}
                                maxLength={20}
                                placeholderTextColor="#B3B3B3"
                                placeholder={t('MorePage.displayName')}
                                onChangeText={(text) => handleDisplayName(text)}
                                value={DisplayName}
                            />
                        </View>
                        <Text style={[themeTextStyle, { textAlign: "right", fontSize: 12, top: -8, right: 10 }]}>
                            <Text>{DisplayNameCount}</Text>
                            <Text>/</Text>
                            <Text>20</Text>
                        </Text>
                    </View>

                    <View>
                        <View style={{ flexDirection: "row", padding: 10 }}>
                            <Feather name="align-left" size={24} style={[themeTextStyle, { paddingRight: 8, textAlignVertical: "center" }]} />
                            <TextInput
                                style={[themeTextStyle, themeBorderStyle, { borderBottomWidth: 1, flex: 1 }]}
                                maxLength={255}
                                placeholderTextColor="#B3B3B3"
                                placeholder={t('MorePage.bio')}
                                onChangeText={(text) => handleBio(text)}
                                value={Bio}
                            />
                        </View>
                        <Text style={[themeTextStyle, { textAlign: "right", fontSize: 12, top: -8, right: 10 }]}>
                            <Text>{BioCount}</Text>
                            <Text>/</Text>
                            <Text>255</Text>
                        </Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", padding: 10 }}>
                            <MaterialIcons name="web" size={24} style={[themeTextStyle, { paddingRight: 8, textAlignVertical: "center" }]} />
                            <TextInput
                                style={[themeTextStyle, themeBorderStyle, { borderBottomWidth: 1, flex: 1 }]}
                                placeholderTextColor="#B3B3B3"
                                placeholder={t('MorePage.website')}
                                onChangeText={(text) => handleWebsite(text)}
                                value={Website}
                            />
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 10 }}>
                            <View style={{ flexDirection: "row" }}>
                                <FontAwesome name="bookmark" size={24} style={[themeTextStyle, { paddingRight: 8, textAlignVertical: "center" }]} />
                                <Text style={themeTextStyle}>{t('MorePage.hideSubSeries')}</Text>
                            </View>
                            <Switch

                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                disabled={false}
                                value={toggleHideSubCheckBox}
                                onValueChange={(newValue) => {
                                    setToggleHideSubCheckBox(newValue);
                                    if (toggleHideSubCheckBox) {
                                        try {
                                            AsyncStorage.setItem('@HideSub', "false")
                                        } catch (e) {
                                            // saving error
                                        }
                                    } else {
                                        try {
                                            AsyncStorage.setItem('@HideSub', "true")
                                        } catch (e) {
                                            // saving error
                                        }
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={themeTextStyle}>{t('MorePage.privateInformation')}</Text>
                    <View>
                        <View style={{ flexDirection: "row", padding: 10 }}>
                            <AntDesign name="profile" size={24} style={[themeTextStyle, { paddingRight: 8, textAlignVertical: "center" }]} />
                            <TextInput
                                style={[themeTextStyle, themeBorderStyle, { borderBottomWidth: 1, flex: 1 }]}
                                maxLength={20}
                                placeholderTextColor="#B3B3B3"
                                placeholder={t('MorePage.userName')}
                                onChangeText={(text) => handleUserName(text)}
                                value={UserName}
                            />
                        </View>
                        <Text style={[themeTextStyle, { textAlign: "right", fontSize: 12, top: -8, right: 10 }]}>
                            <Text>{UserNameCount}</Text>
                            <Text>/</Text>
                            <Text>20</Text>
                        </Text>
                    </View>
                    <View>
                        <View style={{ flexDirection: "row", padding: 10 }}>
                            <AntDesign name="mail" size={24} style={[themeTextStyle, { paddingRight: 8, textAlignVertical: "center" }]} />
                            <TextInput
                                style={[themeTextStyle, themeBorderStyle, { borderBottomWidth: 1, flex: 1 }]}
                                maxLength={20}
                                placeholderTextColor="#B3B3B3"
                                placeholder={t('MorePage.email')}
                                onChangeText={(text) => handleEmail(text)}
                                value={Email}
                            />
                        </View>

                    </View>
                    <View>
                        <View style={{ flexDirection: "row", padding: 10 }}>
                            <MaterialCommunityIcons name="onepassword" size={24} style={[themeTextStyle, { paddingRight: 8, textAlignVertical: "center" }]} />
                            <TouchableOpacity>
                                <Text style={themeTextStyle}>{t('MorePage.changePassword')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>


        </SafeAreaView>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    lightBorder: { borderColor: "black" },
    darkBorder: { borderColor: "white" },
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
