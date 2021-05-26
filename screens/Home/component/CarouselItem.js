import React from 'react'
import { View, StyleSheet, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
const { width, height } = Dimensions.get('window')


const CarouselItem = ({ item }) => {
    const navigation = useNavigation();
    const navigator = (navigationPage, props) => {
        navigation.navigate(navigationPage, props);
    }
    const Img = "https://d3tdq0klf4qqp.cloudfront.net/images/books" + item.book_cover

    return (

        <TouchableOpacity style={styles.cardView} onPress={() => { navigator("NovelScreen", item) }}>
            <LinearGradient colors={['white', 'white', 'black']}>
                <Image style={styles.image} source={{
                    uri: Img,
                }} />
            </LinearGradient>

            <View style={styles.textView}>
                <Text style={styles.itemDescription}>{item.title}</Text>

            </View>
            <View style={styles.tabView}>
                <Text style={styles.type}>{item.genre_sid} genre_sid</Text>
                <Text style={styles.view}>{item.preview} preview</Text>
            </View>
        </TouchableOpacity>


    )
}

const styles = StyleSheet.create({
    cardView: {
        flex: 1,
        width: width,
        height: width / 2,
        backgroundColor: 'white',

        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
        elevation: 5,
    },

    textView: {

        position: 'absolute',
        bottom: 20,
        margin: 5,
        left: 0,
    },
    tabView: {
        flexDirection: "row",
        position: 'absolute',
        bottom: 0,
        margin: 5,
        left: 0,
    },
    type: { fontSize: 12, margin: 5, color: 'gray', },
    view: { fontSize: 12, margin: 5, color: 'gray', },
    image: {
        width: width,
        height: width / 2,
        borderRadius: 10,


    },

    itemDescription: {
        color: 'gray',
        fontSize: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0.8, height: 0.8 },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 5
    }
})

export default CarouselItem