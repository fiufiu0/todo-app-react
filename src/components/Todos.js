import * as React from 'react';
import { useParams } from 'react-router-dom';


function Todos() {
    const { id, item } = useParams();
    console.log({ id, item });
    return (
        <div>
            <p><b>Todo ID:</b> {id}</p>
            <p><b>Todo text:</b> {item}</p>
        </div>
    )
}

export default Todos;