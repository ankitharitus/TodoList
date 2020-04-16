const express=require("express");
const port=7235;
const todoroute=require("./routes/todo")
const app=express();

const {db}=require("./db")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(__dirname+ "/Public"))
app.use("/todo",todoroute)




db.sync()
 .then((
    app.listen(port)

 ))
 .catch((err)=>
 {
     console.error(err);

 })