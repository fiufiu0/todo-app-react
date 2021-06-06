import * as React from 'react';
import TodoRow from './TodoRow';

function TodoList({ itemList, updateItemList, filter }) {

    const deleteItem = (index) => {
        const newList = itemList.filter(itemObject => {
            return itemObject !== index;
        });
        updateItemList(newList);
    };

    const toggleCompleted = (index) => {
        const updatedTodos = [...itemList].map((todo) => {
            if (todo.index === index) {
                todo.completed = !todo.completed
            }
            return todo;
        });
        updateItemList(updatedTodos)
    }

    return (
        <div>
            {itemList.filter((itemObject) => {
                return (filter === 'all' || (itemObject.completed && filter) === 'completed' || (!itemObject.completed && filter) === 'other');
            }).map((itemObject) => {
                return (
                    <TodoRow itemObject={itemObject} key={itemObject.index} deleteItem={deleteItem} toggleCompleted={toggleCompleted} />
                )
            })}
        </div>
    )
}

export default TodoList;