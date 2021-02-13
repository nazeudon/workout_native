import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* type */
import { RootStackParamList } from "../types/navigation";
/* component */
import { IconButton } from "../component/IconButton";
import { AddEvent } from "../component/AddEvent";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "AddEvent">;
  route: RouteProp<RootStackParamList, "AddEvent">;
};

export const AddEventScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  useEffect(() => {
    navigation.setOptions({
      title: "新規種目追加",
      headerLeft: () => (
        <IconButton name="closecircleo" onPress={() => navigation.goBack()} />
      ),
    });
  }, []);
  return (
    <View>
      <AddEvent />
    </View>
  );
};

const styles = StyleSheet.create({});
