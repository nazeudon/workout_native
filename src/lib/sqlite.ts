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
      // () => reject(new Error("[get events] transaction failed")),
      () => reject(createInitDB()),
      () => resolve(results.rows._array)
    );
  });
};

export const InsertEvent = (
  event: string,
  trainingType: string,
  part: string,
  partDetail: string
) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into events (event, trainingType, part, partDetail) values (?, ?, ?, ?);",
          [event, trainingType, part, partDetail],
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
      () => reject(new Error("[insert event] transaction failed")),
      () => resolve(results.insertId)
    );
  });
};
export const UpdateEvent = (
  id: number,
  event: string,
  trainingType: string,
  part: string,
  partDetail: string
) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "update events set event = ?, trainingType = ?, part = ?, partDetail = ? where id = ?;",
          [event, trainingType, part, partDetail, id],
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
      () => reject(new Error("[update event] transaction failed")),
      () => resolve(results.rows._array)
    );
  });
};

export const DeleteEvent = (id: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "delete from events where id = ?;",
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
      () => reject(new Error("[delete events] transaction failed")),
      () => resolve(results.insertId)
    );
  });
};

export const getItems = (eventId: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
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
      // () => reject(new Error("[get items] transaction failed")),
      () => reject(_createItemsDB()),
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

export const InsertItem = (eventId: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into items (eventId, sets, totalWeights, recovery, trial) values (?, ?, ?, ?, ?);",
          [eventId, 0, 0, 0, 1],
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

export const UpdateItemSets = (
  id: number,
  sets: number,
  totalWeights: number
) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "update items set sets = ?, totalWeights = ? where id = ?;",
          [sets, totalWeights, id],
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
      () => reject(new Error("[update itemsSets] transaction failed")),
      () => resolve(results.rows._array)
    );
  });
};

export const UpdateItemRecovery = (id: number, recovery: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "update items set recovery = ? where id = ?;",
          [recovery, id],
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
      () => reject(new Error("[update itemsRecovery] transaction failed")),
      () => resolve(results.rows._array)
    );
  });
};

export const UpdateItemTrial = (id: number, trial: number) => {
  return new Promise<any>((resolve, reject) => {
    let results: SQLite.SQLResultSet;
    db.transaction(
      (tx) => {
        tx.executeSql(
          "update items set trial = ? where id = ?;",
          [trial, id],
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
      () => reject(new Error("[update itemsTrial] transaction failed")),
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
      // () => reject(new Error("[insert itemsDetails] transaction failed")),
      () => reject(_createItemDB()),
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

const createInitDB = () => {
  _createEventsDB();
  _createItemsDB();
  _createItemDB();
};

const _createEventsDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      "create table if not exists events (id integer primary key not null, event text not null, trainingType text not null, part text not null, partDetail text);",
      null, // SQL文の引数
      () => {
        console.log("success create EventsDB");
      }, // 成功時のコールバック関数
      () => {
        console.log("fail");
      } // 失敗時のコールバック関数
    );
  });
};

const _createItemsDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      "create table if not exists items" +
        "(" +
        "id integer primary key not null," +
        "eventId integer not null," +
        "createdAt TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')) not null," +
        "sets integer not null," +
        "totalWeights real not null," +
        "recovery integer not null," +
        "trial integer not null" +
        ");",
      null, // SQL文の引数
      () => {
        console.log("success create ItemsDB");
      }, // 成功時のコールバック関数
      () => {
        console.log("fail");
      } // 失敗時のコールバック関数
    );
  });
};

const _createItemDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      "create table if not exists item" +
        "(" +
        "id integer primary key not null," +
        "itemsId integer not null," +
        "weights real not null," +
        "times integer not null" +
        ");",
      null, // SQL文の引数
      () => {
        console.log("success create ItemDetailDB");
      }, // 成功時のコールバック関数
      () => {
        console.log("fail");
      } // 失敗時のコールバック関数
    );
  });
};

/**********************************************/

export const _initDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      // 実行したいSQL文
      "create table if not exists items (id integer primary key not null, eventId integer not null, createdAt TIMESTAMP DEFAULT (datetime(CURRENT_TIMESTAMP,'localtime')) not null, sets integer not null, totalWeights real not null);",
      //"create table if not exists events (id integer primary key not null, event text not null);",
      // "create table if not exists item (id integer primary key not null, itemsId integer not null, weights real not null, times integer not null);",
      // "create table if not exists recovery (id integer primary key not null, itemsId integer not null, min integer not null);",
      // "create table if not exists trial (id integer primary key not null, itemsId integer not null, trialNum integer not null);",
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
      "insert into items (id, eventId, sets, totalWeights) values (?, ?, ?, ?), (?, ?, ?, ?);",
      // [1],
      // "insert into events (id, event) values (?, ?),(?, ?), (?, ?);",
      // [1, "ベンチプレス ", 2, "デッドリフト", 3, "スクワット"],
      // "insert into item (itemsId, weights, times) values (?,?,?),(?,?,?),(?,?,?);",
      // [2, 100.0, 10, 2, 100.0, 9, 2, 100.0, 8],
      // "insert into recovery (itemsId, min) values (?,?);",
      // "insert into trial (itemsId, trialNum) values (?,?);",
      [10, 1, 3, 1500, 13, 1, 3, 1000],
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

export const _addColumnToDB = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "alter table items add column trial integer not null default 1;",
      null,
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
      "drop table items;",
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
      "delete from item where itemsId = ?;",
      [15], // SQL文の引数
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
      [15], // SQL文の引数
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
