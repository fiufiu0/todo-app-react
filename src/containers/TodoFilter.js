import * as React from 'react';

function TodoFilter({ filter, setFilter }) {
    return (
        <React.Fragment>
            <label htmlFor="filter">Filter list </label>
            <select htmlFor="filter" onChange={e => setFilter(e.target.value)} value={filter}>
                <option value="all">ALL</option>
                <option value="completed">COMPLETED</option>
                <option value="other">OTHERS</option>
            </select>
        </React.Fragment>
    )
};

export default TodoFilter;