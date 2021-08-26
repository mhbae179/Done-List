import React from 'react'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
import { Button, View } from 'react-native';

const Stack = createStackNavigator()

const config = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};

function AppUsedScreen({ storeData, getData }) {
    const forFade = ({ current, layouts }) => ({
        cardStyle: {
            opacity: current.progress,
            backgroundColor: 'transparent',
            transform: [
                {
                    translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                    }),
                },
            ],
        },
    })

    const firstScreen = ({ navigation }) => {
        return (
            <View>
                <Button title='1' onPress={() => navigation.navigate('second')}>
                </Button>
            </View>
        )
    }
    
    const secondScreen = ({ navigation }) => {
        return (
            <View>
                <Button title='2' onPress={() => navigation.navigate('third')}>
                </Button>
            </View>
        )
    }

    const thirdScreen = ({ navigation }) => {
        return (
            <View>
                <Button title='시작하기' onPress={() => navigation.navigate('first')}>
                </Button>
            </View>
        )
    }

    return (
        <NavigationContainer theme={DefaultTheme}>
            <StatusBar style='light' />
            <Stack.Navigator
                presentation='card'
                screenOptions={{
                }}
            >
                <Stack.Screen
                    name='first'
                    component={firstScreen}
                    options={{
                        title: 'First',
                        headerStyle: {
                            backgroundColor: '#29434e',
                            borderBottomColor: '#293434e'
                        },
                        headerTintColor: '#fff',
                        cardStyleInterpolator: forFade,
                        open: config,
                        close: config,
                    }}
                />
                <Stack.Screen
                    name='second'
                    component={secondScreen}
                    options={{
                        title: 'Second',
                        headerStyle: {
                            backgroundColor: '#29434e',
                            borderBottomColor: '#293434e'
                        },
                        headerTintColor: '#fff',
                        cardStyleInterpolator: forFade,
                        open: config,
                        close: config,
                    }}
                />
                <Stack.Screen
                    name='third'
                    component={thirdScreen}
                    options={{
                        title: 'Third',
                        headerStyle: {
                            backgroundColor: '#29434e',
                            borderBottomColor: '#293434e'
                        },
                        headerTintColor: '#fff',
                        cardStyleInterpolator: forFade,
                        open: config,
                        close: config,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppUsedScreen
