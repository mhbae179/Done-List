import React from 'react'
import { Image, Button, View, Text, StyleSheet, Dimensions, Animated } from 'react-native'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createStackNavigator } from '@react-navigation/stack'
import { StatusBar } from 'expo-status-bar';
// import { addTask } from '../assets/index'

// const image = { uri: "../assets/add_task.png" };
const image1 = require("../assets/add_task.png")
const image2 = require("../assets/partying.png")
const image3 = require("../assets/hello.png")

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: "center",
        width: "100%",
    },
    text: {
        fontSize: 24,
        fontWeight: "bold",
        marginLeft: 10,
    },
    screenView: {
        display: "flex",
        justifyContent: "center",
    },
    button: {
        width: 100
    }
});

function AppUsedScreen({ storeData }) {
    const { height } = Dimensions.get('window')

    const TestComponent = () => {
        return(
            <View style={{ position: 'absolute', bottom: -height + 30, height: height, transform: [{translateY: 120}] }}>

            </View>
        )
    }

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

    // const handleOnClick = ({ navigation, pageValue }) => {
    //     navigation.navigate(pageValue)
    // }

    const firstScreen = ({ navigation }) => {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, display: "flex", justifyContent: "center", }}>
                    <Text style={styles.text}>달성한 일들을 앱에 추가하세요</Text>
                </View>
                <View style={{ flex: 1.7, display: "flex", justifyContent: "center", }}>
                    <Image source={image1} resizeMode='contain' style={styles.image} />
                </View>
                <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                    <Button style={styles.button} title='1' onPress={() => navigation.navigate('second')}>
                    </Button>
                </View>
            </View>
        )
    }

    const secondScreen = ({ navigation }) => {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, display: "flex", justifyContent: "center", }}>
                    <Text style={styles.text}>달성한 일들을 보며 하루를 평가해 보세요</Text>
                </View>
                <View style={{ flex: 1.7, display: "flex", justifyContent: "center", }}>
                    <Image source={image2} resizeMode='contain' style={styles.image} />
                </View>
                <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                    <Button style={styles.button} title='2' onPress={() => navigation.navigate('third')}>
                    </Button>
                </View>
            </View>
        )
    }

    const thirdScreen = ({ navigation }) => {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, display: "flex", justifyContent: "center", }}>
                    <Text style={styles.text}>이제 시작하세요!</Text>
                </View>
                <View style={{ flex: 1.7, display: "flex", justifyContent: "center", }}>
                    <Image source={image3} resizeMode='contain' style={styles.image} />
                </View>
                <View style={{ flex: 1, display: "flex", justifyContent: "center", }}>
                    <Button style={styles.button} title='3' onPress={storeData}>
                    </Button>
                </View>
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
                        cardStyleInterpolator: forFade,
                        open: config,
                        close: config,
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='second'
                    component={secondScreen}
                    options={{
                        cardStyleInterpolator: forFade,
                        open: config,
                        close: config,
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='third'
                    component={thirdScreen}
                    options={{
                        cardStyleInterpolator: forFade,
                        open: config,
                        close: config,
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppUsedScreen
