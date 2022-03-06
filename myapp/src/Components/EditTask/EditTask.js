import React from 'react';
import { useState } from "react";
import "./EditTask.css";
function EditTask() {
    const [Title, setTitle] = useState("");
    const [Priority, setPriority] = useState("");
    const [Labels, setLabels] = useState([]);
    const [Label, setLabel] = useState("");
    const [HighColor, setHighColor] = useState("#a7c2b9");
    const [MediumColor, setMediumColor] = useState("#fffff");
    const [LowColor, setLowColor] = useState("#fffff");

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
    const createTask = () => {
        console.log(Priority, Title, Labels)
    }
    const addLabels = () => {
        setLabels(Labels => [...Labels, Label]);
    }

    return(
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
                    create task
                </div>
            </div>
            

        </div>
    )
}

export default <EditTask />