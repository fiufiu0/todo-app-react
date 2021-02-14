import * as React from 'react';
import './App.css'

function ListInside({ deleteItem, toggleCompleted, itemObject, index }) {

  return (
    <React.Fragment>
      <div key={itemObject + index} className="itemContainer">
        <p>{itemObject.item}</p>
        <div className="checkandbutton">
          <ul>
            <li>
              <input type="checkbox" onChange={() => toggleCompleted(itemObject.index)} checked={itemObject.completed} />
            </li>
            <li>
              <button onClick={() => deleteItem(itemObject)}>X</button>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment >
  )
}


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
          // tutaj wstawic
          <ListInside itemObject={itemObject} index={index} deleteItem={deleteItem} toggleCompleted={toggleCompleted} />
        )
      })}
    </div>
  )
}


// PANEL WYBORU
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


// CAŁY FORMULARZ DODANIA + CZYSZCZENIA
function Form(props) {
  const [currentItem, setCurrentItem] = React.useState("");

  const onChangeHandler = (e) => {
    setCurrentItem(e.target.value);
  }

  const onChangeClick = () => {
    props.addTodo(currentItem);
    setCurrentItem("");
  }

  const onChangeClear = () => {
    props.clearTodo([]);
  }

  return (
    <React.Fragment>
      <div>
        <input placeholder="add something" value={currentItem} onChange={onChangeHandler} />
        <button onClick={onChangeClick}>Add</button>
        <button onClick={onChangeClear}>Clear list</button>
      </div>
    </React.Fragment>
  )
}


// GŁÓWNA APLIKACJA z komponentów
function App() {
  const [itemList, updateItemList] = React.useState([]);
  const [filter, setFilter] = React.useState('all');

  const getRandom = (length) => {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  const addItemToList = (currentItem) => {
    updateItemList([...itemList, { item: currentItem, completed: false, index: getRandom(20) }]);
  };

  const clearTodo = () => {
    updateItemList([]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h4>TODO LIST</h4>
      </header>
      <Form addTodo={addItemToList} clearTodo={clearTodo} />
      <Filter filter={filter} setFilter={setFilter} />
      <List itemList={itemList} updateItemList={updateItemList} filter={filter} />
    </div>
  );
}

export default App;