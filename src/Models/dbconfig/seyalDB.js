var mysql = require('mysql');
var mySqlObj = {};

mySqlObj.pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '@iTN14U8727!@',
    database: 'seyaldb'
});

mySqlObj.getConnection = function (callback) {
    pool.getConnection(function (err, connection) {
        callback(err, connection);
    });
};

exports.pool = mySqlObj;