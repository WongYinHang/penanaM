
import React, { useState } from 'react';
import { useColorScheme, Animated } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { AppearanceProvider } from 'react-native-appearance';
import { ThemeContext, LocalizationContext, AuthContext } from './components/context'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';



import HomeScreen from './screens/Home/Home'
import FeedScreen from './screens/Feed/Feed'
import InboxScreen from './screens/Inbox/Inbox'
//Library
import LibraryScreen from './screens/Library/Library'
import Recent from './screens/Library/component/Recent'

//MoreScreens
import MoreScreen from './screens/More/More'
import PointsShopScreen from './screens/More/component/PointsShopScreen'
import FreePointScreen from './screens/More/component/FreePointScreen'
import PromoCodeScreen from './screens/More/component/PromoCodeScreen'
import PromotionsScreen from './screens/More/component/PromotionsScreen'
import NewsScreen from './screens/More/component/NewsScreen'
import TshirtsScreen from './screens/More/component/TshirtsScreen'
import SettingsScreen from './screens/More/component/SettingsScreen'
import HelpScreen from './screens/More/component/HelpScreen'
import Downloads from './screens/More/component/SettingsScreens/Downloads'
import EditProfile from './screens/More/component/SettingsScreens/EditProfile'
import FavoriteGenres from './screens/More/component/SettingsScreens/FavoriteGenres'
import General from './screens/More/component/SettingsScreens/General'
import GiveUsFeedback from './screens/More/component/SettingsScreens/GiveUsFeedback'
import Notifications from './screens/More/component/SettingsScreens/Notifications'
import RateUs from './screens/More/component/SettingsScreens/RateUs'
import TermsGuidelinesPolicies from './screens/More/component/SettingsScreens/TermsGuidelinesPolicies'
import TransactionHistory from './screens/More/component/SettingsScreens/TransactionHistory'


//Global
import NovelScreen from './screens/Global/NovelSrceen'
import SeeAllScreen from './screens/Global/SeeAllScreen'
import ReadingScreen from './screens/Global/ReadingScreen'
import SearchScreen from './screens/Global/SearchScreen'
import CreatorScreen from './screens/Global/CreatorScreen'
import RegistrationScreen from './screens/Global/RegistrationScreen'
import LoginScreen from './screens/Global/LoginScreen'
import CommentScreen from './screens/Global/CommentScreen'
import ReplyScreen from './screens/Global/ReplyScreen'
import { createStackNavigator } from "@react-navigation/stack";

import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from 'i18n-js'; // or whatever library you want

import { HK } from './data/hk'
import { EN } from './data/en'


export default function App() {



  i18n.fallbacks = true;
  i18n.translations = { HK, EN };

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [locale, setLocale] = React.useState("HK");

  const AuthContextmemo = React.useMemo(() => ({
    toggleLogin: (login) => {
      if (login == true) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
    },
    checkLoggedIn: () => {
      return isLoggedIn
    }
  }), [isLoggedIn]);
  const themeContextmemo = React.useMemo(() => ({
    toggleTheme: (theme) => {
      if (theme == "light") {
        setIsDarkTheme(false);
      } else if (theme == "dark") {
        setIsDarkTheme(true);
      } else {
        if (systemTheme == 'dark') {
          setIsDarkTheme(true);
        } else {
          setIsDarkTheme(false);
        }
      }
    }
  }), [isDarkTheme]);
  const localizationContextmemo = React.useMemo(() => ({
    t: (scope, options) =>
      i18n.t(scope, { locale, ...options }),
    locale,
    setLocale
  }), [locale]);

  const getLocalLanguage = async () => {
    const SystemLanguage = await AsyncStorage.getItem('@SystemLanguage')
    if (SystemLanguage) {
      setLocale(SystemLanguage)
    } else {
      setLocale("HK")
      AsyncStorage.setItem('@SystemLanguage', "HK")
    }


  }
  const systemTheme = useColorScheme();
  const getlocaltheme = async () => {
    const SystemAppearanceTheme = await AsyncStorage.getItem('@SystemAppearanceTheme')
    if (SystemAppearanceTheme) {
      if (SystemAppearanceTheme == 'light') {
        setIsDarkTheme(false);
      } else if (SystemAppearanceTheme == 'dark') {
        setIsDarkTheme(true);
      } else if (SystemAppearanceTheme == 'system') {
        if (systemTheme == 'dark') {
          setIsDarkTheme(true);
        } else {
          setIsDarkTheme(false);
        }
      }
    } else {
      setIsDarkTheme(false);
      AsyncStorage.setItem('@SystemAppearanceTheme', "light")
    }
  }
  getLocalLanguage();
  getlocaltheme();






























  const theme = isDarkTheme ? DarkTheme : DefaultTheme;
  const themeStatusBarStyle = isDarkTheme === false ? 'white' : '#3E3E3E';
  const themeStatusColor = isDarkTheme === false ? '#ffffff' : '#000000';
























  const Tab = createMaterialBottomTabNavigator();
  const Stack = createStackNavigator();

  const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      next
        ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
        : 0
    );

    return {
      cardStyle: {
        transform: [
          {
            translateY: Animated.multiply(
              progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [
                  screen.height, // Focused, but offscreen in the beginning
                  0, // Fully focused
                  screen.height * -0.3, // Fully unfocused
                ],
                extrapolate: 'clamp',
              }),
              inverted
            ),
          },
        ],
      },
    };
  };
  const Feed = () => (
    <Stack.Navigator>
      <Stack.Screen name="FeedScreen" component={FeedScreen} options={{ headerShown: false }} />
      <Stack.Screen name="optionScreen" component={optionScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
  )
  const More = () => (
    <Stack.Navigator>
      <Stack.Screen name="MoreScreen" component={MoreScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="PointsShopScreen" component={PointsShopScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="FreePointScreen" component={FreePointScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="PromoCodeScreen" component={PromoCodeScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="PromotionsScreen" component={PromotionsScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="NewsScreen" component={NewsScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="TshirtsScreen" component={TshirtsScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="HelpScreen" component={HelpScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="Downloads" component={Downloads} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="FavoriteGenres" component={FavoriteGenres} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="General" component={General} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="GiveUsFeedback" component={GiveUsFeedback} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="RateUs" component={RateUs} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="TermsGuidelinesPolicies" component={TermsGuidelinesPolicies} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistory} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
    </Stack.Navigator>
  );
  const Home = () => (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="SeeAllScreen" component={SeeAllScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide, }} />

    </Stack.Navigator>
  );
  const Library = () => (
    <Stack.Navigator>
      <Stack.Screen name="LibraryScreen" component={LibraryScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="Recent" component={Recent} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
    </Stack.Navigator>
  );
  const NoTabs = () => (
    <Stack.Navigator>
      <Stack.Screen name="NovelScreen" component={NovelScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
      <Stack.Screen name="ReadingScreen" component={ReadingScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
    </Stack.Navigator>
  )
  const MainTabs = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#FCAE24"
      inactiveColor="#B7B7B7"
      barStyle={{
        backgroundColor: themeStatusBarStyle,
        borderTopLeftRadius: 8,
        overflow: 'hidden',
        position: 'absolute',
        zIndex: 1
      }}>
      <Tab.Screen name="Home" component={Home} options={({ route }) => ({
        tabBarVisible: ((route) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? ""

          if (routeName === "ReadingScreen") {
            return false
          }

          return true
        })(route),

        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
      })} />
      <Tab.Screen name="Feed" component={FeedScreen} options={{
        tabBarLabel: 'Feed',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="monitor-dashboard" color={color} size={26} />
        ),
      }} />
      <Tab.Screen name="Library" component={Library} options={{
        tabBarLabel: 'Library',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="library-shelves" color={color} size={26} />
        ),
      }} />
      <Tab.Screen name="Inbox" component={InboxScreen} options={{
        tabBarLabel: 'Inbox',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="message-outline" color={color} size={26} />
        ),
      }} />
      <Tab.Screen name="More" component={More} options={{
        tabBarLabel: 'More',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="menu" color={color} size={26} />
        ),
      }} />
    </Tab.Navigator>
  )
  return (
    <AppearanceProvider>
      <AuthContext.Provider value={AuthContextmemo}>
        <LocalizationContext.Provider value={localizationContextmemo}>
          <ThemeContext.Provider value={themeContextmemo}>
            <NavigationContainer theme={theme} >
              <Stack.Navigator
                screenOptions={{
                  headerShown: false
                }}>
                <Stack.Screen name="Main" component={MainTabs} />
                <Stack.Screen name="CreatorScreen" component={CreatorScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide, }} />
                <Stack.Screen name="NovelScreen" component={NovelScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
                <Stack.Screen name="ReadingScreen" component={ReadingScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
                <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
                <Stack.Screen name="CommentScreen" component={CommentScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />
                <Stack.Screen name="ReplyScreen" component={ReplyScreen} options={{ headerShown: false, cardStyleInterpolator: forSlide }} />

              </Stack.Navigator>




            </NavigationContainer>
          </ThemeContext.Provider>
        </LocalizationContext.Provider>
      </AuthContext.Provider>
    </AppearanceProvider>
  );
}


