const { port, host } = require('./props');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const arduinoRouter = require('./router/arudino');

app.use(cors());
app.use(bodyParser.json({ "limit": "100mb" }));
app.use(morgan('dev'));

app.all("*", function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/", async (req, res) => {
    res.json("Mongo Driver - NodeJS");
});

app.use("/arduino", arduinoRouter);

app.use((req, res, next) => {
    res.status(404).json({
        "title": "Error 404"
    });
});

app.listen(port, () => {
    console.log(`Running at '${host}' on port ${port}`);
});
