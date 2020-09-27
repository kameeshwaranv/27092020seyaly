/**
 * @file: Customer Authendication Model - Mainly used to validate customer details
 */
const mysql = require("mysql");

const mysql_pool = {}
mysql_pool.db_Name;
/**
 * @description : Created mysql pool connection for schooldb to handle multiple connection thread.  
 */
const mysql_pool_connect = mysql.createPool( {
    host: 'localhost',
    user: 'root',
    password: '@iTN14U8727!@',
    database: mysql_pool.db_Name,
    connectionLimit : 5,
});
/***
 * @function getConnect  
 * @returns Promise to connection estabilished status.
 * @description : it check the availability of connection in pool to connect.
 */
mysql_pool.getConnect = () => {
    return new Promise((resolve, reject) => {
        mysql_pool_connect.getConnection(function (err) {
            if (err) {
                console.log(`********** SchoolDB pool connection Error : ${err} ************************`);
                return reject(false);
            } else {
                console.log(`********** schoolDB DB pool connection done************************`);
                return resolve(this);
            }
        });
    })
}
/**
 * @function 
 * @returns null
 * @description Release Connection pool
 */
mysql_pool.releaseConnection = () =>{
    mysql_pool_connect.release();
} 

module.exports = mysql_pool_connect