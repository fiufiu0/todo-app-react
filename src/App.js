import * as React from 'react';
import './App.css'
import Header from './components/Header';
import TodoList from './containers/TodoList';
import TodoAdd from './containers/TodoAdd';
import TodoFilter from './containers/TodoFilter';
import { Redirect } from 'react-router-dom';

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


function App(props) {
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

  if (!props.isLogged) {
    return (
      <Redirect to={{ pathname: "/" }} />
    );
  }

  return (
    <React.Fragment>
      <div>
        <button onClick={() => { props.setIsLogged(false) }}>Wyloguj</button>
      </div>
      <div className="App">
        <Header />
        <TodoAdd isReady={memoValue.length >= 0} addTodo={addItemToList} clearTodo={clearTodo} currentItem={currentItem} setCurrentItem={setCurrentItem} />
        <TodoFilter filter={filter} setFilter={setFilter} />
        <TodoList itemList={itemList} updateItemList={updateItemList} filter={filter} />
      </div>
    </React.Fragment>
  );
}

export default App;