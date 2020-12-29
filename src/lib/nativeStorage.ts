import Storage from "react-native-storage";
import AsyncStorage from "@react-native-community/async-storage";
import initData from "./initSampleData.json";
/* types */
import { EventData } from "../types/event";

const KEYS = ["ベンチプレス", "デッドリフト", "スクワット"];

const storage = new Storage({
  // 最大容量
  size: 1000,
  // バックエンドにAsyncStorageを使う
  storageBackend: AsyncStorage,
  // キャッシュ期限(null=期限なし)
  defaultExpires: null,
  // メモリにキャッシュするかどうか
  enableCache: true,
});

export const initSaveToStorage = async () => {
  console.log(initData);
  await initData.event.forEach((evt) => {
    storage.save({
      key: evt.key,
      name: evt.name,
      data: evt.data,
    });
  });
};

export const loadFromStorage = async () => {
  const reses: EventData[] = [];
  const getDatas = async () => {
    KEYS.forEach(async (key: string) => {
      const res = await storage.load({ key: key });
      reses.push(res);
    });
    return reses;
  };
  const datas = await getDatas();
  return datas;
};

export const saveToStorage = async () => {
  await storage.save({
    key: "ベンチプレス2",
    data: {
      id_1: {
        items: {
          item_1: {
            weight: 1000,
          },
        },
      },
    },
  });
};

export const loadData = async (key: string) => {
  const res = await storage.load({
    key: key,
  });
  console.log(res);
};

export const deleteFromStorage = async ({ props }) => {
  await storage.remove({
    key: props.key,
  });
};
