import React from 'react'

import { useColorScheme } from 'react-native-appearance';
import InboxContent from './component/InboxContent'
const Inbox = () => {
    var colorScheme = useColorScheme();

    return (
        <InboxContent theme={colorScheme} />
    )
}

export default Inbox