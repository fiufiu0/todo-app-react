import * as React from 'react';
import Checkbox from '../components/Checkbox';
import ButtonX from '../components/ButtonX';
import { useHistory } from 'react-router-dom';

function TodoRow({ deleteItem, toggleCompleted, itemObject, index }) {

    const initialState = {
        check: false,
    };

    const reducer = (state, action) => {

        console.log(' > state log', state);
        console.log(' > action log', action);

        switch (action.type) {
            case 'CHECK':
                return {
                    ...state,
                    check: action.payload,
                };
            case 'DELETE':
                deleteItem(action.payload);
                return state;
            default:
                return state;
        }
    }

    const [state, dispatch] = React.useReducer(reducer, initialState);
    const history = useHistory();
    console.log(history)
    const openTodo = () => history.push(`todos/${itemObject.index}`);
    // zmiana na link?

    return (
        <React.Fragment>
            <div key={itemObject + index} className="itemContainer">
                <p>{itemObject.item}</p>
                <div>
                    <Checkbox onChange={() => toggleCompleted(itemObject.index)} checked={itemObject.completed} />
                    <ButtonX onClick={() => dispatch({ type: 'DELETE', payload: itemObject })} />
                    <button onClick={openTodo}>OPEN</button>
                </div>
            </div>
        </React.Fragment>
    )
}

// ZAPASOWE BEZ USEREDUCER

// function TodoRow({ deleteItem, toggleCompleted, itemObject, index }) {

//     return (
//         <React.Fragment>
//             <div key={itemObject + index} className="itemContainer">
//                 <p>{itemObject.item}</p>
//                 <div>
//                     <Checkbox onChange={() => toggleCompleted(itemObject.index)} checked={itemObject.completed} />
//                     <ButtonX onClick={() => deleteItem(itemObject)} />
//                 </div>
//             </div>
//         </React.Fragment>
//     )
// }

export default TodoRow;