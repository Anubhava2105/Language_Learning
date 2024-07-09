require("dotenv").config();
const mongoose = require("mongoose");
const mongoURI = 'mongodb+srv://Rajasekhar:mongodb@learningapp.ypkjy5s.mongodb.net/?retryWrites=true&w=majority&appName=LearningApp';

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to MongoDB Successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
    });
};

module.exports = connectToMongo;