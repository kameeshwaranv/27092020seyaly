const express = require("express")
const router = express.Router();
const constactCtrl = require("../Contorllers/contactCtrl")

/**
 * @description Imports Controller used for contact API Services
 * @ref : 
 */


router.post("/initContact",constactCtrl.initializeContact)
router.post("/getList",constactCtrl.getContactsInfo);
router.post("/updateContact", constactCtrl.updateContact);

module.exports = router

