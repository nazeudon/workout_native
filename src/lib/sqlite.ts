import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

console.log(FileSystem.documentDirectory + "SQLite/");
const db = SQLite.openDatabase("DB.db");

export const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      "create table if not exists events (id integer primary key not null, event text);",
      null, // SQL文の引数
      () => {
        console.log("success");
      }, // 成功時のコールバック関数
      () => {
        console.log("fail");
      } // 失敗時のコールバック関数
    );
  });
};

export const insertToDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "insert into events (id, event) values (?, ?),(?, ?);",
      [1, "ベンチプレス", 2, "デッドリフト"],
      () => {
        console.log("success");
      }, // 成功時のコールバック関数
      () => {
        console.log("fail");

        return true; // ロールバックする場合はtrueを返す
      } // 失敗時のコールバック関数
    );
  });
};

export const getFromDB = () => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        "select * from events where id = ?;",
        [2],
        (_, resultSet) => {
          // SUCCESS
          console.log(resultSet);
        },
        () => {
          console.log("fail");
          return false; // 何もしない
        } // 失敗時のコールバック関数
      );
    },
    () => {
      console.log("fail all");
    }, // 失敗時のコールバック関数
    () => {
      console.log("success");
    } // 成功時のコールバック関数
  );
};
