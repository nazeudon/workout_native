import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

console.log(FileSystem.documentDirectory + "SQLite/");
const db = SQLite.openDatabase("DB.db");

export const initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      //"create table if not exists items (id integer primary key not null, eventId integer not null, createdAt TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')) not null);",
      //"create table if not exists events (id integer primary key not null, event text not null);",
      "create table if not exists item (id integer primary key not null, itemsId integer not null, setNum integer not null, weights real not null, times integer not null);",
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
      //"insert into items (id, eventId) values (?, ?),(?, ?);",
      //"insert into events (id, event) values (?, ?),(?, ?), (?, ?);",
      //[1, "ベンチプレス ", 2, "デッドリフト", 3, "スクワット"],
      "insert into item (itemsId, setNum, weights, times) values (?,?,?,?),(?,?,?,?),(?,?,?,?);",
      [1, 1, 100.0, 10, 1, 2, 100.0, 9, 1, 3, 100.0, 8],
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

export const getEvents = () => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select * from events;",
          [],
          (_, resultSet) => {
            // 成功時の処理
            // console.log(resultSet);
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[get] transaction failed")),
      () => resolve(results.rows._array)
    );
  });
};

export const deleteDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      "drop table events;",
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
// export const getEvents = () => {
//   db.transaction(
//     (tx) => {
//       tx.executeSql(
//         //"select * from events where id = ?;",
//         "select * from events;",
//         [],
//         (_, resultSet) => {
//           // SUCCESS
//           console.log("1");
//           console.log(resultSet);
//           return resultSet;
//         },
//         () => {
//           // FAIL
//           console.log("fail");
//           return false; // nothing to do.
//         }
//       );
//     },
//     () => {
//       console.log("fail all");
//     }, // 失敗時のコールバック関数
//     () => {
//       console.log("success");
//     } // 成功時のコールバック関数
//   );
// };
