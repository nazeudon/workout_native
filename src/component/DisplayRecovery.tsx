import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, LayoutChangeEvent } from "react-native";
/* type */
import { RecoveryType } from "../types/recovery";
/* context */
import { recoveryContext } from "../context/recoveryContext";

type Props = {
  data: string;
};

export const DisplayRecovery: React.FC<Props> = ({ data }: Props) => {
  //   const recovery = data;
  const { recovery } = useContext(recoveryContext);
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
          ...styles.recovery,
          transform: [{ translateY: viewHeight / 2 }],
        }}
      >
        {String(recovery)}
      </Text>
      <Text
        style={{
          ...styles.min,
          transform: [{ translateY: viewHeight / 3 }],
        }}
      >
        分
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
  recovery: {
    fontSize: 28,
    color: "#eee",
    fontWeight: "bold",
    position: "absolute",
    right: "50%",
    bottom: "50%",
    marginBottom: 0,
    paddingBottom: 0,
  },
  min: {
    fontSize: 18,
    color: "#eee",
    fontWeight: "bold",
    position: "absolute",
    right: "39%",
    bottom: "50%",
  },
});
