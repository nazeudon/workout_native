import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
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
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.event}>
        {/* <Image style={styles.image} source={imagePath} /> */}
        {/* <Text style={styles.text}>{data.event}</Text> */}
        <ModalSelection event={data} navigation={navigation} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // event: {
  //   display: "flex",
  //   width: "45%",
  //   padding: "2.5%",
  //   margin: "2.5%",
  //   borderWidth: 1,
  //   borderColor: "#ACACBA",
  //   borderRadius: 10,
  //   alignItems: "center",
  // },
  container: {
    height: 50,
    backgroundColor: "#fff",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  event: {
    height: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
    width: "94%",
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
