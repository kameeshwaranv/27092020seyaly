const multer = require('multer');

class filehandlerModule {
    constructor() {
        /**
         * @description: Define Multer storage obj by passing folder path default is ./uploads
         */

        this._diskStorageObj;
        this._upload;

    }

    letinitializeDiskPath = (folderPath) => {
        return  multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, folderPath);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '.' + file.originalname)
            }
        });
    }
    loadMulter = (diskStorageObj) => {
        return multer({storage:diskStorageObj}).single("file");
    }

    /**
     * @function: uploadFile() 
     * @description: return object with originalName =File Name ; 
     */
    uploadFile(_uploadd) {
        // console.log("File Module Fn" + this._diskStorageObj)
        return new promise((resolve, reject) => {
            uploadd(function (err, res) {
                console.log(`Inside File Upload ==>${err} <==> ${res}`);
                if (err) reject(err);
                resolve(res);
            });
        })
    }
}
module.exports = filehandlerModule;