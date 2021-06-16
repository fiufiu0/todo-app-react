import * as React from 'react';
import { useParams } from 'react-router-dom';
import { myDataContext } from '../context/Context.js'


function Todos() {
    const { id } = useParams();
    const { itemList } = React.useContext(myDataContext);
    console.log(itemList);
    const todo = itemList.find(item => item.index.toString() === id);
    console.log(todo)
    return (
        <div>
            <p><b>Todo text:</b> {todo.item} </p>
        </div>
    )
}

export default Todos;