const express = require("express")
const router = express.Router();
const templateCtrl = require("../Contorllers/templateCtrl")

/**
 * @description Imports Controller used for API Services
 * @ref : https://www.youtube.com/watch?v=NsHgvKeAEDI&t=639s
 */

/**
 *  Upload & Download files API's
 *  Controllers : Customer Authendication Ctrl - ConstomerAuthendicationCtrl.js
 *  Module : Filerhandler.js
 */
    

router.post("/Templates",templateCtrl.loadAvailableTemplates);

module.exports = router

