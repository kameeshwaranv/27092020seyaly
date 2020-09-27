

const express = require("express")
const router = express.Router();
const Filerhandler = require("../Contorllers/fileHandlerCtrl")

/**
 * @description Imports Controller used for API Services
 * @ref : https://www.youtube.com/watch?v=NsHgvKeAEDI&t=639s
 */

/**
 *  Upload & Download files API's
 *  Controllers : Customer Authendication Ctrl - ConstomerAuthendicationCtrl.js
 *  Module : Filerhandler.js
 */

router.post("/deleteIfExist",Filerhandler.deleteExistingFiles);
router.post("/upload",Filerhandler.fileUpload);
router.post("/download",Filerhandler.fileDownload);//Filerhandler.fileDownload);

module.exports = router

