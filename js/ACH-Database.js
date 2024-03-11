var dbOpen;

function errorHandler(error){
    console.error("SQL error: " + error.message);
}

var DB = {
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
    createTable: function(){
        dbOpen.transaction(function(tx){
            var stateQuery = "CREATE TABLE if NOT EXISTS state(" +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
                "name VARCHAR(20) NOT NULL);"

            var reviewQuery = "CREATE TABLE if NOT EXISTS  restaurant( " +
                "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,  " +
                "Name VARCHAR(30) NOT NULL,  " +
                "B_Id VARCHAR(20) NOT NULL, " +
                "stateId INTEGER NOT NULL, " +
                "R_Email VARCHAR(30), " +
                "R_Comments TEXT,  " +
                "hasRating VARCHAR(1),  " +
                "fq_rating INTEGER,  " +
                "s_rating INTEGER,  " +
                "v_rating INTEGER,  " +
                "FOREIGN KEY(stateId) REFERENCES state(id));"

            function success() {
                console.info("Tables created successfully");
            }

            tx.executeSql(stateQuery, [],success, errorHandler);
            tx.executeSql(reviewQuery, [], success, errorHandler);

        });
    }
}