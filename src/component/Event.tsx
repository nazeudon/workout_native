import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
/* types */
import { EventType } from "../types/event";
import { RootStackParamList } from "../types/navigation";
/* component */
import { ModalSelection } from "../component/ModalSelection";

const imagePath = require("../statics/img/maccho.png");

type Props = {
  data: EventType;
  onPress: () => void;
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export const Event: React.FC<Props> = ({
  data,
  onPress,
  navigation,
}: Props) => {
  return (
    <TouchableOpacity style={styles.event} onPress={onPress}>
      <Image style={styles.image} source={imagePath} />
      {/* <Text style={styles.text}>{data.event}</Text> */}
      <ModalSelection event={data} navigation={navigation} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  event: {
    display: "flex",
    width: "45%",
    padding: "2.5%",
    margin: "2.5%",
    borderWidth: 1,
    borderColor: "#ACACBA",
    borderRadius: 10,
    alignItems: "center",
  },
  image: {
    marginTop: -20,
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
