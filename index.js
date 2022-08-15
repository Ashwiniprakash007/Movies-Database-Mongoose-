const mongoose = require("mongoose");
const connection =  mongoose.connect("mongodb://localhost:27017/movies")



// 2. Model/schema
const movieSchema = new mongoose.Schema({
    movie_name: { type: String, required: true },
    id:  { type: String, required: true },
    rating: { type: Number, required: true },
    //array
    actors: {type: Array, required: true }
})

const MovieModel =  mongoose.model("student", movieSchema)

module.exports = {
    connection,
    MovieModel
}