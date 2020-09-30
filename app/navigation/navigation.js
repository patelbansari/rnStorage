import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screen/Home';
import PhotoList from '../screen/PhotoList';

const Stack = createStackNavigator()

export const MainStack = () => {
    return(
        <Stack.Navigator initialRouteName={"Home"}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PhotoList" component={PhotoList} />

      </Stack.Navigator>
    )
}