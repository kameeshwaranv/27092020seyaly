

const express = require("express")
const router = express.Router();
/**
 * @description Imports Controller used for API Services
 */

const CustAuthCtrl = require('../Contorllers/CustomerAuthendicationCtrl');


/**
 *  Pre-login service API's
 *  Controllers : Customer Authendication Ctrl - ConstomerAuthendicationCtrl.js
 *  Model : CustAuthModels.js
 */

router.post("/login",CustAuthCtrl.createNewCustomer);
// router.post("/SetPassword",CustAuthCtrl.validateNewPwd); 


module.exports = router

