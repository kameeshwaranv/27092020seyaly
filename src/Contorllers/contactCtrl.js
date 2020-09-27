// const _ = require('lodash');
const { templateList } = require('../commonfloor/stringManager');
const _Query = require('../commonfloor/stringManager');
/**
 * @type Constroller : Mostly used for prelogin services to validate customer credentials & other prelogin service purposes
 * @description Import required models will be used in this Controller
 */
const contactModel = require('../Models/contactModel');


exports.initializeContact = async (req, res) => {
    let dataHandlerObj, dataHeaderObj = {};
    dataHandlerObj = req.body.Record,
        dataHeaderObj = req.body.header;
    let sideBarResult, teacherContactListResult, parentContactListResult;

    // Get list of class Name for Side Bar from class_info_details table
    const sideBarList = contactModel.getClassNameList();
    await sideBarList.then(db_resp => {

        if (db_resp != 0) {
            sideBarResult = db_resp.map((mysqlObj, index) => {
                return Object.assign({}, mysqlObj);
            });
            // console.log(JSON.stringify(db_resp)) 
        } else {
            // Customer enterd detail is not valid 
            c_status = false;
            c_msg = 'Error to fetch data from database.';
        }
    }, err => {
        c_DB_Error = false;
        c_msg = 'DB Error : ' + err;
    })

    //Now fetch Teacher contact Information from database.
    const teachersContactInfo = contactModel.getTeachersContacts();
    await teachersContactInfo.then(db_resp_teacher => {

        // console.log(db_resp_teacher)
        if (db_resp_teacher != 0) {
            teacherContactListResult = db_resp_teacher.map((mysqlObj, index) => {
                return Object.assign({}, mysqlObj);
            });
            // console.log(teacherContactListResult)
        } else {
            // Customer enterd detail is not valid 
            c_status = false;
            c_msg = 'Error to fetch data from database.';
        }
    }, err => {
        c_DB_Error = false;
        c_msg = 'DB Error : ' + err;
    })
    // console.log(">>>>>>>>>" + sideBarResult[0].class_table_name)
    //Now fetch Pre KG contact Information from database by default.
    const parentContactInfo = contactModel.getParentContactInfo(sideBarResult[0].class_table_name);
    await parentContactInfo.then(db_resp_parent => {

        // console.log(db_resp_teacher)
        if (db_resp_parent != 0) {
            parentContactListResult = db_resp_parent.map((mysqlObj, index) => {
                return Object.assign({}, mysqlObj);
            });

        } else {
            // Customer enterd detail is not valid 
            c_status = false;
            c_msg = 'Error to fetch data from database.';
        }
    }, err => {
        c_DB_Error = false;
        c_msg = 'DB Error : ' + err;
    })
    let respObj = {
        header: {
            Status: true,
            StatusMsg: 'tesr',
        },
        sideBar: sideBarResult,
        teacherRecord: teacherContactListResult,
        parentRecord: parentContactListResult
    }
    console.log(respObj)
    res.send(respObj);
}
/**
 * @description: Contact Controller for all Contact API Services
 */

exports.getContactsInfo = async (req, res) => {
    let parentContactListResult;
    let dataHandlerObj, dataHeaderObj = {};
    dataHandlerObj = req.body.Record,
        dataHeaderObj = req.body.header;
    if (dataHandlerObj.service == 'Contacts' && dataHandlerObj.stage == 2) {
        console.log(`Selected Table Name : ${dataHandlerObj.tableName}`)
        //Now fetch Pre KG contact Information from database by default.
        const classTableName = dataHandlerObj.tableName;
        const parentContactInfo = contactModel.getParentContactInfo(classTableName);
        await parentContactInfo.then(db_resp_parent => {

            // console.log(db_resp_parent)
            if (db_resp_parent != 0) {
                parentContactListResult = db_resp_parent.map((mysqlObj, index) => {
                    return Object.assign({}, mysqlObj);
                });
                console.log(parentContactListResult)
            } else {
                // Customer enterd detail is not valid 
                c_status = false;
                c_msg = 'Error to fetch data from database.';
            }
        }, err => {
            c_DB_Error = false;
            c_msg = 'DB Error : ' + err;
        })
    }


    let respObj = {
        header: {
            Status: true,
            StatusMsg: '',
        },
        parentRecord: parentContactListResult
    }
    res.send(respObj);
}

/**
 * @function to get list of classes and teachers details from DB
 * @param {*} req 
 * @param {*} res 
 */
exports.updateContact = async (req, res) => {
    let dataHandlerObj, dataHeaderObj = {};
    let querySelector;
    dataHandlerObj = req.body.Record,
        dataHeaderObj = req.body.header;
    if (dataHandlerObj.service == 'Contacts' && dataHandlerObj.stage == 3) {
        // const editedContact = dataHeaderObj.contactObj;
        const contact_key = dataHandlerObj.modifiedContactKey,
            contact_value = dataHandlerObj.modifiedContactValue,
            tableName = dataHandlerObj.tableName,
            referenceID = dataHandlerObj.referenceID;
            querySelector='';
        for (var i = 0; i < contact_key.length; i++) {
            querySelector += contact_key[i] + " ='" + contact_value[i] + "'" + (i == contact_key.length - 1 ? '':', ');
        }
        console.log(referenceID)
        const whereClouse = tableName == 'teacher_info_details' ? "teacher_id = '"+referenceID+"'" : "stu_id = '"+referenceID + "'"
        const updateContact = contactModel.updateContactInfo(tableName, querySelector,whereClouse);
        await updateContact.then(db_resp_update => {

            if (db_resp_update != 0) {

            } else {
                c_status = false;
                c_msg = 'Error to fetch data from database.';
            }
        }, err => {
            c_DB_Error = false;
            c_msg = 'DB Error : ' + err;
        })
    }
    let respObj = {
        header: {
            Status: true,
            StatusMsg: '',
        },
        parentRecord: ''
    }
    res.send(respObj);
}