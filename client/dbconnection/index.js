const mongoose = require('mongoose')
mongoose.Promise = global.Promise

// Connect to the Mongo DB
const uri =  "mongodb://localhost/virtualFridge"

mongoose.connect(uri).then(
    () => { 
        /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ 
        console.log('Connected to Mongo');
        
    },
    err => {
         /** handle initial connection error */ 
         console.log('error connecting to Mongo: ')
         console.log(err);
         
        }
  );


module.exports = mongoose.connection