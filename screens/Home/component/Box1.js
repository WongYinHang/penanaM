import React from 'react'
import { StyleSheet, View, Image, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { dummy1 } from '../../../data/Data'
var imageWidth = Dimensions.get('window').width;
const Box1 = () => {
    const navigation = useNavigation();
    const navigator = (navigationPage, props) => {
        navigation.navigate(navigationPage, props);
    }
    return (
        <View >
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
                        <TouchableOpacity style={styles.container} onPress={() => { navigator("NovelScreen") }}>
                            <Image style={styles.image} source={item.image} />

                        </TouchableOpacity>

                    )
                }}
            />
        </View>
    )
}

export default Box1

const styles = StyleSheet.create({
    container: {
        flex: 1,

        margin: 10
    },
    image: {
        width: imageWidth / 2,
        height: imageWidth / 4,
        borderRadius: 5
    }
})


