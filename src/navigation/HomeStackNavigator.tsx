import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* screens */
import { HomeScreen } from "../screens/HomeScreen";
import { EventScreen } from "../screens/EventScreen";
import { ItemScreen } from "../screens/ItemScreen";
import { ItemDetailScreen } from "../screens/ItemDetailScreen";
/* types */
import { RootStackParamList } from "../types/navigation";
/* context */
import { EventContext } from "../context/eventContext";
import { ItemContext } from "../context/itemContext";
// import { ItemContext } from "../context/";

const Stack = createStackNavigator<RootStackParamList>();
const RootStack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  const { event } = useContext(EventContext);
  const { item } = useContext(ItemContext);

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
        options={{ title: item }}
      />
      <Stack.Screen
        name="ItemDetail"
        component={ItemDetailScreen}
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
