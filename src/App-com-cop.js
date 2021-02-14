import * as React from 'react';
import './App.css'

function List({ itemList, updateItemList, filter }) {

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
            }).map((itemObject, index) => {
                return (
                    <div key={itemObject + index} className="itemContainer">
                        <input type="checkbox" onChange={() => toggleCompleted(itemObject.index)} checked={itemObject.completed} />
                        <p>{itemObject.item}</p>
                        <button onClick={() => deleteItem(itemObject)}>X</button>
                    </div>
                )
            })}
        </div>
    )
}

function Filter({ filter, setFilter }) {
    const onChangeHandler = e => {
        setFilter(e.target.value);
    }
    return (
        <React.Fragment>
            <label for="filter">Filter list </label>
            <select for="filter" onChange={e => onChangeHandler(e)} value={filter}>
                <option value="all">ALL</option>
                <option value="completed">COMPLETED</option>
                <option value="other">OTHERS</option>
            </select>
        </React.Fragment>
    )
};

function App() {
    const [currentItem, setCurrentItem] = React.useState("");
    const [itemList, updateItemList] = React.useState([]);
    const [filter, setFilter] = React.useState('all');

    const onChangeHandler = e => {
        setCurrentItem(e.target.value);
    };

    function getRandomString(length) {
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for (var i = 0; i < length; i++) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    }

    const addItemToList = () => {
        if (currentItem === "") {
            alert("Enter a new todo!");
        } else {
            updateItemList([...itemList, { item: currentItem, completed: false, index: getRandomString(20) }]);
            setCurrentItem("");
        }
    };

    const clearList = () => {
        updateItemList([]);
    }

    return (
        <div className="App">
            <header className="App-header">
                <p>Todo App</p>
            </header>
            <div>
                <input placeholder="add something" value={currentItem} onChange={onChangeHandler} />
                <button onClick={addItemToList}>Add</button>
                <button onClick={clearList}>Clear list</button>
            </div>
            <Filter filter={filter} setFilter={setFilter} />
            <List itemList={itemList} updateItemList={updateItemList} filter={filter} />
        </div>
    );
}

export default App;