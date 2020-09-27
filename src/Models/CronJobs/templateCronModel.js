/***
 * importing schoolDB pool connection 
 */
const mysql_db = require('../../Models/dbconfig/schoolDB');
const template_cron_model = {};

/**
 * @function: getSelectedTemplateStatus fn - { CRON JOBS : Templates service } 
 * @description Check the database if any modification done 
 * @return : fields_list, fields_length, howManySheetsInThisDoc, templateId, table_name and fileName
 */
template_cron_model.getTemplateModifiedDetails = async (selectedTamplateID) => {
    const templateID = selectedTamplateID;
    return await new Promise((resolve, reject) => {
        mysql_db.getConnection(function (error, schooldb_con) {
            if (error) reject(`Unbale to getConnection from School Pool DB service.Error : ${error}`);
            try {
                const query = "SELECT templateId, howManySheetsInThisDoc, fields_length, fileName, table_name FROM schooldb.templates_details WHERE is_xlsx_modified = true;";
                schooldb_con.query(query, [templateID], function (error, results, fields) {
                    if (error) reject(error)
                    console.log(`DB Response : ${results}`);
                    resolve(results)
                })
            } catch (err) {
                reject(`Unbale to execute Query in DB . Error :${err}`);
            } finally {
                schooldb_con.release();
            }
        });
    })
}
/**
 * @function: insertRecordIntoTables fn - { CRON JOBS : Templates service } 
 * @description Insert Record into template table 
 * @return : Database succes or failure 
 */
template_cron_model.insertRecordIntoTables = async (tableName, tableKeyName, tablevalues) => {
    return await new Promise((resolve, reject) => {
        mysql_db.getConnection(function (error, schooldb_con) {
            if (error) reject(`Unbale to getConnection from School Pool DB service.Error : ${error}`);
            try {
                const query = "truncate table schooldb." + tableName + ";INSERT INTO schooldb." + tableName + " (" + tableKeyName + ") VALUES ?";
                console.log(`Query :${query}`)
                console.log(`Value : ${tablevalues[0]}`)
                schooldb_con.query(query, [tablevalues], function (error, results, fields) {
                    if (error) reject(error)
                    console.log(`DB Response : ${results}`);
                    resolve(results)
                })
            } catch (err) {
                reject(`Unbale to execute Query in DB . Error :${err}`);
            } finally {
                schooldb_con.release();
            }
        });
    })
}
/***
 * @function: setTemplateExcelUploadStatus 
 * @description: Used to update the statu for Modified and isuploadingFirstTime Flag to false.
 */
template_cron_model.setTemplateExcelUploadStatus = async (_templid) => {
    const _templateID = _templid;
    return await new Promise((resolve, reject) => {
        mysql_db.getConnection(function (error, schooldb_con) {
            if (error) reject(`Unbale to getConnection from School Pool DB service.Error : ${error}`);
            try {
                const query = "UPDATE schooldb.templates_details SET is_xlsx_modified = ?, isUploadingFirstTime = ? WHERE templateId = ?";
                schooldb_con.query(query, [false, false, _templateID], function (error, results, fields) {
                    if (error) reject(error)
                    console.log(`DB Response : ${results}`);
                    resolve(results)
                })
            } catch (err) {
                reject(`Unbale to execute Query in DB . Error :${err}`);
            } finally {
                schooldb_con.release();
            }

        })
    });

}

module.exports = template_cron_model  