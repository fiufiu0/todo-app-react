import * as React from 'react';
import Checkbox from '../components/Checkbox';
import ButtonX from '../components/ButtonX';


function TodoRow({ deleteItem, toggleCompleted, itemObject, index }) {

    return (
        <React.Fragment>
            <div key={itemObject + index} className="itemContainer">
                <p>{itemObject.item}</p>
                <div>
                    <Checkbox onChange={() => toggleCompleted(itemObject.index)} checked={itemObject.completed} />
                    <ButtonX onClick={() => deleteItem(itemObject)} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default TodoRow;