const mongoose = require("mongoose")

// mongoose
//     .then(() => console.log("connected to DB"))
//     .catch((err) => console.log(err))

const connectDB = (url) => {
    return mongoose
    .connect(url)
    .then(() => console.log("connected to DB..."))
    .catch((err) => console.log(err))
}

module.exports = connectDB;

// how to visualize mongoDB
    //Cluster => whole library => NYC library
        //DATABASE1 => all the boooks in the library => books   
            //COLLECTION1 => fiction
                //DOCUMENTS1 => Harry Potter
                //DOCUMENT2 => erragon
            //COLLECTION2 => nonfiction
                //DOCUMENT1 => presidents in history
                //DOCUMENT2 => cook books
        //DATABSASE2 => all the videos in the library => videos
        //DATABASE 3 => all the people in the library => patrons
