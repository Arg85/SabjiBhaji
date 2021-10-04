const express=require('express')
const app=express();
const axios=require("axios")

app.get('/appy',(req,res)=>{
    res.send("hello world2")
})
app.get('/users',async(req,res)=>{
    let ar=[]
axios.get("https://jsonplaceholder.typicode.com/posts/1").then((resp)=>{
res.send(resp.data.body)
}) .catch((a)=>{
    console.log(a)
}) 

   


})
app.get('/',(req,res)=>{
    res.send("hello world")
})
app.listen(4000,()=>{
    const PORT=process.env.PORT || 4000
    console.log(`server running at ${PORT}`)
});



