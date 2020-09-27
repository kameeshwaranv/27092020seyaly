/***
 * importing schoolDB pool connection 
 */
const mysql_db = require('./dbconfig/schoolDB');
const mysql_db_seyal = require('./dbconfig/seyalDB');
// const { reject } = require('lodash');
const cust_auth_model = {};

// /**
//  * @function: checkPlanAndAccountStatus fn - { Service : Login Stage 1 }
//  * @description : to check the user plan details is vaild or not 
//  */
// cust_auth_model.checkPlanAndAccountStatus = async (dataObj) => {
//     return await new Promise((resolve, reject) => {
//         const customer_email = dataObj.email;
//         const customer_pwd = dataObj.password;
//         mysql_db_seyal.getConnection(function(error,mysql_con){
//             try {
//                 const query = "";
//                 mysql_con.query(query, [], (error, result, next) => {
//                         if (error)
//                             reject(error);
//                         if (result[0])
//                             resolve(result)
//                     })
//             } finally {
//                 mysql_db_seyal.release();
//             }
//         })
//     })
// }


/**
 * @function: getUserStatus fn - { Service : Login  Stage : 1  & 2 } 
 * @description : to check the customer is actiavted or not; First call in Admin Module
 * @returns Cust_account_status , cust_grade from user_detail table
 */

cust_auth_model.getUserStatus = async (dataObj) => {
    return await new Promise((resolve, reject) => {
        if (dataObj.stage == 1) {
            const customer_username = dataObj.username;
            const query = "SELECT cust_account_status, cust_grade, cust_password FROM schooldb.user_details WHERE cust_username = ?; ";
            mysql_db.getConnection(function (error, schooldb_con) {
                try {
                    schooldb_con.query(query, [customer_username], function (error, results, fields) {
                        if (error) {
                            console.log(`***********Failed to insert data for new customer : ${error} **************`)
                            return reject(error)
                        } else {
                            console.log(`**********  Mysql Success ************************${results}`);
                            if (results[0])
                                return resolve(results);
                            else
                                return resolve(0);
                        }
                    }) //Query Connection END
                } finally {
                    schooldb_con.release();
                }
            }) //Get Connection END
        } else if (dataObj.stage == 2) {
            const old_password = dataObj.oldPassword;
            const new_password = dataObj.newPassword;
            const cust_username = dataObj.username; 
            console.log(old_password + "--" + new_password+"--"+cust_username);
            mysql_db.getConnection(function (error, schooldb_con1) {
                query = "call getCustStatus(?,?,?);";
                try {
                    schooldb_con1.query(query, [old_password,new_password,cust_username], function (err,results,fields) {
                        if (err) {
                            console.log(`***********Database Error : ${err} **************`)
                            return reject(error)
                        } else {
                            console.log(`**********  Mysql Success ************************`);
                            if (results)
                                return resolve(results);
                            else
                                return resolve(0);
                        }
                    });
                } finally {
                    schooldb_con1.release();
                }
            });
        }
    })// Promise END
}



module.exports = cust_auth_model