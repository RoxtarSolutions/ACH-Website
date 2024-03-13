var dbOpen;

function errorHandler(error){
    console.error("SQL error: " + error.message);
}

var db = {
    createDatabase : function(){
        var dbName = "ACH-DB";
        var version = "1.0";
        var displayName = "AutoCare Hub";
        var dbSize = 10*1024*1024;

        function dbCreateSuccess(){
            console.info("Database Created Successfully!!");
        }

        dbOpen = openDatabase(dbName,version,displayName,dbSize,dbCreateSuccess);
    },
    // createTable: function(){
    //     dbOpen.transaction(function(tx){
    //
    //         var usersTable = "CREATE TABLE if NOT EXISTS  users( " +
    //             "user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,  " +
    //             "username VARCHAR(30) NOT NULL,  " +
    //             "password VARCHAR(20) NOT NULL, " +
    //             "email INTEGER NOT NULL, " +
    //             "address VARCHAR(30), " +
    //             "phone_number VARCHAR(20) NOT NULL;";
    //
    //         var vehiclesTable = "CREATE TABLE vehicles ( "
    //             "vehicle_id INT AUTO_INCREMENT PRIMARY KEY, " +
    //             "user_id INT, " +
    //             "make VARCHAR(50) NOT NULL, " +
    //             "model VARCHAR(50) NOT NULL, " +
    //             "year INT, " +
    //             "color VARCHAR(100) NOT NULL, " +
    //             "license VARCHAR(100) NOT NULL, " +
    //             "FOREIGN KEY (user_id) REFERENCES users(user_id);";
    //
    //         function success() {
    //             console.info("Tables created successfully");
    //         }
    //
    //         tx.executeSql(usersTable, [],success, errorHandler);
    //         tx.executeSql(vehiclesTable, [], success, errorHandler);
    //
    //     });
    // }
}