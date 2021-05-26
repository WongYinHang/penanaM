import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Text, SafeAreaView, Dimensions, View, TouchableOpacity, StatusBar, Image, Animated, Share, ImageBackground, Modal, Pressable } from 'react-native'
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { LocalizationContext } from '../../components/context'
import { dummyNovelDetail, dummyNovelEpisodes, dummyData1, dummyImage } from '../../data/Data'
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getuserByid, getchapterBystory_id } from '../../api/api'

const { width, height } = Dimensions.get('window')
const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 70;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const NovelSrceen = (props) => {
    useEffect(() => {
        getuser(100482)
        getchapter(STORY_ID)
        console.log(userData);
        console.log(chapterlist);
        return () => {


        }
    }, [props.route.params.id])
    const navigation = useNavigation();



    const STORY_ID = props.route.params?.id ?? 0;
    const CREATOR_ID = props.route.params?.created_by ?? 0;
    const STORY_GENRE_SID = props.route.params?.genre_sid ?? 0;
    const STORY_SUB_GENRE1 = props.route.params?.subgenre1 ?? 0;
    const STORY_SUB_GENRE2 = props.route.params?.subgenre2 ?? 0;
    const STORY_TITLE = props.route.params?.title ?? 0;
    const STORY_TYPE = props.route.params?.story_type ?? 0;
    const PREVIEW = props.route.params?.preview ?? 0;
    const POPULARITY = props.route.params?.popularity ?? 0


    const [userData, setUserData] = useState({
        username: "....",
        id: STORY_ID
    });
    const [chapterlist, setChapterlist] = useState([])
    const USER_IMG = "https://d3tdq0klf4qqp.cloudfront.net/images/users/large" + userData.profile_picture
    const STORY_IMG = "https://d3tdq0klf4qqp.cloudfront.net/images/books" + props.route.params?.book_cover ?? 0;

    const getuser = async (userid) => {

        await getuserByid(userid).then((response) => {
            setUserData(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }
    const getchapter = async (story_id) => {
        await getchapterBystory_id(story_id).then((response) => {
            setChapterlist(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }
    // while (userDataLoaded === false) {
    //     getuser(props.route.params.id)
    //     if (userData.username !== "....") {
    //         setUserDataLoaded(true)
    //     }
    // }



    const { t, locale, setLocale } = React.useContext(LocalizationContext);
    const [listY, setlistY] = useState(0)
    const scrollRef1 = useRef();
    const scrollRef2 = useRef();
    const scrollX = new Animated.Value(0)
    const scrollY = new Animated.Value(0)
    const scrollRefX = useRef();

    const navigator = (navigationPage, props) => {

        navigation.navigate(navigationPage, props);

    }

    const [modalVisible, setModalVisible] = useState(false);
    const [picVisible, setPicVisible] = useState(false);
    const [postOption, setPostOption] = useState({});
    const [bookmarked, setBookmarked] = useState(false)
    const handleOption = (item) => {

        setPostOption(item)
    }
    const onShare = async () => {
        try {
            const result = await Share.share({

                title: "Share!!!",
                message: 'Sharing app or link or website',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {

            alert(error.message);
        }
    };


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
    var novel = [dummyNovelEpisodes, dummyNovelDetail]
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
    const themeborderBottomColor = colorScheme === 'light' ? "#303030" : "#BDBDBD";
    const themeBackgroundColor = colorScheme === 'light' ? "white" : "#1F1F1F";



    const [recentRead, setRecentRead] = useState(false)
    const [chapter, setChapter] = useState(0)
    const handleRecentRead = async () => {

        // await AsyncStorage.removeItem('@StoryRecentRead')
        await AsyncStorage.getItem('@StoryRecentRead', (err, result) => {
            if (result != null) {
                result = JSON.parse(result)
                for (var i = 0; i < result.story.length; i++) {
                    if (result.story[i].id == STORY_ID) {
                        setChapter(result.story[i].storyRecentChapter)
                        setRecentRead(true)
                        return
                    }
                }
                setRecentRead(false)
            }

        });
    }
    handleRecentRead();
    const bottomBar = () => {
        if (!recentRead) {
            return (
                <View style={[{ height: 60, width: width, position: "absolute", bottom: height / 11, left: 0, zIndex: 1000, backgroundColor: themeBackgroundColor, borderTopColor: themeborderBottomColor, borderTopWidth: 1, justifyContent: "center" }]}>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}>
                        <Text style={[themeTextStyle, { backgroundColor: "#FCAE24", padding: 11, borderRadius: 16 }]}>Read Ep.1 for free</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={[{ height: 60, width: width, position: "absolute", bottom: height / 11, left: 0, zIndex: 1000, backgroundColor: themeBackgroundColor, borderTopColor: themeborderBottomColor, borderTopWidth: 1, justifyContent: "center" }]}>

                    <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginLeft: 15, marginRight: 15 }}>
                        <Image source={dummyNovelDetail.NovelDetail.img} style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center" }} />
                        <Text style={[themeTextStyle, { fontSize: 18 }]}>Chapter {chapter} - {chapterlist[chapter]?.name ?? "loading"}</Text>
                        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={() => { navigator("ReadingScreen", { id: id, ep: chapter }) }}>
                            <Text style={[themeTextStyle, { backgroundColor: "#FCAE24", paddingLeft: 11, paddingRight: 11, paddingTop: 8, paddingBottom: 8, borderRadius: 16 }]}>Continue</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            )
        }
    }
    const _renderScrollViewContent = () => {

        return (
            <Animated.View style={[styles.scrollViewContent]}>


                {chapterlist.map((item, i) => {

                    const CHAPTER_IMG = "https://d3tdq0klf4qqp.cloudfront.net/images/books" + item.chapter_pic ?? 0;
                    return (
                        <TouchableOpacity style={{
                            flex: 1,
                            flexDirection: "row",
                            paddingBottom: 10
                        }}
                            key={i}
                            onPress={() => { navigator("ReadingScreen", item) }}>

                            <Image source={item.img} style={{
                                width: width / 1.9,
                                height: width / 3.8
                            }} />
                            <View style={{
                                display: "flex",
                                flex: 1,
                                margin: 5,
                                justifyContent: "space-between"
                            }}>
                                <View>
                                    <Text style={themeTextStyle}>Ep. {item.chapter}</Text>
                                    <Text style={themeTextStyle}>{item?.name ?? "Beginning"}</Text>
                                </View>

                            </View>

                        </TouchableOpacity>
                    )
                }
                )}
                <View style={{ padding: 100 }}></View>
            </Animated.View>
        );
    }
    const _renderScrollViewContent2 = () => {

        return (
            <Animated.View style={[styles.scrollViewContent]}>
                <Text style={themeTextStyle}>{t('Novel.Description')}</Text>
                <Text style={themeTextStyle}>{STORY_TITLE}</Text>
                <View style={{ flexDirection: "row" }}>
                    <TouchableOpacity style={{ flexDirection: "row", marginLeft: 10 }}
                        onPress={() => {

                            navigator("SeeAllScreen", STORY_GENRE_SID)
                        }}>
                        <Image source={dummyImage}
                            style={{
                                width: width / 15, height: width / 15
                            }} />
                        <Text style={themeTextStyle}>  |  </Text>
                        <Text style={themeTextStyle}>{STORY_GENRE_SID}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", marginLeft: 10 }}
                        onPress={() => {

                            navigator("SeeAllScreen", STORY_SUB_GENRE1)
                        }}>
                        <Image source={dummyImage}
                            style={{
                                width: width / 15, height: width / 15
                            }} />
                        <Text style={themeTextStyle}>  |  </Text>
                        <Text style={themeTextStyle}>{STORY_SUB_GENRE1}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: "row", marginLeft: 10 }}
                        onPress={() => {

                            navigator("SeeAllScreen", STORY_SUB_GENRE2)
                        }}>
                        <Image source={dummyImage}
                            style={{
                                width: width / 15, height: width / 15
                            }} />
                        <Text style={themeTextStyle}>  |  </Text>
                        <Text style={themeTextStyle}>{STORY_SUB_GENRE2}</Text>
                    </TouchableOpacity>
                </View>
                <Text style={themeTextStyle}>{t('Novel.Creator')}</Text>
                <TouchableOpacity style={{ flexDirection: "row", marginLeft: 10 }}
                    onPress={() => { navigator("CreatorScreen", userData) }}>
                    <Image
                        source={{
                            uri: USER_IMG,
                        }}
                        style={{
                            width: width / 15, height: width / 15
                        }} />

                    <Text style={themeTextStyle}>{userData.username}</Text>
                </TouchableOpacity>
                <View style={{ padding: 100 }}></View>
            </Animated.View>
        );
    }





    return (
        <SafeAreaView style={{ flex: 1, height: height }, themeContainerStyle}>



            <Animated.View style={[styles.header, { height: headerHeight, zIndex: 1000 }]}>
                <Animated.Image source={{
                    uri: STORY_IMG,
                }} style={{
                    width: width,
                    height: height,
                    zIndex: -1,
                    position: "absolute",
                    top: imgtop,
                    left: 0,
                    right: 0,
                    opacity: 0.8,
                }} blurRadius={3}></Animated.Image>

                <View style={{
                    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                    height: 40,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginRight: 10,

                }}>
                    <Pressable onPress={() => { navigation.goBack() }}>
                        <AntDesign name="arrowleft" size={24} color="white"
                            iconStyle={false}

                            style={{

                                zIndex: 100,
                                height: 50,
                                paddingLeft: 10,
                                textAlignVertical: "center"
                            }} />
                    </Pressable>
                    <View style={{ flexDirection: "row", zIndex: 100 }}>
                        <TouchableOpacity onPress={() => {
                            setBookmarked(!bookmarked)
                        }}>
                            <FontAwesome name="bookmark" size={24} style={[themeTextStyle, { paddingRight: 8, textAlignVertical: "center", color: bookmarked === true ? "orange" : "white" }]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {

                            setModalVisible(!modalVisible)
                            handleOption(dummyNovelDetail);

                        }}>
                            <SimpleLineIcons name="options-vertical" size={24} style={[themeTextStyle, { paddingRight: 8, textAlignVertical: "center" }]} />
                        </TouchableOpacity>
                    </View>

                </View>


                <Animated.View style={{
                    width: 150,
                    top: -35,
                    left: (width / 2) - 75,
                    flexDirection: "row",
                    justifyContent: "center",
                    opacity: titleopacity,

                }}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 20 }}>{STORY_TITLE}</Text>
                </Animated.View>


                <Animated.View style={{
                    margin: 10,
                    top: top,
                    opacity: opacity,
                    zIndex: -1
                }} >

                    <View style={{ flexDirection: "row", }}>
                        <TouchableOpacity onPress={() => {
                            setPicVisible(!picVisible)
                        }}>
                            <Image source={{
                                uri: STORY_IMG
                            }} style={{

                                width: width / 1.5,
                                height: width / 3,
                                zIndex: -1
                            }} />
                        </TouchableOpacity>
                        <View style={{
                            marginLeft: 5, flex: 1,
                            flexDirection: "column",
                            justifyContent: "space-between"
                        }}>
                            <View>
                                <Text style={themeTextStyle}>{STORY_TITLE}</Text>
                                <TouchableOpacity style={{ flexDirection: "row" }}
                                    onPress={() => { navigator("CreatorScreen", userData) }}>
                                    <Text style={[themeTextStyle, { flexWrap: "wrap" }]}>{userData.username}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ margin: 15, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                        <View style={{ flexDirection: "row", }}>
                            <Image source={dummyImage}
                                style={{
                                    width: width / 15, height: width / 15
                                }} />
                            <Text style={themeTextStyle}>  |  </Text>
                            <Text style={themeTextStyle}>{STORY_TYPE}</Text>
                        </View>
                        <Text style={themeTextStyle}>{PREVIEW} {t('Novel.Views')}</Text>
                        <Text style={themeTextStyle}>{POPULARITY} {t('Novel.Likes')}</Text>

                    </View>
                    <View style={{ flexDirection: "row", }}>

                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 10 }}
                                onPress={() => {

                                    navigator("SeeAllScreen", STORY_GENRE_SID)
                                }}>
                                <Image source={dummyImage}
                                    style={{
                                        width: width / 15, height: width / 15
                                    }} />
                                <Text style={themeTextStyle}>  |  </Text>
                                <Text style={themeTextStyle}>{STORY_GENRE_SID}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 10 }}
                                onPress={() => {

                                    navigator("SeeAllScreen", STORY_SUB_GENRE1)
                                }}>
                                <Image source={dummyImage}
                                    style={{
                                        width: width / 15, height: width / 15
                                    }} />
                                <Text style={themeTextStyle}>  |  </Text>
                                <Text style={themeTextStyle}>{STORY_SUB_GENRE1}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: "row", marginLeft: 10 }}
                                onPress={() => {

                                    navigator("SeeAllScreen", STORY_SUB_GENRE2)
                                }}>
                                <Image source={dummyImage}
                                    style={{
                                        width: width / 15, height: width / 15
                                    }} />
                                <Text style={themeTextStyle}>  |  </Text>
                                <Text style={themeTextStyle}>{STORY_SUB_GENRE2}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </Animated.View>


            </Animated.View>
            <Animated.View style={{ marginTop: 5, top: top2 }}>
                <View style={{
                    flexDirection: "row", justifyContent: "space-evenly",
                    marginTop: 10, marginBottom: 10
                }}>
                    <TouchableOpacity style={{ width: width / 2, alignItems: "center", zIndex: 20 }} onPress={() => {


                        scrollRefX.current.scrollTo({ x: 0, animated: true })


                    }
                    }>
                        <Animated.Text style={[themeTextStyle, { fontSize: 18, opacity: textopacity1 }]}>{t('Novel.Episodes')}</Animated.Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: width / 2, alignItems: "center", zIndex: 20 }} onPress={() => {

                        scrollRefX.current.scrollTo({ x: width, animated: true })



                    }
                    }>
                        <Animated.Text style={[themeTextStyle, { fontSize: 18, opacity: textopacity2 }]}>{t('Novel.Details')}</Animated.Text>
                    </TouchableOpacity>
                </View>
                <Animated.View style={{ width: width / 2, borderBottomWidth: 1, borderBottomColor: themeborderBottomColor, left: borderX }}></Animated.View>
            </Animated.View>
            <View >
                <ScrollView
                    style={{ zIndex: 1 }}
                    horizontal
                    pagingEnabled
                    ref={scrollRefX}
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }], {

                            listener: (event) => {
                                scrollRef1.current.scrollTo({
                                    y: 0,
                                    animated: true
                                })
                                scrollRef2.current.scrollTo({
                                    y: 0,
                                    animated: true
                                })

                            },
                            useNativeDriver: false
                        }
                        )

                    }
                >



                    <ScrollView
                        ref={scrollRef1}
                        style={[{ width: width, marginTop: 70, minHeight: height, zIndex: 1 }]}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onScroll={

                            Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                                listener: (event) => {
                                    scrollRef2.current.scrollTo({
                                        y: 0,
                                        animated: true
                                    })
                                },
                                useNativeDriver: false
                            }
                            )
                        }
                    >

                        {_renderScrollViewContent()}
                    </ScrollView>



                    <ScrollView
                        ref={scrollRef2}
                        style={[styles.fill, { width: width, marginTop: 60 }]}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        onScroll={
                            Animated.event(
                                [{ nativeEvent: { contentOffset: { y: scrollY } } }], {

                                listener: (event) => {
                                    scrollRef1.current.scrollTo({
                                        y: 0,
                                        animated: true
                                    })
                                },
                                useNativeDriver: false
                            }
                            )

                        }
                    >
                        {_renderScrollViewContent2()}
                    </ScrollView>
                </ScrollView>
            </View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);
                }}
            >
                <Pressable style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
                    <View style={[styles.modalView, themeMoralStyle]}>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            width: width - 10,
                            padding: 10,
                            alignItems: "center"
                        }}>
                            <Image source={dummyNovelDetail.NovelDetail.img} style={{
                                width: width / 9,
                                height: width / 9
                            }} />

                            <View style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between",

                            }}>
                                <View style={{ marginLeft: 5 }}>
                                    <Text style={themeTextStyle}>{STORY_TITLE}</Text>
                                    <Text style={themeTextStyle}>{dummyNovelDetail.NovelDetail.creator.name}</Text>
                                </View>

                            </View>

                        </View>

                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 5 }}>
                            {/* <Image source={postOption.NovelDetail.creator.img} style={{
                                width: width / 12,
                                height: width / 12
                            }} /> */}
                            <Text style={themeTextStyle}>{t('Modal.Subcribe')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 5 }}>
                            {/* <Image source={postOption.NovelDetail.creator.img} style={{
                                width: width / 12,
                                height: width / 12
                            }} /> */}
                            <Text style={themeTextStyle}>{t('Modal.GoToSeries')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 5 }}>
                            {/* <Image source={postOption.NovelDetail.creator.img} style={{
                                width: width / 12,
                                height: width / 12
                            }} /> */}
                            <Text style={themeTextStyle}>{t('Modal.GoToCreator')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 5 }}
                            onPress={() => {
                                onShare();
                            }}>
                            {/* <Image source={postOption.NovelDetail.creator.img} style={{
                                width: width / 12,
                                height: width / 12
                            }} /> */}
                            <Text style={themeTextStyle}>{t('Modal.Share')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 5 }}>
                            {/* <Image source={postOption.NovelDetail.creator.img} style={{
                                width: width / 12,
                                height: width / 12
                            }} /> */}
                            <Text style={themeTextStyle}>{t('Modal.Report')}</Text>
                        </TouchableOpacity>

                    </View>
                </Pressable>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={picVisible}
                onRequestClose={() => {

                    setPicVisible(!picVisible);
                }}
            >
                <Pressable style={styles.centeredPicView} onPress={() => setPicVisible(!picVisible)}>



                    <Image source={{
                        uri: STORY_IMG,
                    }} style={{
                        backgroundColor: "black",
                        width: width,
                        height: width / 2
                    }} />




                </Pressable>
            </Modal>
            {bottomBar()}
        </SafeAreaView >










    )
}

export default NovelSrceen

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
    centeredPicView: {
        flex: 1,

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,.9)",
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
        height: height + 100,
    },
    darkContainer: {
        backgroundColor: '#303030',
        width: width,
        height: height + 100,
    },
    lightThemeText: {
        color: 'black',
        lineHeight: 20,
        fontSize: 15
    },
    darkThemeText: {
        color: 'white',
        lineHeight: 20,
        fontSize: 15
    },
})
