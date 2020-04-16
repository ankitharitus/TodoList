const router=require("express");
const route=router();
const {todo,notes}=require("../db")

module.exports=route;
route.get("/",async(req,res)=>{
    const todos=await todo.findAll()
    
    
    res.send(todos)
})

route.get("/:id",async(req,res)=>{
    if (isNaN(req.params.id)){
        res.status(404).send({
            error:"invalid todo id"
            
        })
        return
    }
    const todos=await todo.findByPk(req.params.id)
    
   
    res.send(todos)
}
)
route.post("/",async(req,res)=>{
    
    if (typeof (req.body.status=="true")){
       req.body.status="true"
    }
    else{
        req.body.status="false"
    }
    const newtodo=await todo.create({
        task:req.body.task,
        done:req.body.done,
        due:req.body.due,
        description:req.body.description,
        priority:req.body.priority


    })
   
        
    res.status(200).send("ok")
})

route.get("/:id/notes",async(req,res)=>{
    const id = parseInt(req.params.id)
    const notes_=await notes.findAll({where:{taskid: id}})
   res.send(notes_)
    })
route.post("/:id/notes",async(req,res)=>{
    const id = parseInt(req.params.id)
    const newtest=await notes.create({
        note:req.body.notes,
        taskid:id
 
    })
        res.send("Successfully added")
    })
    route.patch('/:id', async (req, res) => {
        const Id = parseInt(req.params.id);
      
        const newTask = await todo.update({
            task:req.body.task,
            done:req.body.done,
            due:req.body.due,
           
            priority:req.body.priority
        }, {
            where: {id: Id}
        })
        res.send({success: "Successfully update"});
    });