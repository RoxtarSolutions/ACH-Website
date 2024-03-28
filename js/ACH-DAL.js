var userdb ={

    insertData: function (user) {
        db.transaction(function (tx) {
            var sql = `INSERT INTO Users (FirstName, LastName, Email, Phone, Username, Password) VALUES (?, ?, ?, ?, ?, ?)`;
            var options = [user.FirstName, user.LastName, user.Email, user.Phone, user.Username, user.Password];
            console.log("added: "+user.Username);
            function successCallback() {
                console.info("Success: User inserted successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    selectUser: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM users WHERE Username=?`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    selectAll: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM users`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    update:function (id, user) {
        db.transaction(function (tx) {
            var sql = `UPDATE users SET FirstName=?, LastName=?, Email=?, Phone=?, Username=?, Password=? WHERE id=?`;
            var options = [user.FirstName, user.LastName, user.Email, user.Phone, user.Username,user.Password, id];
            function successCallback() {
                console.info("Success: "+user.FirstName+" updated successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    delete:function (userId) {
        db.transaction(function (tx) {
            var sql = `DELETE FROM users WHERE id=?`;
            var options = [userId];

            function successCallback() {
                console.info("Success: UserClass deleted successfully.");
            }

            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    }
}
