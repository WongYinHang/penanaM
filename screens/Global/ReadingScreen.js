import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Image, SafeAreaView, Dimensions, TouchableOpacity, Modal, Pressable, Switch, Share, FlatList, Animated } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { LocalizationContext } from '../../components/context'
import Slider from '@react-native-community/slider';
import { AntDesign, Feather, FontAwesome5 } from '@expo/vector-icons';
//data
import { dummyNovelDetail, dummyNovelEpisodes, dummy1 } from '../../data/Data'
import * as WebBrowser from 'expo-web-browser';
import { TapGestureHandler, State } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getcontentBychapter_id } from '../../api/api'
const { width, height } = Dimensions.get('window')


const ReadingScreen = (props) => {

    const CHAPTER_ID = props.route.params?.id ?? 0;
    const CHAPTER = props.route.params?.chapter ?? 0;
    const CHAPTER_NAME = props.route.params?.name ?? 0;
    const SOTRY_ID = props.route.params?.story_id ?? 0;
    const WORD_COUNT = props.route.params?.word_count ?? 0;
    const CREATOR = props.route.params?.created_by ?? 0;
    const [content, setContent] = useState()
    useEffect(() => {
        getcontent(CHAPTER_ID)
    }, [])
    const getcontent = async (chapter_id) => {
        await getcontentBychapter_id(chapter_id).then((response) => {
            setContent(response.data[0].content)
        }).catch((error) => {
            console.log(error);
        });
    }

    const theme = useTheme();
    const { t, locale, setLocale } = React.useContext(LocalizationContext);
    var colorScheme
    if (theme.dark) {
        colorScheme = 'dark';
    } else {
        colorScheme = 'light';
    }
    const navigation = useNavigation();
    const navigator = (navigationPage, props) => {
        navigation.navigate(navigationPage, props);

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
    const [modalVisible, setModalVisible] = useState(false);
    const [TextmodalVisible, setTextModalVisible] = useState(false);
    const [postOption, setPostOption] = useState({});
    const handleOption = (item) => {

        setPostOption(item)


    }
    const [fontSize, setfontSize] = useState(12);

    const [isMiddle, setIsMiddle] = useState(true);
    const toggleMiddleSwitch = () => {
        setIsMiddle(previousState => !previousState);

    }
    const [isDark, setIsDark] = useState(colorScheme === 'light' ? false : true);
    const themeTextStyle = isDark === false ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = isDark === false ? styles.lightContainer : styles.darkContainer;
    const themeMoralStyle = isDark === false ? styles.lightModal : styles.darkModal;
    const themeBackgroundColor = isDark === false ? "white" : "#1F1F1F";
    const themeborderBottomColor = isDark === false ? "#303030" : "#BDBDBD";
    const themeIconColor = isDark === false ? "#303030" : "#BDBDBD";
    const toggleDarkSwitch = () => {
        setIsDark(previousState => !previousState);
    }




    const seeAll = (name) => {
        if (name == "Preview") {
            return (<View></View>)

        } else {
            return (
                <TouchableOpacity onPress={() => { navigator("SeeAllScreen", { name: name }) }}>
                    <Text style={themeTextStyle}>{t('HomePage.seeAll')}</Text>
                </TouchableOpacity>
            )
        }
    }

    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(123)
    const [commented, setCommented] = useState(123)
    function DoubleTapButton({ onDoubleTap, children }) {
        const onHandlerStateChange = ({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
                onDoubleTap && onDoubleTap();
            }
        };

        return (
            <TapGestureHandler
                onHandlerStateChange={onHandlerStateChange}
                numberOfTaps={2}>
                {children}
            </TapGestureHandler>
        );
    }
    const [barHided, setBarHided] = useState(false)
    const topbar = useRef(new Animated.Value(0)).current;
    const bottombar = useRef(new Animated.Value(height / 11)).current;
    const marginTopValue = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
    const marginTop = useRef(new Animated.Value(marginTopValue)).current;
    const handleHideTopBottomBar = () => {
        if (!barHided) {
            showBar()
        } else {
            hideBar()
        }
        setBarHided(!barHided)
    }
    const showBar = () => {
        Animated.timing(topbar, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
        Animated.timing(bottombar, {
            toValue: height / 11,
            duration: 300,
            useNativeDriver: false,
        }).start();
        Animated.timing(marginTop, {
            toValue: marginTopValue,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }
    const hideBar = () => {
        Animated.timing(topbar, {
            toValue: -120,
            duration: 300,
            useNativeDriver: false,
        }).start();
        Animated.timing(bottombar, {
            toValue: -100,
            duration: 300,
            useNativeDriver: false,
        }).start();
        Animated.timing(marginTop, {
            toValue: -40,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }
    const [chapter, setChapter] = useState(props.route.params.ep)
    const [RecentRead, setRecentRead] = useState({})
    var readingTitle = "Chapter " + CHAPTER + "  -  " + CHAPTER_NAME


    const handleRecentRead = async () => {


        await AsyncStorage.getItem('@StoryRecentRead', (err, result) => {

            if (result == null) {

                result = {
                    story: [
                        {
                            id: SOTRY_ID,
                            storyRecentChapter: CHAPTER,
                        },
                    ]
                }
                AsyncStorage.mergeItem(
                    '@StoryRecentRead',
                    JSON.stringify(result))

                return;
            }
            result = JSON.parse(result)

            for (var i = 0; i < result.story.length; i++) {

                if (result.story[i].id == SOTRY_ID) {



                    result.story[i].storyRecentChapter = CHAPTER;
                    AsyncStorage.mergeItem(
                        '@StoryRecentRead',
                        JSON.stringify(result))
                    return;
                }





            }

            result.story.push(
                {
                    id: SOTRY_ID,
                    storyRecentChapter: chapter
                }
            )
            AsyncStorage.mergeItem(
                '@StoryRecentRead',
                JSON.stringify(result))




        });




    }
    handleRecentRead();
    return (
        <SafeAreaView style={themeContainerStyle}>

            <Animated.View style={{
                marginTop: marginTop,
                top: topbar,
                height: 40,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomColor: themeborderBottomColor, borderBottomWidth: 1,
                backgroundColor: themeBackgroundColor
            }}>
                <Pressable onPress={() => { navigation.goBack() }}>
                    <AntDesign name="arrowleft" size={24}

                        style={[themeTextStyle, {


                            height: 50,
                            paddingLeft: 10,
                            textAlignVertical: "center"
                        }]} />
                </Pressable>
                <Text style={[themeTextStyle, { fontSize: 18 }]}>{readingTitle}</Text>
                <View style={{ flexDirection: "row", zIndex: 100 }}>
                    <TouchableOpacity onPress={() => {
                        setTextModalVisible(!TextmodalVisible)
                    }}>
                        <FontAwesome name="font" size={24} style={[themeTextStyle, { paddingRight: 8, textAlignVertical: "center" }]} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {

                        setModalVisible(!modalVisible)
                        handleOption(dummyNovelDetail);
                        // setModalVisible(!modalVisible)
                        // handleOption(item);
                    }}>
                        <SimpleLineIcons name="options-vertical" size={24} style={[themeTextStyle, { paddingRight: 8, textAlignVertical: "center" }]} />
                    </TouchableOpacity>
                </View>

            </Animated.View>

            <Animated.View style={[{ height: 60, width: width, position: "absolute", bottom: bottombar, left: 0, zIndex: 1000, backgroundColor: themeBackgroundColor, borderTopColor: themeborderBottomColor, borderTopWidth: 1, justifyContent: "center" }]}>
                <View style={{ justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginLeft: 15, marginRight: 15 }}>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}
                        onPress={() => {
                            setLiked(!liked)
                            if (liked == true) {
                                setLikeCount(likeCount - 1)
                            } else {
                                setLikeCount(likeCount + 1)
                            }

                        }}>

                        <AntDesign name="heart" size={24} color={liked === false ? themeIconColor : "red"} />
                        <Text style={[themeTextStyle, { fontSize: 11, lineHeight: 15 }]}>{likeCount}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={() => {
                        navigator("CommentScreen")
                    }}>
                        <FontAwesome5 name="comment-dots" size={24} color={themeIconColor} />
                        <Text style={[themeTextStyle, { fontSize: 11, lineHeight: 15 }]}>{commented}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}>
                        <Image source={dummyNovelDetail.NovelDetail.img} style={{ width: 30, height: 30, justifyContent: "center", alignItems: "center" }} />
                        <Text style={[themeTextStyle, { fontSize: 11, lineHeight: 15 }]}>Support</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }}
                        onPress={() => {
                            if (chapter > 1) {
                                setChapter(chapter - 1)
                            }
                        }}>
                        <AntDesign name="left" size={24} color={themeIconColor} />
                        <Text style={[themeTextStyle, { fontSize: 11, lineHeight: 15 }]}>Prev</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: "center", alignItems: "center" }} onPress={async () => {
                        setChapter(chapter + 1)


                    }}>
                        <AntDesign name="right" size={24} color={themeIconColor} />
                        <Text style={[themeTextStyle, { fontSize: 11, lineHeight: 15 }]}>Next</Text>
                    </TouchableOpacity>
                </View>

            </Animated.View>

            <ScrollView style={{ paddingLeft: 8, paddingRight: 8, }}>
                <DoubleTapButton onDoubleTap={() => { handleHideTopBottomBar() }}>
                    <Text style={[themeTextStyle, { textAlign: (isMiddle === true ? "justify" : "left"), fontSize: fontSize }]}>
                        {content}
                    </Text>
                </DoubleTapButton>
                <View >
                    <View style={styles.bar1}>
                        <Text style={themeTextStyle}>Related story</Text>
                        {seeAll(t('HomePage.preview'))}
                    </View>

                    <FlatList data={dummy1}
                        keyExtractor={(item, index) => 'key' + index}
                        horizontal
                        scrollEnabled
                        snapToAlignment="center"
                        scrollEventThrottle={16}
                        decelerationRate={"fast"}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.container2}>
                                    <TouchableOpacity onPress={() => { navigator("NovelScreen") }}>
                                        <Image style={styles.image2} source={item.image} />
                                        <Text style={themeTextStyle}>{item.type}</Text>
                                    </TouchableOpacity>
                                </View>

                            )
                        }}
                    />
                </View>
                <View style={{ paddingBottom: 200 }}></View>
            </ScrollView>





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
                                    <Text style={themeTextStyle}>{dummyNovelDetail.NovelDetail.title}</Text>
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
                visible={TextmodalVisible}
                onRequestClose={() => {

                    setTextModalVisible(!TextmodalVisible);
                }}
            >
                <Pressable style={styles.centeredViewReverse} onPress={() => setTextModalVisible(!TextmodalVisible)}>
                    <View style={[styles.modalViewReverse, themeMoralStyle, { padding: 8, alignItems: "flex-end", }]}>

                        <View style={{ flexDirection: "row", marginBottom: 15 }}>
                            <Text style={[themeTextStyle, { fontSize: 15 }]}>置中</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isMiddle ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleMiddleSwitch}
                                value={isMiddle}
                            />
                        </View>
                        <View style={{ flexDirection: "row", marginBottom: 15 }}>
                            <Text style={[themeTextStyle, { fontSize: 15 }]}>黑暗模式</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isDark ? "#f5dd4b" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleDarkSwitch}
                                value={isDark}
                            />
                        </View>
                        <View>
                            <Slider
                                style={{ width: 200, height: 40 }}
                                minimumValue={12}
                                value={fontSize}
                                onValueChange={(value) => {
                                    setfontSize(value)
                                }}
                                maximumValue={30}
                                minimumTrackTintColor="#FFFFFF"
                                maximumTrackTintColor="#000000"
                            />
                        </View>
                    </View>
                </Pressable>
            </Modal>


        </SafeAreaView>
    )
}

export default ReadingScreen

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        flexDirection: "column-reverse",
        backgroundColor: "rgba(0,0,0,.5)",
    },
    centeredViewReverse: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "rgba(0,0,0,.5)",
    },
    modalView: {

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
    modalViewReverse: {

        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
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
        height: height + 100
    },
    darkContainer: {
        backgroundColor: '#303030',
        width: width,
        height: height + 100
    },
    lightThemeText: {
        color: 'black',
        lineHeight: 30,

    },
    darkThemeText: {
        color: 'white',
        lineHeight: 30,

    },
    bar1: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        marginRight: 10,
    },
    image2: {
        width: width / 2,
        height: width / 4,
        borderRadius: 5
    },
    container2: {
        flex: 1,

        margin: 10
    },
})
