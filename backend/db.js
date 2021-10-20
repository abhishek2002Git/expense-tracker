// 'Mongoose' is a layer which helps you to manage the dataBase
//  this file is used to connect to the mongodb(dataBase)
const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
// const mongoURI = "mongodb+srv://abhishek:abhishek@cluster0.i8n1k.mongodb.net/expensecalc";
const mongoURI = "mongodb+srv://abhishek:abhishek@cluster0.i8n1k.mongodb.net/expensecalc?authSource=admin&replicaSet=atlas-yw27t6-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to mongo successfully");
    })
}

module.exports = connectToMongo;