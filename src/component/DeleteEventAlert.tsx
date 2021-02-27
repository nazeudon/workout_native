import React from "react";
import { StyleSheet, Alert, TouchableOpacity, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
/* lib */
import { DeleteEvent } from "../lib/sqlite";
/*types */
import { RootStackParamList } from "../types/navigation";

type Props = {
  id: number;
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

const deleteEventById = async (id: number) => {
  const res = await DeleteEvent(id);
};

export const DeleteEventAlert: React.FC<Props> = ({
  id,
  navigation,
}: Props) => {
  const deleteEventAlertButton = () =>
    Alert.alert(
      "削除しますか？",
      "この操作は取り消せません",
      [
        {
          text: "削除",
          onPress: () => {
            deleteEventById(id);
            // navigation.navigate("Home");
          },
          style: "destructive",
        },
        {
          text: "キャンセル",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: false }
    );

  return (
    <TouchableOpacity style={styles.container} onPress={deleteEventAlertButton}>
      <Text style={styles.textStyle}>削除</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minWidth: "100%",
    minHeight: "100%",
  },
  textStyle: {
    fontSize: 18,
    color: "#ff3b30",
  },
});
