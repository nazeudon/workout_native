import React from "react";
import { SafeAreaView, StyleSheet, FlatList, Button } from "react-native";
/* conponent */
import { Calculator } from "../component/Calculator";

export const TimesEditScreen = () => {
  const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ".", "C"];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={nums}
        renderItem={({ item }: { item: number | string }) => (
          <Calculator data={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
});
