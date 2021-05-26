import React from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, Animated, TouchableOpacity } from 'react-native'
import DailylItem from './DailyItem'
import { LocalizationContext } from '../../../components/context'
const { width, heigth } = Dimensions.get('window')

const Daily = ({ data, theme }) => {
    const { t, locale, setLocale } = React.useContext(LocalizationContext);
    let colorScheme = theme;
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const scrollX = new Animated.Value(0)
    let flatListRef;
    let position = Animated.divide(scrollX, width)
    const PressDay = (i) => {
        flatListRef.scrollToIndex({ animated: true, index: "" + i });
    }
    if (data && data.length) {
        return (
            <View >
                <View style={styles.DayView}>
                    {data.map((_, i) => {
                        let days;
                        let endays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                        let hkdays = ["一", "二", "三", "四", "五", "六", "日"]
                        if (locale == "EN") {
                            days = endays
                        } else {
                            days = hkdays
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
                                    opacity, flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-between"
                                }}
                            >
                                <TouchableOpacity style={{ margin: 10 }} onPress={() => PressDay(i)}>
                                    <View>
                                        <Text style={themeTextStyle}>{days[i]}</Text>
                                    </View>
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
                            return <DailylItem item={item} theme={theme} />
                        }}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false }
                        )}
                    />
                </Animated.View>
                <View>
                    <Text style={themeTextStyle}>{t('HomePage.moreSeries')}...</Text>
                </View>
            </View>
        )
    }
    return null
}
const styles = StyleSheet.create({
    DayView: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: "gray",
        marginTop: 15,
        marginBottom: 15
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

    }
})

export default Daily