const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://sanajy:hS4jcFuyzdFLWxiX@cluster0.xxkuqwq.mongodb.net/?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true }, () =>
    console.log("mongo connect..."));