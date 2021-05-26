import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, SafeAreaView, Dimensions, TouchableOpacity, FlatList, Modal, Pressable } from 'react-native'
import { useTheme } from '@react-navigation/native';

import { dummylistData, dummySearchData, dummySearchTopData } from '../../data/Data'
import { SearchBar } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Ionicons } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window')
const SearchScreen = () => {
    const theme = useTheme();
    var colorScheme
    if (theme.dark) {
        colorScheme = 'dark';
    } else {
        colorScheme = 'light';
    }
    const [searchInput, setSearchInput] = useState("")
    const [isTopList, setIsTopList] = useState(false)
    const [data, setData] = useState(dummylistData)
    const [sortByPopular, setSortByPopular] = useState(false)
    const [sortByRecent, setSortByRecent] = useState(false)
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const themeMoralStyle = colorScheme === 'light' ? styles.lightModal : styles.darkModal;
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();


    const handleSearch = (text, isTopList) => {
        setSearchInput(text)
        //filter data...
        if (isTopList) {
            setIsTopList(isTopList)
            setData(dummySearchTopData)
        }
        else if (text) {
            setIsTopList(false)
            setData(dummySearchData)
        } else {
            setIsTopList(false)
            setData(dummylistData)
        }
    }
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
    const title = () => {
        if (isTopList) {
            return (
                <Text style={themeTextStyle}>{searchInput}</Text>
            )
        }
        else if (searchInput) {
            return (
                <Text style={themeTextStyle}>Top searches</Text>
            )
        } else {
            return (
                <Text style={themeTextStyle}>Trending searches</Text>
            )
        }
    }

    const searchList = () => {
        return (
            <View style={{ width: width }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    {title()}

                    <View style={{ flexDirection: "row" }}>
                        <TouchableOpacity onPress={() => { handleSort("Popular") }}>
                            <Text style={[themeTextStyle, { padding: 7 }]}>Popular</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleSort("Recent") }}>
                            <Text style={[themeTextStyle, { padding: 7 }]}>Recent</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <FlatList data={data}
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
                                        <Text style={[themeTextStyle, { lineHeight: 15, }]}>{item.time} time</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                        )
                    }}

                />
                <View style={{ paddingBottom: 100 }}></View>
            </View>
        )
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
                <Pressable onPress={() => { navigation.goBack() }}>
                    <AntDesign name="arrowleft" size={24} color="white"
                        iconStyle={false}

                        style={{
                            backgroundColor: "#303030",
                            borderTopColor: "black",
                            borderTopWidth: 1,
                            borderBottomColor: "black",
                            borderBottomWidth: 1,
                            height: 50,
                            paddingLeft: 10,
                            textAlignVertical: "center"
                        }} />
                </Pressable>
                <SearchBar

                    containerStyle={{ borderColor: "red", padding: 0, flex: 1, backgroundColor: "#303030" }}
                    inputContainerStyle={{ backgroundColor: "#303030", paddingLeft: 30 }}
                    leftIconContainerStyle={{ display: "none" }}
                    placeholder="Search Penana"
                    onChangeText={(text) => handleSearch(text)}
                    value={searchInput}
                />
                <Ionicons name="options" size={24} color="black"
                    style={{
                        backgroundColor: "#303030",
                        borderTopColor: "black",
                        borderTopWidth: 1,
                        borderBottomColor: "black",
                        borderBottomWidth: 1,
                        height: 50,
                        paddingRight: 10,
                        textAlignVertical: "center",
                        color: "white"

                    }}
                    onPress={() => { setModalVisible(!modalVisible) }} />

            </View>


            {searchList()}







            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);
                }}
            >
                <Pressable style={styles.centeredViewReverse} onPress={() => setModalVisible(!modalVisible)}>
                    <View style={[styles.modalViewReverse, themeMoralStyle, { padding: 10, alignItems: "flex-end", }]}>

                        <Text style={[themeTextStyle, { fontSize: 15 }]}>Search By</Text>
                        <TouchableOpacity onPress={() => { handleSearch("Top XXXX", true) }}>
                            <Text style={[themeTextStyle, { fontSize: 15 }]}>Top XXXX</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleSearch("Top GGGG", true) }}>
                            <Text style={[themeTextStyle, { fontSize: 15 }]}>Top GGGG</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleSearch("Top KKKK", true) }}>
                            <Text style={[themeTextStyle, { fontSize: 15 }]}>Top KKKK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleSearch("Top YYYY", true) }}>
                            <Text style={[themeTextStyle, { fontSize: 15 }]}>Top YYYY</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { handleSearch("Top ZZZZ", true) }}>
                            <Text style={[themeTextStyle, { fontSize: 15 }]}>Top ZZZZ</Text>
                        </TouchableOpacity>


                    </View>
                </Pressable>
            </Modal>


        </SafeAreaView>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    centeredViewReverse: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "rgba(0,0,0,.5)",
        alignItems: "flex-end"
    },
    modalViewReverse: {

        width: width / 3.5,
        borderBottomLeftRadius: 15,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        top: 0,



    },
    textStyle: {
        color: "white",
        fontWeight: "bold",

    },
    modalText: {
        marginBottom: 15,
    },
    lightModal: {
        backgroundColor: 'white',
    },
    darkModal: {
        backgroundColor: '#303030',
    },
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
