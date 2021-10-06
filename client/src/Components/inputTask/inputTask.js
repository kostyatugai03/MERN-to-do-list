import React, { useState, useContext } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { useMessage } from '../../hooks/message.hook'
import { AuthContext } from '../../context/AuthContext'


export default function InputTask(props) {
    const {token} = useContext(AuthContext)
    const [newtask, setTask] = useState({
        task: null,
        complete: false,
        owner: null
    })
    const {request} = useHttp()
    const input = document.getElementById('addNewTask');
    const message = useMessage()

    const createTask = async () => {
        if(input.value.length > 30) return message('Max length 30 symbols')
        input.value = '';
        try{
            const fetched =  await request('/api/toDoList', 'POST', {...newtask}, {
                Authorization: `Bearer ${token}`
            }) 
            setTask(fetched)
            props.updateTasks()
        } catch(e){
        }
    }

    return (
        <div className="input-task">
            <input onChange={e => setTask({
                task: e.target.value.toLocaleUpperCase(),
                complete: false,
                owner: props.userId })} 
                type="text" 
                name='enterTask' 
                placeholder='Enter task...'
                id="addNewTask"
                
                />
            <button
                className="btn waves-effect waves-light"
                onClick={createTask}
            >
                Submit
                <i className="material-icons right">send</i>
            </button>
        </div>
    )
}

