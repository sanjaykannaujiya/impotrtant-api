var createError = require('http-errors')
const Sequelize=require('sequelize')
const Sequelize_auto=require('sequelize-auto')
const Passport=require('passport')
// const http=require('http');
// http.createServer(http)
const express = require("express")
const app = express() //.gitignore
const http = require('http').createServer(app)

const root=require("cors")
require('dotenv').config()

const mongoose=require("mongoose")
const bodyparser=require("body-parser");
const PORT=process.env.PORT
app.use(express.json());
app.use(bodyparser.json());
app.use(Passport.initialize());
//app.use(Passport.session())

const cors = require('cors');
app.use(cors());
const Subadmin=require("./Inventri/router/SubaR");
const Systumadmin=require("./Inventri/router/SSAR")
const user=require("./Inventri/router/UserR")
const userA=require("./Inventri/router/AdminR")
const Db=require("./Inventri/config/db")
const devicesimrelation=require("./Inventri/router/Relation R")
const Sim=require('./Inventri/router/Sim');
const Device=require("./Inventri/router/Device");
//const isAdmin=require('./Inventri/router/IsadminlogR')
//admin
//const kudu=require('./loop/route/Subadmin');
//const yooy=require('./loop/route/AdminR');
 //app.use('/api',kudu);
//app.use('/api',yooy);

app.use('/api',devicesimrelation)
app.use('/api', Sim)
app.use('/api',Subadmin)
app.use('/api', Device)
app.use('/api',userA)
app.use('/api',Systumadmin)
//app.use('/api',isAdmin)
app.use('/api',user)
app.listen(PORT,() => {console.log(`server ${PORT}`) })

 //Socket
 const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})

