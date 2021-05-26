import React, { useState } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, SafeAreaView, Dimensions, TouchableOpacity, FlatList, Pressable } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { dummylistData } from '../../data/Data'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window')

const SeeAllScreen = (props) => {
    const navigation = useNavigation();

    //get data with {props.route.params.name} 

    const theme = useTheme();
    var colorScheme
    if (theme.dark) {
        colorScheme = 'dark';
    } else {
        colorScheme = 'light';
    }
    const [data, setData] = useState(dummylistData)
    const [sortByPopular, setSortByPopular] = useState(false)
    const [sortByRecent, setSortByRecent] = useState(false)
    const handleSort = (value) => {

        if (value == "Popular") {
            setSortByPopular(true)
            setSortByRecent(false)
            var sortdata = data;
            sortdata.sort((a, b) => (a.like > b.like) ? -1 : 1)
            setData(sortdata)

        }
        else if (value == "Recent") {
            setSortByRecent(true)
            setSortByPopular(false)
            var sortdata = data;
            sortdata.sort((a, b) => (a.time > b.time) ? 1 : -1)
            setData(sortdata)

        }
    }
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

    return (
        <SafeAreaView style={themeContainerStyle}>

            <View style={{

                marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                height: 50,
                display: 'flex',
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                width: width
            }}>
                <View style={{
                    alignItems: "center",
                    flexDirection: "row",
                }}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <AntDesign name="arrowleft"

                            style={[themeTextStyle, {


                                fontSize: 24,
                                height: 50,
                                paddingLeft: 10,
                                paddingRight: 10,
                                textAlignVertical: "center"
                            }]} />
                    </TouchableOpacity>
                    <Text style={themeTextStyle}>{props.route.params.name}</Text>

                </View>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity onPress={() => { handleSort("Popular") }}>
                        <Text style={[themeTextStyle, { padding: 7 }]}>Popular</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { handleSort("Recent") }}>
                        <Text style={[themeTextStyle, { padding: 7 }]}>Recent</Text>
                    </TouchableOpacity>
                </View>
            </View>



            <View style={{ width: width }}>
                <FlatList data={dummylistData}
                    keyExtractor={(item, index) => 'key' + index}
                    style={{ marginBottom: 90 }}

                    scrollEnabled
                    snapToAlignment="start"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {

                        return (
                            <TouchableOpacity style={{
                                flex: 1,
                                flexDirection: "row",
                                padding: 8
                            }}
                            // onPress={() => { navigator("NovelScreen") }}
                            >
                                <Image source={item.url} style={{
                                    width: width / 1.9,
                                    height: width / 3.8
                                }} />
                                <View style={{ display: "flex", justifyContent: "space-between" }}>

                                    <View style={{ width: 150, }}>
                                        <Text style={[themeTextStyle, { lineHeight: 20 }]}>{item.title}</Text>
                                        <Text style={[themeTextStyle, { fontSize: 10, flexShrink: 1, lineHeight: 15 }]} numberOfLines={2} ellipsizeMode="tail">{item.description}</Text>
                                    </View>

                                    <View style={{

                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        marginLeft: 10,
                                        marginRight: 10,
                                        alignItems: "center",

                                    }}>
                                        <View style={{ flexDirection: "row", alignItems: "center", }}>
                                            <Image source={item.type.img}
                                                style={{
                                                    width: width / 15, height: width / 15
                                                }} />
                                            <Text style={[themeTextStyle, { lineHeight: 15, }]}>  |  </Text>
                                            <Text style={[themeTextStyle, { lineHeight: 15, }]}>{item.type.name}</Text>
                                        </View>
                                        <Text style={[themeTextStyle, { lineHeight: 15, }]}>{item.like} likes</Text>
                                    </View>

                                </View>

                            </TouchableOpacity>

                        )
                    }}

                />

            </View>


        </SafeAreaView>
    )
}

export default SeeAllScreen

const styles = StyleSheet.create({
    lightContainer: {
        backgroundColor: 'white',
        width: width,
        height: height
    },
    darkContainer: {
        backgroundColor: '#303030',
        width: width,
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
