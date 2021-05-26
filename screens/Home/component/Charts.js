import React from 'react'
import { View, FlatList } from 'react-native'
import ChartsItem from './ChartsItem'

const Charts = ({ data, theme }) => {


    if (data && data.length) {
        return (
            <View >
                <FlatList data={data}
                    style={{ padding: 10 }}

                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {

                        return <ChartsItem item={item} />
                    }}
                />
            </View>
        )
    }
    return null
}


export default Charts