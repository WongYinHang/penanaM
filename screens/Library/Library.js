import React from 'react'

import { useColorScheme } from 'react-native-appearance';
import LibraryContent from './component/LibraryContent'
const Library = () => {
    var colorScheme = useColorScheme();

    return (
        <LibraryContent theme={colorScheme} />
    )
}

export default Library