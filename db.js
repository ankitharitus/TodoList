
const sequelize=require("sequelize");
const db=new sequelize({
    dialect:'sqlite',
    storage: __dirname + "/todos.db"
})
const todo=db.define('todo',{
    id:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    task:{
        type:sequelize.STRING,
        allowNull:false
    },
    done:{
        type:sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false

    },
    due:{
        type:sequelize.DATE
    },
    description:{
        type:sequelize.STRING
    },
    priority:{
        type:sequelize.STRING
    }
    

})

const notess=db.define("notess",{

    note:{
        type:sequelize.STRING
    },
    noteid:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true


    }
})
const notes=db.define("notes",{

    note:{
        type:sequelize.STRING
    },
    noteid:{
        type:sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true


    },
    taskid:{
        type:sequelize.INTEGER, 
         
}})
module.exports={db,todo,notes}