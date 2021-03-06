import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { LogBox, SafeAreaView, View, Text } from 'react-native';
import { auth } from './firebase'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LoginScreen from './screens/sessions/LoginScreen'
import RegisterScreen from './screens/sessions/RegisterScreen'
import DoneItemList from './screens/DoneItemListTab'
import SettingsTab from './screens/SettingsTab'
import AppUsedScreen from './screens/AppUsedScreen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

// LogBox.ignoreLogs(['Setting a timer for a long period of time'])

export default function App() {
  const [signedIn, setSignedIn] = useState(false)
  const [appUsed, setAppUsed] = useState(false)

  useEffect(() => {
    getData()
    console.log(new Date())

    return () => setAppUsed(false)
  }, [])

  const storeData = useCallback(async () => {
    try {
      await AsyncStorage.setItem('app_used', 'true')
      setAppUsed(true)
      // await AsyncStorage.removeItem('app_used')
      // setAppUsed(false)
    } catch (err) {
      console.log(err)
    }
  }, [])

  const getData = useCallback(async () => {
    try {
      await AsyncStorage.getItem('app_used').then((value) => {
        console.log(`appUsed: ${value}`)
        if (value !== null) {
          setAppUsed(true)
        }
      });
    } catch (error) {
        console.log(' [chk first launch] :' + error);
      return false
    }
  },[setAppUsed])

  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
      backgroundColor: 'transparent'
    }
  })

  auth.onAuthStateChanged(user => {
    if (user) {
      setSignedIn(true)
    } else {
      setSignedIn(false)
    }
  })

  if(appUsed === false) {
    return (
      <AppUsedScreen storeData={storeData} />
    )
  }

  return (
    <NavigationContainer theme={DefaultTheme}>
      {
        signedIn ? (
          <SafeAreaView style={{ flex: 1, backgroundColor: '#29434e' }}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  if (route.name === 'doneItemList') {
                    return (
                      <FontAwesome
                        name='list-ul'
                        size={size}
                        color={color}
                      />
                    )
                  }
                  if (route.name === 'settings') {
                    return (
                      <FontAwesome
                        name="cogs"
                        size={size}
                        color={color}
                      />
                    )
                  }
                },
                tabBarStyle: { backgroundColor: '#2196f3' },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#c5d6dd',
              })}
            >
              <Tab.Screen
                name="doneItemList"
                component={DoneItemList}
                options={{
                  title: 'list',
                  headerShown: false
                }}
              />
              <Tab.Screen
                name="settings"
                component={SettingsTab}
                options={{
                  title: 'Settings',
                  headerShown: false
                }}
              />
            </Tab.Navigator>
          </SafeAreaView>
        ) : (
          <>
            <StatusBar style='light' />
            <Stack.Navigator
              presentation='card'
              screenOptions={{
              }}
            >
              <Stack.Screen
                name='signIn'
                component={LoginScreen}
                options={{
                  title: 'Sign in',
                  headerStyle: {
                    backgroundColor: '#29434e',
                    borderBottomColor: '#293434e'
                  },
                  headerTintColor: '#fff',
                  cardStyleInterpolator: forFade
                }}
              />
              <Stack.Screen
                name='register'
                component={RegisterScreen}
                options={{
                  title: 'Register',
                  headerStyle: {
                    backgroundColor: '#29434e',
                    borderBottomColor: '#293434e'
                  },
                  headerTintColor: '#fff',
                  cardStyleInterpolator: forFade
                }}
              />
            </Stack.Navigator>
          </>
        )
      }
      <StatusBar style='auto' hidden={true} />
    </NavigationContainer>
);
}