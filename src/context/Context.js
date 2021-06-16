import * as React from "react";

const myDataContext = React.createContext();

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


function DataContext(props) {
    const [itemList, updateItemList] = useLocalStorageState("myKey", []);
    const value = { itemList, updateItemList };
    return <myDataContext.Provider value={value}>{props.children}</myDataContext.Provider>
}

export { myDataContext, DataContext, useLocalStorageState }