import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* screens */
import { HomeScreen } from "../screens/HomeScreen";
import { EventScreen } from "../screens/EventScreen";
import { AddEventScreen } from "../screens/AddEventScreen";
import { ItemScreen } from "../screens/ItemScreen";
import { ItemDetailScreen } from "../screens/ItemDetailScreen";
import { RecoveryScreen } from "../screens/RecoveryScreen";
import { TrialScreen } from "../screens/TrialScreen";
import { CountDownScreen } from "../screens/CountDownScreen";
/* types */
import { RootStackParamList } from "../types/navigation";

const Stack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#333",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Event" component={EventScreen} />
      <Stack.Screen name="Item" component={ItemScreen} />
    </Stack.Navigator>
  );
};

export const HomeStackNavigator = () => {
  return (
    <RootStack.Navigator mode={"modal"}>
      <RootStack.Screen
        name="Main"
        component={MainStack}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="ItemDetail" component={ItemDetailScreen} />
      <RootStack.Screen name="Recovery" component={RecoveryScreen} />
      <RootStack.Screen name="Trial" component={TrialScreen} />
      <RootStack.Screen name="AddEvent" component={AddEventScreen} />
      <RootStack.Screen name="CountDown" component={CountDownScreen} />
    </RootStack.Navigator>
  );
};

export const TimerStackNavigator = () => {
  return (
    <RootStack.Navigator mode={"modal"}>
      <RootStack.Screen
        name="CountDown"
        component={CountDownScreen}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};
