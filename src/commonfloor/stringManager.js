
/***
 * @description : Available Template List array  
 */
const templateList = [
    {
        'id': '01',
        'title': 'Teacher General Details',
        'category': 'Teacher',
        'info': 'This is to get the Teacher details',
        'isUploadingFirstTime': false,
        'howManySheetsInThisDoc': 1,
        'fileName': 'Teacher_Info_Sheet.XLSX'
    },
    {
        'id': '02',
        'title': 'Student General Information',
        'category': 'Student',
        'info': 'This is to get the Student details',
        'isUploadingFirstTime': true,
        'howManySheetsInThisDoc': 2,
        'fileName': 'Student_Info_Sheet.XLSX'
    },
    {
        'id': '03',
        'title': 'Admin Contact Details',
        'category': 'Admin',
        'info': 'This is to get the Student details',
        'isUploadingFirstTime': true,
        'howManySheetsInThisDoc': 1,
        'fileName': 'Admin_Info_Sheet.XLSX'
    }
]

const selectedSchoolDB = [{
    'name': "VaniVidhyalaya",
    'schoolCode': "VANI_",
    'schoolShotName': "VANI",
    'schoolFolderpath': "VaniAssets"
}]

/***
 * @description: Query Handler object 
 */
const queryObj = [
    "SELECT cust_account_status, cust_grade FROM schooldb.user_details WHERE cust_email='?' AND cust_password = '?'; "
]

module.exports = { queryObj, templateList, selectedSchoolDB };