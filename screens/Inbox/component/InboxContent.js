import React from 'react'
import { View, Text, StyleSheet, Dimensions, SafeAreaView, StatusBar, FlatList, Image, Animated, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native';
import { LocalizationContext } from '../../../components/context'
import { dummyData2 } from '../../../data/Data'
const { width, height } = Dimensions.get('window')

const InboxContent = () => {
    const { t, locale, setLocale } = React.useContext(LocalizationContext);
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
    const scrollX = new Animated.Value(0)
    let flatListRef;
    let position = Animated.divide(scrollX, width)
    const PressType = (i) => {
        flatListRef.scrollToIndex({ animated: true, index: "" + i });
    }
    var data = dummyData2;
    if (data && data.length) {
        return (
            <SafeAreaView style={{ flex: 1, height: height }, themeContainerStyle}>

                <View style={{

                    innerText: "white", marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                    height: 40,
                    display: 'flex',
                    justifyContent: "center"
                }}>
                    <Text style={themeTextStyle}>{t('InboxPage.inbox')}</Text>
                </View>

                <View style={styles.dotView}>
                    {data.map((_, i) => {
                        let type;
                        let entype = ["Gifts", "Messages", "Activity"]
                        let hktype = ["禮物", "訊息", "活動"]
                        if (locale == "EN") {
                            type = entype
                        } else {
                            type = hktype
                        }
                        let opacity = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View
                                key={i}
                                style={{
                                    opacity,
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "center",

                                    margin: 10
                                }}
                            >
                                <TouchableOpacity onPress={() => PressType(i)}>

                                    <Text style={themeTextStyle}>{type[i]}</Text>

                                </TouchableOpacity>
                            </Animated.View>
                        )
                    })}

                </View>
                <Animated.View>
                    <FlatList data={data}
                        style={{ padding: 10 }}
                        ref={(ref) => { flatListRef = ref; }}
                        keyExtractor={(item, index) => 'key' + index}
                        horizontal
                        pagingEnabled
                        scrollEnabled
                        snapToAlignment="center"
                        scrollEventThrottle={16}
                        decelerationRate={"fast"}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {

                            return (<View style={{ width: width }}>
                                <FlatList data={item}

                                    keyExtractor={(item, index) => 'key' + index}
                                    horizontal
                                    pagingEnabled
                                    scrollEnabled
                                    snapToAlignment="start"
                                    scrollEventThrottle={16}
                                    decelerationRate={"fast"}
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item }) => {
                                        if (item.type == "Gifts") {
                                            return (
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: "row",

                                                }}>
                                                    <Image source={item.url} style={{
                                                        width: width / 1.9,
                                                        height: width / 3.8
                                                    }} />
                                                    <View >
                                                        <Text style={themeTextStyle}>{item.title}</Text>

                                                        <View style={{
                                                            flex: 1,
                                                            flexDirection: "row",
                                                            justifyContent: "space-between",
                                                            marginLeft: 10,
                                                            marginRight: 10,
                                                        }}>
                                                            <Text style={themeTextStyle}>{item.type}</Text>
                                                            <Text style={themeTextStyle}>{item.free}</Text>
                                                        </View>

                                                    </View>

                                                </View>
                                            )
                                        } else if (item.type == "Messages") {
                                            return (
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: "row",

                                                }}>
                                                    <Image source={item.url} style={{
                                                        width: width / 1.9,
                                                        height: width / 3.8
                                                    }} />
                                                    <View >
                                                        <Text style={themeTextStyle}>{item.title}</Text>

                                                        <View style={{
                                                            flex: 1,
                                                            flexDirection: "row",
                                                            justifyContent: "space-between",
                                                            marginLeft: 10,
                                                            marginRight: 10,
                                                        }}>
                                                            <Text style={themeTextStyle}>{item.type}</Text>
                                                            <Text style={themeTextStyle}>{item.free}</Text>
                                                        </View>

                                                    </View>

                                                </View>
                                            )
                                        } else if (item.type == "Activity") {
                                            return (
                                                <View style={{
                                                    flex: 1,
                                                    flexDirection: "row",

                                                }}>
                                                    <Image source={item.url} style={{
                                                        width: width / 1.9,
                                                        height: width / 3.8
                                                    }} />
                                                    <View >
                                                        <Text style={themeTextStyle}>{item.title}</Text>

                                                        <View style={{
                                                            flex: 1,
                                                            flexDirection: "row",
                                                            justifyContent: "space-between",
                                                            marginLeft: 10,
                                                            marginRight: 10,
                                                        }}>
                                                            <Text style={themeTextStyle}>{item.type}</Text>
                                                            <Text style={themeTextStyle}>{item.free}</Text>
                                                        </View>

                                                    </View>

                                                </View>
                                            )
                                        }

                                    }}

                                />
                            </View>)
                        }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false }
                        )}
                    />
                </Animated.View>

            </SafeAreaView>
        )
    }
    return null
}

export default InboxContent

const styles = StyleSheet.create({
    dotView: {
        display: "flex",
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    },
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
        margin: 5
    },
    darkThemeText: {
        color: 'white',
        margin: 5
    },
})
