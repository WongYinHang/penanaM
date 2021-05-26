import React from 'react'
import { StyleSheet, Text, View, StatusBar, Image, SafeAreaView, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { dummynews } from '../../../data/Data'
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window')
const NewsScreen = () => {
    const theme = useTheme();
    const navigation = useNavigation();
    var colorScheme
    if (theme.dark) {
        colorScheme = 'dark';
    } else {
        colorScheme = 'light';
    }
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    var news = dummynews;


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
                }]}>News</Text>
            </View>

            <FlatList data={news}

                keyExtractor={(item, index) => 'key' + index}


                scrollEnabled
                snapToAlignment="start"
                scrollEventThrottle={16}
                decelerationRate={"fast"}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {

                    return (
                        <TouchableOpacity style={{
                            flex: 1,
                            borderBottomColor: "white",
                            borderBottomWidth: 1
                        }}>
                            <Text style={themeTextStyle}>{item.sender}</Text>
                            <Text style={themeTextStyle}>{item.title}</Text>
                            <Text style={themeTextStyle}>{item.date}</Text>
                        </TouchableOpacity>




                    )


                }}

            />






        </SafeAreaView>
    )
}

export default NewsScreen
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
