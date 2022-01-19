import React, {useState} from 'react';

const Todo = () => {

    let [taskObj,setTaskObj] = useState({
        task: "",
        dueDate: "",
        location: "",
        isComplete: false
    })

    let [listOfTasks,setListOfTasks] = useState([]);

    const changeHandler = (e) => {
        setTaskObj({
            ...taskObj,
            [e.target.name]: e.target.value
        })
    }

    const addTask = (e) => {
        e.preventDefault()
        setListOfTasks([...listOfTasks,taskObj])
        setTaskObj({
            task: "",
            dueDate: "",
            location: "",
            isComplete: false
        })
    }

    // toggle task completion status
    const toggleTaskComplete = (indexNum) => {
        // create a copy
        let [...copyOfTaskList] = listOfTasks;
        // modify the copy at the index number
        copyOfTaskList[indexNum].isComplete = ! copyOfTaskList[indexNum].isComplete;
        // update state variable using modified copy
        setListOfTasks(copyOfTaskList)
    }

    const deleteTask = (i) => {
        let newList = listOfTasks.filter((taskObj,indexNum)=>{
            return i != indexNum;
        })
        setListOfTasks(newList);
    }

    return (
        <div>
            <form onSubmit={addTask}>
                <div className='form-group'>
                    <label htmlFor=''>Task:</label>
                    <input type="text" name="task" id="" value={taskObj.task} className="form-control" onChange={changeHandler}/>
                </div>
                <div className='form-group'>
                    <label htmlFor=''>Due Date:</label>
                    <input type="date" name="dueDate" id="" value={taskObj.dueDate} className="form-control" onChange={changeHandler}/>
                </div>
                <div className='form-group'>
                    <label htmlFor=''>Location:</label>
                    <input type="text" name="location" id="" value={taskObj.location} className="form-control" onChange={changeHandler}/>
                </div>
                <input type="submit" value="Add Task" className="btn btn-success mt-3" />
            </form>
            <hr />
            {
                listOfTasks.map((taskObj,i)=>{
                    return (
                        <div key={i} style={{textDecoration: taskObj.isComplete? "line-through":"none"}}>
                            <h3>Task Name: {taskObj.task}</h3>
                            <p>Due Date: {taskObj.dueDate}</p>
                            <p>Location: {taskObj.location}</p>
                            <p>Complete<input type="checkbox" name="" onClick={()=>toggleTaskComplete(i)} id="" /></p>
                            {
                                taskObj.isComplete?
                                <button onClick={()=>deleteTask(i)}>Delete</button>:""
                                
                            }
                        </div>
                    )
                })
            }
        </div>
    );
};


export default Todo;