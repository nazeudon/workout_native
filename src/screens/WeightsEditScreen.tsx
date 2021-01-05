import React from "react";
import { SafeAreaView, StyleSheet, FlatList, Button } from "react-native";
/* conponent */
import { Calculator } from "../component/Calculator";

export const WeightsEditScreen = () => {
  const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={nums}
        renderItem={({ item }: { item: number }) => <Calculator data={item} />}
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
  },
});
