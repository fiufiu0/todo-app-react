import * as React from 'react';
import './App.css'

/*
TODO APP
1. input todosow
2. lista todo
3. usuwanie todo
*/

function List(props) {

  const deleteItem = key => {
    const newList = props.itemList.filter(itemObject => {
      return itemObject.key !== key;
    });
    props.updateItemList(newList);
  };

  return (
    <div>
      {props.itemList.map((itemObject) => {
        return (
          <div className="itemContainer">
            <p>{itemObject.item}</p>
            <button onClick={() => deleteItem(itemObject.key)}>X</button>
          </div>
        )
      })}
    </div>
  )
}

function App() {
  const [currentItem, setCurrentItem] = React.useState();
  const [itemList, updateItemList] = React.useState([]);

  const onChangeHandler = e => {
    setCurrentItem(e.target.value);
  };

  const addItemToList = () => {
    updateItemList([...itemList, { item: currentItem, key: Date.now() }]);
    setCurrentItem("");
  };



  return (
    <div className="App">
      <header className="App-header">
        <p>Todo App</p>
      </header>
      <div >
        <input placeholder="add something" value={currentItem} onChange={onChangeHandler} />
        <button onClick={addItemToList}>Add</button>
      </div>
      <List itemList={itemList} updateItemList={updateItemList} />
    </div>
  );
}

export default App;
