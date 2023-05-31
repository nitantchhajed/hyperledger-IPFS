const { body, check, sanitize, validationResult } = require("express-validator");
const generateUniqueId = require('generate-unique-id');
const _DeathCertModel = require("../models/DeathCertificateModel")
const invoke = require('../../app/invoke-transaction.js');
const query = require('../../app/query.js');
var log4js = require('log4js');
const date = require('date-and-time')
const XLSX = require("xlsx");
var logger = log4js.getLogger('SampleWebApp');
// const UserModel = require("../models/Birth");
require('../../config.js');
const prometheus = require('prom-client');

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// PROMETHEUS METRICS CONFIGURATION /////////////
///////////////////////////////////////////////////////////////////////////////


async function store(req, res, next) {

    try {

        await check("ApplicationID").notEmpty().withMessage('Application ID must be requerd').run(req);
        await check("Name").notEmpty().withMessage('Name of the child filed must be requerd').run(req);
        await check("FatherName").notEmpty().withMessage('Name of the father filed must be requerd').run(req);
        await check("MotherName").notEmpty().withMessage('Name of the mother filed must be requerd').run(req);
        await check("DateOfBirth").notEmpty().withMessage('Date of Birth filed must be requerd').run(req);
        await check("DateOfDeath").notEmpty().withMessage('Date of Death filed must be requerd').run(req);
        await check("Gender").notEmpty().withMessage('please select gender').run(req);
        await check("Country").notEmpty().withMessage('Country filed must be requerd').run(req);
        await check("State").notEmpty().withMessage('State filed must be requerd').run(req);
        await check("City").notEmpty().withMessage('City filed must be requerd').run(req);
        await check("Age").notEmpty().withMessage('Age filed must be requerd').run(req);

        const errors = validationResult(req);
        console.log("errors..........", errors);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        var peers = ["peer0.org1.example.com"];
        var chaincodeName = "deathcert";
        var channelName = "mychannel";
        var fcn = "createDeathCert";

        var args = [];
        const id = generateUniqueId({ length: 64 });

        args.push(req.body.ApplicationID, id, req.body.Name, req.body.FatherName, req.body.MotherName, req.body.Age, req.body.DateOfBirth, req.body.DateOfDeath, req.body.Gender, req.body.Country, req.body.State, req.body.City, req.body.Address);

        const start = Date.now();
        let message = await invoke.invokeChaincode("admin", channelName, chaincodeName, fcn, args);

        let getUser = await query.queryChaincode("admin", channelName, chaincodeName, 'getDeathCert', [req.body.ApplicationID, id]);
        console.log("ghfghgfhfgh", peers, channelName, chaincodeName, fcn, args, "admin", "Org1");
        console.log("getUser...................", getUser);
        console.log("message", message);
        const latency = Date.now() - start;
        if (typeof message != "string") {

            let data = {
                key: id,
                // tx_id: message,
                Record: {
                    appID: req.body.ApplicationID,
                    name: req.body.Name,
                    father_name: req.body.FatherName,
                    mother_name: req.body.MotherName,
                    docType: "deathCert",
                    age: req.body.Age,
                    dob: req.body.DateOfBirth,
                    dod: req.body.DateOfDeath,
                    gender: req.body.Gender,
                    country: req.body.Country,
                    state: req.body.State,
                    city: req.body.City,
                    address: req.body.Address
                },

            }


            // const response = yield helper_1.default.registerAndGerSecret(user.email, user.orgname);

            return res.status(400).json({
                status: 400,
                success: false,
                message: "Deaththday certificate not inserte!",
                data: data
            })

        } else {

            let data = {
                key: id,
                // tx_id: message,
                Record: {
                    appID: req.body.ApplicationID,
                    name: req.body.Name,
                    father_name: req.body.FatherName,
                    mother_name: req.body.MotherName,
                    docType: "deathCert",
                    age: req.body.Age,
                    dob: req.body.DateOfBirth,
                    dod: req.body.DateOfDeath,
                    gender: req.body.Gender,
                    country: req.body.Country,
                    state: req.body.State,
                    city: req.body.City,
                    address: req.body.Address
                },

            }

            _DeathCertModel.create({
                        Key:id,
                        TransactionID: message,
                        ApplicationID:req.body.ApplicationID,
                        Name:req.body.Name,
                        FatherName:req.body.FatherName,
                        MotherName:req.body.MotherName,
                        Age:req.body.Age,
                        DateOfBirth:req.body.DateOfBirth,
                        DateOfDeath:req.body.DateOfDeath,
                        Gender:req.body.Gender,
                        Country:req.body.Country,
                        State:req.body.State,
                        City:req.body.City,
                        Address:req.body.Address,
                    });


            // const response = yield helper_1.default.registerAndGerSecret(user.email, user.orgname);

            return res.status(200).json({
                status: 200,
                success: true,
                message: "Death certificate inserted successfully!",
                data: data
            })
        }

    } catch (error) {
        res.status(400).json({
            status: 400,
            success: false,
            message: "Somethings went wrong",
            error: error.message
        })
    }
}

async function update(req, res, next) {

    try {

        await check("ApplicationID").notEmpty().withMessage('Application ID must be requerd').run(req);
        await check("Name").notEmpty().withMessage('Name of the child filed must be requerd').run(req);
        await check("FatherName").notEmpty().withMessage('Name of the father filed must be requerd').run(req);
        await check("MotherName").notEmpty().withMessage('Name of the mother filed must be requerd').run(req);
        await check("DateOfBirth").notEmpty().withMessage('Date of Birth filed must be requerd').run(req);
        await check("DateOfDeath").notEmpty().withMessage('Date of Death filed must be requerd').run(req);
        await check("Gender").notEmpty().withMessage('please select gender').run(req);
        await check("Country").notEmpty().withMessage('Country filed must be requerd').run(req);
        await check("State").notEmpty().withMessage('State filed must be requerd').run(req);
        await check("City").notEmpty().withMessage('City filed must be requerd').run(req);
        await check("Age").notEmpty().withMessage('Age filed must be requerd').run(req);
        await check("Key").notEmpty().withMessage('Key filed must be requerd').run(req);

        const errors = validationResult(req);
        console.log("errors..........", errors);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        var peers = ["peer0.org1.example.com"];
        var chaincodeName = "deathcert";
        var channelName = "mychannel";
        var fcn = "createDeathCert";

        let oldData = await query.queryChaincode("admin", channelName, chaincodeName, 'getDeathCert', [req.body.ApplicationID, req.body.Key]);

        if (typeof oldData != "object") {

            var args = [];
            const id = generateUniqueId({ length: 64 });

            args.push(req.body.ApplicationID, id, req.body.Name, req.body.FatherName, req.body.MotherName, req.body.Age, req.body.DateOfBirth, req.body.DateOfDeath, req.body.Gender, req.body.Country, req.body.State, req.body.City, req.body.Address);

            const start = Date.now();
            let message = await invoke.invokeChaincode("admin", channelName, chaincodeName, fcn, args);

            let getUser = await query.queryChaincode("admin", channelName, chaincodeName, 'getDeathCert', [req.body.ApplicationID, id]);
            console.log("ghfghgfhfgh", peers, channelName, chaincodeName, fcn, args, "admin", "Org1");
            console.log("getUser", getUser);
            console.log("message", message);
            const latency = Date.now() - start;
            if (typeof message != "string") {

                let data = {
                    key: id,
                    old_key: req.body.Key,
                    // tx_id: message,
                    Record: {
                        appID: req.body.ApplicationID,
                        name: req.body.Name,
                        father_name: req.body.FatherName,
                        mother_name: req.body.MotherName,
                        docType: "deathCert",
                        age: req.body.Age,
                        dob: req.body.DateOfBirth,
                        dod: req.body.DateOfDeath,
                        gender: req.body.Gender,
                        country: req.body.Country,
                        state: req.body.State,
                        city: req.body.City,
                        address: req.body.Address
                    },

                }


                return res.status(400).json({
                    status: 400,
                    success: true,
                    message: "Death certificate not verified",
                    data: data
                })

            } else {

                let data = {
                    key: id,
                    old_key: req.body.Key,
                    // tx_id: message,
                    Record: {
                        appID: req.body.ApplicationID,
                        name: req.body.Name,
                        father_name: req.body.FatherName,
                        mother_name: req.body.MotherName,
                        docType: "deathCert",
                        age: req.body.Age,
                        dob: req.body.DateOfBirth,
                        dod: req.body.DateOfDeath,
                        gender: req.body.Gender,
                        country: req.body.Country,
                        state: req.body.State,
                        city: req.body.City,
                        address: req.body.Address
                    },

                }
                _DeathCertModel.create({
                    Key:id,
                    TransactionID: message,
                    ApplicationID:req.body.ApplicationID,
                    Name:req.body.Name,
                    FatherName:req.body.FatherName,
                    MotherName:req.body.MotherName,
                    Age:req.body.Age,
                    DateOfBirth:req.body.DateOfBirth,
                    DateOfDeath:req.body.DateOfDeath,
                    Gender:req.body.Gender,
                    Country:req.body.Country,
                    State:req.body.State,
                    City:req.body.City,
                    Address:req.body.Address,
                    UpdateRecordKey:req.body.Key,
                });

                return res.status(200).json({
                    status: 200,
                    success: true,
                    message: "Death certificate verified and updated successfully!",
                    data: data
                })
            }


        }

        return res.status(400).json({
            status: 400,
            success: false,
            message: "Death certificate not verified",
            data: ""
        })


    } catch (error) {
        res.status(400).json({
            status: 400,
            success: false,
            message: "Somethings went wrong",
            error: error.message
        })
    }
}


async function index(req, res, next) {
    try {

        var channelName = "mychannel";
        var chaincodeName = "deathcert";
        let args = req.query.args;
        let fcn = 'allList';


        if (!args) {
            res.json(getErrorMessage('\'args\''));
            return;
        }
        console.log('args==========', args);
        args = args.replace(/'/g, '"');
        args = JSON.parse(args);
        logger.debug(args);

        const start = Date.now();
        let message = await query.queryChaincode("admin", channelName, chaincodeName, fcn, args);
        // message = message.replace(/'/g, '"');


        data = JSON.parse(message)
        return res.status(200).json({
            status: 200,
            success: true,
            message: "All Death certificate found successfully",
            data: data
        })

    } catch (error) {
        res.status(400).json({
            status: 400,
            success: false,
            message: "Somethings went wrong",
            error: error.message
        })
    }
}

async function show(req, res, next) {
    try {

        var channelName = "mychannel";
        var chaincodeName = "deathcert";
        let args = req.query.args;;
        let fcn = 'getDeathCert';

        if (!args) {
            res.json(getErrorMessage('\'args\''));
            return;
        }
        console.log('args==========', args);
        args = args.replace(/'/g, '"');
        args = JSON.parse(args);
        logger.debug(args);

        const start = Date.now();
        let message = await query.queryChaincode("admin", channelName, chaincodeName, fcn, args);
        // message = message.replace(/'/g, '"');
        const latency = Date.now() - start;

        logger.debug("Data............", message);
        if (typeof message != "object") {

            data = JSON.parse(message)
            data = {
                key: args[1],
                Record: data
            }

            return res.status(200).json({
                status: 200,
                success: true,
                message: "Validated successfully!",
                data: data
            })

        } else {
            return res.status(00).json({
                status: 400,
                success: false,
                message: "Not valid!",
                data: ""
            })

        }


    } catch (error) {
        res.status(400).json({
            status: 400,
            success: false,
            message: "Somethings went wrong",
            error: error.message
        })
    }
}


exports.store = store;
exports.update = update;
exports.index = index;
exports.show = show;
