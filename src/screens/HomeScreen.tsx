import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, FlatList, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
/* component */
import { Event } from "../component/Event";
/* lib */
import {
  loadFromStorage,
  initSaveToStorage,
  loadData,
  saveToStorage,
} from "../lib/nativeStorage";
import {
  initDB,
  insertToDB,
  getFromDB,
  changeDB,
  deleteDB,
} from "../lib/sqlite";
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
      <Button title="initData" onPress={initSaveToStorage} />
      <Button title="loadData" onPress={() => loadData("ベンチプレス2")} />
      <Button title="editData" onPress={saveToStorage} />
      <Button title="initDB" onPress={initDB} />
      <Button title="insertToDB" onPress={insertToDB} />
      <Button title="getFromDB" onPress={getFromDB} />
      {/* <Button title="changeDB" onPress={changeDB} /> */}
      <Button title="deleteDB" onPress={deleteDB} />
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
