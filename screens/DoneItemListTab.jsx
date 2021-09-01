import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import ViewAll from './shopminders/ViewAll';
import AddOne from './shopminders/AddOne'

const Stack = createStackNavigator();
const DoneItemList = () => {
    const forFade = ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
            backgroundColor: 'transparent',
        },
    });
    return (
        <>
            <StatusBar style="dark" />
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#29434e'
                    }
                }}
            >
                <Stack.Screen
                    name="viewAll"
                    component={ViewAll}
                    options={{
                        cardStyleInterpolator: forFade,
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="addOne"
                    component={AddOne}
                    options={{
                        cardStyleInterpolator: forFade,
                        headerShown: false
                    }}
                />
            </Stack.Navigator>
        </>
    )
}
export default DoneItemList;