const express=require('express');
const path=require("path");


const session=require("express-session")

const app= express();

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname, 'public')));


const sessionConfig={
    secret:"secret",
    resave:false,
    saveUninitialized:true
};

app.use(session(sessionConfig));
app.use(express.urlencoded({extended:true}));


const username="anshad";
const password2="password123";

app.get("/",(req,res)=>{
    if(req.session.isLoggedIn){
        res.render("index.ejs")      
    }else{
        res.render("login.ejs")
    }
})

app.post('/login',(req,res)=>{
    const { user_name,password } = req.body;

    if(user_name===username && password===password2){
        req.session.isLoggedIn=true;
        res.redirect("/")
    }else{
        res.render("login.ejs")
    }
})

app.get("/logout",(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})

app.listen(3000,()=>{
    console.log("server started in 3000");
})