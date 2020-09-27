const cron = require('node-cron');
const templateCtrl = require("../Contorllers/CronJobs/templateCronCtrl");
const cronJobs = {};
cronJobs.initializeCron = () => {
    /** Cron job to check the status */
    cron.schedule("* * * * */5 *", function () {
        templateCtrl.templateCronJobs();
    });
}

module.exports = cronJobs