import React from 'react';
import { useState } from "react";
import "./TaskScreen.css";
import delLogo from '../TaskScreen/Vector.png';
import {useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";
import edit1 from '../TaskScreen/edit1.png';
import edit2 from '../TaskScreen/edit2.png';

import Dialog from '@material-ui/core/Dialog';

function TaskScreen() {
    const history = useNavigate();
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        setText("Create Task");
        // setText("Create Task");
        setLowColor("#0000");
        setMediumColor("#0000");
        setHighColor("#a7c2b9");
        setPriority("High");
        setTitle("");
        setLabel("");
        setLabels([]);
        setText("Create Task");
        handleClose();
    };

    const goToSignIn = () =>{
        history("/signIn");
    }
    const [Title, setTitle] = useState("");
    const [text, setText] = useState("Create Task");
    const [Priority, setPriority] = useState("");
    const [Labels, setLabels] = useState([]);
    const [Label, setLabel] = useState("");
    const [HighColor, setHighColor] = useState("#a7c2b9");
    const [MediumColor, setMediumColor] = useState("#fffff");
    const [LowColor, setLowColor] = useState("#fffff");
    const [reRender, setReRender] = useState(false);
    const [id, setId] = useState("");

    const HighColorFunction = () => {
        setPriority("High")
        setHighColor("#a7c2b9")
        setMediumColor("#0000")
        setLowColor("#0000")
    }
    const MediumColorFunction = () => {
        setPriority("Medium")
        setHighColor("#0000")
        setMediumColor("#a7c2b9")
        setLowColor("#0000")

    }
    const LowColorFunction = () => {
        setPriority("Low")
        setHighColor("#0000")
        setMediumColor("#0000")
        setLowColor("#a7c2b9")
        
    }
    const delTask = (user, title) =>{
        const DATA = {
            "Username": user,
            "TaskName": title
        }
        axios.post('http://localhost:3003/users/tasks/delete', DATA)
        .then(response => {
            setReRender(true);
        });
    }

    const editTask = (user, tit, pri, labs, id) => {
        console.log(user, tit, pri, labs, id);
        if(pri = "High"){
            setHighColor("#a7c2b9");
            setLowColor("#0000");
            setMediumColor("#0000");
        }
        else if(pri = "Medium"){
            setMediumColor("#a7c2b9");
            setLowColor("#0000");
            setHighColor("#0000");
        }
        else if(pri = "Low"){
            setLowColor("#a7c2b9");
            setHighColor("#0000");
            setMediumColor("#0000");
        }
        
        setPriority(pri);
        setTitle(tit);
        setLabel("");
        setLabels(labs);
        setText("Edit Task");
        setId(id);
        handleClickOpen();
    }

    const createTask = () => {

        if(Title!=""){
            if(text=="Edit Task"){
                console.log("I am editing")
                const DATA = {
                    "Username":location.state,
                    "Task": {
                            "id": id,
                            "priority": Priority,
                            "labels": Labels,
                            "title": Title
                        }
                }
                axios.post('http://localhost:3003/users/tasks/edit', DATA)
                .then(response => {
                    setReRender(true);
                });
                setText("Create Task");
                setLowColor("#0000");
                setMediumColor("#0000");
                setHighColor("#a7c2b9");
                setPriority("High");
                setTitle("");
                setLabel("");
                setLabels([]);
                setText("Create Task");
                handleClose();
            }
            else{
                const unique_id = uuid();
                const small_id = unique_id.slice(0,8)
                const DATA = {
                    "Username": location.state,
                    "Task": {
                            "id": small_id,
                            "priority": Priority,
                            "labels": Labels,
                            "title": Title
                        }
                }
                axios.post('http://localhost:3003/users/tasks/add', DATA)
                .then(response => {
                    setReRender(true);
                });
                handleClose();
                setLowColor("#0000");
                setMediumColor("#0000");
                setHighColor("#a7c2b9");
                setPriority("High");
                setTitle("");
                setLabel("");
                setLabels([]);
                setText("Create Task");
            }
        }
        else{
            alert('You cannot leave title empty');
        }
    }
    const addLabels = () => {
        setLabels(Labels => [...Labels, Label]);
    }

    const location = useLocation();
    const [Tasks, setTasks] = useState([]);
    const getTasks = () =>{
        const DATA = {
            "Username": location.state
        }
        axios.post('http://localhost:3003/users/tasks', DATA)
        .then(response => {
            setTasks(response.data.tasks)
        });
        setReRender(false);
    }
    useEffect(() => {
        getTasks();
    },[reRender]);
    return (
        <div>
            <div className='navbar'>
                <div className='navbarCom'>
                    <div>
                        <div className='logoNB'>
                            <div className='textLogoNB'>
                                TO DO
                            </div>
                        </div>
                        <div className='logo2NB'>
                        </div>
                    </div>
                    <div className='signOut' onClick={()=>goToSignIn()}>
                        Sign out
                    </div>
                </div>
            </div>
            <div className='newTaskH'>
                <div className='newTaskH2'>
                    Welcome to your to-do list!
                </div>
                <div className='newTaskB' onClick={handleClickOpen}>
                    <div className='newTaskBT'>
                        Create New Task
                    </div>
                </div> 
            </div>
            {Tasks.map(function(data, index){
                return(
                    <div className='taskDesc' key={index}>
                        <div className='textTD'>
                            {data['title']}
                        </div>
                        {data['labels'].map(function(label, index2){
                            return(
                            <div className='labels' key={index2}>
                                <div className='textLabel'>
                                    {label}
                                </div>
                            </div>
                            );
                        })}
                        <div className='priority'>
                            {data['priority']}
                        </div>
                        <div className='edit1' onClick={()=>editTask(location.state, data['title'], data['priority'], data['labels'], data['id'])}>
                            <img  src={edit1}/>
                        </div>
                        <div className='delSvg' onClick={()=>delTask(location.state, data['title'])}>
                            <img  src={delLogo}/>
                        </div>
                    </div>
                );
            })}

    <div>
      <Dialog open={open} onClose={handleClose}>
        <div className='box'>
            <label className='label'>Task title:
                <input
                    placeholder='Add title for the task'
                    className='input'
                    type="text" 
                    value={Title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            
            <label className='label'>Priority </label>
            <div className='Pcontainer'>
                <div style={{backgroundColor: HighColor}} className='PValue' onClick={()=>HighColorFunction()}>
                    High
                </div>
                <div className='PValue' style={{backgroundColor: MediumColor}} onClick={()=>MediumColorFunction()}>
                    Medium
                </div>
                <div className='PValue' style={{backgroundColor: LowColor}} onClick={()=>LowColorFunction()}>
                    Low
                </div>
            </div>
            <label className='label'>Labels:
                <input
                    placeholder='Add Label'
                    className='input'
                    type="text" 
                    value={Label}
                    onChange={(e) => setLabel(e.target.value)}
                />
            </label>
            <div className='addB'>
                <div className='text2' onClick={()=>addLabels()}>
                    add
                </div>
                <div>
                    <div className='setFlex'>
                        {Labels.map(function(name, index){
                            return(
                                <div className='labelsAT'>
                                    <div className='textLabelAT'>
                                        {name}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className='buttonF'>
                <div className='text2' onClick={()=>createTask()}>
                    {text}
                </div>
            </div>
        </div>
      </Dialog>
    </div>

    </div>
    );
}

export default <TaskScreen />;