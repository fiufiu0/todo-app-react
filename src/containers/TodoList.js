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