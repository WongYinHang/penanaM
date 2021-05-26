import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, TextInput, SafeAreaView, Dimensions, TouchableOpacity, Switch, Alert } from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { LocalizationContext, AuthContext } from '../../components/context'
import { AntDesign } from '@expo/vector-icons';
import { authenticate, refreshtoken, getuser } from '../../api/api';
const { width, height } = Dimensions.get('window')

const LoginScreen = () => {
    const { t } = React.useContext(LocalizationContext);
    const { checkLoggedIn } = React.useContext(AuthContext);
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
    const [resp, setResp] = useState();
    const [EmailUsername, setEmailUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)
    const Terms = 'Terms of Services';
    const Privacy = 'Privacy Policy';
    const and = 'and';


    const CompoundText = ({ text }) => text.split(' ').map(word => <Text key={word} style={themeTextStyle}>{word} </Text>);


    const CompoundTextLink = ({ text }) => text.split(' ').map(word => <TextLink key={word} style={[themeTextStyle]} word={word} />);


    const TextLink = ({ word }) => (
        <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={() => Alert.alert('howdy')}

        >
            <Text style={[themeTextStyle, { fontWeight: "bold" }]}>{word} </Text>
        </TouchableOpacity>
    );
    const handleLogin = async () => {
        await authenticate(EmailUsername, Password).then(function (authenticateResponse) {
            if (authenticateResponse.status == 200) {
                console.log("authenticate ok");
                refreshtoken(authenticateResponse.data.token).then((refreshtokenResponse) => {
                    console.log(refreshtokenResponse);
                    if (refreshtokenResponse.status == 200) {
                        console.log("refreshtoken ok");
                        console.log("refreshed token: " + refreshtokenResponse.data.token);
                        getuser(refreshtokenResponse.data.token).then((getuserResponse) => {
                            if (getuserResponse.status == 200) {
                                console.log("getuser ok");

                                navigation.navigate('Main', { screen: 'HomeScreen' });
                                navigation.goBack();
                            }
                        }).catch(function (response) {
                            console.log(response);
                        });
                    }
                }).catch(function (response) {
                    console.log(response);
                });
            }
        }).catch(function (response) {
            console.log(response);
        });
    }
    return (
        <SafeAreaView style={[themeContainerStyle, { flexDirection: "column", justifyContent: "space-between" }]}>
            <View>
                <View style={{

                    innerText: "white", marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                    height: 40,
                    display: 'flex',
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={[themeContainerStyle, { height: 50, zIndex: 100, }]}>
                        <AntDesign name="arrowleft" size={24}

                            style={[themeTextStyle, {

                                height: 50,
                                paddingLeft: 10,
                                textAlignVertical: "center"
                            }]} />
                    </TouchableOpacity>
                    <Text style={[themeTextStyle, { right: width / 20 }]}>Penana</Text>
                    <Text style={themeTextStyle}></Text>
                </View>
                <TextInput
                    style={{
                        paddingLeft: 8,
                        height: 40,
                        margin: 12,
                        borderWidth: 1,
                        borderColor: themeTextStyle.color,
                        color: themeTextStyle.color
                    }}
                    placeholderTextColor={themeTextStyle.color}
                    value={EmailUsername}
                    onChangeText={text => setEmailUsername(text)}
                    placeholder="Email or username"

                />
                <View>
                    <TextInput
                        style={{
                            paddingLeft: 8,
                            height: 40,
                            margin: 12,
                            borderWidth: 1,
                            borderColor: themeTextStyle.color,
                            color: themeTextStyle.color
                        }}
                        placeholderTextColor={themeTextStyle.color}
                        value={Password}
                        onChangeText={text => setPassword(text)}
                        placeholder="Password"
                        secureTextEntry={showPassword}
                    />
                    <Switch
                        style={{ backgroundColor: "red", width: 50, }}
                        onValueChange={() => { setShowPassword(!showPassword) }}
                        value={!showPassword}
                    />
                    <TouchableOpacity style={{ display: "flex", justifyContent: "flex-start", margin: 5, flexDirection: "row", flexWrap: 'wrap', width: width, top: -35, left: 10 }}
                    >
                        <Text style={[themeTextStyle, { fontSize: 11 }]}>Forgot your password?</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{
                    display: "flex", justifyContent: "flex-start", flexDirection: "row", flexWrap: 'wrap',
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    height: 40,
                    margin: 12,
                    borderColor: themeTextStyle.color,
                    borderWidth: 1,

                }}
                    onPress={() => {
                        handleLogin()



                    }}


                >
                    <Text style={[themeTextStyle, { lineHeight: 38, }]} >Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    display: "flex", justifyContent: "flex-start", margin: 5, flexDirection: "row", flexWrap: 'wrap', width: width,
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center"
                }}
                >
                    <Text style={themeTextStyle}>-------------------or---------------------</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    display: "flex", justifyContent: "flex-start", flexDirection: "row", flexWrap: 'wrap',
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    height: 40,
                    margin: 12,
                    borderColor: themeTextStyle.color,
                    borderWidth: 1,
                    marginBottom: 0
                }}
                >
                    <Text style={[themeTextStyle, { lineHeight: 38, }]} >Continue with Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    display: "flex", justifyContent: "flex-start", flexDirection: "row", flexWrap: 'wrap',
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    height: 40,
                    margin: 12,
                    borderColor: themeTextStyle.color,
                    borderWidth: 1,
                    marginBottom: 0
                }}
                >
                    <Text style={[themeTextStyle, { lineHeight: 38, }]} >Continue with Facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    display: "flex", justifyContent: "flex-start", flexDirection: "row", flexWrap: 'wrap',
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    height: 40,
                    margin: 12,
                    borderColor: themeTextStyle.color,
                    borderWidth: 1,
                    marginBottom: 0
                }}
                    onPress={() => { navigator("RegistrationScreen") }}
                >
                    <Text style={[themeTextStyle, { lineHeight: 38, }]} >Sign up with email</Text>
                </TouchableOpacity>

            </View>
            <View style={{ justifyContent: "center", alignItems: "center", bottom: 5 }}>

                <Text style={themeTextStyle}>By continuing, you agree to our</Text>
                <View style={{
                    justifyContent: "center", alignItems: "center", flexDirection: 'row',
                    flexWrap: 'wrap',
                }}>
                    <CompoundTextLink text={Terms} />
                    <CompoundText text={and} />
                    <CompoundTextLink text={Privacy} />

                </View>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen

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
