import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

console.log(FileSystem.documentDirectory + "SQLite/");
const db = SQLite.openDatabase("DB.db");

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
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする！！
            return true;
          }
        );
      },
      () => reject(new Error("[get events] transaction failed")),
      () => resolve(results.rows._array)
    );
  });
};

export const getItems = (eventId: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          // "select * from items (eventId) value ?;",
          "select * from items where eventId = ?;",
          [eventId],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[get items] transaction failed")),
      () => resolve(results.rows._array)
    );
  });
};

export const getItem = (id: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select * from items where id = ?;",
          [id],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[get item] transaction failed")),
      () => resolve(results.rows._array)
    );
  });
};

export const getItemDetails = (itemsId: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select * from item where itemsId = ?;",
          [itemsId],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[get itemsDetails] transaction failed")),
      () => resolve(results.rows._array)
    );
  });
};

export const UpdateItemDetails = (
  id: number,
  weights: number,
  times: number
) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "update item set weights = ?, times = ? where id = ?;",
          [weights, times, id],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[update itemsDetails] transaction failed")),
      () => resolve(results.rows._array)
    );
  });
};

export const InsertItemDetails = (
  itemsId: number,
  weights: number,
  times: number
) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into item (itemsId, weights, times) values (?,?,?);",
          [itemsId, weights, times],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[insert itemsDetails] transaction failed")),
      () => resolve(results.insertId)
    );
  });
};

export const InsertInitItemDetails = (
  itemsId: number,
  weights: number,
  times: number
) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into item (itemsId,  weights, times) values (?,?,?), (?,?,?), (?,?,?);",
          [
            itemsId,
            weights,
            times,
            itemsId,
            weights,
            times,
            itemsId,
            weights,
            times,
          ],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[insert itemsDetails] transaction failed")),
      () => resolve(results.insertId)
    );
  });
};

export const InsertItem = (eventId: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into items (eventId) values (?);",
          [eventId],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[insert item] transaction failed")),
      () => resolve(results.insertId)
    );
  });
};

export const DeleteItem = (id: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "delete from items where id = ?;",
          [id],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[delete item] transaction failed")),
      () => resolve(results.insertId)
    );
  });
};
export const DeleteItemDetail = (id: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "delete from item where id = ?;",
          [id],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[delete itemDetail] transaction failed")),
      () => resolve(results.insertId)
    );
  });
};

export const DeleteItemDetailByItemsId = (itemsId: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "delete from item where itemsId = ?;",
          [itemsId],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () =>
        reject(new Error("[delete itemDetail by itemsId] transaction failed")),
      () => resolve(results.insertId)
    );
  });
};

export const getRecovery = (itemsId: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select * from recovery where itemsId = ?;",
          [itemsId],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[get recovery] transaction failed")),
      () => resolve(results.rows._array)
    );
  });
};

export const UpdateRecovery = (id: number, min: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "update recovery set min = ? where id = ?;",
          [min, id],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[update recovery] transaction failed")),
      () => resolve(results.rows._array)
    );
  });
};

export const InsertInitRecovery = (itemsId: number, min: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into recovery (itemsId, min) values (?,?);",
          [itemsId, min],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[insert recovery] transaction failed")),
      () => resolve(results.insertId)
    );
  });
};

export const DeleteRecoveryByItemsId = (itemsId: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "delete from recovery where itemsId = ?;",
          [itemsId],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () =>
        reject(new Error("[delete recovery by itemsId] transaction failed")),
      () => resolve(results.insertId)
    );
  });
};

export const getTrial = (itemsId: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "select * from trial where itemsId = ?;",
          [itemsId],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[get trial] transaction failed")),
      () => resolve(results.rows._array)
    );
  });
};

export const UpdateTrial = (id: number, trialNum: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "update trial set trialNum = ? where id = ?;",
          [trialNum, id],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[update trial] transaction failed")),
      () => resolve(results.rows._array)
    );
  });
};

export const InsertInitTrial = (itemsId: number, trialNum: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into trial (itemsId, trialNum) values (?,?);",
          [itemsId, trialNum],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[insert trial] transaction failed")),
      () => resolve(results.insertId)
    );
  });
};

export const DeleteTrialByItemsId = (itemsId: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "delete from trial where itemsId = ?;",
          [itemsId],
          (_, resultSet) => {
            // 成功時の処理
            results = resultSet;
          },
          () => {
            // エラー時はロールバックする
            return true;
          }
        );
      },
      () => reject(new Error("[delete trial by itemsId] transaction failed")),
      () => resolve(results.insertId)
    );
  });
};

/**********************************************/

export const _initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      //"create table if not exists items (id integer primary key not null, eventId integer not null, createdAt TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')) not null);",
      //"create table if not exists events (id integer primary key not null, event text not null);",
      // "create table if not exists item (id integer primary key not null, itemsId integer not null, weights real not null, times integer not null);",
      // "create table if not exists recovery (id integer primary key not null, itemsId integer not null, min integer not null);",
      "create table if not exists trial (id integer primary key not null, itemsId integer not null, trialNum integer not null);",
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

export const _insertToDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      // "insert into items (eventId) values (?);",
      // [1],
      // "insert into events (id, event) values (?, ?),(?, ?), (?, ?);",
      // [1, "ベンチプレス ", 2, "デッドリフト", 3, "スクワット"],
      // "insert into item (itemsId, weights, times) values (?,?,?),(?,?,?),(?,?,?);",
      // [2, 100.0, 10, 2, 100.0, 9, 2, 100.0, 8],
      // "insert into recovery (itemsId, min) values (?,?);",
      "insert into trial (itemsId, trialNum) values (?,?);",
      [13, 2],
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

export const _deleteDB = () => {
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

export const _deleteItem = () => {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      // "delete from item where itemsId = ?;",
      // "delete from item where itemsId = ?;",
      "delete from recovery where itemsId = ?;",
      [12], // SQL文の引数
      () => {
        console.log("success");
      }, // 成功時のコールバック関数
      () => {
        console.log("fail");
      } // 失敗時のコールバック関数
    );
  });
};

export const _deleteItems = () => {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      "delete from items where id = ?;",
      [23], // SQL文の引数
      () => {
        console.log("success");
      }, // 成功時のコールバック関数
      () => {
        console.log("fail");
      } // 失敗時のコールバック関数
    );
  });
};
export const _DropTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      "drop table item;",
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
