import React, { useContext } from "react";
import { SafeAreaView, StyleSheet, FlatList, Button, View } from "react-native";
/* conponent */
import { Calculator } from "../component/Calculator";
/* context */
import { WeightsContext } from "../context/weightsContext";
import { TimesContext } from "../context/timesContext";

export const NumberInputScreen = () => {
  const { weights, setWeights } = useContext(WeightsContext);
  const { times, setTimes } = useContext(TimesContext);

  const nums = ["7", "8", "9", "4", "5", "6", "1", "2", "3", "0", ".", "C"];
  const onPressInput = (inputNum: string) => {
    // console.log(String(weights).length);
    if (inputNum === "C") {
      setWeights("0");
    } else if (inputNum === ".") {
      console.log(weights);
      if (weights?.match(".")) {
        //うまく行ってません。。
        // setWeights(weights + ".");
        console.log("True");
        null;
      } else {
        setWeights(weights + ".");
        console.log("false");
        // null;
      }
    } else {
      if (weights === "0") {
        setWeights(inputNum);
      } else {
        const newWeights = weights + inputNum;
        setWeights(newWeights);
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
