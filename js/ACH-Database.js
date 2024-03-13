var db;

function errorHandler(error) {
    console.error("SQL error: " + error.message);
}

var DB = {
    createDatabase: function () {
        var shortName = "ACH-DB";
        var version = "1.0";
        var displayName = "DB for AutoCare Hub";
        var dbSize = 10 * 1024 * 1024;

        function dbCreateSuccess() {
            console.info("Success: Database created successfully");
        }
        db = openDatabase(shortName, version, displayName, dbSize, dbCreateSuccess);
    },

    createTables: function () {
        db.transaction(function (tx) {
            var createUserTable = `CREATE TABLE IF NOT EXISTS Users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                FirstName VARCHAR(100),
                LastName VARCHAR(100),
                Email VARCHAR(100),
                Phone VARCHAR(15),
                Username VARCHAR(50),
                Password VARCHAR(50)
            );`;
            tx.executeSql(createUserTable, [], null, errorHandler);
        });
    },

};


