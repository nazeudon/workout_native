import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  LayoutChangeEvent,
} from "react-native";
/* type */
import { ItemDetailType } from "../types/item";
/* context */
import { WeightsContext } from "../context/weightsContext";
import { TimesContext } from "../context/timesContext";

type Props = {
  data: ItemDetailType;
  // onPress: () => void;
};

export const DisplayItemDetail: React.FC<Props> = ({ data }: Props) => {
  const { weights } = useContext(WeightsContext);
  const { times } = useContext(TimesContext);
  const [viewWidth, setViewWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setViewWidth(e.nativeEvent.layout.width);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{weights}</Text>
      <Text style={styles.kg}>Kg</Text>

      <Text
        onLayout={onLayout}
        style={{
          ...styles.separate,
          transform: [{ translateX: -(viewWidth / 4) }],
        }}
      >
        /
      </Text>
      <Text style={styles.text}>{times}</Text>
      <Text style={styles.text}>回</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    flexDirection: "row",
    // justifyContent: "space-evenly",
    alignSelf: "center",
    alignItems: "center",
    maxHeight: "15%",
    minWidth: "95%",
    marginVertical: "5%",
    borderRadius: 5,
    backgroundColor: "#0076FF",
  },
  kg: {
    fontSize: 28,
    color: "#eee",
    fontWeight: "bold",
    position: "absolute",
    left: "30%",
  },
  separate: {
    fontSize: 28,
    color: "#eee",
    fontWeight: "bold",
    position: "absolute",
    left: "50%",
  },
});
