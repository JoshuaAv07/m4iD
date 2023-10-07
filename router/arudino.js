const { mongoConn } = require('../props');

const express = require('express');
const arduinoRouter = express.Router();

arduinoRouter.get("/", async (req, res) => {
    console.log("arduinoRouter");
    res.json("arduinoRouter");
});

arduinoRouter.get("/getAll", async (req, res) => {
    const client = await mongoConn(req);
    const index = "arduino";
    const mongo = client.collection(index);

    try {
        const body = await mongo.find().toArray();
        
        res.json(body);
    }
    catch (error) {
        console.error(error);
    }
});

arduinoRouter.post('/create', async (req, res) => {
    const client = await mongoConn(req);
    const value = req.body;
    console.log(value);
    const index = "arduino";
    const mongo = client.collection(index);

    try {
        const result = await mongo.insertOne(value);
        console.log(result);
        res.json(result);
    } 
    catch (error) {
        console.error(error);
    }
});

module.exports = arduinoRouter;