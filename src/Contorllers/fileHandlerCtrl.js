/**
 * Controller Name : Filer handler 
 * @description : Used to handle all upload and download files
 */
const multer = require('multer');
const path = require("path");
const fileHandlerModel = require("../Models/fileHandlerModel");
const { templateList, selectedSchoolDB } = require('../commonfloor/stringManager');
const fs = require('fs')

function initializeMulter(folderPath) {
    diskStorageObj = multer.diskStorage({
        destination: function (reqMul, file, cb) {
            cb(null, folderPath);
            console.log(`Upload Path -> ${folderPath}`)
        },
        filename: function (reqMul, file, cb) {
            console.log("Upload Original File Name --> " + file.originalname)
            cb(null, file.originalname)
        }
    });
    upload = multer({ storage: diskStorageObj }).single("file");
}

/***
 * @function: fileUpload  
 * @description: Used for all upload option available in Seyally Admin
 */
exports.fileUpload = (req, res) => {
    const filerFolderPath = path.join(__dirname, ".././uploads/" + selectedSchoolDB[0].schoolFolderpath)
    initializeMulter(filerFolderPath);
    //Multer dataStorage will be initialized by passing folder
    upload(req, res, function (err) {
        // const _fileName = req.body.fileName + "/" + selectedSchoolDB[0].schoolCode;
        const _templateID = req.body.templateId;
        console.log(`Modified Template ID : ${_templateID}`)
        // Update is isUploadingFirstTime and fileName in schooldb.template_details table 
        const result = fileHandlerModel.setTemplateUploadStatus(false,true, _templateID)
        result.then(
            (success) => {
                console.log(`File Upload Successfull MSG : ${success};`)
                res.json({
                    status: true,
                    MSG: 'Success'
                })
            },
            (err) => {
                res.json({
                    status: false,
                    MSG: `Failed to Update${err}`
                })
            })
        console.log(`File successfully Saved in database.`)
        // if (err) res.json({ error: err });
    });
}
/***
 * @function: fileDownload 
 * @description: Used for all download option available in Seyally Admin
 */
exports.fileDownload = (req, res) => {
    let dataHandlerObj, dataHeaderObj = {};
    dataHandlerObj = req.body.Record,
        dataHeaderObj = req.body.Header;
    _schoolCode = dataHeaderObj.schoolCode;
    const fileName = dataHandlerObj.filename;
    const templateID = dataHandlerObj.templateID;

    const result = fileHandlerModel.getSelectedTemplateStatus(templateID);

    result.then(db_resp => {
        console.log("Download File started.")
        console.log(`is Template Uploaded First Time : ${db_resp[0].isUploadingFirstTime}`)
        console.log(`File Name from template :${db_resp[0].fileName};`);
        const folderPath = (db_resp[0].isUploadingFirstTime == true) ? ".././uploads/Template" : ".././uploads/" + selectedSchoolDB[0].schoolFolderpath;
        console.log(`Selected Folder Path ${folderPath}`);
        const filePath = path.join(__dirname, folderPath) + '/' + db_resp[0].fileName;
        console.log(filePath)
        res.sendFile(filePath);
    }, err => {
        res.status(404);
        console.log(`Controller DB RESP ERROR: ${err}`)
    })
    //returns selected template object  
    const selectedObj = templateList.filter(function (template) {
        return template.id === templateID
    })

}

/***
 * @function: fileUpload  
 * @description: Used for all upload option available in Seyally Admin
 */
exports.deleteExistingFiles = (req, res) => {
    let dataHandlerObj, dataHeaderObj = {};
    dataHandlerObj = req.body.Record,
        dataHeaderObj = req.body.Header;
    fileName = dataHandlerObj.fileName;
    const filerFolderPath = path.join(__dirname, ".././uploads/" + selectedSchoolDB[0].schoolFolderpath + "/" + fileName)
    console.log(`Folder Path for Upload ${filerFolderPath}`);

    //To check the file is already exist in that school db Folder
    fs.access(filerFolderPath, fs.F_OK, (err) => {
        if (err) {
            // return 
            console.log(`File is not available in path: ${filerFolderPath}`)
            return
        }
        //file exist
        // Assuming that 'path/file.txt' is a regular file.
        fs.unlink(filerFolderPath, (err) => {
            if (err) {
                console.log(`Unable to delete existing file in the School asset folder Path:${filerFolderPath}`)
                throw err;
            }
            console.log(`File already exist and it is deleted now.`);
        });
    })
    // console.log(`;`)
    res.json({
        status: true
    })
}