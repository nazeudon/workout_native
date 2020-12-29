import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
/* component */
import { Event } from "../component/Event";
/* lib */
import { loadFromStorage } from "../lib/nativeStorage";
/* types */
import { EventData } from "../types/event";
import { RootStackParamList } from "../types/navigation";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export const HomeScreen = ({ navigation }: Props) => {
  const [datas, setDatas] = useState<EventData[]>([]);

  useEffect(() => {
    loadDatas();
  }, []);

  const loadDatas = async () => {
    const reses = await loadFromStorage();
    setDatas(reses);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={datas}
        renderItem={({ item }: { item: EventData }) => <Event data={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // flexWrap: "wrap",
    // flexDirection: "row",
    // justifyContent: "flex-start",
    alignItems: "center",
    justifyContent: "center",
  },
});
