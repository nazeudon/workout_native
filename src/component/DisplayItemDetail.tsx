import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, LayoutChangeEvent } from "react-native";
/* type */
import { ItemDetailType } from "../types/item";
/* context */
import { WeightsContext } from "../context/weightsContext";
import { TimesContext } from "../context/timesContext";

type Props = {
  data: ItemDetailType;
};

export const DisplayItemDetail: React.FC<Props> = ({ data }: Props) => {
  const { weights } = useContext(WeightsContext);
  const { times } = useContext(TimesContext);
  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setViewWidth(e.nativeEvent.layout.width);
    setViewHeight(e.nativeEvent.layout.height);
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          ...styles.weights,
          transform: [{ translateY: viewHeight / 2 }],
        }}
      >
        {weights}
      </Text>
      <Text
        style={{ ...styles.kg, transform: [{ translateY: viewHeight / 2.5 }] }}
      >
        Kg
      </Text>

      <Text
        onLayout={onLayout}
        style={{
          ...styles.separate,
          transform: [
            { translateX: -(viewWidth / 4) },
            { translateY: viewHeight / 2 },
          ],
        }}
      >
        /
      </Text>
      <Text
        style={{
          ...styles.times,
          transform: [{ translateY: viewHeight / 2 }],
        }}
      >
        {times}
      </Text>
      <Text
        style={{
          ...styles.time,
          transform: [{ translateY: viewHeight / 3 }],
        }}
      >
        回
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    flexDirection: "row",
    alignSelf: "center",
    maxHeight: "15%",
    minWidth: "95%",
    marginVertical: "5%",
    borderRadius: 5,
    backgroundColor: "#0076FF",
  },
  weights: {
    fontSize: 28,
    color: "#eee",
    fontWeight: "bold",
    position: "absolute",
    right: "70%",
    bottom: "50%",
  },
  kg: {
    fontSize: 18,
    color: "#eee",
    fontWeight: "bold",
    position: "absolute",
    right: "57%",
    bottom: "50%",
  },
  separate: {
    fontSize: 28,
    color: "#eee",
    fontWeight: "bold",
    position: "absolute",
    left: "50%",
    bottom: "50%",
  },
  times: {
    fontSize: 28,
    color: "#eee",
    fontWeight: "bold",
    position: "absolute",
    right: "24%",
    bottom: "50%",
  },
  time: {
    fontSize: 18,
    color: "#eee",
    fontWeight: "bold",
    position: "absolute",
    right: "13%",
    bottom: "50%",
  },
});
