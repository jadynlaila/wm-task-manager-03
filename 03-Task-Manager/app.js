const connect = require('./db/connect');
const express = require("express");
const app = express();
require('dotenv').config();

const taskRoute = require('./routes/tasksRoute');


app
    //the first thing in your app should always be declaring the html/css directories
    .use(express.static("./public"))

    //middleware
    .use([express.urlencoded({ extended: false }), express.json()])

    //routes
    .use('/api/v1/tasks', taskRoute)

    //connect to the database
    const startServer = async () => {
        try{
            await connect(process.env.MONGO_URL)
            app.listen(3000, () => console.log('listening @ 3000'))
        }
        catch(err) {
            console.error(error);
        }
    }
    startServer();
