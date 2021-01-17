import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, FlatList, Button, View } from "react-native";
/* conponent */
import { Calculator } from "../component/Calculator";
/* context */
import { WeightsContext } from "../context/weightsContext";
import { TimesContext } from "../context/timesContext";
import { SegmentContext } from "../context/segmentContext";

export const NumberInputScreen = () => {
  const { weights, setWeights } = useContext(WeightsContext);
  const { times, setTimes } = useContext(TimesContext);
  const { segment } = useContext(SegmentContext);

  const nums = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "C"];
  const onPressInput = (inputNum: string) => {
    if (segment === "weights") {
      if (inputNum === "C") {
        setWeights("0");
      } else if (inputNum === ".") {
        if (weights?.indexOf(".") !== -1) {
          null;
        } else {
          setWeights(weights + ".");
        }
      } else {
        if (weights === "0") {
          setWeights(inputNum);
        } else {
          if (weights?.slice(-1) === ".") {
            const newWeights = weights + inputNum;
            setWeights(newWeights);
          } else if (weights?.slice(-2).slice(0, 1) === ".") {
          } else if (Number(weights) >= 100) {
            null;
          } else {
            const newWeights = weights + inputNum;
            setWeights(newWeights);
          }
        }
      }
    } else if (segment === "times") {
      if (inputNum === "C") {
        setTimes(0);
      } else {
        if (times === 0) {
          setTimes(Number(inputNum));
        } else if (Number(times) >= 10) {
          null;
        } else {
          //エラー回避で三項演算子
          const newTimes = String(times) + inputNum;
          setTimes(Number(newTimes));
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        numColumns={3}
        contentContainerStyle={styles.button}
        data={nums}
        renderItem={({ item }: { item: string }) => (
          <Calculator data={item} onPress={() => onPressInput(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    minWidth: "97%",
    alignSelf: "center",
  },
  button: {
    flex: 1,
  },
});
