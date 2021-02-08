import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, LayoutChangeEvent } from "react-native";
/* type */
/* context */
import { trialContext } from "../context/trialContext";

type Props = {
  data: string;
};

export const DisplayTrial: React.FC<Props> = ({ data }: Props) => {
  const { trial } = useContext(trialContext);
  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);

  const onLayout = (e: LayoutChangeEvent) => {
    setViewWidth(e.nativeEvent.layout.width);
    setViewHeight(e.nativeEvent.layout.height);
  };

  return (
    <View style={styles.container}>
      <Text
        onLayout={onLayout}
        style={{
          ...styles.trial,
          transform: [
            { translateY: viewHeight / 2 },
            { translateX: viewWidth },
          ],
        }}
      >
        {String(trial)}
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
  trial: {
    fontSize: 28,
    color: "#eee",
    fontWeight: "bold",
    position: "absolute",
    right: "50%",
    bottom: "50%",
    marginBottom: 0,
    paddingBottom: 0,
  },
});
