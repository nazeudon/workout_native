import React from "react";
import { SafeAreaView, StyleSheet, FlatList, Button, View } from "react-native";
/* conponent */
import { Calculator } from "../component/Calculator";

export const NumberInputScreen = () => {
  const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ".", "C"];

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        numColumns={3}
        contentContainerStyle={styles.button}
        data={nums}
        renderItem={({ item }: { item: number | string }) => (
          <Calculator data={item} />
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
