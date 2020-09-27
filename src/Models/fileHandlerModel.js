/***
 * importing schoolDB pool connection 
 */
const mysql_db = require('./dbconfig/schoolDB');
const { reject } = require('lodash');
const file_handler_model = {};

/**
 * @function: getSelectedTemplateStatus fn - { FileUploader : Download service } 
 * @description : this fn helps to identify to download fresh template or Already used template
 * @returns isUploadingFirstTime Flag from schoolDB.template_details table 
 */
file_handler_model.getSelectedTemplateStatus = async (selectedTamplateID) => {
    const templateID = selectedTamplateID;
    return await new Promise((resolve, reject) => {
        mysql_db.getConnection(function (error, schooldb_con) {
            if (error) reject(`Unbale to getConnection from School Pool DB service.Error : ${error}`);
            try {
                const query = "SELECT isUploadingFirstTime, fileName FROM schooldb.templates_details WHERE templateId = ?;";
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
file_handler_model.setTemplateUploadStatus = async (isFirstTimeflag, isModifiedFlag, _templateid) => {
    const _fileName = fileName,
        _isUploadingFirstTime = isFirstTimeflag,
        _templateID = _templateid,
        _isModified = isModifiedFlag;

    return await new Promise((resolve, reject) => {
        mysql_db.getConnection(function (error, schooldb_con) {
            if (error) reject(`Unbale to getConnection from School Pool DB service.Error : ${error}`);
            try {
                const query = "UPDATE schooldb.templates_details SET is_xlsx_modified = ? ,isUploadingFirstTime = ? WHERE templateId = ?";
                schooldb_con.query(query, [_isModified, _isUploadingFirstTime, _templateID], function (error, results, fields) {
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

module.exports = file_handler_model  