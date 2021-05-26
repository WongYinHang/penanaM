import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Text, SafeAreaView, Dimensions, View, TouchableOpacity, StatusBar, Image, Animated, FlatList, ImageBackground, Modal, Pressable } from 'react-native'
import { LocalizationContext } from '../../components/context'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { dummyNovelDetail, dummyNovelEpisodes, dummyData1 } from '../../data/Data'
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { getstoryByCreated_by } from '../../api/api'
const { width, height } = Dimensions.get('window')
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;



const CreatorScreen = (props) => {

    const USERID = props.route.params.id
    const [creatorListOfWork, setCreatorListOfWork] = useState([])
    useEffect(() => {

        getstory_created_by(USERID)
        return () => {

        }
    }, [])
    const getstory_created_by = async (userid) => {
        await getstoryByCreated_by(userid).then((response) => {
            setCreatorListOfWork(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }
    const USERNAME = props.route.params.username
    const USER_IMG = "https://d3tdq0klf4qqp.cloudfront.net/images/users/large" + props.route.params.profile_picture
    const { t, locale, setLocale } = React.useContext(LocalizationContext);
    const [listY, setlistY] = useState(0)
    const scrollRef1 = useRef();
    const scrollRef2 = useRef();
    const scrollX = new Animated.Value(0)
    const scrollY = new Animated.Value(0)
    const scrollRefX = useRef();
    const navigation = useNavigation();
    const navigator = (navigationPage, props) => {
        navigation.navigate(navigationPage, props);

    }

    const [modalVisible, setModalVisible] = useState(false);
    const [postOption, setPostOption] = useState({});
    const handleOption = (item) => {

        setPostOption(item)
    }



    const textopacity1 = scrollX.interpolate({
        inputRange: [0, width / 2],
        outputRange: [1, 0.3],
        extrapolate: 'clamp',
    });
    const textopacity2 = scrollX.interpolate({
        inputRange: [width / 2, width],
        outputRange: [0.3, 1],
        extrapolate: 'clamp',
    });
    const borderX = scrollX.interpolate({
        inputRange: [0, width],
        outputRange: [0, width / 2],
        extrapolate: 'clamp',
    });
    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });
    const top = scrollY.interpolate({
        inputRange: [0, 300],
        outputRange: [-20, -100],
        extrapolate: 'clamp',
    });
    const top2 = scrollY.interpolate({
        inputRange: [0, 230],
        outputRange: [300, 70],
        extrapolate: 'clamp',
    });
    const imgtop = scrollY.interpolate({
        inputRange: [-200, 400],
        outputRange: [-20, -100],
        extrapolate: 'clamp',
    });
    const opacity = scrollY.interpolate({
        inputRange: [0, 250],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    const titleopacity = scrollY.interpolate({
        inputRange: [150, 250],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });

    //get novel data with id

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
    const themeMoralStyle = colorScheme === 'light' ? styles.lightModal : styles.darkModal;


    const _renderScrollViewContent2 = () => {

        return (
            <Animated.View style={[styles.scrollViewContent, { minHeight: height - 70 }]}>
                <Text style={themeTextStyle}>{t('Novel.Description')}</Text>
                <Text style={themeTextStyle}>{dummyNovelDetail.NovelDetail.description}</Text>

                <Text style={themeTextStyle}>{t('Novel.Creator')}</Text>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>
                    <Image source={{
                        uri: USER_IMG,
                    }}
                        style={{
                            width: width / 15, height: width / 15
                        }} />

                    <Text style={themeTextStyle}>{USERNAME}</Text>
                </View>
                <View style={{ paddingTop: 20 }}>
                    {creatorListOfWork.map((item, i) => {
                        const STORY_GENRE_SID = item.genre_sid;
                        const STORY_SUB_GENRE1 = item.subgenre1;
                        const STORY_SUB_GENRE2 = item.subgenre2;
                        const STORY_TITLE = item.title;
                        const STORY_IMG = "https://d3tdq0klf4qqp.cloudfront.net/images/books" + item.book_cover

                        return (
                            <TouchableOpacity style={{ marginLeft: 10, flexDirection: "row", paddingTop: 7 }} key={i}
                                onPress={() => { navigator("NovelScreen", item) }}>
                                <Image source={{
                                    uri: STORY_IMG,
                                }}
                                    style={{
                                        width: width / 2, height: width / 4
                                    }} />
                                <View>
                                    <Text style={themeTextStyle}>{STORY_TITLE}</Text>
                                    <Text style={themeTextStyle}>{STORY_GENRE_SID}</Text>
                                    <Text style={themeTextStyle}>{STORY_SUB_GENRE1}</Text>
                                    <Text style={themeTextStyle}>{STORY_SUB_GENRE2}</Text>

                                </View>

                            </TouchableOpacity>
                        )
                    })}
                </View>
                <View style={{ paddingBottom: 100 }}></View>
            </Animated.View>
        );
    }


    return (
        <SafeAreaView style={{ flex: 1, height: height }, themeContainerStyle}>
            <Animated.View style={[styles.header, { height: headerHeight }]}>

                <Animated.Image source={{
                    uri: USER_IMG,
                }} style={{
                    width: width,
                    height: height,
                    zIndex: -1,
                    position: "absolute",
                    top: imgtop,
                    left: 0,
                    right: 0,
                    opacity: 0.8
                }} blurRadius={1}></Animated.Image>
                <View style={{
                    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",

                }}>
                    <Pressable onPress={() => { navigation.goBack() }}>
                        <AntDesign name="arrowleft" size={24}

                            style={[themeTextStyle, {


                                height: 50,
                                paddingLeft: 10,
                                textAlignVertical: "center"
                            }]} />
                    </Pressable>
                </View>
                <Animated.View style={{
                    width: 150,
                    top: -35,
                    left: (width / 2) - 75,
                    flexDirection: "row",
                    justifyContent: "center",
                    opacity: titleopacity
                }}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 20 }}>{props.route.params.name}</Text>
                </Animated.View>
                <Animated.View style={{
                    margin: 10,
                    top: top,
                    opacity: opacity,
                    justifyContent: "center",
                    flex: 1,
                    alignItems: "center",

                }} >
                    <Image source={{
                        uri: USER_IMG,
                    }}
                        style={{
                            width: width / 3,
                            height: width / 3,
                            borderRadius: 90
                        }} />
                </Animated.View>
            </Animated.View>
            <View style={[styles.fill]}>
                <ScrollView
                    ref={scrollRef2}
                    style={[styles.fill, { width: width, marginTop: 70, }]}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { y: scrollY } } }], {


                            useNativeDriver: false
                        }
                        )

                    }
                >




                    {_renderScrollViewContent2()}



                </ScrollView>

            </View>
        </SafeAreaView>
    )
}

export default CreatorScreen

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,

        backgroundColor: 'black',
        overflow: 'hidden',
    },
    bar: {
        marginTop: 28,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        marginTop: HEADER_MAX_HEIGHT - 60,
        marginLeft: 10,
        marginRight: 10
    },
    fill: {
        flex: 1,
    },
    row: {
        height: 40,
        margin: 16,
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        justifyContent: 'center',
    },




    centeredView: {
        flex: 1,
        flexDirection: "column-reverse",
        backgroundColor: "rgba(0,0,0,.5)",
    },
    modalView: {
        backgroundColor: "white",
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        top: 0
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
        height: height,
    },
    darkContainer: {
        backgroundColor: '#303030',
        width: width,
        height: height,
    },
    lightThemeText: {
        color: 'black',

    },
    darkThemeText: {
        color: 'white',

    },
})
