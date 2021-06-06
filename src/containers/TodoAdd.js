import * as React from 'react';

function TodoAdd({ setCurrentItem, currentItem, addTodo, clearTodo, isReady }) {

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

export default TodoAdd;