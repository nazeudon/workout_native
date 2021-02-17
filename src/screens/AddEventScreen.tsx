import React, { useEffect, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
/* type */
import { RootStackParamList } from "../types/navigation";
/* lib */
import { InsertEvent } from "../lib/sqlite";
/* component */
import { IconButton } from "../component/IconButton";
import { AddEvent } from "../component/AddEvent";
import { AddEventButton } from "../component/AddEventButton";
/* context */
import { addEventContext } from "../context/eventContext";
import {
  partContext,
  partDetailContext,
  TrainingTypeContext,
} from "../context/partContext";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "AddEvent">;
  route: RouteProp<RootStackParamList, "AddEvent">;
};

export const AddEventScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { addEvent } = useContext(addEventContext);
  const { part } = useContext(partContext);
  const { partDetail } = useContext(partDetailContext);
  const { trainingType } = useContext(TrainingTypeContext);

  useEffect(() => {
    navigation.setOptions({
      title: "種目追加",
      headerLeft: () => (
        <IconButton name="closecircleo" onPress={() => navigation.goBack()} />
      ),
    });
  }, []);

  const onPressAddEvent = async () => {
    InsertEvent(addEvent, trainingType, part, partDetail);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <AddEvent />
      <AddEventButton onPress={onPressAddEvent} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
