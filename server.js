//Installnpm i express nodemon ejs express-session body-parser uuid
//ejs allows you to write html and use
const express = require('express');
const app = express();
const path = require('path');
const session = require("express-session");
const bodyparser = require("body-parser");
const { v4: uuidv4 } = require('uuid');


const router = require('./router');
const port= process.env.Port||5000

//process incoming middle-wear before you use it. 
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs');

//load static assets--this is how you load css with ejs. Check 
app.use('/static', express.static(path.join(__dirname,'public')))
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

app.use(session({
    secret:uuidv4(),//creates a unique id for every user.
    resave:false,
    saveUninitialized: true


}));

//This middle-wear will add will add all of the routers to this server.

app.use('/route', router);

//home route


app.get('/',(req,res)=>{
    res.render('base',{title:"Login System"});
})

app.listen(port, ()=>{
    console.log("Listening on http://localhost:5000")
})