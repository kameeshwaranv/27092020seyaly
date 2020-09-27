/**
 * @Desscription : Templete handler Service Controller 
 */
const { templateList } = require('../commonfloor/stringManager');

exports.loadAvailableTemplates = (req, res) => {
    console.log("Came")
    let dataHandlerObj, dataHeaderObj = {};
    dataHandlerObj = req.body.Record,
        dataHeaderObj = req.body.header;
    if (dataHandlerObj.service == 'Templates' && dataHandlerObj.stage == 1) {
        DataObj = {
            Status: true,
            Msg: "Template list fetched from Sting Handler",
            TemplateRecordList: templateList  // If cust not activated = N or Allow he/she to login
        }
    } else {
        DataObj = {
            Status: false,
            Msg: "Failed to fetch Template List"
        }
    }

    respObj = {
        header: {
            Status: true,
            StatusMsg: '',
        },
        Record: DataObj
    }
    console.log(respObj);
    res.send(respObj)

}