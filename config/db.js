const mongoose = require("mongoose");

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL,{
           useUnifiedTopology : true,

        },
        console.log("MongoDB Connected"))
    }
    catch(Error){
        console.log(Error)
    }
}

module.exports = connect 