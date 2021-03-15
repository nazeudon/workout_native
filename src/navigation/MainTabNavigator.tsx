import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
/* navigation */
import { HomeStackNavigator, TimerStackNavigator } from "./HomeStackNavigator";
/* screens */

const Tab = createBottomTabNavigator();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#0076FF",
        inactiveTintColor: "#999",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Timer"
        component={TimerStackNavigator}
        options={{
          tabBarLabel: "Timer",
          tabBarIcon: ({ color, size }) => (
            <Feather name="clock" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
