import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* screens */
import { HomeScreen } from "../screens/HomeScreen";
import { EventScreen } from "../screens/EventScreen";
import { ItemScreen } from "../screens/ItemScreen";
/* types */
import { RootStackParamList } from "../types/navigation";
/* context */
import { EventContext } from "../context/eventContext";

const Stack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  const { event } = useContext(EventContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#000",
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Event"
        component={EventScreen}
        options={{ title: event }}
      />
      <Stack.Screen
        name="Item"
        component={ItemScreen}
        // options={{ title: item }}
      />
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
    </RootStack.Navigator>
  );
};
