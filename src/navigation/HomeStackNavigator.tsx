import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* screens */
import { HomeScreen } from "../screens/HomeScreen";
import { EventScreen } from "../screens/EventScreen";
import { ItemScreen } from "../screens/ItemScreen";
import { ItemDetailScreen } from "../screens/ItemDetailScreen";
import { RecoveryScreen } from "../screens/RecoveryScreen";
import { TrialScreen } from "../screens/TrialScreen";
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
      {/* <Stack.Screen
        name="ItemDetail"
        component={ItemDetailScreen}
        // options={{ title: createdAt }}
      /> */}
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
    </RootStack.Navigator>
  );
};
