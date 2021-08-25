import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { LogBox, SafeAreaView } from 'react-native';
import { auth } from './firebase'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FontAwesome } from '@expo/vector-icons'
import LoginScreen from './screens/sessions/LoginScreen'
import RegisterScreen from './screens/sessions/RegisterScreen'
import ShopmindersTab from './screens/ShopmindersTab'
import SettingsTab from './screens/SettingsTab'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

LogBox.ignoreLogs(['Setting a timer for a long period of time'])

export default function App() {
  const [signedIn, setSignedIn] = useState(false)

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

  return (
    <NavigationContainer theme={DefaultTheme}>
      {
        signedIn ? (
          <SafeAreaView style={{ flex: 1, backgroundColor: '#29434e' }}>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  if (route.name === 'shopminders') {
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
                tabBarStyle: { backgroundColor: '#29434e' },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#819ca9',
              })}
            >
              <Tab.Screen
                name="shopminders"
                component={ShopmindersTab}
                options={{
                  title: 'shop',
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
      <StatusBar style='auto' />
    </NavigationContainer>
);
}