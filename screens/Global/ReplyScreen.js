import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, TextInput, SafeAreaView, Dimensions, TouchableOpacity, Pressable, KeyboardAvoidingView, Modal, Image } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import { useTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window')
const ReplyScreen = (props) => {


    const replyData = [
        {
            username: "user1",
            comment: "comment comment comment comment comment com",
            likes: 123,
            replies: 0,
            time: 1000000
        },
        {
            username: "user1",
            comment: "commentcommentcomment",
            likes: 123,
            replies: 0,
            time: 1000000
        }, {
            username: "user1",
            comment: "commentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcommentcomment",
            likes: 123,
            replies: 0,
            time: 1000000
        }, {
            username: "user1",
            comment: "commentcommentcomment",
            likes: 123,
            replies: 0,
            time: 1000000
        }, {
            username: "user1",
            comment: "commentcommentcommentcommentcommentcomment",
            likes: 123,
            replies: 0,
            time: 1000000
        }, {
            username: "user1",
            comment: "commentcommentcomment",
            likes: 123,
            replies: 0,
            time: 1000000
        }, {
            username: "user1",
            comment: "commentcommentcomment",
            likes: 123,
            replies: 0,
            time: 1000000
        },
        {
            username: "user1",
            comment: "commentcommentcomment",
            likes: 123,
            replies: 0,
            time: 1000000
        },
        {
            username: "user1",
            comment: "commentcommentcomment",
            likes: 123,
            replies: 0,
            time: 1000000
        }, {
            username: "user1",
            comment: "commentcommentcomment",
            likes: 123,
            replies: 0,
            time: 1000000
        }, {
            username: "user1",
            comment: "commentcommentcomment",
            likes: 123,
            replies: 0,
            time: 1000000
        }, {
            username: "user1",
            comment: "commentcommentcomment",
            likes: 123,
            replies: 0,
            time: 1000000
        }, {
            username: "user1",
            comment: "commentcommentcomment",
            likes: 123,
            replies: 0,
            time: 1000000
        }, {
            username: "user2",
            comment: "commentcommentcomment",
            likes: 123,
            replies: 0,
            time: 1000000
        },
    ]
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
    const themeMoralStyle = colorScheme === 'light' ? styles.lightModal : styles.darkModal;
    const [commentInput, setCommentInput] = useState('');
    const [commentBarHeight, setCommentBarHeight] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [rank, setRank] = useState(true);
    const [newest, setNewest] = useState(false);
    const [oldest, setOldest] = useState(false);
    const inputBar = () => {
        return (
            <View style={[{ position: "absolute", bottom: commentBarHeight, backgroundColor: themeContainerStyle.backgroundColor, width: width, height: 60, justifyContent: "center", alignItems: "center" }]}>
                <TextInput
                    style={[themeTextStyle, {
                        height: 40, borderColor: themeTextStyle.color, borderWidth: 1, borderRadius: 15, paddingLeft: 15,
                        width: width - 30,
                    }]}
                    placeholder="Add a reply..."
                    placeholderTextColor={themeTextStyle.color}
                    onChangeText={text => {
                        setCommentInput(text)
                    }}
                    value={commentInput}

                />
                <TouchableOpacity style={{ position: "absolute", right: 30, height: 40, width: 40, alignItems: "center", justifyContent: "center" }}
                    onPress={() => {
                        //do something
                    }}>
                    <Text style={[themeTextStyle]}>Post</Text>
                </TouchableOpacity>
            </View>
        )
    }
    const likescount = (likes) => {
        if (likes == 1) {
            return <Text style={themeTextStyle}>like</Text>
        } else {
            return <Text style={themeTextStyle}>likes</Text>
        }
    }
    const repliescount = (replies) => {
        if (replies == 1) {
            return <Text style={themeTextStyle}>reply</Text>
        } else {
            return <Text style={themeTextStyle}>replies</Text>
        }
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={[themeContainerStyle, { justifyContent: "space-between" }]}>

            <View

                style={{
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
                }]}>Reply</Text>
                <View style={{ flexDirection: "row", zIndex: 100 }}>

                    <TouchableOpacity onPress={() => {

                        setModalVisible(!modalVisible)


                    }}>
                        <SimpleLineIcons name="options-vertical" size={24} style={[themeTextStyle, {
                            paddingRight: 8, textAlignVertical: "center", borderTopColor: "black", height: 50,
                            borderTopWidth: 1,
                            borderBottomColor: "black",
                            borderBottomWidth: 1,
                        }]} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <TouchableOpacity style={[styles.container2, { padding: 15, paddingLeft: 30 }]}>
                    <View style={{ flexDirection: "row" }}>
                        <Image style={{ height: 60, width: 60, backgroundColor: "white", borderRadius: 90 }} />
                        <View style={{ flexDirection: "column", paddingLeft: 15, width: width * 0.7, justifyContent: "space-between", minHeight: 70 }}>
                            <Text style={themeTextStyle}>{props.route.params.username}</Text>
                            <Text style={[themeTextStyle, {}]} numberOfLines={8} textBreakStrategy="simple">{props.route.params.comment}</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={themeTextStyle}>{props.route.params.likes} </Text>
                                {likescount(props.route.params.likes)}
                                <Text style={themeTextStyle}>  -  </Text>
                                <TouchableOpacity style={{ flexDirection: "row" }}>
                                    <Text style={themeTextStyle}>{props.route.params.replies} </Text>
                                    {repliescount(props.route.params.replies)}
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>


                </TouchableOpacity>
                {replyData.map((item, i) =>
                    <TouchableOpacity style={[styles.container2, { padding: 15, paddingLeft: 60 }]} key={i}>
                        <View style={{ flexDirection: "row" }}>
                            <Image style={{ height: 30, width: 30, backgroundColor: "white", borderRadius: 90 }} />
                            <View style={{ flexDirection: "column", paddingLeft: 15, width: width * 0.7, justifyContent: "space-between", minHeight: 70 }}>
                                <Text style={themeTextStyle}>{item.username}</Text>
                                <Text style={[themeTextStyle, {}]} numberOfLines={8} textBreakStrategy="simple">{item.comment}</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={themeTextStyle}>{item.likes} </Text>
                                    {likescount(item.likes)}


                                </View>
                            </View>

                        </View>


                    </TouchableOpacity>

                )}

                <View style={{ paddingBottom: 100 }}></View>

            </ScrollView>


            {inputBar()}

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {

                    setModalVisible(!modalVisible);
                }}
            >
                <Pressable style={styles.centeredView} >

                    <View style={[styles.modalView, themeMoralStyle, { paddingBottom: 20, flex: 0.35 }]}>

                        <Text style={[themeTextStyle, { paddingLeft: 20, paddingRight: 20, paddingTop: 20 }]}>Sort by</Text>
                        <View style={{ flexDirection: "row", paddingLeft: 20, paddingRight: 20, paddingTop: 20, justifyContent: "space-between" }}>
                            <Text style={themeTextStyle}>Rank</Text>
                            <CheckBox
                                tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                                tintColor={"#C4C4C4"}
                                onTintColor={"#FCAE24"}
                                disabled={rank}
                                value={rank}
                                onValueChange={() => {

                                    setRank(true)
                                    setNewest(false)
                                    setOldest(false)


                                }}
                            />
                        </View>

                        <View style={{ flexDirection: "row", paddingLeft: 20, paddingRight: 20, paddingTop: 20, justifyContent: "space-between" }}>
                            <Text style={themeTextStyle}>Newest</Text>
                            <CheckBox
                                tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                                tintColor={"#C4C4C4"}
                                onTintColor={"#FCAE24"}
                                disabled={newest}
                                value={newest}
                                onValueChange={() => {

                                    setRank(false)
                                    setNewest(true)
                                    setOldest(false)


                                }}
                            />
                        </View>
                        <View style={{ flexDirection: "row", paddingLeft: 20, paddingRight: 20, paddingTop: 20, justifyContent: "space-between" }}>
                            <Text style={themeTextStyle}>Oldest</Text>
                            <CheckBox
                                tintColors={{ true: "#FCAE24", false: "#C4C4C4" }}
                                tintColor={"#C4C4C4"}
                                onTintColor={"#FCAE24"}
                                disabled={oldest}
                                value={oldest}
                                onValueChange={() => {

                                    setRank(false)
                                    setNewest(false)
                                    setOldest(true)


                                }}
                            />
                        </View>

                    </View>
                    <Pressable style={{ flex: 1 }} onPress={() => setModalVisible(!modalVisible)}></Pressable>
                </Pressable>
            </Modal>
        </KeyboardAvoidingView>

    )
}

export default ReplyScreen

const styles = StyleSheet.create({
    lightContainer: {
        backgroundColor: 'white',

        height: height + StatusBar.currentHeight
    },
    darkContainer: {
        backgroundColor: '#303030',

        height: height + StatusBar.currentHeight
    },
    lightThemeText: {
        color: 'black',

    },
    darkThemeText: {
        color: 'white',

    },
    lightModal: {
        backgroundColor: 'white',
    },
    darkModal: {
        backgroundColor: '#303030',
    },

    container2: {
        flex: 1,

        margin: 10
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
})
