import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, SafeAreaView, Dimensions } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { dummyImage } from '../../../data/Data'
import { LocalizationContext } from '../../../components/context'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
const { width, height } = Dimensions.get('window')
let PointsIcon = dummyImage;
const Recent = () => {
    useEffect(() => {
        fetchdata();

    }, [])
    const navigation = useNavigation();
    const navigator = (navigationPage, props) => {

        navigation.navigate(navigationPage, { id: props });

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
    const [recentdata, setRecentdata] = useState([])
    const fetchdata = async () => {
        await AsyncStorage.getItem('@StoryRecentRead', (err, result) => {
            if (result != null) {
                result = JSON.parse(result)

                return setRecentdata(result.story)

            }


        });
    }




    return (
        <SafeAreaView style={{ flex: 1, height: height }, themeContainerStyle}>

            <View style={{

                innerText: "white", marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                height: 40,
                display: 'flex',
                justifyContent: "center"
            }}>
                <Text style={themeTextStyle}>{t('LibraryPage.recent')}</Text>
            </View>
            <View>
                {recentdata.map((item, i) => (
                    <TouchableOpacity key={i} onPress={() => { navigator("NovelScreen", item.id) }}>
                        <Text style={themeTextStyle}>story id: {item.id}</Text>
                        <Text style={themeTextStyle}>storyRecentChapter: {item.storyRecentChapter}</Text>

                    </TouchableOpacity>

                )

                )}
            </View>


        </SafeAreaView>
    )
}

export default Recent

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
