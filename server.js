const express = require("express");
const jwt = require("jsonwebtoken");
const PORT = 5000;

const app = express()
app.use(express.json())

app.get('/home', (req, res)=>{
    res.send("you are in home");
})

app.post('/login', (req,res)=>{
    const {userName, password} = req.body

    if (userName==="Jeevan" && password==="jeevan"){
        res.send(`LoggedIn Successful Welcome ${userName}`)
    }
    else if (userName==="Jeevan" && password!=="jeevan"){
        res.send(`password is incorrect`)
    }
    else{
        res.send("User not found")
    }
})

app.post('/register', (req, res)=>{
    const {userName, email, password, confirmPassword} = req.body
   if(!userName && !email && !password && !confirmPassword){
    res.send("All the fields are required");
   }
    else if (password!==confirmPassword){
        res.send("Password are not matched");
    }
    else if (password.length < 6){
        res.send("Password should be more than 6 letters");
    }
    else{
        res.send(`User registered successfully ${userName}`);
    }
})


app.listen(PORT, ()=>{
    console.log(`server running in port ${PORT}`)
})