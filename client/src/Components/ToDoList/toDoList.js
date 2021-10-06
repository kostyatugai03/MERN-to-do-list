import React, {useCallback, useContext, useEffect, useState} from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useHttp } from '../../hooks/http.hook'
import InputTask from '../inputTask/inputTask'
import Clear from '../ClearDoneTasks/clearDoneTasks'
import './toDoList.css'
import { useMessage } from '../../hooks/message.hook'

export default function ToDoList(props) {
    const [tasks, setTasks] = useState([])
    const {request} = useHttp()
    const {token, userId} = useContext(AuthContext)
    const message = useMessage();

    const fetchTasks = useCallback(async () => {
        try {
            const fetched = await request('/api/toDoList', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setTasks(fetched)
        } catch(e) {}
    }, [request, token])

    const toggleStatus = async (id, item) => {
        const toggleItem = document.getElementById(id)
        toggleItem.classList.toggle('done')
        try{
            const newData = await request('/api/toDoList/update', 'POST', {complete: !item.complete, id: id, task: item.task}, {
                Authorization: `Bearer ${token}`
            })
            await fetchTasks()
            message(newData.message)
        } catch(e) {}
    }
    
    const toggleLineThrough = (item) => {
        return item.complete ? 'done' : ''
    }

    useEffect(() => {
        fetchTasks()
    }, [fetchTasks, setTasks])


    return (
        <>
            <ul className="collection">
                {tasks.map(item =>
                        <a onClick={(e) => toggleStatus(e.target.id, item)}
                            key={item._id}
                            id={item._id}
                            className={toggleLineThrough(item) + " " + 'collection-item'}
                        >
                            {item.task}
                        </a>
                )}
            </ul>
            <Clear updateTasks={fetchTasks} userId={userId} />
            <InputTask tasks={tasks} updateTasks={fetchTasks} userId={userId} />
        </>
    )
}


