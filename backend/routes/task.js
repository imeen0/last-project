const router = require("express").Router();
const task = require("../models/task");
const User = require("../models/user");
//create-task
router.post("/create-task", async (req, res) =>{
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

router.get("/get-all-tasks", async (req,res) =>{
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

router.delete("/delete-tasks/:id", async (req,res) =>{
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

    router.put("/update-tasks/:id", async (req,res) =>{
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

        //update important tasks
        router.put("/update-imp-tasks/:id", async (req,res) =>{
            try{
            const { id } = req.params;
           const TaskData = await task.findById(id)
           const ImpTask = TaskData.important;
            await task.findByIdAndUpdate(id,{ important : !ImpTask})
            res.status(200).json({message:"task updated"})
            }
            catch(error){
            console.log(error);
            res.status(400).json({message: "erreur server"});
            }
            
            })

              //update complet  tasks
        router.put("/update-completed-tasks/:id", async (req,res) =>{
            try{
            const { id } = req.params;
           const TaskData = await task.findById(id)
           const CompleteTask = TaskData.complited;
            await task.findByIdAndUpdate(id,{ complited : !CompleteTaskTask})
            res.status(200).json({message:"task updated"})
            }
            catch(error){
            console.log(error);
            res.status(400).json({message: "erreur server"});
            }
            
            })

            // get important tasks 

            router.get("/get-imp-tasks", async (req,res) =>{
                try{
                const { id } = req.headers;
                const Data = await User.findById(id).populate({path: "tasks",
                    match:{important:true},
                    options: { sort: { createdAt: -1}}});
                    const ImpTaskData = Data.tasks
                res.status(200).json({data:ImpTaskData})
                }
                catch(error){
                console.log(error);
                res.status(400).json({message: "erreur server"});
                }
                
                })


                //get completed task
            router.get("/get-complete-tasks", async (req,res) =>{
                try{
                const { id } = req.headers;
                const Data = await User.findById(id).populate({path: "tasks",
                    match:{complited:true},
                    options: { sort: { createdAt: -1}}});
                    const ComTaskData = Data.tasks
                res.status(200).json({data:ComTaskData})
                }
                catch(error){
                console.log(error);
                res.status(400).json({message: "erreur server"});
                }
                
                })

                     //get incompleted task
            router.get("/get-incomplete-tasks", async (req,res) =>{
                try{
                const { id } = req.headers;
                const Data = await User.findById(id).populate({path: "tasks",
                    match:{complited:false},
                    options: { sort: { createdAt: -1}}});
                    const ComTaskData = Data.tasks
                res.status(200).json({data:ComTaskData})
                }
                catch(error){
                console.log(error);
                res.status(400).json({message: "erreur server"});
                }
                
                })

module.exports = router;