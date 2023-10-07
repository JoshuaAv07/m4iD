const { MongoClient } = require('mongodb');
require('dotenv').config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const MONGO_ADDR = process.env.MONGO_IP || '127.0.0.1';
const MONGO_PORT = process.env.MONGO_PORT || '27017';
const MONGO_DB = process.env.MONGO_DB || 'm4iD';
const MONGO_USER = process.env.MONGO_DB || 'mongo';
const MONGO_PASS = process.env.MONGO_DB || 'admin';

let client = null;

async function mongoConn() {
    try {
        const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@api-example.bx3ji.mongodb.net/?retryWrites=true&w=majority`
        //const uri = `mongodb://${MONGO_ADDR}:${MONGO_PORT}`;
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        client = client.db(MONGO_DB);
        console.log("Connected to mongo"); 
    } 
    catch (error) {
        console.log("Error connecting to MongoDB", error);
    }
    return client;
}

module.exports = {
    port, 
    host,
    mongoConn
}