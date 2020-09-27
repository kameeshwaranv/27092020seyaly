/*******
 * @description Check the database if any modification done 
 * @return : fields_list, fields_length, is_xlsx_modified, howManySheetsInThisDoc, table_name and fileName
 * */
const xlsx = require("xlsx");
const _ = require("lodash");
const { selectedSchoolDB } = require('../../commonfloor/stringManager');
const path = require("path")
const template_cron_model = require("../../Models/CronJobs/templateCronModel");
const template_model = require("../../Models/CronJobs/templateCronModel");
var templateId = [],
    sheet_length = [],
    fields_length = [],
    fields_list = [],
    file_name = [],
    table_name = [];
var xlsx_result = [];
var workbook = [];
exports.templateCronJobs = async () => {
    /** First Check any modification done or not ; mobifiedList : Array OR single object  */
    const result = template_cron_model.getTemplateModifiedDetails();

    await result.then(response => {
        mobifiedList = response;
    }, err => {
        console.log("Unable to fetch modified details from DB.")
    })

    for (var i = 0; i < mobifiedList.length; i++) {
        console.log(`<-------------MODIFIED EXCEL : STARTS-------------------->`)
        console.log(`<-------------MODIFIED EXCEL ${i}-------------------->`)
        templateId[i] = mobifiedList[i].templateId;
        sheet_length[i] = mobifiedList[i].howManySheetsInThisDoc;
        fields_length[i] = mobifiedList[i].fields_length;
        file_name[i] = mobifiedList[i].fileName;
        table_name[i] = mobifiedList[i].table_name;
        console.log(`Index: ${i} Template ID :${templateId[i]}`)
        var workbook = xlsx.readFile(path.join(__dirname, "../../uploads/" + selectedSchoolDB[0].schoolFolderpath + "/" + file_name[i]));
        var sheets_names = workbook.SheetNames;
        /******** Sheets iteration started  ***************/
        var j = 0;
        while (j < sheet_length[i]) {
            console.log(`<-------------SHEETS INDEX ${j} : STARTS-------------------->`)
            //Get particular Sheet Data Obj
            var xs = workbook.Sheets[sheets_names[j]];
            xlsx_result[j] = xlsx.utils.sheet_to_json(xs);
            var resultData = xlsx_result[j];
            var result_record = [];
            for (var k = 0; k < resultData.length; k++) {
                if (k == 0) {
                    tableKeyName = _.keys(resultData[k])
                }
                result_record[k] = _.values(resultData[k]);
            }
            /** Insert complete Sheet record into database  */
            /**
             * Sheets_name = Table Name
             * tableKeyName = table fields 
             * result_record = [] object = LIST OF RECORDS AVAILABLE IN THAT PARTICULAR SHEETS
             *  */
            if (result_record.length > 0) {
                var sheet_db_result = template_model.insertRecordIntoTables(sheets_names[j], tableKeyName, result_record);
                await sheet_db_result.then(success => {
                    console.log(`Excel Sheets Name : ${sheets_names[j]}   Table Fields :${tableKeyName} `);
                    console.log(`Length Of Record Available in that sheets : ${result_record.length}`)
                    console.log("Are Inserted successfully.")
                }, err => {
                    console.log(`Excel Sheets Name Failed to update in DB: ${err}`);
                })
            } else {
                console.log(`No Record in This sheets : ${sheets_names[j]};`)
            }
            console.log(`<-------------SHEETS INDEX ${j} : END-------------------->`)
            j++;
        }
        /******** Sheets iteration ENDS ***************/
        console.log(`<------------------------------->`);
        console.log(`Modified excels Template ID : ${templateId[i]} Records are updated into Table`);
        var ModifiedStateUpdate_db_result = template_cron_model.setTemplateExcelUploadStatus(templateId[i]);
        await ModifiedStateUpdate_db_result.then(success => {
            console.log(`is_xlsx_modified status and isUploadingFirstTime status is changed to false.`)
        }, err => {
            console.log(`DB Error while updating is_xlsx_modified status and isUploadingFirstTime status to false.ERROR: ${err}`)
        })
        console.log(`<-------------MODIFIED EXCEL : END-----INDEX : ${i}--------------->`)
    }

}






