/***
 * importing schoolDB pool connection 
 */
const mysql_db = require('./dbconfig/schoolDB');
const mysql_db_seyal = require('./dbconfig/seyalDB');
const contact_model = {};
/**
 * @function: getClassNameList fn - { Contact : 1 service } 
 * @description : this fn helps to get initialize contact service.
 * @returns list of class list form class_info_details table for UI sidebar  
 */
contact_model.getClassNameList = async () => {

    return await new Promise((resolve, reject) => {
        mysql_db.getConnection(function (error, schooldb_con) {
            if (error) reject(`Unbale to getConnection from School Pool DB service.Error : ${error}`);
            try {
                const query = "SELECT * FROM schooldb.class_info_details";
                schooldb_con.query(query, function (error, results, fields) {
                    if (error) {
                        console.log(`DB Error : ${error}`)
                        reject(error)
                    }
                    console.log(`DB Response : ${results}`);
                    resolve(results)
                })
            } catch (err) {
                reject(`Unbale to execute Query in DB . Error :${err}`);
            } finally {
                schooldb_con.release();
            }
        });
    }, err => {
        reject(err);
    })
}
/**
 * @function: getTeachersContacts fn - { Contact : 1 service } 
 * @description : this fn helps to get initialize contact service.
 * @returns Teacher contact details from teacher_info_details  
 */
contact_model.getTeachersContacts = async () => {

    return await new Promise((resolve, reject) => {
        mysql_db.getConnection(function (error, schooldb_con) {
            if (error) reject(`Unbale to getConnection from School Pool DB service.Error : ${error}`);
            try {
                const query = "SELECT * FROM schooldb.teacher_info_details;";
                schooldb_con.query(query, function (error, results, fields) {
                    if (error) {
                        console.log(`DB Error : ${error}`)
                        reject(error)
                    }
                    console.log(`DB Response : ${results}`);
                    resolve(results)
                })
            } catch (err) {
                reject(`Unbale to execute Query in DB . Error :${err}`);
            } finally {
                schooldb_con.release();
            }
        });
    }, err => {
        reject(err);
    })
}
/**
 * @function: getParentContacts fn - { Contact : 1 service , 2 service} 
 * @description : this fn helps to get initialize contact service and on select of dropdown
 * @returns required parent contact information for pagination or sidebar
 */
contact_model.getParentContactInfo = async (classTableName) => {

    return await new Promise((resolve, reject) => {
        mysql_db.getConnection(function (error, schooldb_con) {
            if (error) reject(`Unbale to getConnection from School Pool DB service.Error : ${error}`);
            try {
                const query = "SELECT * FROM schooldb."+classTableName+";";
                schooldb_con.query(query, function (error, results, fields) {
                    if (error) {
                        console.log(`DB Error : ${error}`)
                        reject(error)
                    }
                    console.log(`DB Response : ${results}`);
                    resolve(results)
                })
            } catch (err) {
                reject(`Unbale to execute Query in DB . Error :${err}`);
            } finally {
                schooldb_con.release();
            }
        });
    }, err => {
        reject(err);
    })
}
/**
 * @function: updateContactInfo fn - { Contact : 1 service , 2 service} 
 * @description : this fn helps to update specific contact 
 * @returns status of the update
 */
contact_model.updateContactInfo = async (tableName, querySelector, condition) => {
//UPDATE tutorials_tbl SET tutorial_title = 'Learning JAVA' WHERE tutorial_id = ;
    return await new Promise((resolve, reject) => {
        mysql_db.getConnection(function (error, schooldb_con) {
            if (error) reject(`Unbale to getConnection from School Pool DB service.Error : ${error}`);
            try {
                const query = "UPDATE schooldb."+tableName+" SET "+querySelector+" WHERE "+condition;
                console.log("QUERY ---> "+query)
                schooldb_con.query(query, function (error, results, fields) {
                    if (error) {
                        console.log(`DB Error : ${error}`)
                        reject(error)
                    }
                    console.log(`DB Response : ${results}`);
                    resolve(results)
                })
            } catch (err) {
                reject(`Unbale to execute Query in DB . Error :${err}`);
            } finally {
                schooldb_con.release();
            }
        });
    }, err => {
        reject(err);
    })
}
module.exports = contact_model

