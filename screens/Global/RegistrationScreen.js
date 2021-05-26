import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Switch, SafeAreaView, Dimensions, TouchableOpacity, TextInput, Alert } from 'react-native'
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { LocalizationContext, AuthContext } from '../../components/context'
import { AntDesign } from '@expo/vector-icons';
import { register } from "../../api/api"
const { width, height } = Dimensions.get('window')

const RegistrationScreen = () => {
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
        console.log(navigationPage);
        navigation.navigate(navigationPage);
    }

    const [EmailUsername, setEmailUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(true)
    const Already = 'Already have a Penana account?';
    const Log = 'Log in';

    const CompoundText = ({ text }) =>
        text.split(' ').map(word => <Text key={word} style={themeTextStyle}>{word} </Text>);

    const CompoundTextLink = ({ text }) =>
        text.split(' ').map(word => <TextLink key={word} style={[themeTextStyle]} word={word} />);

    const TextLink = ({ word }) => (
        <TouchableOpacity
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={() => Alert.alert('howdy')}
            style={styles.zIndex1}
        >
            <Text style={[themeTextStyle, { fontWeight: "bold" }]}>{word} </Text>
        </TouchableOpacity>
    );
    const handleRegister = async () => {
        await register(EmailUsername, Password).then(function (response) {


            // now the data is accessable from here.
            if (response.status == 200) {
                console.log("register ok");
                Alert.alert('register successfully')
                navigator('LoginScreen')
            }
        }).catch(function (response) {
            console.log(response);
        });

    }
    return (
        <SafeAreaView style={themeContainerStyle}>

            <View style={{

                innerText: "white", marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                height: 40,
                display: 'flex',
                justifyContent: "flex-start",
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

            <TextInput
                style={{
                    paddingLeft: 8,
                    height: 40,
                    margin: 12,
                    borderWidth: 1,
                    borderColor: themeTextStyle.color,
                    color: themeTextStyle.color,
                    backgroundColor: "blue"
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


            <TouchableOpacity style={{
                display: "flex", justifyContent: "flex-start", flexDirection: "row", flexWrap: 'wrap',
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                height: 40,
                margin: 12,
                borderColor: themeTextStyle.color,
                borderWidth: 1,
                zIndex: 100
            }}
                onPress={() => {
                    handleRegister();



                }}
            >
                <Text style={[themeTextStyle, { lineHeight: 38, }]} >Sign up</Text>
            </TouchableOpacity>
            <View style={{
                justifyContent: "center", alignItems: "center", flexDirection: 'row',
                flexWrap: 'wrap',
            }}>
                <CompoundText text={Already} />
                <CompoundTextLink text={Log} />
            </View>


        </SafeAreaView>
    )
}

export default RegistrationScreen

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
