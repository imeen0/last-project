const router = require("express").Router();
const task = require("../models/task");
const User = require("../models/user");
//create-task
router.post("/create", async (req, res) =>{
  console.log(req.body)
try{
const { title, desc } = req.body;
const {id} = req.headers
const newTask = new task ({ title: title, desc: desc});
const saveTask = await newTask.save();
const taskId = saveTask._id;
await User.findByIdAndUpdate(id, {$push: { tasks: taskId._id }});
res.status(200).json({message:"task Created"})
}
catch (error){
console.log(error);
res.status(400).json({message: "server error"})
}

});

router.get("/get", async (req,res) =>{
try{
const { id } = req.headers;
const userData = await User.findById(id).populate({path: "tasks",
    options: { sort: { createdAt: -1}}});
res.status(200).json({data:userData})
}
catch(error){
console.log(error);
res.status(400).json({message: "erreur server"});
}

})
//delete task

router.delete("/delete/:id", async (req,res) =>{
    try{
    const { id } = req.params;
    const userId= req.headers.id
   await task.findbyIdAndDelete(id);
await User.findByIdAndUpdate(userId,{$pull:{tasks: id}})
    res.status(200).json({message:"task deleted"})
    }
    catch(error){
    console.log(error);
    res.status(400).json({message: "erreur server"});
    }
    
    })

    //update task

    router.put("/update/:id", async (req,res) =>{
        try{
        const { id } = req.params;
        const {title , desc} = req.params;
        await task.findByIdAndUpdate(id,{ title: title, desc: desc})
        res.status(200).json({message:"task updated"})
        }
        catch(error){
        console.log(error);
        res.status(400).json({message: "erreur server"});
        }
        
        })
module.exports = router;