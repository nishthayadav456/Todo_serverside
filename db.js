const mongoose = require("mongoose");

module.exports = () => {
  try {
    mongoose.connect(process.env.MONGO_URI)
    console.log('connected to database successfully');
  } catch (error) {
    console.log(error);
    console.log('unable to connect');
  }
};