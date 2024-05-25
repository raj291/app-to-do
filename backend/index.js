require("dotenv").config();
const config = require("./config.json");
const mongoose = require('mongoose');
mongoose.connect(config.connectionString);
const  User = require("./user-model");
const Note = require("./notes-model");
const jwt = require('jsonwebtoken');
const {authenticateToken} = require('./utitlities')
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(
    cors({
        origin:"*"
    })
);

app.get("/", (req,res) => {
    res.json({data:"Hello world"});
});
app.post("/create-account", async(req,res) =>{
    const {fullName,email,password} = req.body;
    if(!fullName){
        return res.status(400).json({error:true, message:"Full Name is Required"});
    }
    if(!email){
        return res.status(400).json({error:true, message:"Enter the Email Address"})
    }
    if(!password){
        return res.status(400).json({error:true , message:"Enter your password"});
    }
    const isUser = await User.findOne({email : email});
    if(isUser){
        return res.json({error : true , message: "User Name/Email Already Exisit"});

    }
    const user = new User({
        fullName,
        email,
        password,
    });
    await user.save();
    const accessToken = jwt.sign({user} , process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"3600m",
    });

    return res.json({
        error : false,
        user,
        accessToken,
        message:"Account Created"
    })

});

app.post("/Login", async(req,res) =>{
    const {email , password} = req.body;
    if(!email){
        return res.status(400).json({message : "Email is Required"});

    }
    if(!password){
        return res.status(400).json({message:"Password is Required"});
    }
    const userInfo = await User.findOne({email : email});
    if(!userInfo){
        return res.status(400).json({message: "User Not Found"});

    }
    if(userInfo.email == email && userInfo.password == password){
        const user = {user : userInfo};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn : "3600m"});
        return res.json({
            error: false,
            message : "Logged In",
            email,
            accessToken,
        });
    } else{
        return res.status(400).json({ error : true , message : "Incorrect Details "})
    }
});
app.get("/users", authenticateToken,  async(req,res) =>{
    const {user} = req.user;
    const isUser = await User.findOne({_id: user._id});
    if(!isUser){
        return res.sendStatus(401)
    }
    return res.json({user : {fullName : isUser.fullName , email : isUser.email}, message : ""});
}); 
app.post("/AddNotes",authenticateToken,  async(req,res) =>{
    const {title , content } = req.body;
    const { user } = req.user;
    if(!title){
        return res.status(400).json({ error : true , message : "Title is required"});
    }
    if(!content){
        return res.status(400).json({error : true, message : "Content is required"});
    }
    try{
        const note = new Note({
            title,
            content,
            userId: user._id,

        });
        await note.save();
        return res.json({
            error : false,
            note,
            message : "Note Added",

        });

    }catch(error){
        return res.status(500).json({
            error:true,
            message:"Internal Server Error",
        });
    }
});
app.put("/EditNotes/:noteId",authenticateToken,  async(req,res) =>{
    const noteId = req.params.noteId;
    const {title , content } = req.body;
    const {user} = req.user;
    
    if(!title && !content){
        return res.status(400).json({error : true , message : "No Changes Made!"});
    }
    try{
        const note = await Note.findOne({_id : noteId, userId : user._id});

        if(!note){
            return res.status(400).json({error: true , message : "Note Not Found "});
        }
        if(title) note.title = title;
        if(content) note.content = content;
        await note.save();

        return res.json({error : false , note , message  : "Note Changed",});
    }catch(error){
        return res.status(500).json({error : true , message : "Internal Server Error"});
    }
});

app.get("/notesall/",authenticateToken,  async(req,res) =>{
    const {user} = req.user;
    try{
        const notes = await Note.find({userId: user._id});
        return res.json({
            error:false,
            notes,
            message : "Notes Showed"
        })
    }catch(error){
        return res.status(500).json({
            error:true,
            message: "Internal Server Error",

        });
    }
});
app.delete("/deletenote/:noteId",authenticateToken,  async(req,res) =>{
    const noteId = req.params.noteId;
    const {user} = req.user;
    try{
        const note = await Note.findOne({_id : noteId , userId : user._id});

        if(!note){
            return res.status(400).json({error : true , message : "Note does not exist"});
        }
        await Note.deleteOne({_id : noteId , userId : user._id});
        return res.json({error : false , message : " Note Deleted"});
    }
    catch(error){
        return res.status(500).json({error : true , message : "Internal Server Error"});
    }

});
app.listen(8000);
module.exports = app;
