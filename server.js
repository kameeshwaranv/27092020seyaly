/*** 
 * Seyal Admin Server - Development 
 * Start : 18-07-2020
 */

const express = require("express");
const path = require("path");
const app = express()
/**
 * Listening port 
 */
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server connected to ${PORT} port`);
})

app.use(express.urlencoded({ extended: false }))
app.use(function (req, res, next) {
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type, Accept");// "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");//);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    // // res.header("Access-Control-Allow-Headers", "*");
    next();
  });

app.use(express.json())
console.log(path.join(__dirname))
app.use(express.static(path.join(__dirname,"/dist/fuse/")));
/***********Initialize Cron JOBS **************/

const cronObj = require("./src/CronJobs/templateCron")
cronObj.initializeCron();
/**
 ********************* Routers goes here **********************
 */
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '/dist/fuse/index.html'));
});
/** 
 * @module: Router used for pre-login services
 * @description: For prelogin services 
 */
const preloginRoutes = require("./src/Routers/preloginRouter")
app.use("/API/Prelogin",preloginRoutes);

/**@module: filehander :  
 * @description: used to upload and download the files available inside ./uploads folder. 
 */
const filerHandlerRoutes = require("./src/Routers/fileHandlerRouter")
app.use("/API/files",filerHandlerRoutes);

/**
 * @module: Template Handler
 * @description: 
 */
const templateRoutes = require("./src/Routers/templateRouter")
app.use("/API/templates",templateRoutes);


/**
 * @module: Contacts Handler
 * @description: 
 */
const contactRoutes = require("./src/Routers/contactRouter")
app.use("/API/contacts",contactRoutes);
