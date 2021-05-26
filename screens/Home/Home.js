import React, { useEffect } from 'react'

import { useColorScheme } from 'react-native-appearance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeContent from './component/HomeContent'
const Home = () => {
    let colorScheme = useColorScheme();

    return (
        <HomeContent theme={colorScheme} />
    )
}

export default Home


