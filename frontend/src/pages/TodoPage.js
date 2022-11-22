import React, { useEffect, useContext } from 'react'
import { useResource } from 'react-request-hook'
import { useParams } from "react-router-dom";
import { StateContext } from "../contexts/StateContext";
import TodoSimple from '../todo/TodoSimple'

export default function TodoPage () {

    const { id } = useParams();
    const { state } = useContext(StateContext);
    const [ todo, getTodo ] = useResource(() => ({
        url: `/todo/${id}`,
        method: 'get',
        headers: { Authorization: `${state?.user?.access_token}` }
    }))

    useEffect(getTodo, [id])

    return (
        <div>
            {(todo && todo.data)
                ? <TodoSimple {...todo.data} />
                : 'Loading...'
            }
            <hr />
        </div>
    )
}