import Storage from "react-native-storage";
import AsyncStorage from "@react-native-community/async-storage";
import initData from "./initSampleData.json";
/* types */
import { EventKey, EventData } from "../types/event";

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
      data: evt.data,
    });
  });
};

export const saveToStorage = async ({ props }) => {
  await storage.save({
    key: props.key,
    data: props.data,
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

export const deleteFromStorage = async ({ props }) => {
  await storage.remove({
    key: props.key,
  });
};
