import React from 'react'
import { View, Text, Image, Dimensions, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window')

const DailyItem = ({ item, theme }) => {
    const navigation = useNavigation();
    const navigator = (navigationPage, props) => {
        navigation.navigate(navigationPage, props);
    }
    let colorScheme = theme;
    const themeStatusBarStyle = colorScheme === 'light' ? 'dark-content' : 'light-content';
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    return (
        <View style={{ width: width }}>
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
                    return (
                        <TouchableOpacity style={{
                            flex: 1,
                            flexDirection: "row"
                        }} onPress={() => { navigator("NovelScreen", { id: item.id }) }}>

                            <Image source={item.url} style={{
                                width: width / 1.9,
                                height: width / 3.8
                            }} />
                            <View >
                                <Text style={themeTextStyle}>{item.title}</Text>
                                <Text style={themeTextStyle}>{item.description}</Text>
                                <View style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}>
                                    <Text style={themeTextStyle}>{item.type}</Text>
                                    <Text style={themeTextStyle}>{item.like}</Text>
                                </View>
                            </View>

                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    lightContainer: {
        backgroundColor: 'white',
    },
    darkContainer: {
        backgroundColor: '#303030',
    },
    lightThemeText: {
        color: 'black',
        margin: 5
    },
    darkThemeText: {
        color: 'white',
        margin: 5
    }
})


export default DailyItem