import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, FlatList, Image, TouchableOpacity, Share, Modal, Pressable } from 'react-native'
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { dummyFeed } from '../../../data/Data'
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalizationContext } from '../../../components/context'
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
var feed = dummyFeed;



const FeedContent = () => {
    const { t, locale, setLocale } = React.useContext(LocalizationContext);
    const theme = useTheme();

    var colorScheme
    if (theme.dark) {
        colorScheme = 'dark';
    } else {
        colorScheme = 'light';
    }
    const [modalVisible, setModalVisible] = useState(false);
    const [postOption, setPostOption] = useState({});
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
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    return (
        <SafeAreaView style={{ flex: 1, height: height }, themeContainerStyle}>

            <StatusBar barStyle={themeStatusBarStyle} hidden={false} backgroundColor="rgba(0, 0, 0, 0.3)" translucent={true} />
            <View style={{

                innerText: "white", marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                height: 40,
                display: 'flex',
                justifyContent: "center"
            }}>
                <Text style={themeTextStyle}>Feed</Text>
            </View>
            <FlatList data={feed}

                keyExtractor={(item, index) => 'key' + index}


                scrollEnabled
                snapToAlignment="start"
                scrollEventThrottle={16}
                decelerationRate={"fast"}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {

                    return (
                        <View style={[themeContainerStyle, { marginBottom: 20 }]}>

                            <View style={{
                                display: "flex",
                                flexDirection: "row",
                                width: width,
                                padding: 10
                            }}>
                                <Image source={item.authorImg} style={{
                                    width: width / 9,
                                    height: width / 9
                                }} />

                                <View style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-between",

                                }}>
                                    <View style={{ marginLeft: 5 }}>
                                        <Text style={themeTextStyle}>{item.novelName}</Text>
                                        <Text style={themeTextStyle}>{item.author}</Text>
                                    </View>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        justifyContent: "flex-end",

                                    }}>

                                        <TouchableOpacity onPress={() => {
                                            setModalVisible(!modalVisible)
                                            handleOption(item);
                                        }}>
                                            <SimpleLineIcons name="options-vertical" size={24} style={[themeTextStyle, { textAlignVertical: "center" }]} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                            <Image source={item.postImg} style={{
                                width: width,
                                height: 300
                            }} />
                            <View style={{
                                display: "flex",

                                width: width - 20,
                                justifyContent: "center",
                                margin: 10,
                                borderBottomColor: "white",
                                borderBottomWidth: 1,
                                paddingBottom: 10
                            }}>
                                <Text style={themeTextStyle}>{item.topic}</Text>
                                <Text style={themeTextStyle}><Text>{item.type} - </Text><Text>{item.like} {t('FeedPage.likes')}</Text></Text>
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                margin: 10
                            }}>
                                <View><Text style={themeTextStyle}><Text>{t('FeedPage.like')}</Text><Text>{t('FeedPage.comment')}</Text></Text></View>
                                <View><Text style={themeTextStyle}><Text>{t('FeedPage.seeFullEpisode')}</Text><Text>{'>'}</Text></Text></View>
                            </View>

                        </View>

                    )
                }}

            />


            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);
                }}
            >
                <Pressable style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
                    <View style={[styles.modalView, themeContainerStyle]}>
                        <View style={{
                            display: "flex",
                            flexDirection: "row",
                            width: width - 10,
                            padding: 10
                        }}>
                            <Image source={postOption.authorImg} style={{
                                width: width / 9,
                                height: width / 9
                            }} />

                            <View style={{
                                flex: 1,
                                flexDirection: "row",
                                justifyContent: "space-between",

                            }}>
                                <View style={{ marginLeft: 5 }}>
                                    <Text style={themeTextStyle}>{postOption.novelName}</Text>
                                    <Text style={themeTextStyle}>{postOption.author}</Text>
                                </View>

                            </View>

                        </View>

                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 5 }}>
                            <Image source={postOption.authorImg} style={{
                                width: width / 12,
                                height: width / 12
                            }} /><Text style={themeTextStyle}>{t('Modal.Subcribe')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 5 }}>
                            <Image source={postOption.authorImg} style={{
                                width: width / 12,
                                height: width / 12
                            }} /><Text style={themeTextStyle}>{t('Modal.GoToSeries')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 5 }}>
                            <Image source={postOption.authorImg} style={{
                                width: width / 12,
                                height: width / 12
                            }} /><Text style={themeTextStyle}>{t('Modal.GoToCreator')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 5 }}
                            onPress={() => {
                                onShare();
                            }}>
                            <Image source={postOption.authorImg} style={{
                                width: width / 12,
                                height: width / 12
                            }} /><Text style={themeTextStyle}>{t('Modal.Share')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: 5 }}>
                            <Image source={postOption.authorImg} style={{
                                width: width / 12,
                                height: width / 12
                            }} /><Text style={themeTextStyle}>{t('Modal.Report')}</Text>
                        </TouchableOpacity>

                    </View>
                </Pressable>
            </Modal>

        </SafeAreaView>
    )
}

export default FeedContent

const styles = StyleSheet.create({
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

    lightContainer: {
        backgroundColor: 'white',

    },
    darkContainer: {
        backgroundColor: '#303030',

    },
    lightThemeText: {
        color: 'black',
    },
    darkThemeText: {
        color: 'white',
    },
})