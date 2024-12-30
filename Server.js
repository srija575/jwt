const express=require('express');
const mongoose=require('mongoose');
const app=express();
const cors= require('cors');
const jwt =require('jsonwebtoken');

if(mongoose.connect('mongodb+srv://ksrija847:srija8703@cluster0.f3mpv.mongodb.net/loginform?retryWrites=true&w=majority&appName=Cluster0'))
    {
        console.log('database is connected')
    }
    
    const User=mongoose.model("loginform",{email:String,password:String,});  
    

// use cors to allow from frontend
app.use(cors());
app.use(express.json());


const user={
    email: 'user@example.com',
    password: 'password123' //plain the password
}


app.post("/login",(req,res)=>
{
    const{email,password}=req.body;    //frontend login details
    //check if email matches the hardcoded email

    if(email !=user.email || password!=user.password) {
        return res.status(401).json({message:'Invalid Email or Password'});
    }
    //if email and password match, create a jwt token
    const token=jwt.sign({email:user.email},'your_secret_key',{expiresIn:'1h'});

    //send the back in the response
    res.json({token});    //login.js
})




app.listen(5003,()=>
{
    console.log('server is running');
})