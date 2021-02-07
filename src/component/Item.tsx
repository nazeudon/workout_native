import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
/* lib */
import { getItemDetails, getRecovery } from "../lib/sqlite";
/* type */
import { ItemType, ItemDetailType } from "../types/item";

type Props = {
  data: ItemType;
  onPress: () => void;
};

export const Item: React.FC<Props> = ({ data, onPress }: Props) => {
  const [itemLength, setItemLength] = useState<number>(0);
  const [totalWeights, setTotalWeights] = useState<number>(0);
  const [recovery, setRecovery] = useState<number>(0);

  useEffect(() => {
    fetchItemInfos();
  }, []);

  const sumWeights = (res: ItemDetailType[]) => {
    let total: number = 0;
    res.map((r) => {
      total += r.weights * r.times;
    });
    setTotalWeights(total);
  };

  const fetchItemInfos = async () => {
    const itemDetailRes = await getItemDetails(data.id);
    const recoveryRes = await getRecovery(data.id);
    await sumWeights(itemDetailRes);
    await setItemLength(itemDetailRes.length);
    await setRecovery(recoveryRes[0].min);
  };

  const date = data.createdAt.split(" ")[0];
  return (
    <TouchableHighlight onPress={onPress} underlayColor={"#ccc"}>
      <View style={styles.items}>
        <View style={styles.desc}>
          <Text style={styles.text}>{itemLength}セット</Text>
          <Text style={styles.separate}>/</Text>
          <Text style={styles.text}>{recovery}分</Text>
          <Text style={styles.separate}>/</Text>
          <Text style={styles.text}>{totalWeights}kg</Text>
        </View>
        <View style={styles.date}>
          <Text style={styles.text}>{date}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  items: {
    height: 50,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#eee",
    // borderColor: "#0076FF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  desc: {
    marginLeft: "3%",
    flexDirection: "row",
  },
  date: {
    marginRight: "3%",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  separate: {
    fontSize: 16,
    color: "#333",
    marginHorizontal: "2%",
  },
});
