import * as React from 'react';
import './App.css'

function useLocalStorageState(key, defaultValue) {
  const [value, setValue] = React.useState(() => {
    const valueFromLocalStorage = window.localStorage.getItem(key);
    if (valueFromLocalStorage) {
      return JSON.parse(valueFromLocalStorage);
    }
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue];
}

function ListInside({ deleteItem, toggleCompleted, itemObject, index }) {

  return (
    <React.Fragment>
      <div key={itemObject + index} className="itemContainer">
        <p>{itemObject.item}</p>
        <div>
          <input type="checkbox" onChange={() => toggleCompleted(itemObject.index)} checked={itemObject.completed} />
          <button onClick={() => deleteItem(itemObject)}>X</button>
        </div>
      </div>
    </React.Fragment>
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
      }).map((itemObject) => {
        return (
          <ListInside itemObject={itemObject} key={itemObject.index} deleteItem={deleteItem} toggleCompleted={toggleCompleted} />
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
      <label htmlFor="filter">Filter list </label>
      <select htmlFor="filter" onChange={e => onChangeHandler(e)} value={filter}>
        <option value="all">ALL</option>
        <option value="completed">COMPLETED</option>
        <option value="other">OTHERS</option>
      </select>
    </React.Fragment>
  )
};



function Form({ setCurrentItem, currentItem, addTodo, clearTodo, isReady }) {

  const inputEl = React.useRef(null);

  React.useEffect(() => {
    if (isReady) {
      inputEl.current.focus();
    }
  })

  return (
    <React.Fragment>
      <div>
        <input ref={inputEl} placeholder="add todo" value={currentItem} onChange={(e) => setCurrentItem(e.target.value)} />
        <button onClick={addTodo}>Add</button>
        <button onClick={clearTodo}>Clear list</button>
      </div>
    </React.Fragment>
  )
}

function useFetch(url) {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url)
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }

    }
    fetchData();
  }, [url]);

  return data;
}


function App() {
  const [itemList, updateItemList] = useLocalStorageState("myKey", []);
  const [lastId, setLastId] = useLocalStorageState("lastId", 0);
  const [currentItem, setCurrentItem] = React.useState("");
  const [filter, setFilter] = React.useState('all');
  const apiUrl = "https://jsonplaceholder.typicode.com/users/1/todos";
  const data = useFetch(apiUrl);
  const memoValue = React.useMemo(() => {
    const newData = data.map((el) => {
      const newEl = {
        index: el.id,
        completed: el.completed,
        item: el.title,
      };
      return newEl;
    });
    return newData;
  }, [data])

  React.useEffect(() => {
    if (itemList.length === 0) {
      setLastId(memoValue.length + 1);
      updateItemList(memoValue);
    }
  }, [memoValue, setLastId, updateItemList, itemList])

  const addItemToList = () => {
    updateItemList([...itemList, {
      item: currentItem, completed: false, index: Math.floor(Math.random() * 10000)
    }]);
    setCurrentItem("");
  };

  const clearTodo = () => {
    updateItemList([]);
  }

  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <h4>TODO LIST APP</h4>
        </header>
        <Form isReady={memoValue.length >= 0} addTodo={addItemToList} clearTodo={clearTodo} currentItem={currentItem} setCurrentItem={setCurrentItem} />
        <Filter filter={filter} setFilter={setFilter} />
        <List itemList={itemList} updateItemList={updateItemList} filter={filter} />
      </div>
    </React.Fragment>
  );
}

export default App;