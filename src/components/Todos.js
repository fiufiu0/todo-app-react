import * as React from 'react';
import { useParams } from 'react-router-dom';


function Todos() {
    const { id } = useParams();
    return (
        <div>
            <p>Todo ID: {id}</p>
            <p>Todo text: </p>
        </div>
    )
}

export default Todos;