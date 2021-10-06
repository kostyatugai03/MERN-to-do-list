import { useHttp } from "../../hooks/http.hook"
import { useMessage } from "../../hooks/message.hook"
import React, {useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'



export default function Clear({updateTasks, userId}) {
    const {request} = useHttp()
    const message = useMessage()
    const {token} = useContext(AuthContext)

    

    const fetchDone = async () => {
        try {
            const fetched = await request('/api/toDoList/deleteDone', 'POST', {owner: userId}, {
                Authorization: `Bearer ${token}`
            })
            message(fetched.message)
            updateTasks()
        } catch (e) {}
    }

    return <button
                className="btn waves-effect waves-light"
                onClick={fetchDone}
                >
                    Clear Completed
                    <i className="material-icons right">delete_forever</i>
                </button>
}