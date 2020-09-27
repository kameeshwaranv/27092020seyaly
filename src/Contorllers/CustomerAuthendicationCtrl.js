// const _ = require('lodash');
const { templateList } = require('../commonfloor/stringManager');
// const { getWebToken } = require('../commonfloor/common');https://www.youtube.com/watch?v=mbsmsi7l3r4&t=803s&ab_channel=WebDevSimplified
/**
 * @type Request Processor 
 */
const _Query = require('../commonfloor/stringManager');
/**
 * @type Constroller : Mostly used for prelogin services to validate customer credentials & other prelogin service purposes
 * @description Import required models will be used in this Controller
 */

const custAuthModel = require('../Models/CustAuthModel');
const bcrypt = require("bcrypt");
/**
 * @function To createNewCustomer customer Entered details
 * @description : to validate and create new customer  
*/
exports.createNewCustomer = async (req, res) => {
    let dataHandlerObj, dataHeaderObj = {};
    dataHandlerObj = req.body.Record,
        dataHeaderObj = req.body.header;

    if (dataHandlerObj.service == 'login' && dataHandlerObj.stage == 1) {
        /**
         * @description Login service used to check entered password is mathcing for customer
         * #Info : Stage 1 & Service : LOGIN
         */
        const result =  custAuthModel.getUserStatus(dataHandlerObj);

        let c_grade, c_account_status, c_status, c_msg;
        await result.then(async db_resp => {
            if (db_resp != 0) {
                //DB has some record for that username
                // const salt = await bcrypt.genSalt();
                // const pwd = await bcrypt.hash(dataHandlerObj.password, salt);
                
                try {
                    console.log(db_resp[0].cust_password)
                    if (await bcrypt.compare(dataHandlerObj.password,db_resp[0].cust_password)) {
                        c_status = true;
                        console.log('Matched')
                    }else{
                        c_status = false;  console.log('Not Matched')
                        c_msg ='Entered Password is not Matching.Please try again.';
                    }
                } catch (err) {
                    c_status = false;
                    c_msg ='Entered Password is not Matching.Please try again.';
                }

                c_grade = db_resp[0].cust_grade;
                c_account_status = db_resp[0].cust_account_status;
                
                // c_msg = c_account_status == 'N' ? 'Customer Not Activated' : 'Customer Activated Already.Proceed to login';
            } else {
                // Customer enterd detail is not valid 
                c_status = false;
                c_msg = 'Entered Username is not matching.';
            }
        }, err => {
            c_DB_Error = false;
            c_msg = 'DB Error : ' + err;
        })
        //Customer has to set the password proceed with stage 2 
        respObj = {
            header: {
                Status: true,
                StatusMsg: ''
            },
            Record: {
                Status: c_status,
                Msg: c_msg,
                isCustActivated: c_account_status  // If cust not activated = N or Allow he/she to login
            }
        }
        res.send(respObj);

    } else if (dataHandlerObj.service == 'login' && dataHandlerObj.stage == 2) {
        /**
         * @description Set New Password and change the status = Y if old pwd matches
         * #Info : Stage 1 & Service : LOGIN
         */
        const result = custAuthModel.getUserStatus(dataHandlerObj);


        await result.then(db_resp => {
            if (db_resp != 0) {
                cust_activation_flag = db_resp[0][0].RESULT == 'Y' ? db_resp : 'N';
                c_status = true;
                c_msg = 'Customer successfully Registered.';
            } else {
                c_DB_Error = false;
                c_msg = 'DB Error : ' + err;
            }
        }, err => {
            c_DB_Error = false;
            c_msg = 'DB Error : ' + err;
        })

        //Customer has to set the password proceed with stage 2 
        respObj = {
            header: {
                Status: true,
                StatusMsg: '',
            },
            Record: {
                Status: c_status,
                Msg: c_msg,
                isCustActivated: cust_activation_flag  // If cust not activated = N or Allow he/she to login
                // fileHandlerObj: templateList 
            }
        }
        res.send(respObj);

    }
}

/**
 *@function validateNewPwd to set new password.
 */
// exports.validateNewPwd = (req, res) => {
//     const reqObj = req.body.Record;
//     const oldPassword = _.get(reqObj, 'oldpassword');
//     const newPassword = _.get(reqObj, 'password');

//     if (oldpwd == 123 && newpwd == 123) {
//         respObj = {
//             header: {
//                 Status: true,
//                 StatusMsg: '',
//             },
//             Record: {
//                 Status: true,
//                 Msg: 'Hola Kamesh! you Sucessfully set nnw password.'
//             }
//         }
//         res.send(respObj);
//     }
// }