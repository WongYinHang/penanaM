import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, FlatList, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';
import { LocalizationContext } from '../../../components/context'
import { AntDesign } from '@expo/vector-icons';
import Carousel from './Carousel'
import Daily from './Daily'
import Charts from './Charts'

import { dummyData, dummyImage, dummyData1 } from '../../../data/Data'
import { getstoryBypopularity, getstoryByGenre_sid } from '../../../api/api'
import { Button } from 'react-native';

var imageWidth = Dimensions.get('window').width;
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;
const HomeContent = () => {
    useEffect(() => {
        getstoryBypop();

        getstoryByGenre(1);



        return () => {
            getstoryByGenre(5);

            getstoryByGenre(6);
        }
    }, [])
    const [popStory, setPopStory] = useState(dummyData)
    const [genreStory, setGenreStory] = useState([
        dummyData, dummyData, dummyData, dummyData, dummyData, dummyData, dummyData, dummyData, dummyData, dummyData, dummyData, dummyData, dummyData
    ])
    const [genreStoryLoaded, setgenreStoryLoaded] = useState(false)




    const getstoryByGenre = async (Genre) => {
        await getstoryByGenre_sid(Genre).then((response) => {
            var GS = genreStory;
            GS[Genre] = { id: Genre, Story: response.data }

            setGenreStory(GS)
            setgenreStoryLoaded(true)
        }).catch((error) => {
            console.log(error);
        });


    }
    const getstoryBypop = async () => {
        await getstoryBypopularity().then((response) => {

            setPopStory(response.data)
        }).catch((error) => {
            console.log(error);
        });
    }

    const { t, locale, setLocale } = React.useContext(LocalizationContext);
    const navigation = useNavigation();
    const navigator = (navigationPage, props) => {
        navigation.navigate(navigationPage, props);

    }
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


    const [seletedSortingList, setSeletedSortingList] = useState([


        {
            name: "Preview",
            type: "normal",
            size: "small"
        },
        {
            name: "Top Series this Week!",
            type: "normal",
            size: "big"
        },
        {
            name: "Preview",
            type: "normal",
            size: "small"
        },
        {
            name: "Daily",
            type: "daily",
            size: ""
        },
        {
            name: "Preview",
            type: "normal",
            size: "small"
        },
        {
            name: "Popular charts",
            type: "chart",
            size: ""
        },
        {
            name: "Preview",
            type: "normal",
            size: "small"
        },
        {
            name: "Top XXXX",
            type: "normal",
            size: "small"
        },
        {
            name: "Top XXXX",
            type: "normal",
            size: "small"
        },
        {
            name: "Top XXXX",
            type: "normal",
            size: "small"
        },
        {
            name: "Top XXXX",
            type: "normal",
            size: "small"
        },
        {
            name: "Top XXXX",
            type: "normal",
            size: "small"
        },
        {
            name: "Top XXXX",
            type: "normal",
            size: "small"
        },

    ])

    const SearchButton = () => {
        return (
            <TouchableOpacity style={[themeContainerStyle, styles.search, { borderColor: "#3E3E3E", borderWidth: 1 }]} onPress={() => { navigator("SearchScreen") }}>
                <AntDesign name="search1" size={36}
                    style={[themeTextStyle, {
                        textAlignVertical: "center",
                        textAlign: "center",

                        height: width / 6,
                        width: width / 6,
                        alignItems: "center",
                        justifyContent: "center",
                        borderTopLeftRadius: 8
                    }]} />
            </TouchableOpacity>
        )
    }



    const SortingLists = () => {
        return seletedSortingList.map((item, index) => {

            if (item.type == "daily") {
                return (
                    <View key={index}>
                        <View style={styles.bar1}>
                            <Text style={themeTextStyle}>{t('HomePage.dailyCalendar')}</Text>
                            <TouchableOpacity onPress={() => { navigator("SeeAllScreen", { name: t('HomePage.dailyCalendar') }) }}>
                                <Text style={themeTextStyle}>{t('HomePage.seeAll')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bar1}>
                            <Text style={themeTextStyle}>Which day is your favorite? Every day?</Text>
                        </View>
                        <Daily data={dummyData1} theme={colorScheme} />
                    </View>
                );
            }
            else if (item.type == "chart") {
                return (
                    <View key={index}>
                        <View style={styles.bar1}>
                            <Text style={themeTextStyle}>{t('HomePage.popularCharts')}</Text>
                            <TouchableOpacity onPress={() => { navigator("SeeAllScreen", { name: t('HomePage.popularCharts') }) }}>
                                <Text style={themeTextStyle}>{t('HomePage.seeAll')}</Text>
                            </TouchableOpacity>
                        </View>

                        <Charts data={dummyData1} theme={colorScheme} />
                    </View>
                );
            }

        })
    }
    const hotList = () => {
        return (
            <View>
                <View style={styles.bar1}>
                    <Text style={themeTextStyle}>{t('HomePage.topSeriesThisWeek')}</Text>
                    <TouchableOpacity onPress={() => { navigator("SeeAllScreen", { name: t('HomePage.topSeriesThisWeek') }) }}>
                        <Text style={themeTextStyle}>{t('HomePage.seeAll')}</Text>
                    </TouchableOpacity>
                </View>

                <FlatList data={popStory}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        const Img = "https://d3tdq0klf4qqp.cloudfront.net/images/books" + item.book_cover
                        return (
                            <View style={styles.container3}>
                                <TouchableOpacity onPress={() => { navigator("NovelScreen", item) }}>
                                    <Image style={styles.image3} source={{
                                        uri: Img,
                                    } || dummyImage} />
                                    <Text style={themeTextStyle}>{item.type}</Text>
                                </TouchableOpacity>
                            </View>

                        )
                    }} />
            </View>
        );
    }
    const genreList = (genre) => {


        return (
            <View key={genre}>
                <View style={styles.bar1}>
                    <Text style={themeTextStyle}>genre {genre}</Text>
                    {seeAll(t('HomePage.preview'))}
                </View>

                <FlatList data={genreStory[genre].Story || dummyData}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {

                        const Img = "https://d3tdq0klf4qqp.cloudfront.net/images/books" + item.book_cover
                        return (
                            <View style={styles.container2}>
                                <TouchableOpacity onPress={() => { navigator("NovelScreen", item) }}>
                                    <Image style={styles.image2} source={{
                                        uri: Img,
                                    } || dummyImage} />
                                    <Text style={themeTextStyle}>{item.title}</Text>
                                </TouchableOpacity>
                            </View>

                        )
                    }}
                />
            </View>
        )

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


    return (
        <SafeAreaView style={[styles.container, themeContainerStyle]}>
            <StatusBar barStyle={themeStatusBarStyle} hidden={false} backgroundColor="rgba(0, 0, 0, 0.3)" translucent={true} />
            <ScrollView >

                <Carousel data={popStory} />
                <Button title="APItest" onPress={async () => {

                    await getstoryBypop();

                    await getstoryByGenre(1);

                    await getstoryByGenre(5);

                    await getstoryByGenre(6);

                }}></Button>
                <View style={styles.container1} >
                    <TouchableOpacity onPress={() => { navigator("NovelScreen", { id: 123 }) }}><Image style={styles.image1} source={dummyImage}></Image></TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigator("NovelScreen", { id: 124 }) }}><Image style={styles.image1} source={dummyImage}></Image></TouchableOpacity>
                </View>


                {SortingLists()}

                {genreList(1)}
                {genreList(5)}
                {genreList(6)}
                {hotList()}


                <View>
                    <View>
                        <Text style={themeTextStyle}>Sale</Text>
                        <Text style={themeTextStyle}>XXXXXXXXXXXXXXXXXXXXX</Text>
                        <Text style={themeTextStyle}>xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</Text>
                    </View>
                    <Text style={themeTextStyle}>Check it out</Text>
                </View>
                <View style={{ paddingBottom: 100 }}></View>
            </ScrollView>
            {SearchButton()}
        </SafeAreaView>
    )
}

export default HomeContent

const styles = StyleSheet.create({
    search: {
        position: "absolute",
        bottom: 54,
        right: 0,

        width: Dimensions.get('window').width / 6,
        height: Dimensions.get('window').width / 6,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

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
    },
    darkThemeText: {
        color: 'white',
    },

    container1: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",

    },
    container2: {
        flex: 1,

        margin: 10
    },
    container3: {
        flex: 1,

        margin: 10
    },
    image1: {
        width: imageWidth / 2.5,
        height: imageWidth / 5,
        margin: 10,
        borderRadius: 5
    },
    image2: {
        width: imageWidth / 2,
        height: imageWidth / 4,
        borderRadius: 5
    },
    image3: {
        width: imageWidth / 1.2,
        height: imageWidth / 2.4,
        borderRadius: 5
    },
    bar1: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        marginRight: 10,
    }
})
