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
            var sql = `SELECT * FROM Users WHERE Username=?`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    selectAll: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM Users`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    update:function (id, user) {
        db.transaction(function (tx) {
            var sql = `UPDATE Users SET FirstName=?, LastName=?, Email=?, Phone=?, Username=?, Password=? WHERE id=?`;
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
                console.info("Success: User deleted successfully.");
            }

            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    }
}

var vehicledb ={

    insertData: function (vehicle) {
        db.transaction(function (tx) {
            var sql = `INSERT INTO Vehicles (VIN, User, ODO, WTire, Mod, Image) VALUES (?, ?, ?, ?, ?, ?)`;
            var options = [vehicle.VIN, vehicle.User, vehicle.ODO, vehicle.WTire, vehicle.Mod, vehicle.Image];
            console.log("added: "+ vehicle.VIN);
            function successCallback() {
                console.info("Success: Vehicle inserted successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    selectUser: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM Vehicles WHERE VIN=?`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    selectAll: function (options, callback) {
        db.transaction(function (tx) {
            var sql = `SELECT * FROM Vehicles`;
            tx.executeSql(sql, options, callback, errorHandler);
        });
    },

    update:function (user, vehicle) {
        db.transaction(function (tx) {
            var sql = `UPDATE vehicle SET VIN=?, ODO=?, WTire=?, Mod=?, Image=? WHERE user=?`;
            var options = [vehicle.VIN, vehicle.ODO, vehicle.WTire, vehicle.Mod, vehicle.Image, user];
            function successCallback() {
                console.info("Success: "+vehicle.VIN+" updated successfully.");
            }
            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    },

    delete:function (vehicleVIN) {
        db.transaction(function (tx) {
            var sql = `DELETE FROM Vehicle WHERE VIN=?`;
            var options = [vehicleVIN];

            function successCallback() {
                console.info("Success: Vehicle deleted successfully.");
            }

            tx.executeSql(sql, options, successCallback, errorHandler);
        });
    }
}
