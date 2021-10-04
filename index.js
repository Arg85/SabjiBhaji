const express=require('express')
const app=express();
const axios=require("axios")

app.get('/appy',(req,res)=>{
    res.send("hello world2")
})
app.get('/',(req,res)=>{
    res.send("hello world")
})
app.listen(4000,()=>{
    const PORT=process.env.PORT || 4000
    console.log(`server running at ${PORT}`)
});



