
import React from 'react'

import { useColorScheme } from 'react-native-appearance';
import FeedContent from './component/FeedContent'
const Feed = () => {
    var colorScheme = useColorScheme();

    return (
        <FeedContent theme={colorScheme} />
    )
}

export default Feed